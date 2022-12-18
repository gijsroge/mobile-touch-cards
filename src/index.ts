import { animate } from "motion";

export const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};

export class MobileCard {
  slideFrom: "top" | "bottom";
  maxDistance: number | null;
  isOpen: boolean;
  handleHeight: number | null;
  dragEntireCard: boolean;
  isDragging: boolean;
  y: number;
  heightOfContent: number;
  treshHold: number;
  firstRender: boolean;
  cardElement: HTMLElement | null;
  movedScheduled: boolean;

  constructor({
    slideFrom,
    maxDistance,
    isOpen,
    handleHeight,
    dragEntireCard,
  }: {
    slideFrom?: "top" | "bottom";
    maxDistance?: number | null;
    isOpen?: boolean;
    handleHeight?: number | null;
    dragEntireCard?: boolean;
  }) {
    this.slideFrom = slideFrom || "top";
    this.maxDistance = maxDistance || null;
    this.isOpen = isOpen || false;
    this.handleHeight = handleHeight || null;
    this.dragEntireCard = dragEntireCard || false;
    this.isDragging = false;
    this.y = 0;
    this.heightOfContent = 667;
    this.treshHold = 50;
    this.firstRender = true;
    this.cardElement = null;
    this.movedScheduled = false;
  }

  onChange(callback: () => void) {
    callback();
  }

  mount() {
    // window.addEventListener("mouseup", () => stopDrag());
    // window.addEventListener("mousemove", whileDrag);
  }

  unMount() {
    // window.addEventListener("mouseup", () => stopDrag());
    // window.addEventListener("mousemove", whileDrag);
  }

  soften(num: number, min: number, max: number) {
    let position = num;
    if (num > max) {
      const rest = position - this.heightOfContent;
      position -= rest * 0.6;
    }
    if (num < min) {
      const rest = position;
      position -= rest * 0.6;
    }
    return position;
  }

  // whileDrag
  dragPosition(e: MouseEvent | TouchEvent) {
    console.log("drag");
    if (!this.isDragging) return 0;

    const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
    this.y = this.soften(this.y - clientY, 0, this.heightOfContent);

    !this.movedScheduled &&
      requestAnimationFrame(() => {
        console.log("move");
        this.move();
      });
    this.movedScheduled = true;
  }

  move() {
    console.log(this.cardElement);
    if (this.cardElement === null) return;

    this.movedScheduled = false;
    animate(
      this.cardElement,
      { y: this.y * -1 },
      {
        duration: 0,
      }
    );
  }

  // stopDrag
  stopDrag({ force }: { force?: boolean } = { force: false }) {
    document.documentElement.classList.remove("overflow-hidden");
    if (!this.isDragging && !force) return;
    if (this.isOpen) {
      if (this.y < this.heightOfContent - this.treshHold) {
        this.y = 0;
      } else {
        this.y = this.heightOfContent;
      }
    } else {
      if (this.y >= this.treshHold) {
        this.y = this.heightOfContent;
      } else {
        this.y = 0;
      }
    }

    this.isOpen = this.y > this.treshHold;
    this.isDragging = false;
  }

  // startDrag
  startDrag() {
    document.documentElement.classList.add("overflow-hidden");
    this.isDragging = true;
  }

  // watch

  // getStyles
  getStyles() {
    const styles: any = {
      willChange: "transform",
      left: 0,
      right: 0,
      transition:
        this.isDragging || this.firstRender
          ? "none"
          : "transform 0.3s ease-out",
    };
    if (this.slideFrom === "top") {
      styles.top = 0;
      styles.transform = `translateY(${this.y}px)`;
    }
    if (this.slideFrom === "bottom") {
      styles.transform = `translateY(${
        (this.y - this.heightOfContent) * -1
      }px)`;
    }
    return styles;
  }
}
