import { ref as n, watch as w, onUnmounted as P, watchEffect as A, defineComponent as oe, onMounted as U, computed as E, openBlock as se, createElementBlock as re, normalizeStyle as ie, unref as G, normalizeClass as ue, createElementVNode as S, mergeProps as ce, renderSlot as J } from "vue";
const C = (o, r, l) => Math.min(Math.max(o, r), l), de = (o, r, l) => {
  let i = o;
  if (o > l) {
    const a = i - l;
    i -= a * 0.6;
  }
  return o < r && (i -= i * 0.6), i;
}, ve = ({
  progress: o,
  duration: r
}) => {
  const l = n(o.value), i = n(null);
  w(o, (v, m) => a(m, v));
  const a = (v, m) => {
    const f = performance.now(), g = (s) => s * (2 - s), c = () => {
      const s = performance.now() - f, p = C(s / r, 0, 1);
      l.value = g(p) * (m - v) + v, p < 1 && (i.value = requestAnimationFrame(c));
    };
    i.value = requestAnimationFrame(c);
  };
  return P(() => {
    i.value && cancelAnimationFrame(i.value);
  }), { animatedProgress: l };
};
function fe(o) {
  const r = n(!1);
  let l = null, i = null, a = null, v = null;
  const m = 9, f = () => {
    r.value = !0, l = document.activeElement, a == null || a.focus();
  }, g = () => {
    r.value = !1, l == null || l.focus();
  }, c = (s) => {
    if (r.value) {
      var p = s.key === "Tab" || s.keyCode === m;
      p && (s.shiftKey ? document.activeElement === a && (v == null || v.focus(), s.preventDefault()) : document.activeElement === v && (a == null || a.focus(), s.preventDefault()));
    }
  };
  return A(() => {
    o.value && (i = o.value.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    ), a = i[0], v = i[i.length - 1], o.value.addEventListener("keydown", c));
  }), P(() => {
    var s;
    return (s = o.value) == null ? void 0 : s.removeEventListener("keydown", c);
  }), { trap: f, release: g, isLocked: r };
}
const me = `<svg width="70" height="3" viewBox="0 0 70 3" xmlns="http://www.w3.org/2000/svg">
<rect width="70" height="3" rx="3" fill="currentColor"/>
</svg>
`, ge = ["aria-label"], pe = ["innerHTML"], he = {
  inheritAttrs: !1
}, ye = /* @__PURE__ */ oe({
  ...he,
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
    const l = o, i = typeof document < "u", a = n(null), v = n(null), m = n(null), f = n(!1), g = n(!1), c = n(l.maxDistance), s = n(l.handleHeight), p = n(!0), k = n(!1), Y = n(0), D = n(0), u = n(0), h = n(!1), M = n(!1), R = n(0), L = n(0), x = n(1), b = n(null), z = n(null), { trap: Q, release: X } = fe(v);
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
    const $ = ({ force: e } = { force: null }) => {
      setTimeout(() => {
        !f.value && e !== null && !e || (u.value = c.value);
      });
    }, y = ({ force: e } = { force: null }) => {
      !f.value && e !== null && !e || (u.value = 0);
    }, Z = () => {
      f.value || (h.value ? y() : $());
    }, _ = (e) => {
      a.value && (a.value.contains(e.target) || y());
    }, O = () => {
      R.value = new Date().getTime();
    }, T = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest("[data-ignore-drag]"))
        return;
      x.value = 1, k.value = !0, g.value = !0;
      const t = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      Y.value = t + u.value, O(), r("start-drag");
    };
    let N = 0;
    const B = n(!1), I = (e) => {
      if (!k.value)
        return;
      const t = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      B.value || (N = t), B.value = !0, L.value = Math.abs(N - t), L.value > 2 && (f.value = !0), f.value && (D.value !== t && (b.value = t > D.value ? "down" : "up"), z.value !== b.value && O(), D.value = t, z.value = b.value, u.value = de(Y.value - t, 0, c.value), r("drag", u.value));
    }, j = async () => {
      await new Promise((d) => setTimeout(d, 10)), k.value = !1, f.value = !1, setTimeout(() => g.value = !1, 300), B.value = !1;
      const t = new Date().getTime() - R.value;
      x.value = L.value / t * 1, b.value === "up" ? u.value >= l.thresHold ? u.value = c.value : u.value = 0 : u.value < c.value - l.thresHold ? u.value = 0 : u.value = c.value, r("stop-drag");
    }, ee = E(() => {
      const e = g.value ? ae.value : "cubic-bezier(0.65, 0, 0.35, 1)", t = {
        position: "fixed",
        willChange: "transform",
        left: 0,
        right: 0,
        transition: f.value || p.value ? "none" : `transform ${le.value}s ${e}`
      };
      t.top = "100%";
      let d = l.closeAble ? 0 : s.value;
      return h.value && (d = s.value), t.transform = `translateY(${(u.value + d) * -1}px)`, t;
    }), H = i ? new ResizeObserver((e) => {
      var V, F, K, W;
      if (!a.value)
        return;
      let t = (V = e[0]) != null && V.borderBoxSize ? (K = (F = e[0]) == null ? void 0 : F.borderBoxSize[0]) == null ? void 0 : K.blockSize : null;
      t || (t = (W = e[0]) == null ? void 0 : W.contentRect.height);
      const d = window.innerHeight;
      m.value && (s.value = m.value.clientHeight), c.value = C(t, 0, d) - s.value, p.value && l.open && (u.value = c.value);
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
        e ? $({ force: !0 }) : y({ force: !0 });
      }
    ), U(() => {
      setTimeout(() => p.value = !1, 1);
    });
    const ne = E(() => C(u.value / c.value, 0, 1)), le = E(() => g.value ? 0.45 : 0.25), ae = E(() => `cubic-bezier(0.22, ${C(x.value, 1, 1.3).toFixed(
      2
    )}, 0.35, 1)`), { animatedProgress: q } = ve({
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
    }), (e, t) => (se(), re("div", {
      ref_key: "cardRef",
      ref: a,
      style: ie(G(ee)),
      class: ue([o.rootClass]),
      "data-modal-sheet": "",
      "aria-modal": "true",
      role: "dialog"
    }, [
      S("div", ce({
        ref_key: "innerCardRef",
        ref: v
      }, e.$attrs, {
        style: { marginTop: "0px !important", touchAction: "none" },
        onTouchend: t[2] || (t[2] = () => j()),
        onTouchmovePassive: I,
        onMousedown: t[3] || (t[3] = (d) => o.dragEntireCard ? T(d) : null),
        onTouchstartPassive: t[4] || (t[4] = (d) => o.dragEntireCard ? T(d) : null)
      }), [
        S("button", {
          ref_key: "handleRef",
          ref: m,
          onClick: Z,
          onMousedown: t[0] || (t[0] = (d) => o.dragEntireCard ? null : T(d)),
          onTouchstartPassive: t[1] || (t[1] = (d) => o.dragEntireCard ? null : T(d)),
          "aria-label": o.ariaLabel
        }, [
          J(e.$slots, "handle", {}, () => [
            S("div", {
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
              innerHTML: G(me)
            }, null, 8, pe)
          ])
        ], 40, ge),
        J(e.$slots, "default")
      ], 16)
    ], 6));
  }
});
export {
  ye as default
};
