<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script lang="ts" setup>
// const handleHeightInternal = ref(props.handleHeight || 50);
// const cardRef = ref<HTMLElement | null>(null);
// const handleRef = ref<HTMLElement | null>(null);
// const isDragging = ref(false);
// const startYPosition = ref(0);
// const y = ref(0);
// const treshHold = 50;
// const isOpen = ref(false);
// const heightOfContent = ref(props.maxDistance);
// const firstRender = ref(true);
// watch(y, () => {
//   if (!isDragging.value) {
//     isOpen.value = y.value > treshHold;
//   }
// });

// const progress = computed(() => {
//   return clamp(y.value / heightOfContent.value, 0, 1);
// });

// watch(progress, () => {
//   emit("progress", progress.value);
// });

// watch(isOpen, () => {
//   if (isOpen.value) startYPosition.value = heightOfContent.value;
//   else startYPosition.value = 0;
// });

// onMounted(() => {
//   mobileCard.mount();
// });
// onUnmounted(() => {
//   mobileCard.unMount();
// });

// const startDrag = (e: MouseEvent | TouchEvent) => {
//   document.documentElement.classList.add("overflow-hidden");
//   if (e instanceof TouchEvent) {
//     startYPosition.value =
//       e.touches[0].clientY + (isOpen.value ? heightOfContent.value : 0);
//   } else {
//     startYPosition.value =
//       e.clientY + (isOpen.value ? heightOfContent.value : 0);
//   }

//   isDragging.value = true;
// };

// const stopDrag = ({ force }: { force: boolean } = { force: false }) => {
//   document.documentElement.classList.remove("overflow-hidden");
//   if (!isDragging.value && !force) return;
//   if (isOpen.value) {
//     if (y.value < heightOfContent.value - treshHold) {
//       y.value = 0;
//     } else {
//       y.value = heightOfContent.value;
//     }
//   } else {
//     if (y.value >= treshHold) {
//       y.value = heightOfContent.value;
//     } else {
//       y.value = 0;
//     }
//   }

//   isOpen.value = y.value > treshHold;
//   startYPosition.value = y.value;
//   isDragging.value = false;
// };

// const whileDrag = (e: MouseEvent | TouchEvent) => {
//   if (!isDragging.value) return;

//   const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
//   y.value = soften(
//     startYPosition.value - clientY,
//     0,
//     heightOfContent.value,
//     heightOfContent.value
//   );
// };

// const style = computed(() => {
//   const styles: CSSProperties = {
//     willChange: "transform",
//     left: 0,
//     right: 0,
//     transition:
//       isDragging.value || firstRender.value
//         ? "none"
//         : "transform 0.3s ease-out",
//   };
//   if (props.slideFrom === "top") {
//     styles.top = 0;
//     styles.transform = `translateY(${y.value}px)`;
//   }
//   if (props.slideFrom === "bottom") {
//     styles.transform = `translateY(${
//       (y.value - heightOfContent.value) * -1
//     }px)`;
//   }
//   return styles;
// });

// // calculate height of cardRef using resize observer
// const resizeObserver = new ResizeObserver((entries) => {
//   if (!cardRef.value) return;
//   const { blockSize: contentHeight } = entries[0].borderBoxSize[0];
//   if (handleRef.value && !props.handleHeight)
//     handleHeightInternal.value = handleRef.value.clientHeight;
//   heightOfContent.value = contentHeight - handleHeightInternal.value;
//   stopDrag({ force: true });
//   if (firstRender.value && props.isOpen) {
//     y.value = heightOfContent.value;
//   }
// });
// watchEffect(() => {
//   if (cardRef.value) {
//     resizeObserver.observe(cardRef.value);
//   }
// });

// onMounted(() => {
//   setTimeout(() => (firstRender.value = false), 1);
// });

import { PropType, ref, watchEffect } from "vue";
import { MobileCard } from "..";
import handleAsset from "../assets/handle";
const cardRef = ref<HTMLElement | null>(null);
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
  handleHeight: {
    type: Number,
    default: null,
  },
  dragEntireCard: {
    type: Boolean,
    default: false,
  },
});

const mobileCard = new MobileCard({
  slideFrom: props.slideFrom,
  maxDistance: props.maxDistance,
  isOpen: props.isOpen,
  handleHeight: props.handleHeight,
  dragEntireCard: props.dragEntireCard,
});

watchEffect(() => {
  if (cardRef.value) mobileCard.cardElement = cardRef.value;
});

const y = ref(0);
const styles = ref({});

const whileDrag = (e: MouseEvent | TouchEvent) => {
  mobileCard.dragPosition(e);
};

const startDrag = () => {
  mobileCard.startDrag();
};

const stopDrag = () => {
  mobileCard.stopDrag({ force: false });
};

const emit = defineEmits(["progress"]);
</script>

<template>
  <div ref="cardRef" class="fixed">
    <div
      v-bind="$attrs"
      :style="{ marginTop: '0px !important' }"
      class="touch-none"
      @touchend="() => stopDrag()"
      @touchmove="whileDrag"
      @mousedown="() => (dragEntireCard ? startDrag() : null)"
      @touchstart="() => (dragEntireCard ? startDrag() : null)"
    >
      <div
        ref="handleRef"
        @mousedown="() => (!dragEntireCard ? startDrag() : null)"
        @touchstart="() => (!dragEntireCard ? startDrag() : null)"
      >
        {{ styles }}
        <slot name="handle">
          <div
            class="cursor-move drag-handle h-[50px] relative w-full text-white flex items-center text-center justify-center"
            v-html="handleAsset"
          ></div>
        </slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
