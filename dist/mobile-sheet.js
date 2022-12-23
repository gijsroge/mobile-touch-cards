import { ref as u, watch as w, onUnmounted as H, watchEffect as N, defineComponent as F, onMounted as M, computed as C, openBlock as U, createElementBlock as V, normalizeStyle as G, unref as Y, normalizeClass as J, createElementVNode as L, mergeProps as Q, renderSlot as R } from "vue";
const x = (n, o, a) => Math.min(Math.max(n, o), a), X = (n, o, a) => {
  let s = n;
  if (n > a) {
    const t = s - a;
    s -= t * 0.6;
  }
  return n < o && (s -= s * 0.6), s;
}, Z = ({
  progress: n,
  duration: o
}) => {
  const a = u(n.value), s = u(null);
  w(n, (d, m) => t(m, d));
  const t = (d, m) => {
    const c = performance.now(), v = (r) => r * (2 - r), g = () => {
      const r = performance.now() - c, h = x(r / o, 0, 1);
      a.value = v(h) * (m - d) + d, h < 1 && (s.value = requestAnimationFrame(g));
    };
    s.value = requestAnimationFrame(g);
  };
  return H(() => {
    s.value && cancelAnimationFrame(s.value);
  }), { animatedProgress: a };
};
function _(n) {
  const o = u(!1);
  let a = null, s = null, t = null, d = null;
  const m = 9, c = () => {
    o.value = !0, a = document.activeElement, t == null || t.focus();
  }, v = () => {
    o.value = !1, a == null || a.focus();
  }, g = (r) => {
    if (o.value) {
      var h = r.key === "Tab" || r.keyCode === m;
      h && (r.shiftKey ? document.activeElement === t && (d == null || d.focus(), r.preventDefault()) : document.activeElement === d && (t == null || t.focus(), r.preventDefault()));
    }
  };
  return N(() => {
    n.value && (s = n.value.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    ), t = s[0], d = s[s.length - 1], n.value.addEventListener("keydown", g));
  }), H(() => {
    var r;
    return (r = n.value) == null ? void 0 : r.removeEventListener("keydown", g);
  }), { trap: c, release: v, isLocked: o };
}
const ee = `<svg width="70" height="3" viewBox="0 0 70 3" xmlns="http://www.w3.org/2000/svg">
<rect width="70" height="3" rx="3" fill="currentColor"/>
</svg>
`, te = ["aria-label"], ne = ["innerHTML"], ae = {
  inheritAttrs: !1
}, oe = /* @__PURE__ */ F({
  ...ae,
  __name: "mobile-sheet",
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
    },
    a11yWarnings: {
      type: Boolean,
      default: !0
    },
    ariaLabel: {
      type: String,
      default: "Open modal"
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
    const a = n, s = typeof document < "u", t = u(null), d = u(null), m = u(null), c = u(!1), v = u(a.maxDistance), g = u(a.handleHeight), r = u(!0), h = u(!1), P = u(0), i = u(0), p = u(!1), E = u(!1), { trap: O, release: $ } = _(d);
    M(() => {
      window.addEventListener("click", (e) => j(e), {
        passive: !0
      }), window.addEventListener("mouseup", () => S(), { passive: !0 }), window.addEventListener("mousemove", B, { passive: !0 }), window.addEventListener("keydown", (e) => {
        e.key === "Escape" && y();
      });
    }), H(() => {
      window.removeEventListener("mousemove", () => {
      }), window.removeEventListener("mouseup", () => {
      }), window.removeEventListener("keydown", () => y);
    });
    const z = () => {
      c.value || (i.value = v.value, o("open"));
    }, y = () => {
      c.value || (i.value = 0, o("close"));
    }, I = () => {
      p.value ? y() : z();
    }, j = (e) => {
      t.value && (t.value.contains(e.target) || y());
    }, b = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest("[data-ignore-drag]"))
        return;
      h.value = !0;
      const l = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      P.value = l + i.value, o("start-drag");
    };
    let D = 0;
    const T = u(!1), B = (e) => {
      if (!h.value)
        return;
      const l = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      T.value || (D = l), T.value = !0, Math.abs(D - l) > 2 && (c.value = !0), c.value && (i.value = X(P.value - l, 0, v.value), o("drag", i.value));
    }, S = async () => {
      await new Promise((e) => setTimeout(e, 10)), h.value = !1, c.value = !1, T.value = !1, p.value ? i.value < v.value - a.thresHold ? i.value = 0 : i.value = v.value : i.value >= a.thresHold ? i.value = v.value : i.value = 0, o("stop-drag");
    }, q = C(() => {
      const e = {
        position: "fixed",
        willChange: "transform",
        left: 0,
        right: 0,
        transition: c.value || r.value ? "none" : "transform 0.2s ease-out"
      };
      return e.top = "100%", e.transform = `translateY(${(i.value + g.value) * -1}px)`, e;
    }), k = s ? new ResizeObserver((e) => {
      if (!t.value)
        return;
      const { blockSize: l } = e[0].borderBoxSize[0], f = window.innerHeight;
      m.value && (g.value = m.value.clientHeight), v.value = x(l, 0, f) - g.value, r.value && a.open && (i.value = v.value);
    }) : null, K = () => {
      if (!t.value || !a.a11yWarnings)
        return;
      const e = t.value.getAttribute("aria-labelledby");
      e ? document.getElementById(e) || console.warn(
        `[mobile-sheet.js] The aria labelledby "${e}" is not pointing to a valid element inside the mobile sheet content`
      ) : console.warn(
        "[mobile-sheet.js] The <mobile-sheet> element should have an aria-labelledby attribute that points to the id of a title element inside the content"
      );
    };
    M(() => {
      setTimeout(() => r.value = !1, 1);
    });
    const W = C(() => x(i.value / v.value, 0, 1)), { animatedProgress: A } = Z({
      progress: W,
      duration: 250
    });
    return C(() => p.value ? 0 : -1), w(A, () => {
      o("progress", A.value);
    }), w(p, () => {
      p.value ? O() : $();
    }), w(E, () => {
      E.value ? document.documentElement.style.setProperty("overflow", "hidden") : document.documentElement.style.removeProperty("overflow");
    }), w(c, () => E.value = c.value || p.value), w(i, () => {
      c.value || (p.value = i.value > a.thresHold);
    }), N(() => {
      t.value && (k == null || k.observe(t.value), K());
    }), (e, l) => (U(), V("div", {
      ref_key: "cardRef",
      ref: t,
      style: G(Y(q)),
      class: J([n.rootClass]),
      "data-modal-sheet": "",
      "aria-modal": "true",
      role: "dialog"
    }, [
      L("div", Q({
        ref_key: "innerCardRef",
        ref: d
      }, e.$attrs, {
        style: { marginTop: "0px !important", touchAction: "none" },
        onTouchend: l[2] || (l[2] = () => S()),
        onTouchmovePassive: B,
        onMousedown: l[3] || (l[3] = (f) => n.dragEntireCard ? b(f) : null),
        onTouchstartPassive: l[4] || (l[4] = (f) => n.dragEntireCard ? b(f) : null)
      }), [
        L("button", {
          ref_key: "handleRef",
          ref: m,
          onClick: I,
          onMousedown: l[0] || (l[0] = (f) => n.dragEntireCard ? null : b(f)),
          onTouchstartPassive: l[1] || (l[1] = (f) => n.dragEntireCard ? null : b(f)),
          "aria-label": n.ariaLabel
        }, [
          R(e.$slots, "handle", {}, () => [
            L("div", {
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
              innerHTML: Y(ee)
            }, null, 8, ne)
          ])
        ], 40, te),
        R(e.$slots, "default")
      ], 16)
    ], 6));
  }
});
export {
  oe as default
};
