import { ref as i, watch as w, onUnmounted as x, watchEffect as N, defineComponent as F, onMounted as Y, computed as R, openBlock as U, createElementBlock as V, normalizeStyle as G, unref as A, normalizeClass as J, createElementVNode as T, mergeProps as Q, renderSlot as B } from "vue";
const k = (t, l, a) => Math.min(Math.max(t, l), a), W = (t, l, a) => {
  let s = t;
  if (t > a) {
    const n = s - a;
    s -= n * 0.6;
  }
  return t < l && (s -= s * 0.6), s;
}, X = ({
  progress: t,
  duration: l
}) => {
  const a = i(t.value), s = i(null);
  w(t, (d, g) => n(g, d));
  const n = (d, g) => {
    const c = performance.now(), v = (r) => r * (2 - r), m = () => {
      const r = performance.now() - c, p = k(r / l, 0, 1);
      a.value = v(p) * (g - d) + d, p < 1 && (s.value = requestAnimationFrame(m));
    };
    s.value = requestAnimationFrame(m);
  };
  return x(() => {
    s.value && cancelAnimationFrame(s.value);
  }), { animatedProgress: a };
};
function Z(t) {
  const l = i(!1);
  let a = null, s = null, n = null, d = null;
  const g = 9, c = () => {
    l.value = !0, a = document.activeElement, n == null || n.focus();
  }, v = () => {
    l.value = !1, a == null || a.focus();
  }, m = (r) => {
    if (l.value) {
      var p = r.key === "Tab" || r.keyCode === g;
      p && (r.shiftKey ? document.activeElement === n && (d == null || d.focus(), r.preventDefault()) : document.activeElement === d && (n == null || n.focus(), r.preventDefault()));
    }
  };
  return N(() => {
    t.value && (console.log(t.value), s = t.value.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    ), n = s[0], d = s[s.length - 1], t.value.addEventListener("keydown", m));
  }), x(() => {
    var r;
    return (r = t.value) == null ? void 0 : r.removeEventListener("keydown", m);
  }), { trap: c, release: v, isLocked: l };
}
const _ = `<svg width="70" height="3" viewBox="0 0 70 3" xmlns="http://www.w3.org/2000/svg">
<rect width="70" height="3" rx="3" fill="currentColor"/>
</svg>
`, ee = ["aria-hidden"], te = ["innerHTML"], ne = {
  inheritAttrs: !1
}, oe = /* @__PURE__ */ F({
  ...ne,
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
  setup(t, { emit: l }) {
    const a = t, s = typeof document < "u", n = i(null), d = i(null), g = i(null), c = i(!1), v = i(a.maxDistance), m = i(a.handleHeight), r = i(!0), p = i(!1), H = i(0), u = i(0), h = i(!1), E = i(!1), { trap: z, release: O } = Z(d);
    Y(() => {
      window.addEventListener("click", (e) => I(e), {
        passive: !0
      }), window.addEventListener("mouseup", () => M(), { passive: !0 }), window.addEventListener("mousemove", L, { passive: !0 });
    }), x(() => {
      window.removeEventListener("mousemove", () => {
      }), window.removeEventListener("mouseup", () => {
      });
    });
    const $ = () => {
      c.value || (u.value = v.value, l("open"));
    }, D = () => {
      c.value || (u.value = 0, l("close"));
    }, q = () => {
      h.value ? D() : $();
    }, I = (e) => {
      n.value && (n.value.contains(e.target) || D());
    }, y = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest("[data-ignore-drag]"))
        return;
      p.value = !0;
      const o = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      H.value = o + u.value, l("start-drag");
    };
    let P = 0;
    const b = i(!1), L = (e) => {
      if (!p.value)
        return;
      const o = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      b.value || (P = o), b.value = !0, Math.abs(P - o) > 2 && (c.value = !0), u.value = W(H.value - o, 0, v.value), l("drag", u.value);
    }, M = async () => {
      await new Promise((e) => setTimeout(e, 10)), p.value = !1, c.value = !1, b.value = !1, h.value ? u.value < v.value - a.thresHold ? u.value = 0 : u.value = v.value : u.value >= a.thresHold ? u.value = v.value : u.value = 0, l("stop-drag");
    }, K = R(() => {
      const e = {
        position: "fixed",
        willChange: "transform",
        left: 0,
        right: 0,
        transition: c.value || r.value ? "none" : "transform 0.2s ease-out"
      };
      return e.top = "100%", e.transform = `translateY(${(u.value + m.value) * -1}px)`, e;
    }), C = s ? new ResizeObserver((e) => {
      if (!n.value)
        return;
      const { blockSize: o } = e[0].borderBoxSize[0], f = window.innerHeight;
      g.value && (m.value = g.value.clientHeight), v.value = k(o, 0, f) - m.value, r.value && a.open && (u.value = v.value);
    }) : null;
    Y(() => {
      setTimeout(() => r.value = !1, 1);
    });
    const j = R(() => k(u.value / v.value, 0, 1)), { animatedProgress: S } = X({
      progress: j,
      duration: 250
    });
    return w(S, () => {
      l("progress", S.value);
    }), w(h, () => {
      h.value ? z() : O();
    }), w(E, () => {
      E.value ? document.documentElement.style.setProperty("overflow", "hidden") : document.documentElement.style.removeProperty("overflow");
    }), w(c, () => E.value = c.value || h.value), w(u, () => {
      c.value || (h.value = u.value > a.thresHold);
    }), N(() => {
      n.value && (C == null || C.observe(n.value));
    }), (e, o) => (U(), V("div", {
      ref_key: "cardRef",
      ref: n,
      style: G(A(K)),
      class: J([t.rootClass]),
      "data-modal-sheet": "",
      role: "dialog",
      "aria-labelledby": "myDialog",
      "aria-hidden": !h.value
    }, [
      T("div", Q({
        ref_key: "innerCardRef",
        ref: d
      }, e.$attrs, {
        style: { marginTop: "0px !important", touchAction: "none" },
        onTouchend: o[2] || (o[2] = () => M()),
        onTouchmovePassive: L,
        onMousedown: o[3] || (o[3] = (f) => t.dragEntireCard ? y(f) : null),
        onTouchstartPassive: o[4] || (o[4] = (f) => t.dragEntireCard ? y(f) : null)
      }), [
        T("button", {
          ref_key: "handleRef",
          ref: g,
          onClick: q,
          onMousedown: o[0] || (o[0] = (f) => t.dragEntireCard ? null : y(f)),
          onTouchstartPassive: o[1] || (o[1] = (f) => t.dragEntireCard ? null : y(f))
        }, [
          B(e.$slots, "handle", {}, () => [
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
              innerHTML: A(_)
            }, null, 8, te)
          ])
        ], 544),
        B(e.$slots, "default")
      ], 16)
    ], 14, ee));
  }
});
export {
  oe as default
};
