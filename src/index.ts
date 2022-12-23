import { onUnmounted, ref, Ref, watch, watchEffect } from "vue";

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

export function useTrapFocus(element: Ref<HTMLElement | null>) {
  const isLocked = ref(false);
  let previousActiveElement: HTMLElement | null = null;
  let focusableEls = null;
  let firstFocusableEl: HTMLElement | null = null;
  let lastFocusableEl: HTMLElement | null = null;
  const KEYCODE_TAB = 9;

  const trap = () => {
    isLocked.value = true;
    previousActiveElement = document.activeElement as HTMLElement;

    firstFocusableEl?.focus();
  };

  const release = () => {
    isLocked.value = false;

    previousActiveElement?.focus();
  };

  const cycleFocus = (e: KeyboardEvent) => {
    if (!isLocked.value) return;
    var isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      /* shift + tab */
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl?.focus();
        e.preventDefault();
      }
    } else {
      /* tab */
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl?.focus();
        e.preventDefault();
      }
    }
  };

  watchEffect(() => {
    if (!element.value) return;
    focusableEls = element.value.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    );
    firstFocusableEl = focusableEls[0] as HTMLElement;
    lastFocusableEl = focusableEls[focusableEls.length - 1] as HTMLElement;
    element.value.addEventListener("keydown", cycleFocus);
  });
  onUnmounted(() => element.value?.removeEventListener("keydown", cycleFocus));

  return { trap, release, isLocked };
}
