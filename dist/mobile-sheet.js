import { ref as n, watch as w, onUnmounted as P, watchEffect as A, defineComponent as ae, onMounted as U, computed as S, openBlock as oe, createElementBlock as se, normalizeStyle as re, unref as G, normalizeClass as ie, createElementVNode as B, mergeProps as ue, createTextVNode as de, toDisplayString as ce, renderSlot as J } from "vue";
const E = (o, r, l) => Math.min(Math.max(o, r), l), ve = (o, r, l) => {
  let i = o;
  if (o > l) {
    const a = i - l;
    i -= a * 0.6;
  }
  return o < r && (i -= i * 0.6), i;
}, fe = ({
  progress: o,
  duration: r
}) => {
  const l = n(o.value), i = n(null);
  w(o, (v, m) => a(m, v));
  const a = (v, m) => {
    const f = performance.now(), g = (s) => s * (2 - s), d = () => {
      const s = performance.now() - f, p = E(s / r, 0, 1);
      l.value = g(p) * (m - v) + v, p < 1 && (i.value = requestAnimationFrame(d));
    };
    i.value = requestAnimationFrame(d);
  };
  return P(() => {
    i.value && cancelAnimationFrame(i.value);
  }), { animatedProgress: l };
};
function me(o) {
  const r = n(!1);
  let l = null, i = null, a = null, v = null;
  const m = 9, f = () => {
    r.value = !0, l = document.activeElement, a == null || a.focus();
  }, g = () => {
    r.value = !1, l == null || l.focus();
  }, d = (s) => {
    if (r.value) {
      var p = s.key === "Tab" || s.keyCode === m;
      p && (s.shiftKey ? document.activeElement === a && (v == null || v.focus(), s.preventDefault()) : document.activeElement === v && (a == null || a.focus(), s.preventDefault()));
    }
  };
  return A(() => {
    o.value && (i = o.value.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    ), a = i[0], v = i[i.length - 1], o.value.addEventListener("keydown", d));
  }), P(() => {
    var s;
    return (s = o.value) == null ? void 0 : s.removeEventListener("keydown", d);
  }), { trap: f, release: g, isLocked: r };
}
const ge = `<svg width="70" height="3" viewBox="0 0 70 3" xmlns="http://www.w3.org/2000/svg">
<rect width="70" height="3" rx="3" fill="currentColor"/>
</svg>
`, pe = ["aria-label"], he = ["innerHTML"], we = {
  inheritAttrs: !1
}, be = /* @__PURE__ */ ae({
  ...we,
  __name: "mobile-sheet",
  props: {
    closeAble: {
      type: Boolean,
      default: !0
    },
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
  setup(o, { emit: r }) {
    const l = o, i = typeof document < "u", a = n(null), v = n(null), m = n(null), f = n(!1), g = n(!1), d = n(l.maxDistance), s = n(l.handleHeight), p = n(!0), C = n(!1), Y = n(0), k = n(0), u = n(0), h = n(!1), M = n(!1), R = n(0), D = n(0), x = n(1), b = n(null), $ = n(null), { trap: Q, release: X } = me(v);
    U(() => {
      window.addEventListener("click", (e) => _(e), {
        passive: !0
      }), window.addEventListener("mouseup", () => j(), { passive: !0 }), window.addEventListener("mousemove", I, { passive: !0 }), window.addEventListener("keydown", (e) => {
        e.key === "Escape" && y();
      });
    }), P(() => {
      window.removeEventListener("mousemove", () => {
      }), window.removeEventListener("mouseup", () => {
      }), window.removeEventListener("keydown", () => y);
    });
    const z = ({ force: e } = { force: null }) => {
      setTimeout(() => {
        !f.value && e !== null && !e || (u.value = d.value);
      });
    }, y = ({ force: e } = { force: null }) => {
      !f.value && e !== null && !e || (u.value = 0);
    }, Z = () => {
      f.value || (h.value ? y() : z());
    }, _ = (e) => {
      a.value && (a.value.contains(e.target) || y());
    }, N = () => {
      R.value = new Date().getTime();
    }, T = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest("[data-ignore-drag]"))
        return;
      x.value = 1, C.value = !0, g.value = !0;
      const t = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      Y.value = t + u.value, N(), r("start-drag");
    };
    let O = 0;
    const L = n(!1), I = (e) => {
      if (!C.value)
        return;
      const t = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      L.value || (O = t), L.value = !0, D.value = Math.abs(O - t), D.value > 2 && (f.value = !0), f.value && (k.value !== t && (b.value = t > k.value ? "down" : "up"), $.value !== b.value && N(), k.value = t, $.value = b.value, u.value = ve(Y.value - t, 0, d.value), r("drag", u.value));
    }, j = async () => {
      await new Promise((c) => setTimeout(c, 10)), C.value = !1, f.value = !1, setTimeout(() => g.value = !1, 300), L.value = !1;
      const t = new Date().getTime() - R.value;
      x.value = D.value / t * 1, b.value === "up" ? u.value >= l.thresHold ? u.value = d.value : u.value = 0 : u.value < d.value - l.thresHold ? u.value = 0 : u.value = d.value, r("stop-drag");
    }, ee = S(() => {
      const e = g.value ? "ease-out" : "cubic-bezier(0.65, 0, 0.35, 1)", t = {
        position: "fixed",
        willChange: "transform",
        left: 0,
        right: 0,
        transition: f.value || p.value ? "none" : `transform ${le.value}s ${e}`
      };
      t.top = "100%";
      let c = l.closeAble ? 0 : s.value;
      return h.value && (c = s.value), t.transform = `translateY(${(u.value + c) * -1}px)`, t;
    }), H = i ? new ResizeObserver((e) => {
      var V, F, K, W;
      if (!a.value)
        return;
      let t = (V = e[0]) != null && V.borderBoxSize ? (K = (F = e[0]) == null ? void 0 : F.borderBoxSize[0]) == null ? void 0 : K.blockSize : null;
      t || (t = (W = e[0]) == null ? void 0 : W.contentRect.height);
      const c = window.innerHeight;
      m.value && (s.value = m.value.clientHeight), d.value = E(t, 0, c) - s.value, p.value && l.open && (u.value = d.value);
    }) : null, te = () => {
      if (!a.value || !l.a11yWarnings)
        return;
      const e = a.value.getAttribute("aria-labelledby");
      e ? document.getElementById(e) || console.warn(
        `[mobile-sheet.js] The aria labelledby "${e}" is not pointing to a valid element inside the mobile sheet content`
      ) : console.warn(
        "[mobile-sheet.js] The <mobile-sheet> element should have an aria-labelledby attribute that points to the id of a title element inside the content"
      );
    };
    w(
      () => l.open,
      (e) => {
        e ? z({ force: !0 }) : y({ force: !0 });
      }
    ), U(() => {
      setTimeout(() => p.value = !1, 1);
    });
    const ne = S(() => E(u.value / d.value, 0, 1)), le = S(() => E(0.4 / x.value, 0.05, 0.2).toFixed(2)), { animatedProgress: q } = fe({
      progress: ne,
      duration: 250
    });
    return w(q, () => {
      r("progress", q.value);
    }), w(h, () => {
      h.value ? (r("open"), Q()) : (r("close"), X());
    }), w(M, (e) => {
      e ? document.documentElement.style.setProperty("overflow", "hidden") : document.documentElement.style.removeProperty("overflow");
    }), A(() => {
      M.value = f.value || h.value;
    }), w(u, () => {
      f.value || (h.value = u.value > l.thresHold);
    }), A(() => {
      a.value && (H == null || H.observe(a.value), te());
    }), (e, t) => (oe(), se("div", {
      ref_key: "cardRef",
      ref: a,
      style: re(G(ee)),
      class: ie([o.rootClass]),
      "data-modal-sheet": "",
      "aria-modal": "true",
      role: "dialog"
    }, [
      B("div", ue({
        ref_key: "innerCardRef",
        ref: v
      }, e.$attrs, {
        style: { marginTop: "0px !important", touchAction: "none" },
        onTouchend: t[2] || (t[2] = () => j()),
        onTouchmovePassive: I,
        onMousedown: t[3] || (t[3] = (c) => o.dragEntireCard ? T(c) : null),
        onTouchstartPassive: t[4] || (t[4] = (c) => o.dragEntireCard ? T(c) : null)
      }), [
        B("button", {
          ref_key: "handleRef",
          ref: m,
          onClick: Z,
          onMousedown: t[0] || (t[0] = (c) => o.dragEntireCard ? null : T(c)),
          onTouchstartPassive: t[1] || (t[1] = (c) => o.dragEntireCard ? null : T(c)),
          "aria-label": o.ariaLabel
        }, [
          de(ce(g.value) + " ", 1),
          J(e.$slots, "handle", {}, () => [
            B("div", {
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
              innerHTML: G(ge)
            }, null, 8, he)
          ])
        ], 40, pe),
        J(e.$slots, "default")
      ], 16)
    ], 6));
  }
});
export {
  be as default
};
