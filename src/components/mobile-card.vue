<script lang="ts" setup>
import { computed, ref, watch } from "vue";

const isDragging = ref(false);
const startYPosition = ref(0);
const y = ref(0);
const treshHold = 50;
const isOpen = ref(false);
const height = 500;

watch(y, () => {
  if (!isDragging.value) {
    isOpen.value = y.value > treshHold;
  }
});

watch(isOpen, () => {
  if (isOpen.value) startYPosition.value = height;
  else startYPosition.value = 0;
});

const clamp = (num: number, min: number, max: number) => {
  let position = num;
  if (num > max) {
    const rest = position - height;
    position -= rest * 0.6;
  }
  if (num < min) {
    const rest = position;
    position += rest * 0.6;
  }
  return position;
};

const startDrag = (e: MouseEvent | TouchEvent) => {
  document.documentElement.classList.add("overflow-hidden");
  if (e instanceof TouchEvent) {
    startYPosition.value = e.touches[0].clientY + (isOpen.value ? 500 : 0);
  } else {
    startYPosition.value = e.clientY + (isOpen.value ? 500 : 0);
  }

  isDragging.value = true;
};

const stopDrag = () => {
  document.documentElement.classList.remove("overflow-hidden");
  if (!isDragging.value) return;
  if (isOpen.value) {
    if (y.value < height - treshHold) {
      y.value = 0;
    } else {
      y.value = height;
    }
  } else {
    if (y.value >= treshHold) {
      y.value = height;
    } else {
      y.value = 0;
    }
  }

  isOpen.value = y.value > treshHold;
  startYPosition.value = y.value;
  isDragging.value = false;
};

const whileDrag = (e) => {
  if (!isDragging.value) return;

  const clientY = e.clientY || e.touches[0].clientY;
  y.value = clamp(startYPosition.value - clientY, 0, height);
};

const style = computed(() => {
  return {
    transform: `translateY(-${y.value}px)`,
    transition: isDragging.value ? "none" : "transform 0.3s ease-out",
  };
});
</script>

<template>
  <div
    class="overflow-hidden"
    @mouseup="stopDrag"
    @touchend="stopDrag"
    @touchmove="whileDrag"
    @mousemove="whileDrag"
  >
    <div v-bind:style="style" class="fixed bottom-0 w-full left-0">
      <div
        @mousedown="startDrag"
        @touchstart="startDrag"
        class="cursor-move touch-none select-none drag-handle h-[50px] bg-black w-full text-white flex items-center text-center justify-center"
      >
        --------
      </div>

      <div class="absolute overflow-scroll h-[500px]">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
