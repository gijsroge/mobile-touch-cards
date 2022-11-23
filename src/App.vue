<script setup>
import { ref } from 'vue';
import { glide } from 'motion';
import { Motion } from 'motion/vue';

const isDragging = ref(false);
const startYPosition = ref(0);
const y = ref(0);

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const startDrag = (e) => {
  startYPosition.value = e.clientY || e.touches[0].clientY;
  isDragging.value = true;
};

const stopDrag = () => {
  isDragging.value = false;
  if (y.value >= 50) {
    y.value = 500;
  } else {
    y.value = 0;
  }
  startYPosition.value = y.value;
};

const whileDrag = (e) => {
  if (!isDragging.value) return;

  const clientY = e.clientY || e.touches[0].clientY;
  y.value = clamp(startYPosition.value - clientY, 0, 500);
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

      <button
        class="bg-black text-white rounded px-2 py-1"
        @click="y = y === 500 ? 0 : 500"
      >
        toggle
      </button>
    </div>
    <Motion
      :animate="{ y: y * -1 }"
      :transition="{ duration: isDragging ? 0.1 : 0.3, ease: 'ease-in-out' }"
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
