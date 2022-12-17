<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import handleAsset from "../assets/handle";

const props = defineProps({
  maxDistance: {
    type: Number,
    default: null,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["progress"]);

const cardRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const handleRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const startYPosition = ref(0);
const y = ref(0);
const treshHold = 50;
const isOpen = ref(false);
const heightOfContent = ref(props.maxDistance);
const firstRender = ref(true);
watch(y, () => {
  if (!isDragging.value) {
    isOpen.value = y.value > treshHold;
  }
});

// clamp function
const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};

const progress = computed(() => {
  return clamp(y.value / heightOfContent.value, 0, 1);
});

watch(progress, () => {
  emit("progress", progress.value);
});

watch(isOpen, () => {
  if (isOpen.value) startYPosition.value = heightOfContent.value;
  else startYPosition.value = 0;
});

const soften = (num: number, min: number, max: number) => {
  let position = num;
  if (num > max) {
    const rest = position - heightOfContent.value;
    position -= rest * 0.6;
  }
  if (num < min) {
    const rest = position;
    position -= rest * 0.6;
  }
  return position;
};

onMounted(() => {
  window.addEventListener("mouseup", () => stopDrag());
  window.addEventListener("mousemove", whileDrag);
});
onUnmounted(() => {
  window.removeEventListener("click", () => {});
  window.removeEventListener("mouseup", () => {});
});

const startDrag = (e: MouseEvent | TouchEvent) => {
  document.documentElement.classList.add("overflow-hidden");
  if (e instanceof TouchEvent) {
    startYPosition.value =
      e.touches[0].clientY + (isOpen.value ? heightOfContent.value : 0);
  } else {
    startYPosition.value =
      e.clientY + (isOpen.value ? heightOfContent.value : 0);
  }

  isDragging.value = true;
};

const stopDrag = (force: boolean = false) => {
  document.documentElement.classList.remove("overflow-hidden");
  if (!isDragging.value && !force) return;
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

  isOpen.value = y.value > treshHold;
  startYPosition.value = y.value;
  isDragging.value = false;
};

const whileDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;

  const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
  y.value = soften(startYPosition.value - clientY, 0, heightOfContent.value);
};

const style = computed(() => {
  return {
    transform: `translateY(${(y.value - heightOfContent.value) * -1}px)`,
    transition:
      isDragging.value || firstRender.value
        ? "none"
        : "transform 0.3s ease-out",
  };
});

// calculate height of contentRef using resize observer

const resizeObserver = new ResizeObserver((entries) => {
  if (!cardRef.value || !handleRef.value) return;

  console.log(cardRef.value);
  const { blockSize: contentHeight } = entries[0].borderBoxSize[0];
  if (handleRef.value)
    heightOfContent.value = contentHeight - handleRef.value.offsetHeight;
  stopDrag(true);
  if (firstRender.value && props.isOpen) {
    y.value = heightOfContent.value;
  }
});
watchEffect(() => {
  if (cardRef.value) {
    resizeObserver.observe(cardRef.value);
  }
});

onMounted(() => {
  setTimeout(() => (firstRender.value = false), 1);
});
</script>

<template>
  <div ref="cardRef" class="fixed bottom-0 left-0 right-0" v-bind:style="style">
    <div
      v-bind="$attrs"
      :style="{ marginTop: '0px !important' }"
      class=""
      @touchend="() => stopDrag()"
      @touchmove="whileDrag"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <div class="touch-none select-none" ref="handleRef">
        <slot name="handle">
          <div
            class="cursor-move drag-handle h-[50px] bg-black w-full text-white flex items-center text-center justify-center"
            v-html="handleAsset"
          ></div>
        </slot>
      </div>

      <slot></slot>
    </div>
  </div>
</template>
