import { ref as d, watch as y, onUnmounted as x, watchEffect as B, defineComponent as K, onMounted as M, computed as Y, openBlock as j, createElementBlock as F, normalizeStyle as U, unref as S, normalizeClass as V, createElementVNode as b, mergeProps as G, renderSlot as A } from "vue";
const C = (n, s, a) => Math.min(Math.max(n, s), a), J = (n, s, a) => {
  let l = n;
  if (n > a) {
    const t = l - a;
    l -= t * 0.6;
  }
  return n < s && (l -= l * 0.6), l;
}, Q = ({
  progress: n,
  duration: s
}) => {
  const a = d(n.value), l = d(null);
  y(n, (i, c) => t(c, i));
  const t = (i, c) => {
    const v = performance.now(), m = (r) => r * (2 - r), g = () => {
      const r = performance.now() - v, p = C(r / s, 0, 1);
      a.value = m(p) * (c - i) + i, p < 1 && (l.value = requestAnimationFrame(g));
    };
    l.value = requestAnimationFrame(g);
  };
  return x(() => {
    l.value && cancelAnimationFrame(l.value);
  }), { animatedProgress: a };
};
function W(n) {
  const s = d(!1);
  let a = null, l = null, t = null, i = null;
  const c = 9, v = () => {
    s.value = !0, a = document.activeElement, t == null || t.focus();
  }, m = () => {
    s.value = !1, a == null || a.focus();
  }, g = (r) => {
    if (s.value) {
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
  }), { trap: v, release: m, isLocked: s };
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
  setup(n, { emit: s }) {
    const a = n, l = typeof document < "u", t = d(null), i = d(null), c = d(!1), v = d(a.maxDistance), m = d(a.handleHeight), g = d(!0), r = d(!1), p = d(0), u = d(0), h = d(!1), { trap: R, release: N } = W(t);
    M(() => {
      window.addEventListener("click", (e) => $(e), {
        passive: !0
      }), window.addEventListener("mouseup", () => L(), { passive: !0 }), window.addEventListener("mousemove", D, { passive: !0 });
    }), x(() => {
      window.removeEventListener("mousemove", () => {
      }), window.removeEventListener("mouseup", () => {
      });
    });
    const z = () => {
      c.value || (u.value = v.value, s("open"));
    }, k = () => {
      c.value || (u.value = 0, s("close"));
    }, O = () => {
      h.value ? k() : z();
    }, $ = (e) => {
      t.value && (t.value.contains(e.target) || k());
    }, w = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest("[data-ignore-drag]"))
        return;
      r.value = !0;
      const o = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      p.value = o + u.value, s("start-drag");
    };
    let H = 0;
    const E = d(!1), D = (e) => {
      if (!r.value)
        return;
      const o = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      E.value || (H = o), E.value = !0, Math.abs(H - o) > 2 && (c.value = !0), u.value = J(p.value - o, 0, v.value), s("drag", u.value);
    }, L = async () => {
      await new Promise((e) => setTimeout(e, 10)), r.value = !1, c.value = !1, E.value = !1, h.value ? u.value < v.value - a.thresHold ? u.value = 0 : u.value = v.value : u.value >= a.thresHold ? u.value = v.value : u.value = 0, s("stop-drag");
    }, q = Y(() => {
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
      const { blockSize: o } = e[0].borderBoxSize[0], f = window.innerHeight;
      i.value && (m.value = i.value.clientHeight), v.value = C(o, 0, f) - m.value, g.value && a.open && (u.value = v.value);
    }) : null;
    M(() => {
      setTimeout(() => g.value = !1, 1);
    });
    const I = Y(() => C(u.value / v.value, 0, 1)), { animatedProgress: P } = Q({
      progress: I,
      duration: 250
    });
    return y(P, () => {
      s("progress", P.value);
    }), y(h, () => h.value ? R() : N()), y(u, () => {
      c.value || (h.value = u.value > a.thresHold);
    }), B(() => {
      t.value && (T == null || T.observe(t.value));
    }), (e, o) => (j(), F("div", {
      ref_key: "cardRef",
      ref: t,
      style: U(S(q)),
      class: V([n.rootClass]),
      "data-modal-sheet": ""
    }, [
      b("div", G(e.$attrs, {
        style: { marginTop: "0px !important", touchAction: "none" },
        onTouchend: o[2] || (o[2] = () => L()),
        onTouchmovePassive: D,
        onMousedown: o[3] || (o[3] = (f) => n.dragEntireCard ? w(f) : null),
        onTouchstartPassive: o[4] || (o[4] = (f) => n.dragEntireCard ? w(f) : null)
      }), [
        b("div", {
          ref_key: "handleRef",
          ref: i,
          onClick: O,
          onMousedown: o[0] || (o[0] = (f) => n.dragEntireCard ? null : w(f)),
          onTouchstartPassive: o[1] || (o[1] = (f) => n.dragEntireCard ? null : w(f))
        }, [
          A(e.$slots, "handle", {}, () => [
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
              innerHTML: S(X)
            }, null, 8, Z)
          ])
        ], 544),
        A(e.$slots, "default")
      ], 16)
    ], 6));
  }
});
export {
  te as default
};
