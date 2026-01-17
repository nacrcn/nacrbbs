"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var vue = require("vue");
var globalConfig = require("../_utils/global-config.js");
const COLORS = ["red", "orangered", "orange", "gold", "lime", "green", "cyan", "arcoblue", "purple", "pinkpurple", "magenta", "gray"];
const BADGE_STATUSES = ["normal", "processing", "success", "warning", "danger"];
var _Badge = vue.defineComponent({
  name: "Badge",
  props: {
    text: {
      type: String
    },
    dot: {
      type: Boolean
    },
    dotStyle: {
      type: Object
    },
    maxCount: {
      type: Number,
      default: 99
    },
    offset: {
      type: Array,
      default: () => []
    },
    color: {
      type: String
    },
    status: {
      type: String,
      validator: (value) => {
        return BADGE_STATUSES.includes(value);
      }
    },
    count: {
      type: Number
    }
  },
  setup(props, {
    slots
  }) {
    const {
      status,
      color,
      dotStyle,
      offset,
      text,
      dot,
      maxCount,
      count
    } = vue.toRefs(props);
    const prefixCls = globalConfig.getPrefixCls("badge");
    const wrapperClassName = useWrapperClass(prefixCls, status == null ? void 0 : status.value, slots == null ? void 0 : slots.default);
    const computedStyleRef = vue.computed(() => {
      const computedDotStyle = {
        ...(dotStyle == null ? void 0 : dotStyle.value) || {}
      };
      const [leftOffset, topOffset] = (offset == null ? void 0 : offset.value) || [];
      if (leftOffset) {
        computedDotStyle.marginRight = `${-leftOffset}px`;
      }
      if (topOffset) {
        computedDotStyle.marginTop = `${topOffset}px`;
      }
      const computedColorStyle = !(color == null ? void 0 : color.value) || COLORS.includes(color == null ? void 0 : color.value) ? {} : {
        backgroundColor: color.value
      };
      const mergedStyle = {
        ...computedColorStyle,
        ...computedDotStyle
      };
      return {
        mergedStyle,
        computedDotStyle,
        computedColorStyle
      };
    });
    const getDot = () => {
      const textValue = text == null ? void 0 : text.value;
      const colorValue = color == null ? void 0 : color.value;
      const statusValue = status == null ? void 0 : status.value;
      const dotValue = dot == null ? void 0 : dot.value;
      const countValue = Number(count == null ? void 0 : count.value);
      const hasCount = (count == null ? void 0 : count.value) != null;
      const {
        computedDotStyle,
        mergedStyle
      } = computedStyleRef.value;
      if (slots.content) {
        return vue.createVNode("span", {
          "class": `${prefixCls}-custom-dot`,
          "style": computedDotStyle
        }, [slots.content()]);
      }
      if (textValue && !colorValue && !statusValue) {
        return vue.createVNode("span", {
          "class": `${prefixCls}-text`,
          "style": computedDotStyle
        }, [textValue]);
      }
      if (statusValue || colorValue && !hasCount) {
        return vue.createVNode("span", {
          "class": `${prefixCls}-status-wrapper`
        }, [vue.createVNode("span", {
          "class": [`${prefixCls}-status-dot`, {
            [`${prefixCls}-status-${statusValue}`]: statusValue,
            [`${prefixCls}-color-${colorValue}`]: colorValue
          }],
          "style": mergedStyle
        }, null), textValue && vue.createVNode("span", {
          "class": `${prefixCls}-status-text`
        }, [textValue])]);
      }
      if ((dotValue || colorValue) && countValue > 0) {
        return vue.createVNode("span", {
          "class": [`${prefixCls}-dot`, {
            [`${prefixCls}-color-${colorValue}`]: colorValue
          }],
          "style": mergedStyle
        }, null);
      }
      if (countValue === 0) {
        return null;
      }
      return vue.createVNode("span", {
        "class": `${prefixCls}-number`,
        "style": mergedStyle
      }, [vue.createVNode("span", null, [maxCount.value && countValue > maxCount.value ? `${maxCount.value}+` : countValue])]);
    };
    return () => {
      return vue.createVNode("span", {
        "class": wrapperClassName.value
      }, [slots.default && slots.default(), getDot()]);
    };
  }
});
const useWrapperClass = (prefixCls, status, children) => {
  return vue.computed(() => [prefixCls, {
    [`${prefixCls}-status`]: status,
    [`${prefixCls}-no-children`]: !children
  }]);
};
exports.BADGE_STATUSES = BADGE_STATUSES;
exports.COLORS = COLORS;
exports["default"] = _Badge;
