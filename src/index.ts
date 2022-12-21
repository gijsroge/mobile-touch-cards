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

export const getStyles = ({
  isDragging,
  firstRender,
  heightOfContent,
  slideFrom,
  y,
}: {
  isDragging: boolean;
  firstRender: boolean;
  heightOfContent: number;
  slideFrom: "top" | "bottom";
  y: number;
}) => {
  const styles: any = {
    willChange: "transform",
    left: 0,
    right: 0,
    transition: isDragging || firstRender ? "none" : "transform 0.3s ease-out",
  };
  if (slideFrom === "top") {
    styles.top = 0;
    styles.transform = `translateY(${y}px)`;
  }
  if (slideFrom === "bottom") {
    styles.transform = `translateY(${(y - heightOfContent) * -1}px)`;
  }
  return styles;
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
