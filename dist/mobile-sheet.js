import { ref as n, watch as h, onUnmounted as S, watchEffect as F, defineComponent as _, onMounted as I, computed as H, openBlock as ee, createElementBlock as te, normalizeStyle as ne, unref as j, normalizeClass as ae, createElementVNode as P, mergeProps as le, renderSlot as q } from "vue";
const T = (l, s, o) => Math.min(Math.max(l, s), o), oe = (l, s, o) => {
  let r = l;
  if (l > o) {
    const a = r - o;
    r -= a * 0.6;
  }
  return l < s && (r -= r * 0.6), r;
}, se = ({
  progress: l,
  duration: s
}) => {
  const o = n(l.value), r = n(null);
  h(l, (d, m) => a(m, d));
  const a = (d, m) => {
    const c = performance.now(), f = (i) => i * (2 - i), g = () => {
      const i = performance.now() - c, p = T(i / s, 0, 1);
      o.value = f(p) * (m - d) + d, p < 1 && (r.value = requestAnimationFrame(g));
    };
    r.value = requestAnimationFrame(g);
  };
  return S(() => {
    r.value && cancelAnimationFrame(r.value);
  }), { animatedProgress: o };
};
function re(l) {
  const s = n(!1);
  let o = null, r = null, a = null, d = null;
  const m = 9, c = () => {
    s.value = !0, o = document.activeElement, a == null || a.focus();
  }, f = () => {
    s.value = !1, o == null || o.focus();
  }, g = (i) => {
    if (s.value) {
      var p = i.key === "Tab" || i.keyCode === m;
      p && (i.shiftKey ? document.activeElement === a && (d == null || d.focus(), i.preventDefault()) : document.activeElement === d && (a == null || a.focus(), i.preventDefault()));
    }
  };
  return F(() => {
    l.value && (r = l.value.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    ), a = r[0], d = r[r.length - 1], l.value.addEventListener("keydown", g));
  }), S(() => {
    var i;
    return (i = l.value) == null ? void 0 : i.removeEventListener("keydown", g);
  }), { trap: c, release: f, isLocked: s };
}
const ie = `<svg width="70" height="3" viewBox="0 0 70 3" xmlns="http://www.w3.org/2000/svg">
<rect width="70" height="3" rx="3" fill="currentColor"/>
</svg>
`, ue = ["aria-label"], de = ["innerHTML"], ce = {
  inheritAttrs: !1
}, fe = /* @__PURE__ */ _({
  ...ce,
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
    const o = l, r = typeof document < "u", a = n(null), d = n(null), m = n(null), c = n(!1), f = n(o.maxDistance), g = n(o.handleHeight), i = n(!0), p = n(!1), B = n(0), Y = n(0), u = n(0), w = n(!1), C = n(!1), A = n(0);
    n(0);
    const k = n(0), D = n(1), y = n(null), M = n(null), { trap: K, release: V } = re(d);
    I(() => {
      window.addEventListener("click", (e) => G(e), {
        passive: !0
      }), window.addEventListener("mouseup", () => N(), { passive: !0 }), window.addEventListener("mousemove", $, { passive: !0 }), window.addEventListener("keydown", (e) => {
        e.key === "Escape" && b();
      });
    }), S(() => {
      window.removeEventListener("mousemove", () => {
      }), window.removeEventListener("mouseup", () => {
      }), window.removeEventListener("keydown", () => b);
    });
    const W = () => {
      c.value || (u.value = f.value, s("open"));
    }, b = () => {
      c.value || (u.value = 0, s("close"));
    }, U = () => {
      w.value ? b() : W();
    }, G = (e) => {
      a.value && (a.value.contains(e.target) || b());
    }, R = () => {
      A.value = new Date().getTime();
    }, E = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest("[data-ignore-drag]"))
        return;
      D.value = 1, p.value = !0;
      const t = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      B.value = t + u.value, R(), s("start-drag");
    };
    let O = 0;
    const L = n(!1), $ = (e) => {
      if (!p.value)
        return;
      const t = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      if (L.value || (O = t), L.value = !0, k.value = Math.abs(O - t), k.value > 2 && (c.value = !0), !c.value)
        return;
      const v = y.value === "up" ? -1 : 1;
      y.value = t > Y.value ? "down" : "up", M.value !== y.value && R(), Y.value = t - v, M.value = y.value, u.value = oe(B.value - t, 0, f.value), s("drag", u.value);
    }, N = async () => {
      await new Promise((v) => setTimeout(v, 10)), p.value = !1, c.value = !1, L.value = !1;
      const t = new Date().getTime() - A.value;
      D.value = k.value / t * 1, y.value === "up" ? u.value >= o.thresHold ? u.value = f.value : u.value = 0 : u.value < f.value - o.thresHold ? u.value = 0 : u.value = f.value, s("stop-drag");
    }, J = H(() => {
      const e = {
        position: "fixed",
        willChange: "transform",
        left: 0,
        right: 0,
        transition: c.value || i.value ? "none" : `transform ${Z.value}s ease-out`
      };
      return e.top = "100%", e.transform = `translateY(${(u.value + g.value) * -1}px)`, e;
    }), x = r ? new ResizeObserver((e) => {
      if (!a.value)
        return;
      const { blockSize: t } = e[0].borderBoxSize[0], v = window.innerHeight;
      m.value && (g.value = m.value.clientHeight), f.value = T(t, 0, v) - g.value, i.value && o.open && (u.value = f.value);
    }) : null, Q = () => {
      if (!a.value || !o.a11yWarnings)
        return;
      const e = a.value.getAttribute("aria-labelledby");
      e ? document.getElementById(e) || console.warn(
        `[mobile-sheet.js] The aria labelledby "${e}" is not pointing to a valid element inside the mobile sheet content`
      ) : console.warn(
        "[mobile-sheet.js] The <mobile-sheet> element should have an aria-labelledby attribute that points to the id of a title element inside the content"
      );
    };
    I(() => {
      setTimeout(() => i.value = !1, 1);
    });
    const X = H(() => T(u.value / f.value, 0, 1)), Z = H(() => T(0.4 / D.value, 0.05, 0.2).toFixed(2)), { animatedProgress: z } = se({
      progress: X,
      duration: 250
    });
    return h(z, () => {
      s("progress", z.value);
    }), h(w, () => {
      w.value ? K() : V();
    }), h(C, () => {
      C.value ? document.documentElement.style.setProperty("overflow", "hidden") : document.documentElement.style.removeProperty("overflow");
    }), h(c, () => C.value = c.value || w.value), h(u, () => {
      c.value || (w.value = u.value > o.thresHold);
    }), F(() => {
      a.value && (x == null || x.observe(a.value), Q());
    }), (e, t) => (ee(), te("div", {
      ref_key: "cardRef",
      ref: a,
      style: ne(j(J)),
      class: ae([l.rootClass]),
      "data-modal-sheet": "",
      "aria-modal": "true",
      role: "dialog"
    }, [
      P("div", le({
        ref_key: "innerCardRef",
        ref: d
      }, e.$attrs, {
        style: { marginTop: "0px !important", touchAction: "none" },
        onTouchend: t[2] || (t[2] = () => N()),
        onTouchmovePassive: $,
        onMousedown: t[3] || (t[3] = (v) => l.dragEntireCard ? E(v) : null),
        onTouchstartPassive: t[4] || (t[4] = (v) => l.dragEntireCard ? E(v) : null)
      }), [
        P("button", {
          ref_key: "handleRef",
          ref: m,
          onClick: U,
          onMousedown: t[0] || (t[0] = (v) => l.dragEntireCard ? null : E(v)),
          onTouchstartPassive: t[1] || (t[1] = (v) => l.dragEntireCard ? null : E(v)),
          "aria-label": l.ariaLabel
        }, [
          q(e.$slots, "handle", {}, () => [
            P("div", {
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
              innerHTML: j(ie)
            }, null, 8, de)
          ])
        ], 40, ue),
        q(e.$slots, "default")
      ], 16)
    ], 6));
  }
});
export {
  fe as default
};
