import { ref as a, watch as h, onUnmounted as B, watchEffect as F, defineComponent as _, onMounted as I, computed as P, openBlock as ee, createElementBlock as te, normalizeStyle as ne, unref as j, normalizeClass as ae, createElementVNode as S, mergeProps as le, renderSlot as q } from "vue";
const T = (l, s, o) => Math.min(Math.max(l, s), o), oe = (l, s, o) => {
  let r = l;
  if (l > o) {
    const n = r - o;
    r -= n * 0.6;
  }
  return l < s && (r -= r * 0.6), r;
}, se = ({
  progress: l,
  duration: s
}) => {
  const o = a(l.value), r = a(null);
  h(l, (d, m) => n(m, d));
  const n = (d, m) => {
    const c = performance.now(), v = (i) => i * (2 - i), g = () => {
      const i = performance.now() - c, p = T(i / s, 0, 1);
      o.value = v(p) * (m - d) + d, p < 1 && (r.value = requestAnimationFrame(g));
    };
    r.value = requestAnimationFrame(g);
  };
  return B(() => {
    r.value && cancelAnimationFrame(r.value);
  }), { animatedProgress: o };
};
function re(l) {
  const s = a(!1);
  let o = null, r = null, n = null, d = null;
  const m = 9, c = () => {
    s.value = !0, o = document.activeElement, n == null || n.focus();
  }, v = () => {
    s.value = !1, o == null || o.focus();
  }, g = (i) => {
    if (s.value) {
      var p = i.key === "Tab" || i.keyCode === m;
      p && (i.shiftKey ? document.activeElement === n && (d == null || d.focus(), i.preventDefault()) : document.activeElement === d && (n == null || n.focus(), i.preventDefault()));
    }
  };
  return F(() => {
    l.value && (r = l.value.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    ), n = r[0], d = r[r.length - 1], l.value.addEventListener("keydown", g));
  }), B(() => {
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
    const o = l, r = typeof document < "u", n = a(null), d = a(null), m = a(null), c = a(!1), v = a(o.maxDistance), g = a(o.handleHeight), i = a(!0), p = a(!1), Y = a(0), C = a(0), u = a(0), w = a(!1), k = a(!1), A = a(0), D = a(0), L = a(1), y = a(null), M = a(null), { trap: K, release: V } = re(d);
    I(() => {
      window.addEventListener("click", (e) => G(e), {
        passive: !0
      }), window.addEventListener("mouseup", () => O(), { passive: !0 }), window.addEventListener("mousemove", N, { passive: !0 }), window.addEventListener("keydown", (e) => {
        e.key === "Escape" && b();
      });
    }), B(() => {
      window.removeEventListener("mousemove", () => {
      }), window.removeEventListener("mouseup", () => {
      }), window.removeEventListener("keydown", () => b);
    });
    const W = () => {
      c.value || (u.value = v.value, s("open"));
    }, b = () => {
      c.value || (u.value = 0, s("close"));
    }, U = () => {
      w.value ? b() : W();
    }, G = (e) => {
      n.value && (n.value.contains(e.target) || b());
    }, R = () => {
      A.value = new Date().getTime();
    }, E = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest("[data-ignore-drag]"))
        return;
      L.value = 1, p.value = !0;
      const t = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      Y.value = t + u.value, R(), s("start-drag");
    };
    let $ = 0;
    const x = a(!1), N = (e) => {
      if (!p.value)
        return;
      const t = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      x.value || ($ = t), x.value = !0, D.value = Math.abs($ - t), D.value > 2 && (c.value = !0), c.value && (C.value !== t && (y.value = t > C.value ? "down" : "up"), M.value !== y.value && R(), C.value = t, M.value = y.value, u.value = oe(Y.value - t, 0, v.value), s("drag", u.value));
    }, O = async () => {
      await new Promise((f) => setTimeout(f, 10)), p.value = !1, c.value = !1, x.value = !1;
      const t = new Date().getTime() - A.value;
      L.value = D.value / t * 1, y.value === "up" ? u.value >= o.thresHold ? u.value = v.value : u.value = 0 : u.value < v.value - o.thresHold ? u.value = 0 : u.value = v.value, s("stop-drag");
    }, J = P(() => {
      const e = {
        position: "fixed",
        willChange: "transform",
        left: 0,
        right: 0,
        transition: c.value || i.value ? "none" : `transform ${Z.value}s ease-out`
      };
      return e.top = "100%", e.transform = `translateY(${(u.value + g.value) * -1}px)`, e;
    }), H = r ? new ResizeObserver((e) => {
      if (!n.value)
        return;
      const { blockSize: t } = e[0].borderBoxSize[0], f = window.innerHeight;
      m.value && (g.value = m.value.clientHeight), v.value = T(t, 0, f) - g.value, i.value && o.open && (u.value = v.value);
    }) : null, Q = () => {
      if (!n.value || !o.a11yWarnings)
        return;
      const e = n.value.getAttribute("aria-labelledby");
      e ? document.getElementById(e) || console.warn(
        `[mobile-sheet.js] The aria labelledby "${e}" is not pointing to a valid element inside the mobile sheet content`
      ) : console.warn(
        "[mobile-sheet.js] The <mobile-sheet> element should have an aria-labelledby attribute that points to the id of a title element inside the content"
      );
    };
    I(() => {
      setTimeout(() => i.value = !1, 1);
    });
    const X = P(() => T(u.value / v.value, 0, 1)), Z = P(() => T(0.4 / L.value, 0.05, 0.2).toFixed(2)), { animatedProgress: z } = se({
      progress: X,
      duration: 250
    });
    return h(z, () => {
      s("progress", z.value);
    }), h(w, () => {
      w.value ? K() : V();
    }), h(k, () => {
      k.value ? document.documentElement.style.setProperty("overflow", "hidden") : document.documentElement.style.removeProperty("overflow");
    }), h(c, () => k.value = c.value || w.value), h(u, () => {
      c.value || (w.value = u.value > o.thresHold);
    }), F(() => {
      n.value && (H == null || H.observe(n.value), Q());
    }), (e, t) => (ee(), te("div", {
      ref_key: "cardRef",
      ref: n,
      style: ne(j(J)),
      class: ae([l.rootClass]),
      "data-modal-sheet": "",
      "aria-modal": "true",
      role: "dialog"
    }, [
      S("div", le({
        ref_key: "innerCardRef",
        ref: d
      }, e.$attrs, {
        style: { marginTop: "0px !important", touchAction: "none" },
        onTouchend: t[2] || (t[2] = () => O()),
        onTouchmovePassive: N,
        onMousedown: t[3] || (t[3] = (f) => l.dragEntireCard ? E(f) : null),
        onTouchstartPassive: t[4] || (t[4] = (f) => l.dragEntireCard ? E(f) : null)
      }), [
        S("button", {
          ref_key: "handleRef",
          ref: m,
          onClick: U,
          onMousedown: t[0] || (t[0] = (f) => l.dragEntireCard ? null : E(f)),
          onTouchstartPassive: t[1] || (t[1] = (f) => l.dragEntireCard ? null : E(f)),
          "aria-label": l.ariaLabel
        }, [
          q(e.$slots, "handle", {}, () => [
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
