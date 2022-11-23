<script setup>
import { ref, computed, watch } from 'vue';
import { glide } from 'motion';
import { Motion } from 'motion/vue';

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

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const startDrag = (e) => {
  startYPosition.value =
    (e.clientY || e.touches[0].clientY) + (isOpen.value ? 500 : 0);
  isDragging.value = true;
};

const stopDrag = () => {
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
</script>

<template>
  <div
    class="overflow-hidden"
    @mouseup="stopDrag"
    @touchend="stopDrag"
    @touchmove="whileDrag"
    @mousemove="whileDrag"
  >
    <div class="h-screen p-3">
      isDragging: {{ isDragging }} <br />
      startYPosition: {{ startYPosition }} <br />
      y: {{ y }} <br />
      isOpen: {{ isOpen }} <br />

      <button
        class="bg-black text-white rounded px-2 py-1"
        @click="y = y === height ? 0 : height"
      >
        toggle
      </button>
    </div>
    <Motion
      :animate="{ y: y * -1 }"
      :transition="{
        duration: isDragging ? 0 : 0.3,
        ease: isDragging ? 'linear' : 'ease-in-out',
      }"
      class="fixed bottom-0 w-full left-0"
    >
      <div
        @mousedown="startDrag"
        @touchstart="startDrag"
        class="
          cursor-move
          select-none
          drag-handle
          h-[50px]
          bg-black
          w-full
          text-white
          flex
          items-center
          text-center
          justify-center
        "
      >
        --------
      </div>
    </Motion>
  </div>
</template>

<style scoped></style>
