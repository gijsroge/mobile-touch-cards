<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import {
  computed,
  CSSProperties,
  onMounted,
  onUnmounted,
  ref,
  watch,
  watchEffect,
} from "vue";
import { clamp, useTweenNumber } from "..";
import handleAsset from "../assets/handle";

const props = defineProps({
  rootClass: {
    type: String,
    default: "",
  },
  maxDistance: {
    type: Number,
    default: null,
  },
  open: {
    type: Boolean,
    default: false,
  },
  dragEntireCard: {
    type: Boolean,
    default: true,
  },
  thresHold: {
    type: Number,
    default: 50,
  },
  // for ssr
  handleHeight: {
    type: Number,
    default: 50,
  },
});

const emit = defineEmits([
  "progress",
  "open",
  "close",
  "drag",
  "start-drag",
  "stop-drag",
]);

const isSsr = typeof document !== "undefined";
const cardRef = ref<HTMLElement | null>(null);
const handleRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const heightOfContent = ref(props.maxDistance);
const handleHeight = ref(props.handleHeight);
const firstRender = ref(true);
const allowDrag = ref(false);

onMounted(() => {
  window.addEventListener("mouseup", () => stopDrag(), { passive: true });
  window.addEventListener("mousemove", whileDrag, { passive: true });
});
onUnmounted(() => {
  window.removeEventListener("click", () => {});
  window.removeEventListener("mousemove", () => {});
  window.removeEventListener("mouseup", () => {});
});

// refs to drag the card
const startY = ref(0);
const y = ref(0);
const dragDistance = ref(0);

const startDrag = (e: MouseEvent | TouchEvent) => {
  // if the user clicked on an element with the data-ignore-drag attribute,
  // don't start dragging, useful for scrollable content
  if (e.target instanceof HTMLElement && e.target.closest("[data-ignore-drag]"))
    return;

  // allow dragging
  allowDrag.value = true;

  // get Y position of the mouse or touch
  const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;

  // keep track of where the user started dragging
  startY.value = clientY + y.value;

  emit("start-drag");
  console.log("start drag");
};

const whileDrag = (e: MouseEvent | TouchEvent) => {
  if (!allowDrag.value) return;
  const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;

  // calculate the distance the user has dragged
  y.value = startY.value - clientY;
};

const stopDrag = () => {
  allowDrag.value = false;
};

const style = computed(() => {
  const styles: CSSProperties = {
    position: "fixed",
    willChange: "transform",
    left: 0,
    right: 0,

    transition:
      isDragging.value || firstRender.value
        ? "none"
        : "transform 0.2s ease-out",
  };

  styles.top = "100%";
  styles.transform = `translateY(${(y.value + handleHeight.value) * -1}px)`;

  return styles;
});

// calculate height of cardRef using resize observer
const resizeObserver = isSsr
  ? new ResizeObserver((entries) => {
      if (!cardRef.value) return;
      const { blockSize: contentHeight } = entries[0].borderBoxSize[0];
      const viewportHeight = window.innerHeight;
      // keep track of the height of the handle
      if (handleRef.value) handleHeight.value = handleRef.value.clientHeight;
      // keep track of the height of the content
      heightOfContent.value =
        clamp(contentHeight, 0, viewportHeight) - handleHeight.value;
      // on the first render, if the card is open, set the y value to the height of the content,
      // this is to prevent the card from jumping open on the first render
      if (firstRender.value && props.open) {
        y.value = heightOfContent.value;
      }
    })
  : null;

onMounted(() => {
  setTimeout(() => (firstRender.value = false), 1);
});

const progress = computed(() => {
  return clamp(y.value / heightOfContent.value, 0, 1);
});

const isOpen = computed(() => {
  return progress.value === 1;
});

const { animatedProgress } = useTweenNumber({
  progress: progress,
  duration: 250,
});

watch(animatedProgress, () => {
  emit("progress", animatedProgress.value);
});

watchEffect(() =>
  cardRef.value ? resizeObserver?.observe(cardRef.value) : null
);
</script>

<template>
  <div ref="cardRef" v-bind:style="style" :class="[rootClass]" data-modal-sheet>
    <div
      v-bind="$attrs"
      :style="{ marginTop: '0px !important', touchAction: 'none' }"
      @touchend="() => stopDrag()"
      @touchmove.passive="whileDrag"
      @mousedown="(event) => (dragEntireCard ? startDrag(event) : null)"
      @touchstart.passive="
        (event) => (dragEntireCard ? startDrag(event) : null)
      "
    >
      {{ isDragging }}
      <div
        ref="handleRef"
        @mousedown="(event) => (!dragEntireCard ? startDrag(event) : null)"
        @touchstart.passive="
          (event) => (!dragEntireCard ? startDrag(event) : null)
        "
      >
        <slot name="handle">
          <div
            :style="{
              userSelect: 'none',
              cursor: 'move',
              height: '50px',
              position: 'relative',
              width: '100%',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }"
            v-html="handleAsset"
          ></div>
        </slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
