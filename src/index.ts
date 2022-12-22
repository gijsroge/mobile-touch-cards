import { onUnmounted, ref, Ref, watch } from "vue";

export const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};

export const dampen = (num: number, min: number, max: number) => {
  let position = num;
  if (num > max) {
    const rest = position - max;
    position -= rest * 0.6;
  }
  if (num < min) {
    const rest = position;
    position -= rest * 0.6;
  }
  return position;
};

export const useTweenNumber = ({
  progress,
  duration,
}: {
  progress: Ref<number>;
  duration: number;
}) => {
  const animatedProgress = ref(progress.value);
  const rafId = ref<number | null>(null);
  watch(progress, (newValue, oldValue) => tween(oldValue, newValue));

  const tween = (start: number, end: number) => {
    // tween number between start and end using cubic-bezier and requestAnimationFrame
    const startTime = performance.now();
    const ease = (t: number) => t * (2 - t);
    const update = () => {
      const time = performance.now() - startTime;
      const t = clamp(time / duration, 0, 1);
      animatedProgress.value = ease(t) * (end - start) + start;
      if (t < 1) {
        rafId.value = requestAnimationFrame(update);
      }
    };
    rafId.value = requestAnimationFrame(update);
  };

  onUnmounted(() => {
    if (rafId.value) cancelAnimationFrame(rafId.value);
  });

  return { animatedProgress };
};
