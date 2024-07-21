import { defineComponent, ref, withAsyncContext, watchEffect, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "nuxt-icon",
  __ssrInlineRender: true,
  props: {
    name: {},
    filled: { type: Boolean, default: false }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const icon = ref("");
    let hasStroke = false;
    async function getIcon() {
      try {
        const iconsImport = /* @__PURE__ */ Object.assign({
          "/assets/icons/Ellipse-red.svg": () => import('./Ellipse-red-Dh2yJbUv.mjs').then((m) => m["default"]),
          "/assets/icons/apple.svg": () => import('./apple-3yNmoVL5.mjs').then((m) => m["default"]),
          "/assets/icons/arrow-left.svg": () => import('./arrow-left-D2dYDbjH.mjs').then((m) => m["default"]),
          "/assets/icons/arrow-right.svg": () => import('./arrow-right-0BnXvlwe.mjs').then((m) => m["default"]),
          "/assets/icons/ball.svg": () => import('./ball-Co0kwuhL.mjs').then((m) => m["default"]),
          "/assets/icons/calendar.svg": () => import('./calendar-BDoiyWPC.mjs').then((m) => m["default"]),
          "/assets/icons/check-circle-broken.svg": () => import('./check-circle-broken-kI4F1TfY.mjs').then((m) => m["default"]),
          "/assets/icons/check-circle.svg": () => import('./check-circle-Dpb5Gf5d.mjs').then((m) => m["default"]),
          "/assets/icons/check-icon.svg": () => import('./check-icon-7Qnx8jX5.mjs').then((m) => m["default"]),
          "/assets/icons/check-verified-green.svg": () => import('./check-verified-green-D29L7aUM.mjs').then((m) => m["default"]),
          "/assets/icons/facebook.svg": () => import('./facebook-5FeUGAcR.mjs').then((m) => m["default"]),
          "/assets/icons/file-type-img.svg": () => import('./file-type-img-1ltmTnvN.mjs').then((m) => m["default"]),
          "/assets/icons/football.svg": () => import('./football-B7RMRHSV.mjs').then((m) => m["default"]),
          "/assets/icons/google.svg": () => import('./google-DjsH3-KZ.mjs').then((m) => m["default"]),
          "/assets/icons/help-circle.svg": () => import('./help-circle-BXRp4ref.mjs').then((m) => m["default"]),
          "/assets/icons/home.svg": () => import('./home-CojcsTZE.mjs').then((m) => m["default"]),
          "/assets/icons/image-plus-avatar.svg": () => import('./image-plus-avatar-DU7nqzq6.mjs').then((m) => m["default"]),
          "/assets/icons/image-plus.svg": () => import('./image-plus-BQIUoorW.mjs').then((m) => m["default"]),
          "/assets/icons/inbox-02.svg": () => import('./inbox-02-cMca8PoL.mjs').then((m) => m["default"]),
          "/assets/icons/ion_shirt-sharp.svg": () => import('./ion_shirt-sharp-UXoXI0nb.mjs').then((m) => m["default"]),
          "/assets/icons/league-created.svg": () => import('./league-created-BgazAowb.mjs').then((m) => m["default"]),
          "/assets/icons/logout.svg": () => import('./logout-aofVVCP2.mjs').then((m) => m["default"]),
          "/assets/icons/players.svg": () => import('./players-D5WRFUF0.mjs').then((m) => m["default"]),
          "/assets/icons/plus.svg": () => import('./plus-Dq0yLZ64.mjs').then((m) => m["default"]),
          "/assets/icons/settings-01.svg": () => import('./settings-01-D9gbwPtm.mjs').then((m) => m["default"]),
          "/assets/icons/trash-error.svg": () => import('./trash-error-DYIKYyHd.mjs').then((m) => m["default"]),
          "/assets/icons/trash.svg": () => import('./trash-Cjxy9I4_.mjs').then((m) => m["default"]),
          "/assets/icons/trophy-01.svg": () => import('./trophy-01-Dor1LzIk.mjs').then((m) => m["default"]),
          "/assets/icons/trophy.svg": () => import('./trophy-zRI4IybH.mjs').then((m) => m["default"]),
          "/assets/icons/x-close.svg": () => import('./x-close-DQ3ti5T-.mjs').then((m) => m["default"]),
          "/assets/icons/x-dialog.svg": () => import('./x-dialog-QB_O-FYp.mjs').then((m) => m["default"])
        });
        const rawIcon = await iconsImport[`/assets/icons/${props.name}.svg`]();
        if (rawIcon.includes("stroke")) {
          hasStroke = true;
        }
        icon.value = rawIcon;
      } catch {
        console.error(
          `[nuxt-icons] Icon '${props.name}' doesn't exist in 'assets/icons'`
        );
      }
    }
    [__temp, __restore] = withAsyncContext(() => getIcon()), await __temp, __restore();
    watchEffect(getIcon);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["nuxt-icon", { "nuxt-icon--fill": !_ctx.filled, "nuxt-icon--stroke": unref(hasStroke) && !_ctx.filled }]
      }, _attrs))}>${(_a = unref(icon)) != null ? _a : ""}</span>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt-icons/dist/runtime/components/nuxt-icon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=nuxt-icon-BuDW_oT6.mjs.map
