import { ref, Ref, watch } from "vue";

export const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};

export const soften = (
  num: number,
  min: number,
  max: number,
  heightOfContent: number
) => {
  let position = num;
  if (num > max) {
    const rest = position - heightOfContent;
    position -= rest * 0.6;
  }
  if (num < min) {
    const rest = position;
    position -= rest * 0.6;
  }
  return position;
};

export const findAscendingAttribute = (
  el: Node | HTMLElement,
  attribute: string
) => {
  while (el.parentNode) {
    el = el.parentNode;
    return (el as HTMLElement).hasAttribute(attribute) ? el : null;
  }
};

export const isChildOf = ({
  parent,
  child,
}: {
  parent: Element;
  child: Element | string | null;
}) => {
  if (typeof child === "string") child = parent.querySelector(child);
  if (!child) return false;
  return parent.contains(child);
};

export const useTweenNumber = ({
  progress,
  duration,
}: {
  progress: Ref<number>;
  duration: number;
}) => {
  const animatedProgress = ref(progress.value);
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
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  };

  return { animatedProgress };
};
