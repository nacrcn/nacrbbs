"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const getTabListStyle = ({
  direction,
  type,
  offset
}) => {
  if (direction === "vertical") {
    return { transform: `translateY(${-offset}px)` };
  }
  return { transform: `translateX(${-offset}px)` };
};
const updateScrollOffset = (parentNode, direction) => {
  const { scrollTop, scrollLeft } = parentNode;
  if (direction === "horizontal" && scrollLeft) {
    parentNode.scrollTo({ left: -1 * scrollLeft });
  }
  if (direction === "vertical" && scrollTop) {
    parentNode.scrollTo({ top: -1 * scrollTop });
  }
};
exports.getTabListStyle = getTabListStyle;
exports.updateScrollOffset = updateScrollOffset;
