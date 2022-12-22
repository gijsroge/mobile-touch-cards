import { ref as i, watch as y, onUnmounted as k, watchEffect as B, defineComponent as j, onMounted as Y, computed as R, openBlock as F, createElementBlock as U, normalizeStyle as V, unref as S, normalizeClass as G, createElementVNode as T, mergeProps as J, renderSlot as A } from "vue";
const b = (t, s, a) => Math.min(Math.max(t, s), a), Q = (t, s, a) => {
  let l = t;
  if (t > a) {
    const n = l - a;
    l -= n * 0.6;
  }
  return t < s && (l -= l * 0.6), l;
}, W = ({
  progress: t,
  duration: s
}) => {
  const a = i(t.value), l = i(null);
  y(t, (d, g) => n(g, d));
  const n = (d, g) => {
    const v = performance.now(), c = (r) => r * (2 - r), m = () => {
      const r = performance.now() - v, p = b(r / s, 0, 1);
      a.value = c(p) * (g - d) + d, p < 1 && (l.value = requestAnimationFrame(m));
    };
    l.value = requestAnimationFrame(m);
  };
  return k(() => {
    l.value && cancelAnimationFrame(l.value);
  }), { animatedProgress: a };
};
function X(t) {
  const s = i(!1);
  let a = null, l = null, n = null, d = null;
  const g = 9, v = () => {
    s.value = !0, a = document.activeElement, n == null || n.focus();
  }, c = () => {
    s.value = !1, a == null || a.focus();
  }, m = (r) => {
    if (s.value) {
      var p = r.key === "Tab" || r.keyCode === g;
      p && (r.shiftKey ? document.activeElement === n && (d == null || d.focus(), r.preventDefault()) : document.activeElement === d && (n == null || n.focus(), r.preventDefault()));
    }
  };
  return B(() => {
    t.value && (console.log(t.value), l = t.value.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    ), n = l[0], d = l[l.length - 1], t.value.addEventListener("keydown", m));
  }), k(() => {
    var r;
    return (r = t.value) == null ? void 0 : r.removeEventListener("keydown", m);
  }), { trap: v, release: c, isLocked: s };
}
const Z = `<svg width="70" height="3" viewBox="0 0 70 3" xmlns="http://www.w3.org/2000/svg">
<rect width="70" height="3" rx="3" fill="currentColor"/>
</svg>
`, _ = ["innerHTML"], ee = {
  inheritAttrs: !1
}, ne = /* @__PURE__ */ j({
  ...ee,
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
    open: {
      type: Boolean,
      default: !1
    },
    dragEntireCard: {
      type: Boolean,
      default: !0
    },
    thresHold: {
      type: Number,
      default: 50
    },
    handleHeight: {
      type: Number,
      default: 50
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
  setup(t, { emit: s }) {
    const a = t, l = typeof document < "u", n = i(null), d = i(null), g = i(null), v = i(!1), c = i(a.maxDistance), m = i(a.handleHeight), r = i(!0), p = i(!1), x = i(0), u = i(0), h = i(!1), { trap: N, release: z } = X(d);
    Y(() => {
      window.addEventListener("click", (e) => q(e), {
        passive: !0
      }), window.addEventListener("mouseup", () => P(), { passive: !0 }), window.addEventListener("mousemove", L, { passive: !0 });
    }), k(() => {
      window.removeEventListener("mousemove", () => {
      }), window.removeEventListener("mouseup", () => {
      });
    });
    const O = () => {
      v.value || (u.value = c.value, s("open"));
    }, H = () => {
      v.value || (u.value = 0, s("close"));
    }, $ = () => {
      h.value ? H() : O();
    }, q = (e) => {
      n.value && (n.value.contains(e.target) || H());
    }, w = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest("[data-ignore-drag]"))
        return;
      p.value = !0;
      const o = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      x.value = o + u.value, s("start-drag");
    };
    let D = 0;
    const C = i(!1), L = (e) => {
      if (!p.value)
        return;
      const o = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      C.value || (D = o), C.value = !0, Math.abs(D - o) > 2 && (v.value = !0), u.value = Q(x.value - o, 0, c.value), s("drag", u.value);
    }, P = async () => {
      await new Promise((e) => setTimeout(e, 10)), p.value = !1, v.value = !1, C.value = !1, h.value ? u.value < c.value - a.thresHold ? u.value = 0 : u.value = c.value : u.value >= a.thresHold ? u.value = c.value : u.value = 0, s("stop-drag");
    }, I = R(() => {
      const e = {
        position: "fixed",
        willChange: "transform",
        left: 0,
        right: 0,
        transition: v.value || r.value ? "none" : "transform 0.2s ease-out"
      };
      return e.top = "100%", e.transform = `translateY(${(u.value + m.value) * -1}px)`, e;
    }), E = l ? new ResizeObserver((e) => {
      if (!n.value)
        return;
      const { blockSize: o } = e[0].borderBoxSize[0], f = window.innerHeight;
      g.value && (m.value = g.value.clientHeight), c.value = b(o, 0, f) - m.value, r.value && a.open && (u.value = c.value);
    }) : null;
    Y(() => {
      setTimeout(() => r.value = !1, 1);
    });
    const K = R(() => b(u.value / c.value, 0, 1)), { animatedProgress: M } = W({
      progress: K,
      duration: 250
    });
    return y(M, () => {
      s("progress", M.value);
    }), y(h, () => h.value ? N() : z()), y(u, () => {
      v.value || (h.value = u.value > a.thresHold);
    }), B(() => {
      n.value && (E == null || E.observe(n.value));
    }), (e, o) => (F(), U("div", {
      ref_key: "cardRef",
      ref: n,
      style: V(S(I)),
      class: G([t.rootClass]),
      "data-modal-sheet": ""
    }, [
      T("div", J({
        ref_key: "innerCardRef",
        ref: d
      }, e.$attrs, {
        style: { marginTop: "0px !important", touchAction: "none" },
        onTouchend: o[2] || (o[2] = () => P()),
        onTouchmovePassive: L,
        onMousedown: o[3] || (o[3] = (f) => t.dragEntireCard ? w(f) : null),
        onTouchstartPassive: o[4] || (o[4] = (f) => t.dragEntireCard ? w(f) : null)
      }), [
        T("div", {
          ref_key: "handleRef",
          ref: g,
          onClick: $,
          onMousedown: o[0] || (o[0] = (f) => t.dragEntireCard ? null : w(f)),
          onTouchstartPassive: o[1] || (o[1] = (f) => t.dragEntireCard ? null : w(f))
        }, [
          A(e.$slots, "handle", {}, () => [
            T("div", {
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
              innerHTML: S(Z)
            }, null, 8, _)
          ])
        ], 544),
        A(e.$slots, "default")
      ], 16)
    ], 6));
  }
});
export {
  ne as default
};
