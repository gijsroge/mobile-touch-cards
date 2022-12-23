import { ref as n, watch as w, onUnmounted as S, watchEffect as F, defineComponent as _, onMounted as I, computed as H, openBlock as ee, createElementBlock as te, normalizeStyle as ne, unref as j, normalizeClass as ae, createElementVNode as P, mergeProps as le, renderSlot as q } from "vue";
const E = (l, s, o) => Math.min(Math.max(l, s), o), oe = (l, s, o) => {
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
  w(l, (d, m) => a(m, d));
  const a = (d, m) => {
    const c = performance.now(), v = (i) => i * (2 - i), g = () => {
      const i = performance.now() - c, p = E(i / s, 0, 1);
      o.value = v(p) * (m - d) + d, p < 1 && (r.value = requestAnimationFrame(g));
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
  }, v = () => {
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
  }), { trap: c, release: v, isLocked: s };
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
    const o = l, r = typeof document < "u", a = n(null), d = n(null), m = n(null), c = n(!1), v = n(o.maxDistance), g = n(o.handleHeight), i = n(!0), p = n(!1), B = n(0), Y = n(0), u = n(0), h = n(!1), T = n(!1), A = n(0);
    n(0);
    const C = n(0), k = n(1), D = n("up"), M = n("up"), { trap: K, release: V } = re(d);
    I(() => {
      window.addEventListener("click", (e) => G(e), {
        passive: !0
      }), window.addEventListener("mouseup", () => O(), { passive: !0 }), window.addEventListener("mousemove", N, { passive: !0 }), window.addEventListener("keydown", (e) => {
        e.key === "Escape" && y();
      });
    }), S(() => {
      window.removeEventListener("mousemove", () => {
      }), window.removeEventListener("mouseup", () => {
      }), window.removeEventListener("keydown", () => y);
    });
    const W = () => {
      c.value || (u.value = v.value, s("open"));
    }, y = () => {
      c.value || (u.value = 0, s("close"));
    }, U = () => {
      h.value ? y() : W();
    }, G = (e) => {
      a.value && (a.value.contains(e.target) || y());
    }, R = () => {
      A.value = new Date().getTime();
    }, b = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest("[data-ignore-drag]"))
        return;
      k.value = 1, p.value = !0;
      const t = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      B.value = t + u.value, R(), s("start-drag");
    };
    let $ = 0;
    const L = n(!1), N = (e) => {
      if (!p.value)
        return;
      const t = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      L.value || ($ = t), L.value = !0, C.value = Math.abs($ - t), C.value > 2 && (c.value = !0), c.value && (D.value = t > Y.value ? "down" : "up", M.value !== D.value && R(), M.value = D.value, Y.value = t, u.value = oe(B.value - t, 0, v.value), s("drag", u.value));
    }, O = async () => {
      await new Promise((f) => setTimeout(f, 10)), p.value = !1, c.value = !1, L.value = !1;
      const t = new Date().getTime() - A.value;
      k.value = C.value / t * 1, h.value ? u.value < v.value - o.thresHold ? u.value = 0 : u.value = v.value : u.value >= o.thresHold ? u.value = v.value : u.value = 0, s("stop-drag");
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
      const { blockSize: t } = e[0].borderBoxSize[0], f = window.innerHeight;
      m.value && (g.value = m.value.clientHeight), v.value = E(t, 0, f) - g.value, i.value && o.open && (u.value = v.value);
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
    const X = H(() => E(u.value / v.value, 0, 1)), Z = H(() => E(0.4 / k.value, 0.05, 0.2).toFixed(2)), { animatedProgress: z } = se({
      progress: X,
      duration: 250
    });
    return w(z, () => {
      s("progress", z.value);
    }), w(h, () => {
      h.value ? K() : V();
    }), w(T, () => {
      T.value ? document.documentElement.style.setProperty("overflow", "hidden") : document.documentElement.style.removeProperty("overflow");
    }), w(c, () => T.value = c.value || h.value), w(u, () => {
      c.value || (h.value = u.value > o.thresHold);
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
        onTouchend: t[2] || (t[2] = () => O()),
        onTouchmovePassive: N,
        onMousedown: t[3] || (t[3] = (f) => l.dragEntireCard ? b(f) : null),
        onTouchstartPassive: t[4] || (t[4] = (f) => l.dragEntireCard ? b(f) : null)
      }), [
        P("button", {
          ref_key: "handleRef",
          ref: m,
          onClick: U,
          onMousedown: t[0] || (t[0] = (f) => l.dragEntireCard ? null : b(f)),
          onTouchstartPassive: t[1] || (t[1] = (f) => l.dragEntireCard ? null : b(f)),
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
