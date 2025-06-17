import { defineComponent, createElementVNode, normalizeStyle, normalizeClass, useAttrs, ref, computed, createElementBlock, watchEffect, nextTick, watch, openBlock, unref, Fragment, renderList, mergeProps, createBlock, withCtx, renderSlot, createVNode, onMounted, onBeforeUnmount, createCommentVNode, resolveDynamicComponent, normalizeProps, createTextVNode, toDisplayString } from 'vue';
import { g as genericComponent, p as propsFactory, ag as provideTheme, as as useRtl, c as useRender, s as makeThemeProps, x as makeComponentProps } from './server.mjs';
import { c as createLayout, a as makeLayoutProps } from './layout-Bel3IrLG.mjs';

const makeVAppProps = propsFactory({
  ...makeComponentProps(),
  ...makeLayoutProps({
    fullHeight: true
  }),
  ...makeThemeProps()
}, "VApp");
const VApp = genericComponent()({
  name: "VApp",
  props: makeVAppProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const theme = provideTheme(props);
    const {
      layoutClasses,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout(props);
    const {
      rtlClasses
    } = useRtl();
    useRender(() => {
      var _a;
      return createElementVNode("div", {
        "ref": layoutRef,
        "class": normalizeClass(["v-application", theme.themeClasses.value, layoutClasses.value, rtlClasses.value, props.class]),
        "style": normalizeStyle([props.style])
      }, [createElementVNode("div", {
        "class": "v-application__wrap"
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    });
    return {
      getLayoutItem,
      items,
      theme
    };
  }
});
var qt = Object.defineProperty;
var Jt = (s, a, t) => a in s ? qt(s, a, { enumerable: true, configurable: true, writable: true, value: t }) : s[a] = t;
var x = (s, a, t) => Jt(s, typeof a != "symbol" ? a + "" : a, t);
let vt = 0;
class ae {
  constructor() {
    x(this, "subscribers");
    x(this, "toasts");
    x(this, "subscribe", (a) => (this.subscribers.push(a), () => {
      const t = this.subscribers.indexOf(a);
      this.subscribers.splice(t, 1);
    }));
    x(this, "publish", (a) => {
      this.subscribers.forEach((t) => t(a));
    });
    x(this, "addToast", (a) => {
      this.publish(a), this.toasts = [...this.toasts, a];
    });
    x(this, "create", (a) => {
      var P;
      const { message: t, ...n } = a, r = typeof a.id == "number" || a.id && ((P = a.id) == null ? void 0 : P.length) > 0 ? a.id : vt++, g = this.toasts.find((h) => h.id === r), T = a.dismissible === void 0 ? true : a.dismissible;
      return g ? this.toasts = this.toasts.map((h) => h.id === r ? (this.publish({ ...h, ...a, id: r, title: t }), {
        ...h,
        ...a,
        id: r,
        dismissible: T,
        title: t
      }) : h) : this.addToast({ title: t, ...n, dismissible: T, id: r }), r;
    });
    x(this, "dismiss", (a) => (a || this.toasts.forEach((t) => {
      this.subscribers.forEach(
        (n) => n({ id: t.id, dismiss: true })
      );
    }), this.subscribers.forEach((t) => t({ id: a, dismiss: true })), a));
    x(this, "message", (a, t) => this.create({ ...t, message: a, type: "default" }));
    x(this, "error", (a, t) => this.create({ ...t, type: "error", message: a }));
    x(this, "success", (a, t) => this.create({ ...t, type: "success", message: a }));
    x(this, "info", (a, t) => this.create({ ...t, type: "info", message: a }));
    x(this, "warning", (a, t) => this.create({ ...t, type: "warning", message: a }));
    x(this, "loading", (a, t) => this.create({ ...t, type: "loading", message: a }));
    x(this, "promise", (a, t) => {
      if (!t)
        return;
      let n;
      t.loading !== void 0 && (n = this.create({
        ...t,
        promise: a,
        type: "loading",
        message: t.loading,
        description: typeof t.description != "function" ? t.description : void 0
      }));
      const r = a instanceof Promise ? a : a();
      let g = n !== void 0, T;
      const P = r.then(async (u) => {
        if (T = ["resolve", u], se(u) && !u.ok) {
          g = false;
          const m = typeof t.error == "function" ? await t.error(
            `HTTP error! status: ${u.status}`
          ) : t.error, y = typeof t.description == "function" ? (
            // @ts-expect-error
            await t.description(`HTTP error! status: ${u.status}`)
          ) : t.description;
          this.create({ id: n, type: "error", message: m, description: y });
        } else if (t.success !== void 0) {
          g = false;
          const m = typeof t.success == "function" ? await t.success(u) : t.success, y = typeof t.description == "function" ? await t.description(u) : t.description;
          this.create({ id: n, type: "success", message: m, description: y });
        }
      }).catch(async (u) => {
        if (T = ["reject", u], t.error !== void 0) {
          g = false;
          const m = typeof t.error == "function" ? await t.error(u) : t.error, y = typeof t.description == "function" ? await t.description(
            u
          ) : t.description;
          this.create({ id: n, type: "error", message: m, description: y });
        }
      }).finally(() => {
        var u;
        g && (this.dismiss(n), n = void 0), (u = t.finally) == null || u.call(t);
      }), h = () => new Promise(
        (u, m) => P.then(
          () => T[0] === "reject" ? m(T[1]) : u(T[1])
        ).catch(m)
      );
      return typeof n != "string" && typeof n != "number" ? { unwrap: h } : Object.assign(n, { unwrap: h });
    });
    x(this, "custom", (a, t) => {
      const n = (t == null ? void 0 : t.id) || vt++;
      return this.publish({ component: a, id: n, ...t }), n;
    });
    this.subscribers = [], this.toasts = [];
  }
}
const E = new ae();
function oe(s, a) {
  const t = (a == null ? void 0 : a.id) || vt++;
  return E.create({
    message: s,
    id: t,
    type: "default",
    ...a
  }), t;
}
const se = (s) => s && typeof s == "object" && "ok" in s && typeof s.ok == "boolean" && "status" in s && typeof s.status == "number", ne = oe, re = () => E.toasts, Ke = Object.assign(
  ne,
  {
    success: E.success,
    info: E.info,
    warning: E.warning,
    error: E.error,
    custom: E.custom,
    message: E.message,
    promise: E.promise,
    dismiss: E.dismiss,
    loading: E.loading
  },
  {
    getHistory: re
  }
);
function ut(s) {
  return s.label !== void 0;
}
function ie() {
  const s = ref(false);
  return watchEffect(() => {
    const a = () => {
      s.value = (void 0).hidden;
    };
    return (void 0).addEventListener("visibilitychange", a), () => (void 0).removeEventListener("visibilitychange", a);
  }), {
    isDocumentHidden: s
  };
}
const le = ["aria-live", "data-rich-colors", "data-styled", "data-mounted", "data-promise", "data-removed", "data-visible", "data-y-position", "data-x-position", "data-index", "data-front", "data-swiping", "data-dismissible", "data-type", "data-invert", "data-swipe-out", "data-expanded"], de = ["aria-label", "data-disabled"], Wt = 4e3, ue = 20, ce = 200, fe = /* @__PURE__ */ defineComponent({
  __name: "Toast",
  props: {
    toast: {},
    toasts: {},
    index: {},
    expanded: { type: Boolean },
    invert: { type: Boolean },
    heights: {},
    gap: {},
    position: {},
    visibleToasts: {},
    expandByDefault: { type: Boolean },
    closeButton: { type: Boolean },
    interacting: { type: Boolean },
    style: {},
    cancelButtonStyle: {},
    actionButtonStyle: {},
    duration: {},
    class: {},
    unstyled: { type: Boolean },
    descriptionClass: {},
    loadingIcon: {},
    classes: {},
    icons: {},
    closeButtonAriaLabel: {},
    pauseWhenPageIsHidden: { type: Boolean },
    cn: { type: Function },
    defaultRichColors: { type: Boolean }
  },
  emits: ["update:heights", "removeToast"],
  setup(s, { emit: a }) {
    const t = s, n = a, r = ref(false), g = ref(false), T = ref(false), P = ref(false), h = ref(false), u = ref(0), m = ref(0), y = ref(
      t.toast.duration || t.duration || Wt
    ), H = ref(null), B = ref(null), pt = computed(() => t.index === 0), ht = computed(() => t.index + 1 <= t.visibleToasts), I = computed(() => t.toast.type), Y = computed(() => t.toast.dismissible !== false), gt = computed(() => t.toast.class || ""), o = computed(() => t.descriptionClass || ""), i = t.toast.style || {}, l = computed(
      () => t.heights.findIndex((e) => e.toastId === t.toast.id) || 0
    ), k = computed(() => {
      var _a;
      return (_a = t.toast.closeButton) != null ? _a : t.closeButton;
    });
    computed(
      () => t.toast.duration || t.duration || Wt
    );
    const b = ref(0), z = ref(0), O = ref(null), G = computed(() => t.position.split("-")), Q = computed(() => G.value[0]), ot = computed(() => G.value[1]), st = computed(() => typeof t.toast.title != "string"), nt = computed(
      () => typeof t.toast.description != "string"
    ), rt = computed(() => t.heights.reduce((e, c, S) => S >= l.value ? e : e + c.height, 0)), it = ie(), lt = computed(() => t.toast.invert || t.invert), j = computed(() => I.value === "loading"), M = computed(() => l.value * t.gap + rt.value || 0);
    onMounted(() => {
      if (!r.value) return;
      const e = B.value, c = e == null ? void 0 : e.style.height;
      e.style.height = "auto";
      const S = e.getBoundingClientRect().height;
      e.style.height = c, m.value = S;
      let C;
      t.heights.find(
        (w) => w.toastId === t.toast.id
      ) ? C = t.heights.map(
        (w) => w.toastId === t.toast.id ? { ...w, height: S } : w
      ) : C = [
        {
          toastId: t.toast.id,
          height: S,
          position: t.toast.position
        },
        ...t.heights
      ], n("update:heights", C);
    });
    function V() {
      g.value = true, u.value = M.value;
      const e = t.heights.filter(
        (c) => c.toastId !== t.toast.id
      );
      n("update:heights", e), setTimeout(() => {
        n("removeToast", t.toast);
      }, ce);
    }
    function bt() {
      var e, c;
      if (j.value || !Y.value)
        return {};
      V(), (c = (e = t.toast).onDismiss) == null || c.call(e, t.toast);
    }
    function Xt(e) {
      j.value || !Y.value || (H.value = /* @__PURE__ */ new Date(), u.value = M.value, e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (T.value = true, O.value = { x: e.clientX, y: e.clientY }));
    }
    function Gt() {
      var C, $, w, q, J;
      if (P.value || !Y) return;
      O.value = null;
      const e = Number(
        ((C = B.value) == null ? void 0 : C.style.getPropertyValue("--swipe-amount").replace("px", "")) || 0
      ), c = (/* @__PURE__ */ new Date()).getTime() - (($ = H.value) == null ? void 0 : $.getTime()), S = Math.abs(e) / c;
      if (Math.abs(e) >= ue || S > 0.11) {
        u.value = M.value, (q = (w = t.toast).onDismiss) == null || q.call(w, t.toast), V(), P.value = true, h.value = false;
        return;
      }
      (J = B.value) == null || J.style.setProperty("--swipe-amount", "0px"), T.value = false;
    }
    function Qt(e) {
      var $, w;
      if (!O.value || !Y.value) return;
      const c = e.clientY - O.value.y, S = (($ = (void 0).getSelection()) == null ? void 0 : $.toString().length) > 0, C = Q.value === "top" ? Math.min(0, c) : Math.max(0, c);
      Math.abs(C) > 0 && (h.value = true), !S && ((w = B.value) == null || w.style.setProperty("--swipe-amount", `${C}px`));
    }
    return watchEffect((e) => {
      if (t.toast.promise && I.value === "loading" || t.toast.duration === 1 / 0 || t.toast.type === "loading")
        return;
      let c;
      const S = () => {
        if (z.value < b.value) {
          const $ = (/* @__PURE__ */ new Date()).getTime() - b.value;
          y.value = y.value - $;
        }
        z.value = (/* @__PURE__ */ new Date()).getTime();
      }, C = () => {
        y.value !== 1 / 0 && (b.value = (/* @__PURE__ */ new Date()).getTime(), c = setTimeout(() => {
          var $, w;
          (w = ($ = t.toast).onAutoClose) == null || w.call($, t.toast), V();
        }, y.value));
      };
      t.expanded || t.interacting || t.pauseWhenPageIsHidden && it ? S() : C(), e(() => {
        clearTimeout(c);
      });
    }), watch(
      () => t.toast.delete,
      () => {
        t.toast.delete && V();
      },
      {
        deep: true
      }
    ), onMounted(() => {
      if (r.value = true, B.value) {
        const e = B.value.getBoundingClientRect().height;
        m.value = e;
        const c = [
          { toastId: t.toast.id, height: e, position: t.toast.position },
          ...t.heights
        ];
        n("update:heights", c);
      }
    }), onBeforeUnmount(() => {
      if (B.value) {
        const e = t.heights.filter(
          (c) => c.toastId !== t.toast.id
        );
        n("update:heights", e);
      }
    }), (e, c) => {
      var _a;
      var S, C, $, w, q, J, wt, kt, xt, Tt, Bt, St, Ct, $t, Et, It, Pt, Dt, Ht, zt, Mt, Ot, At, Lt, Yt, Nt, Rt;
      return openBlock(), createElementBlock("li", {
        ref_key: "toastRef",
        ref: B,
        "aria-live": e.toast.important ? "assertive" : "polite",
        "aria-atomic": "true",
        role: "status",
        tabindex: "0",
        "data-sonner-toast": "true",
        class: normalizeClass(
          e.cn(
            t.class,
            gt.value,
            (S = e.classes) == null ? void 0 : S.toast,
            (C = e.toast.classes) == null ? void 0 : C.toast,
            // @ts-ignore
            ($ = e.classes) == null ? void 0 : $[I.value],
            // @ts-ignore
            (q = (w = e.toast) == null ? void 0 : w.classes) == null ? void 0 : q[I.value]
          )
        ),
        "data-rich-colors": (_a = e.toast.richColors) != null ? _a : e.defaultRichColors,
        "data-styled": !(e.toast.component || (J = e.toast) != null && J.unstyled || e.unstyled),
        "data-mounted": r.value,
        "data-promise": !!e.toast.promise,
        "data-removed": g.value,
        "data-visible": ht.value,
        "data-y-position": Q.value,
        "data-x-position": ot.value,
        "data-index": e.index,
        "data-front": pt.value,
        "data-swiping": T.value,
        "data-dismissible": Y.value,
        "data-type": I.value,
        "data-invert": lt.value,
        "data-swipe-out": P.value,
        "data-expanded": !!(e.expanded || e.expandByDefault && r.value),
        style: normalizeStyle({
          "--index": e.index,
          "--toasts-before": e.index,
          "--z-index": e.toasts.length - e.index,
          "--offset": `${g.value ? u.value : M.value}px`,
          "--initial-height": e.expandByDefault ? "auto" : `${m.value}px`,
          ...e.style,
          ...unref(i)
        }),
        onPointerdown: Xt,
        onPointerup: Gt,
        onPointermove: Qt
      }, [
        k.value && !e.toast.component ? (openBlock(), createElementBlock("button", {
          key: 0,
          "aria-label": e.closeButtonAriaLabel || "Close toast",
          "data-disabled": j.value,
          "data-close-button": "true",
          class: normalizeClass(e.cn((wt = e.classes) == null ? void 0 : wt.closeButton, (xt = (kt = e.toast) == null ? void 0 : kt.classes) == null ? void 0 : xt.closeButton)),
          onClick: bt
        }, [
          (Tt = e.icons) != null && Tt.close ? (openBlock(), createBlock(resolveDynamicComponent((Bt = e.icons) == null ? void 0 : Bt.close), { key: 0 })) : renderSlot(e.$slots, "close-icon", { key: 1 })
        ], 10, de)) : createCommentVNode("", true),
        e.toast.component ? (openBlock(), createBlock(resolveDynamicComponent(e.toast.component), mergeProps({ key: 1 }, e.toast.componentProps, { onCloseToast: bt }), null, 16)) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          I.value !== "default" || e.toast.icon || e.toast.promise ? (openBlock(), createElementBlock("div", {
            key: 0,
            "data-icon": "",
            class: normalizeClass(e.cn((St = e.classes) == null ? void 0 : St.icon, ($t = (Ct = e.toast) == null ? void 0 : Ct.classes) == null ? void 0 : $t.icon))
          }, [
            e.toast.icon ? (openBlock(), createBlock(resolveDynamicComponent(e.toast.icon), { key: 0 })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              I.value === "loading" ? renderSlot(e.$slots, "loading-icon", { key: 0 }) : I.value === "success" ? renderSlot(e.$slots, "success-icon", { key: 1 }) : I.value === "error" ? renderSlot(e.$slots, "error-icon", { key: 2 }) : I.value === "warning" ? renderSlot(e.$slots, "warning-icon", { key: 3 }) : I.value === "info" ? renderSlot(e.$slots, "info-icon", { key: 4 }) : createCommentVNode("", true)
            ], 64))
          ], 2)) : createCommentVNode("", true),
          createElementVNode("div", {
            "data-content": "",
            class: normalizeClass(e.cn((Et = e.classes) == null ? void 0 : Et.content, (Pt = (It = e.toast) == null ? void 0 : It.classes) == null ? void 0 : Pt.content))
          }, [
            createElementVNode("div", {
              "data-title": "",
              class: normalizeClass(e.cn((Dt = e.classes) == null ? void 0 : Dt.title, (Ht = e.toast.classes) == null ? void 0 : Ht.title))
            }, [
              st.value ? (openBlock(), createBlock(resolveDynamicComponent(e.toast.title), normalizeProps(mergeProps({ key: 0 }, e.toast.componentProps)), null, 16)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(e.toast.title), 1)
              ], 64))
            ], 2),
            e.toast.description ? (openBlock(), createElementBlock("div", {
              key: 0,
              "data-description": "",
              class: normalizeClass(
                e.cn(
                  e.descriptionClass,
                  o.value,
                  (zt = e.classes) == null ? void 0 : zt.description,
                  (Mt = e.toast.classes) == null ? void 0 : Mt.description
                )
              )
            }, [
              nt.value ? (openBlock(), createBlock(resolveDynamicComponent(e.toast.description), normalizeProps(mergeProps({ key: 0 }, e.toast.componentProps)), null, 16)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(e.toast.description), 1)
              ], 64))
            ], 2)) : createCommentVNode("", true)
          ], 2),
          e.toast.cancel ? (openBlock(), createElementBlock("button", {
            key: 1,
            style: normalizeStyle(e.toast.cancelButtonStyle || e.cancelButtonStyle),
            class: normalizeClass(e.cn((Ot = e.classes) == null ? void 0 : Ot.cancelButton, (At = e.toast.classes) == null ? void 0 : At.cancelButton)),
            "data-button": "",
            "data-cancel": "",
            onClick: c[0] || (c[0] = (Z) => {
              var _, tt;
              unref(ut)(e.toast.cancel) && Y.value && ((tt = (_ = e.toast.cancel).onClick) == null || tt.call(_, Z), V());
            })
          }, toDisplayString(unref(ut)(e.toast.cancel) ? (Lt = e.toast.cancel) == null ? void 0 : Lt.label : e.toast.cancel), 7)) : createCommentVNode("", true),
          e.toast.action ? (openBlock(), createElementBlock("button", {
            key: 2,
            style: normalizeStyle(e.toast.actionButtonStyle || e.actionButtonStyle),
            class: normalizeClass(e.cn((Yt = e.classes) == null ? void 0 : Yt.actionButton, (Nt = e.toast.classes) == null ? void 0 : Nt.actionButton)),
            "data-button": "",
            "data-action": "",
            onClick: c[1] || (c[1] = (Z) => {
              var _, tt;
              unref(ut)(e.toast.action) && (Z.defaultPrevented || ((tt = (_ = e.toast.action).onClick) == null || tt.call(_, Z), !Z.defaultPrevented && V()));
            })
          }, toDisplayString(unref(ut)(e.toast.action) ? (Rt = e.toast.action) == null ? void 0 : Rt.label : e.toast.action), 7)) : createCommentVNode("", true)
        ], 64))
      ], 46, le);
    };
  }
}), at = (s, a) => {
  const t = s.__vccOpts || s;
  for (const [n, r] of a)
    t[n] = r;
  return t;
}, pe = {}, he = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stoke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function ge(s, a) {
  return openBlock(), createElementBlock("svg", he, a[0] || (a[0] = [
    createElementVNode("line", {
      x1: "18",
      y1: "6",
      x2: "6",
      y2: "18"
    }, null, -1),
    createElementVNode("line", {
      x1: "6",
      y1: "6",
      x2: "18",
      y2: "18"
    }, null, -1)
  ]));
}
const me = /* @__PURE__ */ at(pe, [["render", ge]]), ve = ["data-visible"], ye = { class: "sonner-spinner" }, be = /* @__PURE__ */ defineComponent({
  __name: "Loader",
  props: {
    visible: { type: Boolean }
  },
  setup(s) {
    const a = Array(12).fill(0);
    return (t, n) => (openBlock(), createElementBlock("div", {
      class: "sonner-loading-wrapper",
      "data-visible": t.visible
    }, [
      createElementVNode("div", ye, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(a), (r) => (openBlock(), createElementBlock("div", {
          key: `spinner-bar-${r}`,
          class: "sonner-loading-bar"
        }))), 128))
      ])
    ], 8, ve));
  }
}), we = {}, ke = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function xe(s, a) {
  return openBlock(), createElementBlock("svg", ke, a[0] || (a[0] = [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Te = /* @__PURE__ */ at(we, [["render", xe]]), Be = {}, Se = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function Ce(s, a) {
  return openBlock(), createElementBlock("svg", Se, a[0] || (a[0] = [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const $e = /* @__PURE__ */ at(Be, [["render", Ce]]), Ee = {}, Ie = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function Pe(s, a) {
  return openBlock(), createElementBlock("svg", Ie, a[0] || (a[0] = [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const De = /* @__PURE__ */ at(Ee, [["render", Pe]]), He = {}, ze = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function Me(s, a) {
  return openBlock(), createElementBlock("svg", ze, a[0] || (a[0] = [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Oe = /* @__PURE__ */ at(He, [["render", Me]]), Ae = ["aria-label"], Le = ["dir", "data-theme", "data-rich-colors", "data-y-position", "data-x-position", "data-lifted"], Ye = 3, Ut = "32px", Ne = 356, Re = 14;
function je(...s) {
  return s.filter(Boolean).join(" ");
}
const Ve = /* @__PURE__ */ defineComponent({
  name: "Toaster",
  inheritAttrs: false,
  __name: "Toaster",
  props: {
    invert: { type: Boolean, default: false },
    theme: { default: "light" },
    position: { default: "bottom-right" },
    hotkey: { default: () => ["altKey", "KeyT"] },
    richColors: { type: Boolean, default: false },
    expand: { type: Boolean, default: false },
    duration: {},
    gap: { default: Re },
    visibleToasts: { default: Ye },
    closeButton: { type: Boolean, default: false },
    toastOptions: { default: () => ({}) },
    class: { default: "" },
    style: { default: () => ({}) },
    offset: { default: Ut },
    dir: { default: "auto" },
    icons: {},
    containerAriaLabel: { default: "Notifications" },
    pauseWhenPageIsHidden: { type: Boolean, default: false },
    cn: { type: Function, default: je }
  },
  setup(s) {
    const a = s;
    function t() {
      return "ltr";
    }
    const n = useAttrs(), r = ref([]), g = computed(() => (o, i) => r.value.filter(
      (l) => !l.position && i === 0 || l.position === o
    )), T = computed(() => {
      const o = r.value.filter((i) => i.position).map((i) => i.position);
      return o.length > 0 ? Array.from(new Set([a.position].concat(o))) : [a.position];
    }), P = ref([]), h = ref(false), u = ref(false), m = ref(
      a.theme !== "system" ? a.theme : "light"
    ), y = ref(null), H = ref(null), B = ref(false), pt = a.hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
    function ht(o) {
      var i;
      (i = r.value.find((l) => l.id === o.id)) != null && i.delete || E.dismiss(o.id), r.value = r.value.filter(({ id: l }) => l !== o.id);
    }
    function I(o) {
      var i, l;
      B.value && !((l = (i = o.currentTarget) == null ? void 0 : i.contains) != null && l.call(i, o.relatedTarget)) && (B.value = false, H.value && (H.value.focus({ preventScroll: true }), H.value = null));
    }
    function Y(o) {
      o.target instanceof HTMLElement && o.target.dataset.dismissible === "false" || B.value || (B.value = true, H.value = o.relatedTarget);
    }
    function gt(o) {
      o.target && o.target instanceof HTMLElement && o.target.dataset.dismissible === "false" || (u.value = true);
    }
    return watchEffect((o) => {
      const i = E.subscribe((l) => {
        if (l.dismiss) {
          r.value = r.value.map(
            (k) => k.id === l.id ? { ...k, delete: true } : k
          );
          return;
        }
        nextTick(() => {
          const k = r.value.findIndex(
            (b) => b.id === l.id
          );
          k !== -1 ? r.value = [
            ...r.value.slice(0, k),
            { ...r.value[k], ...l },
            ...r.value.slice(k + 1)
          ] : r.value = [l, ...r.value];
        });
      });
      o(i);
    }), watch(
      () => a.theme,
      (o) => {
        if (o !== "system") {
          m.value = o;
          return;
        }
        if (o === "system" && ((void 0).matchMedia && (void 0).matchMedia("(prefers-color-scheme: dark)").matches ? m.value = "dark" : m.value = "light"), "undefined" > "u") return;
      }
    ), watchEffect(() => {
      y.value && H.value && (H.value.focus({ preventScroll: true }), H.value = null, B.value = false);
    }), watchEffect(() => {
      r.value.length <= 1 && (h.value = false);
    }), watchEffect((o) => {
    }), (o, i) => (openBlock(), createElementBlock("section", {
      "aria-label": `${o.containerAriaLabel} ${unref(pt)}`,
      tabIndex: -1,
      "aria-live": "polite",
      "aria-relevant": "additions text",
      "aria-atomic": "false"
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(T.value, (l, k) => {
        var b;
        return openBlock(), createElementBlock("ol", mergeProps({
          key: l,
          ref_for: true,
          ref_key: "listRef",
          ref: y,
          "data-sonner-toaster": "",
          class: a.class,
          dir: o.dir === "auto" ? t() : o.dir,
          tabIndex: -1,
          "data-theme": o.theme,
          "data-rich-colors": o.richColors,
          "data-y-position": l.split("-")[0],
          "data-x-position": l.split("-")[1],
          "data-lifted": h.value && r.value.length > 1 && !o.expand,
          style: {
            "--front-toast-height": `${(b = P.value[0]) == null ? void 0 : b.height}px`,
            "--offset": typeof o.offset == "number" ? `${o.offset}px` : o.offset || Ut,
            "--width": `${Ne}px`,
            "--gap": `${o.gap}px`,
            ...o.style,
            ...unref(n).style
          }
        }, o.$attrs, {
          onBlur: I,
          onFocus: Y,
          onMouseenter: i[1] || (i[1] = () => h.value = true),
          onMousemove: i[2] || (i[2] = () => h.value = true),
          onMouseleave: i[3] || (i[3] = () => {
            u.value || (h.value = false);
          }),
          onPointerdown: gt,
          onPointerup: i[4] || (i[4] = () => u.value = false)
        }), [
          (openBlock(true), createElementBlock(Fragment, null, renderList(g.value(l, k), (z, O) => {
            var _a, _b, _c;
            var G, Q, ot, st, nt, rt, it, lt, j;
            return openBlock(), createBlock(fe, {
              key: z.id,
              heights: P.value.filter((M) => M.position === z.position),
              icons: o.icons,
              index: O,
              toast: z,
              defaultRichColors: o.richColors,
              duration: (_a = (G = o.toastOptions) == null ? void 0 : G.duration) != null ? _a : o.duration,
              class: normalizeClass((_b = (Q = o.toastOptions) == null ? void 0 : Q.class) != null ? _b : ""),
              descriptionClass: (ot = o.toastOptions) == null ? void 0 : ot.descriptionClass,
              invert: o.invert,
              visibleToasts: o.visibleToasts,
              closeButton: (_c = (st = o.toastOptions) == null ? void 0 : st.closeButton) != null ? _c : o.closeButton,
              interacting: u.value,
              position: l,
              style: normalizeStyle((nt = o.toastOptions) == null ? void 0 : nt.style),
              unstyled: (rt = o.toastOptions) == null ? void 0 : rt.unstyled,
              classes: (it = o.toastOptions) == null ? void 0 : it.classes,
              cancelButtonStyle: (lt = o.toastOptions) == null ? void 0 : lt.cancelButtonStyle,
              actionButtonStyle: (j = o.toastOptions) == null ? void 0 : j.actionButtonStyle,
              toasts: r.value.filter((M) => M.position === z.position),
              expandByDefault: o.expand,
              gap: o.gap,
              expanded: h.value,
              pauseWhenPageIsHidden: o.pauseWhenPageIsHidden,
              cn: o.cn,
              "onUpdate:heights": i[0] || (i[0] = (M) => {
                P.value = M;
              }),
              onRemoveToast: ht
            }, {
              "close-icon": withCtx(() => [
                renderSlot(o.$slots, "close-icon", {}, () => [
                  createVNode(me)
                ])
              ]),
              "loading-icon": withCtx(() => [
                renderSlot(o.$slots, "loading-icon", {}, () => [
                  createVNode(be, {
                    visible: z.type === "loading"
                  }, null, 8, ["visible"])
                ])
              ]),
              "success-icon": withCtx(() => [
                renderSlot(o.$slots, "success-icon", {}, () => [
                  createVNode(Te)
                ])
              ]),
              "error-icon": withCtx(() => [
                renderSlot(o.$slots, "error-icon", {}, () => [
                  createVNode(Oe)
                ])
              ]),
              "warning-icon": withCtx(() => [
                renderSlot(o.$slots, "warning-icon", {}, () => [
                  createVNode(De)
                ])
              ]),
              "info-icon": withCtx(() => [
                renderSlot(o.$slots, "info-icon", {}, () => [
                  createVNode($e)
                ])
              ]),
              _: 2
            }, 1032, ["heights", "icons", "index", "toast", "defaultRichColors", "duration", "class", "descriptionClass", "invert", "visibleToasts", "closeButton", "interacting", "position", "style", "unstyled", "classes", "cancelButtonStyle", "actionButtonStyle", "toasts", "expandByDefault", "gap", "expanded", "pauseWhenPageIsHidden", "cn"]);
          }), 128))
        ], 16, Le);
      }), 128))
    ], 8, Ae));
  }
});

export { Ke as K, VApp as V, Ve as a };
//# sourceMappingURL=vue-sonner-CaIlIz9M.mjs.map
