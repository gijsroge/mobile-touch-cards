import { ref as d, watch as y, onUnmounted as x, watchEffect as B, defineComponent as K, onMounted as A, computed as M, openBlock as j, createElementBlock as F, normalizeStyle as U, unref as Y, normalizeClass as V, createElementVNode as b, mergeProps as G, renderSlot as S } from "vue";
const C = (n, o, s) => Math.min(Math.max(n, o), s), J = (n, o, s) => {
  let l = n;
  if (n > s) {
    const t = l - s;
    l -= t * 0.6;
  }
  return n < o && (l -= l * 0.6), l;
}, Q = ({
  progress: n,
  duration: o
}) => {
  const s = d(n.value), l = d(null);
  y(n, (i, c) => t(c, i));
  const t = (i, c) => {
    const v = performance.now(), m = (r) => r * (2 - r), g = () => {
      const r = performance.now() - v, p = C(r / o, 0, 1);
      s.value = m(p) * (c - i) + i, p < 1 && (l.value = requestAnimationFrame(g));
    };
    l.value = requestAnimationFrame(g);
  };
  return x(() => {
    l.value && cancelAnimationFrame(l.value);
  }), { animatedProgress: s };
};
function W(n) {
  const o = d(!1);
  let s = document.activeElement, l = null, t = null, i = null;
  const c = 9, v = () => {
    o.value = !0, s = document.activeElement, t == null || t.focus();
  }, m = () => {
    o.value = !1, s.focus();
  }, g = (r) => {
    if (o.value) {
      var p = r.key === "Tab" || r.keyCode === c;
      p && (r.shiftKey ? document.activeElement === t && (i == null || i.focus(), r.preventDefault()) : document.activeElement === i && (t == null || t.focus(), r.preventDefault()));
    }
  };
  return B(() => {
    n.value && (l = n.value.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    ), t = l[0], i = l[l.length - 1], n.value.addEventListener("keydown", g));
  }), x(() => {
    var r;
    return (r = n.value) == null ? void 0 : r.removeEventListener("keydown", g);
  }), { trap: v, release: m, isLocked: o };
}
const X = `<svg width="70" height="3" viewBox="0 0 70 3" xmlns="http://www.w3.org/2000/svg">
<rect width="70" height="3" rx="3" fill="currentColor"/>
</svg>
`, Z = ["innerHTML"], _ = {
  inheritAttrs: !1
}, te = /* @__PURE__ */ K({
  ..._,
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
  setup(n, { emit: o }) {
    const s = n, l = typeof document < "u", t = d(null), i = d(null), c = d(!1), v = d(s.maxDistance), m = d(s.handleHeight), g = d(!0), r = d(!1), p = d(0), u = d(0), h = d(!1), { trap: R, release: N } = W(t);
    A(() => {
      window.addEventListener("click", (e) => $(e), {
        passive: !0
      }), window.addEventListener("mouseup", () => L(), { passive: !0 }), window.addEventListener("mousemove", D, { passive: !0 });
    }), x(() => {
      window.removeEventListener("mousemove", () => {
      }), window.removeEventListener("mouseup", () => {
      });
    });
    const z = () => {
      c.value || (u.value = v.value, o("open"));
    }, k = () => {
      c.value || (u.value = 0, o("close"));
    }, O = () => {
      h.value ? k() : z();
    }, $ = (e) => {
      t.value && (t.value.contains(e.target) || k());
    }, w = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest("[data-ignore-drag]"))
        return;
      r.value = !0;
      const a = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      p.value = a + u.value, o("start-drag");
    };
    let H = 0;
    const E = d(!1), D = (e) => {
      if (!r.value)
        return;
      const a = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      E.value || (H = a), E.value = !0, Math.abs(H - a) > 2 && (c.value = !0), u.value = J(p.value - a, 0, v.value), o("drag", u.value);
    }, L = async () => {
      await new Promise((e) => setTimeout(e, 10)), r.value = !1, c.value = !1, E.value = !1, h.value ? u.value < v.value - s.thresHold ? u.value = 0 : u.value = v.value : u.value >= s.thresHold ? u.value = v.value : u.value = 0, o("stop-drag");
    }, q = M(() => {
      const e = {
        position: "fixed",
        willChange: "transform",
        left: 0,
        right: 0,
        transition: c.value || g.value ? "none" : "transform 0.2s ease-out"
      };
      return e.top = "100%", e.transform = `translateY(${(u.value + m.value) * -1}px)`, e;
    }), T = l ? new ResizeObserver((e) => {
      if (!t.value)
        return;
      const { blockSize: a } = e[0].borderBoxSize[0], f = window.innerHeight;
      i.value && (m.value = i.value.clientHeight), v.value = C(a, 0, f) - m.value, g.value && s.open && (u.value = v.value);
    }) : null;
    A(() => {
      setTimeout(() => g.value = !1, 1);
    });
    const I = M(() => C(u.value / v.value, 0, 1)), { animatedProgress: P } = Q({
      progress: I,
      duration: 250
    });
    return y(P, () => {
      o("progress", P.value);
    }), y(h, () => h.value ? R() : N()), y(u, () => {
      c.value || (h.value = u.value > s.thresHold);
    }), B(() => {
      t.value && (T == null || T.observe(t.value));
    }), (e, a) => (j(), F("div", {
      ref_key: "cardRef",
      ref: t,
      style: U(Y(q)),
      class: V([n.rootClass]),
      "data-modal-sheet": ""
    }, [
      b("div", G(e.$attrs, {
        style: { marginTop: "0px !important", touchAction: "none" },
        onTouchend: a[2] || (a[2] = () => L()),
        onTouchmovePassive: D,
        onMousedown: a[3] || (a[3] = (f) => n.dragEntireCard ? w(f) : null),
        onTouchstartPassive: a[4] || (a[4] = (f) => n.dragEntireCard ? w(f) : null)
      }), [
        b("div", {
          ref_key: "handleRef",
          ref: i,
          onClick: O,
          onMousedown: a[0] || (a[0] = (f) => n.dragEntireCard ? null : w(f)),
          onTouchstartPassive: a[1] || (a[1] = (f) => n.dragEntireCard ? null : w(f))
        }, [
          S(e.$slots, "handle", {}, () => [
            b("div", {
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
              innerHTML: Y(X)
            }, null, 8, Z)
          ])
        ], 544),
        S(e.$slots, "default")
      ], 16)
    ], 6));
  }
});
export {
  te as default
};
