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
  PropType,
  ref,
  watch,
  watchEffect,
} from "vue";
import { clamp, findAscendingAttribute, soften } from "..";
import handleAsset from "../assets/handle";
const props = defineProps({
  slideFrom: {
    type: Object as PropType<"top" | "bottom">,
    default: "bottom",
    validator(value: string) {
      return ["top", "bottom"].includes(value);
    },
  },
  maxDistance: {
    type: Number,
    default: null,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  dragEntireCard: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["progress"]);

const handleHeight = ref(50);
const cardRef = ref<HTMLElement | null>(null);
const handleRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const startYPosition = ref(0);
const y = ref(0);
const treshHold = 50;
const isOpen = ref(false);
const heightOfContent = ref(props.maxDistance);
const firstRender = ref(true);
let animationFrame: number = 0;
const progress = computed(() => {
  return clamp(y.value / heightOfContent.value, 0, 1);
});

// when fully open or closed, update the isOpen value
watch(y, () => {
  if (!isDragging.value) {
    isOpen.value = y.value > treshHold;
  }
});

// emit progress so parent can listen to it
watch(progress, () => {
  emit("progress", progress.value);
});

watch(isOpen, () => {
  if (isOpen.value) startYPosition.value = heightOfContent.value;
  else startYPosition.value = 0;
});

onMounted(() => {
  window.addEventListener("mouseup", () => stopDrag(), { passive: true });
  window.addEventListener("mousemove", whileDrag, { passive: true });
});
onUnmounted(() => {
  window.removeEventListener("click", () => {});
  window.removeEventListener("mouseup", () => {});
});

const startDrag = (e: MouseEvent | TouchEvent) => {
  // if the user clicked on an element with the data-ignore-drag attribute,
  // don't start dragging, useful for scrollable content
  if (
    e.target instanceof Element &&
    findAscendingAttribute(e.target, "data-ignore-drag")
  )
    return;

  document.documentElement.style.setProperty("overflow", "hidden");
  const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
  startYPosition.value = clientY + (isOpen.value ? heightOfContent.value : 0);
  isDragging.value = true;
};

const stopDrag = () => {
  document.documentElement.style.removeProperty("overflow");
  if (!isDragging.value) return;

  // snap the card to full open or fully closed
  if (isOpen.value) {
    if (y.value < heightOfContent.value - treshHold) {
      y.value = 0;
    } else {
      y.value = heightOfContent.value;
    }
  } else {
    if (y.value >= treshHold) {
      y.value = heightOfContent.value;
    } else {
      y.value = 0;
    }
  }

  startYPosition.value = y.value;
  isDragging.value = false;
};

const whileDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;

  animationFrame && window.cancelAnimationFrame(animationFrame);

  animationFrame = window.requestAnimationFrame(function () {
    const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
    y.value = soften(
      startYPosition.value - clientY,
      0,
      heightOfContent.value,
      heightOfContent.value
    );
  });
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
        : "transform 0.3s ease-out",
  };
  if (props.slideFrom === "top") {
    styles.top = 0;
    styles.transform = `translateY(${y.value}px)`;
  }
  if (props.slideFrom === "bottom") {
    styles.bottom = 0;
    styles.transform = `translateY(${
      (y.value - heightOfContent.value) * -1
    }px)`;
  }
  return styles;
});

// calculate height of cardRef using resize observer
const resizeObserver = new ResizeObserver((entries) => {
  if (!cardRef.value) return;
  const { blockSize: contentHeight } = entries[0].borderBoxSize[0];
  const viewportHeight = window.innerHeight;
  // keep track of the height of the handle
  if (handleRef.value) handleHeight.value = handleRef.value.clientHeight;
  // keep track of the height of the content
  heightOfContent.value =
    clamp(contentHeight, 0, viewportHeight) - handleHeight.value;
  console.log(clamp(contentHeight, 0, viewportHeight));
  // on the first render, if the card is open, set the y value to the height of the content,
  // this is to prevent the card from jumping open on the first render
  if (firstRender.value && props.isOpen) {
    y.value = heightOfContent.value;
  }
});
watchEffect(() =>
  cardRef.value ? resizeObserver.observe(cardRef.value) : null
);

onMounted(() => {
  setTimeout(() => (firstRender.value = false), 1);
});
</script>

<template>
  <div ref="cardRef" v-bind:style="style">
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
