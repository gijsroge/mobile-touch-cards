import { ref as a, watch as p, onUnmounted as P, watchEffect as U, defineComponent as ae, onMounted as K, computed as S, openBlock as le, createElementBlock as oe, normalizeStyle as se, unref as V, normalizeClass as re, createElementVNode as B, mergeProps as ie, renderSlot as W } from "vue";
const T = (l, s, o) => Math.min(Math.max(l, s), o), ue = (l, s, o) => {
  let r = l;
  if (l > o) {
    const n = r - o;
    r -= n * 0.6;
  }
  return l < s && (r -= r * 0.6), r;
}, de = ({
  progress: l,
  duration: s
}) => {
  const o = a(l.value), r = a(null);
  p(l, (d, m) => n(m, d));
  const n = (d, m) => {
    const c = performance.now(), v = (i) => i * (2 - i), g = () => {
      const i = performance.now() - c, h = T(i / s, 0, 1);
      o.value = v(h) * (m - d) + d, h < 1 && (r.value = requestAnimationFrame(g));
    };
    r.value = requestAnimationFrame(g);
  };
  return P(() => {
    r.value && cancelAnimationFrame(r.value);
  }), { animatedProgress: o };
};
function ce(l) {
  const s = a(!1);
  let o = null, r = null, n = null, d = null;
  const m = 9, c = () => {
    s.value = !0, o = document.activeElement, n == null || n.focus();
  }, v = () => {
    s.value = !1, o == null || o.focus();
  }, g = (i) => {
    if (s.value) {
      var h = i.key === "Tab" || i.keyCode === m;
      h && (i.shiftKey ? document.activeElement === n && (d == null || d.focus(), i.preventDefault()) : document.activeElement === d && (n == null || n.focus(), i.preventDefault()));
    }
  };
  return U(() => {
    l.value && (r = l.value.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    ), n = r[0], d = r[r.length - 1], l.value.addEventListener("keydown", g));
  }), P(() => {
    var i;
    return (i = l.value) == null ? void 0 : i.removeEventListener("keydown", g);
  }), { trap: c, release: v, isLocked: s };
}
const ve = `<svg width="70" height="3" viewBox="0 0 70 3" xmlns="http://www.w3.org/2000/svg">
<rect width="70" height="3" rx="3" fill="currentColor"/>
</svg>
`, fe = ["aria-label"], me = ["innerHTML"], ge = {
  inheritAttrs: !1
}, pe = /* @__PURE__ */ ae({
  ...ge,
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
  setup(l, { emit: s }) {
    const o = l, r = typeof document < "u", n = a(null), d = a(null), m = a(null), c = a(!1), v = a(o.maxDistance), g = a(o.handleHeight), i = a(!0), h = a(!1), Y = a(0), C = a(0), u = a(0), w = a(!1), k = a(!1), A = a(0), D = a(0), L = a(1), y = a(null), M = a(null), { trap: G, release: J } = ce(d);
    K(() => {
      window.addEventListener("click", (e) => Z(e), {
        passive: !0
      }), window.addEventListener("mouseup", () => N(), { passive: !0 }), window.addEventListener("mousemove", z, { passive: !0 }), window.addEventListener("keydown", (e) => {
        e.key === "Escape" && b();
      });
    }), P(() => {
      window.removeEventListener("mousemove", () => {
      }), window.removeEventListener("mouseup", () => {
      }), window.removeEventListener("keydown", () => b);
    });
    const Q = () => {
      c.value || (u.value = v.value, s("open"));
    }, b = () => {
      c.value || (u.value = 0, s("close"));
    }, X = () => {
      w.value ? b() : Q();
    }, Z = (e) => {
      n.value && (n.value.contains(e.target) || b());
    }, R = () => {
      A.value = new Date().getTime();
    }, E = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest("[data-ignore-drag]"))
        return;
      L.value = 1, h.value = !0;
      const t = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      Y.value = t + u.value, R(), s("start-drag");
    };
    let $ = 0;
    const x = a(!1), z = (e) => {
      if (!h.value)
        return;
      const t = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      x.value || ($ = t), x.value = !0, D.value = Math.abs($ - t), D.value > 2 && (c.value = !0), c.value && (C.value !== t && (y.value = t > C.value ? "down" : "up"), M.value !== y.value && R(), C.value = t, M.value = y.value, u.value = ue(Y.value - t, 0, v.value), s("drag", u.value));
    }, N = async () => {
      await new Promise((f) => setTimeout(f, 10)), h.value = !1, c.value = !1, x.value = !1;
      const t = new Date().getTime() - A.value;
      L.value = D.value / t * 1, y.value === "up" ? u.value >= o.thresHold ? u.value = v.value : u.value = 0 : u.value < v.value - o.thresHold ? u.value = 0 : u.value = v.value, s("stop-drag");
    }, _ = S(() => {
      const e = {
        position: "fixed",
        willChange: "transform",
        left: 0,
        right: 0,
        transition: c.value || i.value ? "none" : `transform ${ne.value}s ease-out`
      };
      return e.top = "100%", e.transform = `translateY(${(u.value + g.value) * -1}px)`, e;
    }), H = r ? new ResizeObserver((e) => {
      var I, j, q, F;
      if (!n.value)
        return;
      let t = (I = e[0]) != null && I.borderBoxSize ? (q = (j = e[0]) == null ? void 0 : j.borderBoxSize[0]) == null ? void 0 : q.blockSize : null;
      t || (t = (F = e[0]) == null ? void 0 : F.contentRect.height);
      const f = window.innerHeight;
      m.value && (g.value = m.value.clientHeight), v.value = T(t, 0, f) - g.value, i.value && o.open && (u.value = v.value);
    }) : null, ee = () => {
      if (!n.value || !o.a11yWarnings)
        return;
      const e = n.value.getAttribute("aria-labelledby");
      e ? document.getElementById(e) || console.warn(
        `[mobile-sheet.js] The aria labelledby "${e}" is not pointing to a valid element inside the mobile sheet content`
      ) : console.warn(
        "[mobile-sheet.js] The <mobile-sheet> element should have an aria-labelledby attribute that points to the id of a title element inside the content"
      );
    };
    K(() => {
      setTimeout(() => i.value = !1, 1);
    });
    const te = S(() => T(u.value / v.value, 0, 1)), ne = S(() => T(0.4 / L.value, 0.05, 0.2).toFixed(2)), { animatedProgress: O } = de({
      progress: te,
      duration: 250
    });
    return p(O, () => {
      s("progress", O.value);
    }), p(w, () => {
      w.value ? G() : J();
    }), p(k, () => {
      k.value ? document.documentElement.style.setProperty("overflow", "hidden") : document.documentElement.style.removeProperty("overflow");
    }), p(c, () => k.value = c.value || w.value), p(u, () => {
      c.value || (w.value = u.value > o.thresHold);
    }), U(() => {
      n.value && (H == null || H.observe(n.value), ee());
    }), (e, t) => (le(), oe("div", {
      ref_key: "cardRef",
      ref: n,
      style: se(V(_)),
      class: re([l.rootClass]),
      "data-modal-sheet": "",
      "aria-modal": "true",
      role: "dialog"
    }, [
      B("div", ie({
        ref_key: "innerCardRef",
        ref: d
      }, e.$attrs, {
        style: { marginTop: "0px !important", touchAction: "none" },
        onTouchend: t[2] || (t[2] = () => N()),
        onTouchmovePassive: z,
        onMousedown: t[3] || (t[3] = (f) => l.dragEntireCard ? E(f) : null),
        onTouchstartPassive: t[4] || (t[4] = (f) => l.dragEntireCard ? E(f) : null)
      }), [
        B("button", {
          ref_key: "handleRef",
          ref: m,
          onClick: X,
          onMousedown: t[0] || (t[0] = (f) => l.dragEntireCard ? null : E(f)),
          onTouchstartPassive: t[1] || (t[1] = (f) => l.dragEntireCard ? null : E(f)),
          "aria-label": l.ariaLabel
        }, [
          W(e.$slots, "handle", {}, () => [
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
              innerHTML: V(ve)
            }, null, 8, me)
          ])
        ], 40, fe),
        W(e.$slots, "default")
      ], 16)
    ], 6));
  }
});
export {
  pe as default
};
