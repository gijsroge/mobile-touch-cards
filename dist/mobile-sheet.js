import { ref as i, watch as h, defineComponent as S, computed as A, onMounted as H, onUnmounted as k, watchEffect as D, openBlock as R, createElementBlock as N, normalizeStyle as z, unref as Y, normalizeClass as O, createElementVNode as C, mergeProps as $, renderSlot as B } from "vue";
const T = (e, s, d) => Math.min(Math.max(e, s), d), q = (e, s, d, m) => {
  let a = e;
  if (e > d) {
    const r = a - m;
    a -= r * 0.6;
  }
  return e < s && (a -= a * 0.6), a;
}, F = (e, s) => {
  for (; e.parentNode; )
    return e = e.parentNode, e.hasAttribute(s) ? e : null;
}, j = ({
  progress: e,
  duration: s
}) => {
  const d = i(e.value);
  h(e, (a, r) => m(r, a));
  const m = (a, r) => {
    const g = performance.now(), f = (l) => l * (2 - l), v = () => {
      const l = performance.now() - g, n = T(l / s, 0, 1);
      d.value = f(n) * (r - a) + a, n < 1 && requestAnimationFrame(v);
    };
    requestAnimationFrame(v);
  };
  return { animatedProgress: d };
}, I = `<svg width="70" height="3" viewBox="0 0 70 3" xmlns="http://www.w3.org/2000/svg">
<rect width="70" height="3" rx="3" fill="currentColor"/>
</svg>
`, U = ["innerHTML"], V = {
  inheritAttrs: !1
}, J = /* @__PURE__ */ S({
  ...V,
  __name: "mobile-card",
  props: {
    rootClass: {
      type: String,
      default: ""
    },
    maxDistance: {
      type: Number,
      default: null
    },
    isOpen: {
      type: Boolean,
      default: !1
    },
    dragEntireCard: {
      type: Boolean,
      default: !0
    },
    autoClose: {
      type: Boolean,
      default: !0
    }
  },
  emits: [
    "progress",
    "open",
    "close",
    "drag",
    "start-drag",
    "stop-drag"
  ],
  setup(e, { emit: s }) {
    const d = e, m = typeof document < "u", a = i(50), r = i(null), g = i(null), f = i(!1), v = i(!1), l = i(0), n = i(0), u = i(d.maxDistance), w = 50, y = i(!0), L = A(() => T(n.value / u.value, 0, 1));
    h(n, () => {
      f.value || (v.value = n.value > w);
    });
    const { animatedProgress: x } = j({
      progress: L,
      duration: 250
    });
    h(x, () => {
      s("progress", x.value);
    }), h(v, () => {
      v.value ? s("close") : s("open"), v.value ? l.value = u.value : l.value = 0;
    }), H(() => {
      window.addEventListener("mouseup", () => P(), { passive: !0 }), window.addEventListener("mousemove", b, { passive: !0 });
    }), k(() => {
      window.removeEventListener("click", () => {
      }), window.removeEventListener("mousemove", () => {
      }), window.removeEventListener("mouseup", () => {
      });
    });
    const p = (t) => {
      if (t.target instanceof Element && F(t.target, "data-ignore-drag"))
        return;
      s("start-drag"), document.documentElement.style.setProperty("overflow", "hidden");
      const o = t instanceof TouchEvent ? t.touches[0].clientY : t.clientY;
      l.value = o + (v.value ? u.value : 0), f.value = !0;
    }, P = () => {
      document.documentElement.style.removeProperty("overflow"), f.value && (v.value ? n.value < u.value - w ? n.value = 0 : n.value = u.value : n.value >= w ? n.value = u.value : n.value = 0, l.value = n.value, f.value = !1, s("stop-drag"));
    }, b = (t) => {
      if (!f.value)
        return;
      s("drag");
      const o = t instanceof TouchEvent ? t.touches[0].clientY : t.clientY;
      n.value = q(
        l.value - o,
        0,
        u.value,
        u.value
      );
    }, M = A(() => {
      const t = {
        position: "fixed",
        willChange: "transform",
        left: 0,
        right: 0,
        transition: f.value || y.value ? "none" : "transform 0.2s ease-out"
      };
      return t.top = "100%", t.transform = `translateY(${(n.value + a.value) * -1}px)`, t;
    }), E = m ? new ResizeObserver((t) => {
      if (!r.value)
        return;
      const { blockSize: o } = t[0].borderBoxSize[0], c = window.innerHeight;
      g.value && (a.value = g.value.clientHeight), u.value = T(o, 0, c) - a.value, y.value && d.isOpen && (n.value = u.value);
    }) : null;
    return D(
      () => r.value ? E == null ? void 0 : E.observe(r.value) : null
    ), H(() => {
      setTimeout(() => y.value = !1, 1);
    }), (t, o) => (R(), N("div", {
      ref_key: "cardRef",
      ref: r,
      style: z(Y(M)),
      class: O([e.rootClass]),
      "data-modal-sheet": ""
    }, [
      C("div", $(t.$attrs, {
        style: { marginTop: "0px !important", touchAction: "none" },
        onTouchend: o[2] || (o[2] = () => P()),
        onTouchmovePassive: b,
        onMousedown: o[3] || (o[3] = (c) => e.dragEntireCard ? p(c) : null),
        onTouchstartPassive: o[4] || (o[4] = (c) => e.dragEntireCard ? p(c) : null)
      }), [
        C("div", {
          ref_key: "handleRef",
          ref: g,
          onMousedown: o[0] || (o[0] = (c) => e.dragEntireCard ? null : p(c)),
          onTouchstartPassive: o[1] || (o[1] = (c) => e.dragEntireCard ? null : p(c))
        }, [
          B(t.$slots, "handle", {}, () => [
            C("div", {
              style: {
                userSelect: "none",
                cursor: "move",
                height: "50px",
                position: "relative",
                width: "100%",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              },
              innerHTML: Y(I)
            }, null, 8, U)
          ])
        ], 544),
        B(t.$slots, "default")
      ], 16)
    ], 6));
  }
});
export {
  J as default
};
