import { ref as r, watch as p, defineComponent as k, computed as A, onMounted as H, onUnmounted as D, watchEffect as R, openBlock as N, createElementBlock as z, normalizeStyle as O, unref as Y, normalizeClass as $, createElementVNode as x, mergeProps as q, renderSlot as B } from "vue";
const T = (e, a, i) => Math.min(Math.max(e, a), i), F = (e, a, i, m) => {
  let s = e;
  if (e > i) {
    const u = s - m;
    s -= u * 0.6;
  }
  return e < a && (s -= s * 0.6), s;
}, j = (e, a) => {
  for (; e.parentNode; )
    return e = e.parentNode, e.hasAttribute(a) ? e : null;
}, I = ({
  progress: e,
  duration: a
}) => {
  const i = r(e.value);
  p(e, (s, u) => m(u, s));
  const m = (s, u) => {
    const c = performance.now(), f = (n) => n * (2 - n), v = () => {
      const n = performance.now() - c, l = T(n / a, 0, 1);
      i.value = f(l) * (u - s) + s, l < 1 && requestAnimationFrame(v);
    };
    requestAnimationFrame(v);
  };
  return { animatedProgress: i };
}, U = `<svg width="70" height="3" viewBox="0 0 70 3" xmlns="http://www.w3.org/2000/svg">
<rect width="70" height="3" rx="3" fill="currentColor"/>
</svg>
`, V = ["innerHTML"], G = {
  inheritAttrs: !1
}, K = /* @__PURE__ */ k({
  ...G,
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
  setup(e, { emit: a }) {
    const i = e, m = typeof document < "u", s = r(null), u = r(null), c = r(!1), f = r(!1), v = r(0), n = r(0), l = r(i.maxDistance), h = 50, w = r(50), y = r(!0), E = r(0), L = A(() => T(n.value / l.value, 0, 1));
    p(n, () => {
      c.value || (f.value = n.value > h);
    });
    const { animatedProgress: M } = I({
      progress: L,
      duration: 250
    });
    p(M, () => {
      a("progress", M.value);
    }), p(f, () => {
      f.value ? a("close") : a("open"), f.value ? (v.value = l.value, document.documentElement.style.setProperty("overflow", "hidden")) : (v.value = 0, document.documentElement.style.removeProperty("overflow"));
    }), H(() => {
      window.addEventListener("mouseup", () => P(), { passive: !0 }), window.addEventListener("mousemove", b, { passive: !0 });
    }), D(() => {
      window.removeEventListener("click", () => {
      }), window.removeEventListener("mousemove", () => {
      }), window.removeEventListener("mouseup", () => {
      });
    });
    const g = (t) => {
      if (t.target instanceof Element && j(t.target, "data-ignore-drag"))
        return;
      E.value = 0;
      const o = t instanceof TouchEvent ? t.touches[0].clientY : t.clientY;
      v.value = o + (f.value ? l.value : 0), c.value = !0, a("start-drag"), console.log("start drag");
    }, P = () => {
      c.value && (f.value ? n.value < l.value - h ? n.value = 0 : n.value = l.value : n.value >= h ? n.value = l.value : n.value = 0, v.value = n.value, c.value = !1, a("stop-drag"), console.log("stop drag"));
    }, b = (t) => {
      if (!c.value)
        return;
      a("drag");
      const o = t instanceof TouchEvent ? t.touches[0].clientY : t.clientY;
      E.value = v.value - o, console.log("pixelsMoved", E.value), n.value = F(
        v.value - o,
        0,
        l.value,
        l.value
      ), console.log("while drag");
    }, S = A(() => {
      const t = {
        position: "fixed",
        willChange: "transform",
        left: 0,
        right: 0,
        transition: c.value || y.value ? "none" : "transform 0.2s ease-out"
      };
      return t.top = "100%", t.transform = `translateY(${(n.value + w.value) * -1}px)`, t;
    }), C = m ? new ResizeObserver((t) => {
      if (!s.value)
        return;
      const { blockSize: o } = t[0].borderBoxSize[0], d = window.innerHeight;
      u.value && (w.value = u.value.clientHeight), l.value = T(o, 0, d) - w.value, y.value && i.isOpen && (n.value = l.value);
    }) : null;
    return R(
      () => s.value ? C == null ? void 0 : C.observe(s.value) : null
    ), H(() => {
      setTimeout(() => y.value = !1, 1);
    }), (t, o) => (N(), z("div", {
      ref_key: "cardRef",
      ref: s,
      style: O(Y(S)),
      class: $([e.rootClass]),
      "data-modal-sheet": ""
    }, [
      x("div", q(t.$attrs, {
        style: { marginTop: "0px !important", touchAction: "none" },
        onTouchend: o[2] || (o[2] = () => P()),
        onTouchmovePassive: b,
        onMousedown: o[3] || (o[3] = (d) => e.dragEntireCard ? g(d) : null),
        onTouchstartPassive: o[4] || (o[4] = (d) => e.dragEntireCard ? g(d) : null)
      }), [
        x("div", {
          ref_key: "handleRef",
          ref: u,
          onMousedown: o[0] || (o[0] = (d) => e.dragEntireCard ? null : g(d)),
          onTouchstartPassive: o[1] || (o[1] = (d) => e.dragEntireCard ? null : g(d))
        }, [
          B(t.$slots, "handle", {}, () => [
            x("div", {
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
              innerHTML: Y(U)
            }, null, 8, V)
          ])
        ], 544),
        B(t.$slots, "default")
      ], 16)
    ], 6));
  }
});
export {
  K as default
};
