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
const widthOrHeight = ref(props.maxDistance);
const firstRender = ref(true);
watch(y, () => {
  if (!isDragging.value) {
    isOpen.value = y.value > treshHold;
  }
});

watch(isOpen, () => {
  if (isOpen.value) startYPosition.value = widthOrHeight.value;
  else startYPosition.value = 0;
});

const clamp = (num: number, min: number, max: number) => {
  let position = num;
  if (num > max) {
    const rest = position - widthOrHeight.value;
    position -= rest * 0.6;
  }
  if (num < min) {
    const rest = position;
    position += rest * 0.6;
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
      e.touches[0].clientY + (isOpen.value ? widthOrHeight.value : 0);
  } else {
    startYPosition.value = e.clientY + (isOpen.value ? widthOrHeight.value : 0);
  }

  isDragging.value = true;
};

const stopDrag = (force: boolean = false) => {
  document.documentElement.classList.remove("overflow-hidden");
  if (!isDragging.value && !force) return;
  if (isOpen.value) {
    if (y.value < widthOrHeight.value - treshHold) {
      y.value = 0;
    } else {
      y.value = widthOrHeight.value;
    }
  } else {
    if (y.value >= treshHold) {
      y.value = widthOrHeight.value;
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
  y.value = clamp(startYPosition.value - clientY, 0, widthOrHeight.value);
};

const style = computed(() => {
  return {
    transform: `translateY(${(y.value - widthOrHeight.value) * -1}px)`,
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
    widthOrHeight.value = contentHeight;
    stopDrag(true);
    if (firstRender.value && props.isOpen) {
      y.value = widthOrHeight.value;
    }
  });
  watchEffect(() => {
    if (contentRef.value) {
      resizeObserver.observe(contentRef.value);
    }
  });
}

onMounted(() => {
  setTimeout(() => (firstRender.value = false), 1);
});
</script>

<template>
  <div
    v-bind:style="style"
    class=""
    @touchend="() => stopDrag()"
    @touchmove="whileDrag"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <div class="touch-none select-none">
      <slot name="handle">
        <div
          class="cursor-move drag-handle h-[50px] bg-black w-full text-white flex items-center text-center justify-center"
        >
          --------
        </div>
      </slot>
    </div>

    <div class="overflow-auto" ref="contentRef">
      <slot></slot>
    </div>
  </div>
</template>
