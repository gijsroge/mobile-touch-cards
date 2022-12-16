<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from "vue";

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
const contentRef = ref(null);
const isDragging = ref(false);
const startYPosition = ref(0);
const y = ref(0);
const treshHold = 50;
const isOpen = ref(false);
const distance = ref(props.maxDistance);
const firstRender = ref(true);
watch(y, () => {
  if (!isDragging.value) {
    isOpen.value = y.value > treshHold;
  }
});

watch(isOpen, () => {
  if (isOpen.value) startYPosition.value = distance.value;
  else startYPosition.value = 0;
});

const clamp = (num: number, min: number, max: number) => {
  let position = num;
  if (num > max) {
    const rest = position - distance.value;
    position -= rest * 0.6;
  }
  if (num < min) {
    const rest = position;
    position += rest * 0.6;
  }
  return position;
};

onMounted(() => {
  window.addEventListener("mouseup", stopDrag);
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
      e.touches[0].clientY + (isOpen.value ? distance.value : 0);
  } else {
    startYPosition.value = e.clientY + (isOpen.value ? distance.value : 0);
  }

  isDragging.value = true;
};

const stopDrag = () => {
  document.documentElement.classList.remove("overflow-hidden");
  if (!isDragging.value) return;
  if (isOpen.value) {
    if (y.value < distance.value - treshHold) {
      y.value = 0;
    } else {
      y.value = distance.value;
    }
  } else {
    if (y.value >= treshHold) {
      y.value = distance.value;
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
  y.value = clamp(startYPosition.value - clientY, 0, distance.value);
};

const style = computed(() => {
  return {
    transform: `translateY(-${y.value}px)`,
    transition:
      isDragging.value || firstRender.value
        ? "none"
        : "transform 0.3s ease-out",
  };
});

// calculate height of contentRef using resize observer

if (!props.maxDistance) {
  const resizeObserver = new ResizeObserver((entries) => {
    const { height: contentHeight } = entries[0].contentRect;
    distance.value = contentHeight;
    if (firstRender.value) {
      y.value = distance.value;
      setTimeout(() => (firstRender.value = false), 1);
    }
  });
  watchEffect(() => {
    if (contentRef.value) {
      resizeObserver.observe(contentRef.value);
    }
  });
}
</script>

<template>
  <div
    v-bind:style="style"
    class="fixed inset-x-0 bottom-0"
    @touchend="stopDrag"
    @touchmove="whileDrag"
  >
    <div class="touch-none" @mousedown="startDrag" @touchstart="startDrag">
      <slot name="handle">
        <div
          class="cursor-move select-none drag-handle h-[50px] bg-black w-full text-white flex items-center text-center justify-center"
        >
          --------
        </div>
      </slot>
    </div>

    <div class="absolute overflow-auto" ref="contentRef">
      <slot></slot>
    </div>
  </div>
</template>
