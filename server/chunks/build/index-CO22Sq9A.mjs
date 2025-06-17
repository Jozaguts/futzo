import { defineComponent, withCtx, createVNode, mergeProps, createTextVNode, unref, toDisplayString, shallowRef, h, resolveComponent, computed, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, af as VSelect, h as useRoute$1, i as useRouter$1, aU as useNuxtApp, aV as parseQuery, aW as hasProtocol, aX as resolveRouteObject$1, aY as joinURL, aK as useRuntimeConfig, aZ as navigateTo, a_ as withTrailingSlash, a$ as withoutTrailingSlash, b0 as nuxtLinkDefaults } from './server.mjs';
import { V as VTable } from './VTable-BTxmY7C0.mjs';
import { _ as __nuxt_component_0$1 } from './index-DkcY5wU8.mjs';
import { _ as _sfc_main$8 } from './index-BgGrO183.mjs';
import { _ as _sfc_main$2$1, a as _sfc_main$9 } from './AppBar-BcqMvHzz.mjs';
import { e as useTournamentStore } from './useScheduleStore-DBhAIDF3.mjs';
import { u as useToast } from './useToast-m9XhiEp3.mjs';
import { storeToRefs } from 'pinia';
import { _ as __nuxt_component_0$2 } from './PrimaryBtn-B0RnAWAj.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'node:module';
import 'ipx';
import 'vue-router';
import '@iconify/vue';
import 'perfect-scrollbar';
import 'deep-pick-omit';
import 'dayjs';
import 'dayjs/plugin/customParseFormat.js';
import 'dayjs/locale/es.js';
import 'awesome-phonenumber';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './VSheet-DVv3ytGE.mjs';
import './TransitionSlide-d5qGX2mN.mjs';
import './vue-transitions-gDOXGptb.mjs';
import '@morev/utils';
import './BaseInput-CrKT6v3K.mjs';
import './VRow-CwLG7ojV.mjs';
import './BaseCalendarInput-D8pdf43z.mjs';
import './main-BplioMC0.mjs';
import 'date-fns';
import './drag-drop-image-DRFieU2I.mjs';
import './interval-DSlygkzF.mjs';
import './VFileInput-gw90YVbK.mjs';
import './VBtn-_od1f1mx.mjs';
import './useSchemas-CFMbNxa_.mjs';
import './vee-validate-DglmwfQ_.mjs';
import 'yup';
import './CategoriesSelect-D1ehrnKL.mjs';
import './VContainer-C0Se5csP.mjs';
import './VTooltip-BQZt6HQd.mjs';
import './VAutocomplete-P_wP5bep.mjs';
import './filter-PqGpj4I-.mjs';
import './IndicatorStep-DKaB2dCI.mjs';
import './VDialog-BeIjnChI.mjs';
import './layout-Bel3IrLG.mjs';
import '@vue/reactivity';

const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(link) {
    return typeof link === "string" && link.startsWith("#");
  }
  function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
    const effectiveTrailingSlash = trailingSlash != null ? trailingSlash : options.trailingSlash;
    if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
    };
    return resolvedPath;
  }
  function useNuxtLink(props) {
    var _a, _b, _c;
    const router = useRouter$1();
    const config = useRuntimeConfig();
    const hasTarget = computed(() => !!props.target && props.target !== "_self");
    const isAbsoluteUrl = computed(() => {
      const path = props.to || props.href || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const builtinRouterLink = resolveComponent("RouterLink");
    const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
    const isExternal = computed(() => {
      if (props.external) {
        return true;
      }
      const path = props.to || props.href || "";
      if (typeof path === "object") {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const to = computed(() => {
      const path = props.to || props.href || "";
      if (isExternal.value) {
        return path;
      }
      return resolveTrailingSlashBehavior(path, router.resolve, props.trailingSlash);
    });
    const link = isExternal.value ? void 0 : useBuiltinLink == null ? void 0 : useBuiltinLink({ ...props, to });
    const href = computed(() => {
      var _a3, _b2;
      var _a2;
      const effectiveTrailingSlash = (_a3 = props.trailingSlash) != null ? _a3 : options.trailingSlash;
      if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
        return to.value;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject$1(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        return applyTrailingSlashBehavior(href2, effectiveTrailingSlash);
      }
      if (typeof to.value === "object") {
        return (_b2 = (_a2 = router.resolve(to.value)) == null ? void 0 : _a2.href) != null ? _b2 : null;
      }
      return applyTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), effectiveTrailingSlash);
    });
    return {
      to,
      hasTarget,
      isAbsoluteUrl,
      isExternal,
      //
      href,
      isActive: (_a = link == null ? void 0 : link.isActive) != null ? _a : computed(() => to.value === router.currentRoute.value.path),
      isExactActive: (_b = link == null ? void 0 : link.isExactActive) != null ? _b : computed(() => to.value === router.currentRoute.value.path),
      route: (_c = link == null ? void 0 : link.route) != null ? _c : computed(() => router.resolve(to.value)),
      async navigate(_e) {
        await navigateTo(href.value, { replace: props.replace, external: isExternal.value || hasTarget.value });
      }
    };
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetchOn: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Behavior
      trailingSlash: {
        type: String,
        default: void 0,
        required: false
      }
    },
    useLink: useNuxtLink,
    setup(props, { slots }) {
      useRouter$1();
      const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
      shallowRef(false);
      const el = void 0;
      const elRef = void 0;
      async function prefetch(nuxtApp = useNuxtApp()) {
        {
          return;
        }
      }
      return () => {
        var _a;
        if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href: href.value,
            navigate,
            prefetch,
            get route() {
              if (!href.value) {
                return void 0;
              }
              const url = new URL(href.value, "http://localhost");
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href: href.value
              };
            },
            rel,
            target,
            isExternal: isExternal.value || hasTarget.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href: href.value || null, rel, target }, (_a = slots.default) == null ? void 0 : _a.call(slots));
      };
    }
    // }) as unknown as DefineComponent<NuxtLinkProps, object, object, ComputedOptions, MethodOptions, object, object, EmitsOptions, string, object, NuxtLinkProps, object, SlotsType<NuxtLinkSlots>>
  });
}
const __nuxt_component_0 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
const _sfc_main$7 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(ssrRenderComponent(VTable, mergeProps({ class: "positions-table futzo-table" }, _attrs), {
    top: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h2 class="positions-table-title mt-0" data-v-26437e4a${_scopeId}>Tabla de posiciones</h2>`);
      } else {
        return [
          createVNode("h2", { class: "positions-table-title mt-0" }, "Tabla de posiciones")
        ];
      }
    }),
    wrapper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="v-table__wrapper" data-v-26437e4a${_scopeId}><table data-v-26437e4a${_scopeId}><thead data-v-26437e4a${_scopeId}><tr data-v-26437e4a${_scopeId}><th data-v-26437e4a${_scopeId}>Posici\xF3n</th><th data-v-26437e4a${_scopeId}>Equipo</th><th data-v-26437e4a${_scopeId}>PJ</th><th data-v-26437e4a${_scopeId}>PG</th><th data-v-26437e4a${_scopeId}>PE</th><th data-v-26437e4a${_scopeId}>PP</th><th data-v-26437e4a${_scopeId}>GF</th><th data-v-26437e4a${_scopeId}>GC</th><th data-v-26437e4a${_scopeId}>DG</th><th data-v-26437e4a${_scopeId}>Pts</th></tr></thead><tbody data-v-26437e4a${_scopeId}><tr data-v-26437e4a${_scopeId}><td data-v-26437e4a${_scopeId}>1</td><td data-v-26437e4a${_scopeId}>Equipo 1</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>3</td><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>0</td><td data-v-26437e4a${_scopeId}>10</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>11</td></tr><tr data-v-26437e4a${_scopeId}><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>Equipo 2</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>3</td><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>0</td><td data-v-26437e4a${_scopeId}>10</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>11</td></tr><tr data-v-26437e4a${_scopeId}><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>Equipo 2</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>3</td><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>0</td><td data-v-26437e4a${_scopeId}>10</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>11</td></tr><tr data-v-26437e4a${_scopeId}><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>Equipo 2</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>3</td><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>0</td><td data-v-26437e4a${_scopeId}>10</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>11</td></tr><tr data-v-26437e4a${_scopeId}><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>Equipo 2</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>3</td><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>0</td><td data-v-26437e4a${_scopeId}>10</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>11</td></tr><tr data-v-26437e4a${_scopeId}><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>Equipo 2</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>3</td><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>0</td><td data-v-26437e4a${_scopeId}>10</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>11</td></tr><tr data-v-26437e4a${_scopeId}><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>Equipo 2</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>3</td><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>0</td><td data-v-26437e4a${_scopeId}>10</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>11</td></tr><tr data-v-26437e4a${_scopeId}><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>Equipo 2</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>3</td><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>0</td><td data-v-26437e4a${_scopeId}>10</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>11</td></tr><tr data-v-26437e4a${_scopeId}><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>Equipo 2</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>3</td><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>0</td><td data-v-26437e4a${_scopeId}>10</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>11</td></tr><tr data-v-26437e4a${_scopeId}><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>Equipo 2</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>3</td><td data-v-26437e4a${_scopeId}>2</td><td data-v-26437e4a${_scopeId}>0</td><td data-v-26437e4a${_scopeId}>10</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>5</td><td data-v-26437e4a${_scopeId}>11</td></tr></tbody></table></div>`);
      } else {
        return [
          createVNode("div", { class: "v-table__wrapper" }, [
            createVNode("table", null, [
              createVNode("thead", null, [
                createVNode("tr", null, [
                  createVNode("th", null, "Posici\xF3n"),
                  createVNode("th", null, "Equipo"),
                  createVNode("th", null, "PJ"),
                  createVNode("th", null, "PG"),
                  createVNode("th", null, "PE"),
                  createVNode("th", null, "PP"),
                  createVNode("th", null, "GF"),
                  createVNode("th", null, "GC"),
                  createVNode("th", null, "DG"),
                  createVNode("th", null, "Pts")
                ])
              ]),
              createVNode("tbody", null, [
                createVNode("tr", null, [
                  createVNode("td", null, "1"),
                  createVNode("td", null, "Equipo 1"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ])
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/positions-table.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const PositionsTable = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-26437e4a"]]);
const _sfc_main$6 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_Icon = __nuxt_component_0$1;
  _push(ssrRenderComponent(VTable, mergeProps({
    class: "live-games-table futzo-rounded",
    density: "comfortable"
  }, _attrs), {
    top: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h2 class="live-games-table__title" data-v-f9751c33${_scopeId}>Tabla de posiciones</h2>`);
      } else {
        return [
          createVNode("h2", { class: "live-games-table__title" }, "Tabla de posiciones")
        ];
      }
    }),
    wrapper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="v-table__wrapper content" data-v-f9751c33${_scopeId}><table data-v-f9751c33${_scopeId}><tbody data-v-f9751c33${_scopeId}><tr class="live-games-table__cell" data-v-f9751c33${_scopeId}><td class="team" data-v-f9751c33${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-f9751c33${_scopeId}><span class="team_name" data-v-f9751c33${_scopeId}>Equipo 1</span></td><td class="data" data-v-f9751c33${_scopeId}><div class="live" data-v-f9751c33${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Icon, { name: "futzo-icon:ellipse-red" }, null, _parent2, _scopeId));
        _push2(`<span data-v-f9751c33${_scopeId}>Live</span></div><div class="result" data-v-f9751c33${_scopeId}><div class="text" data-v-f9751c33${_scopeId}>1:3</div></div></td><td class="team" data-v-f9751c33${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-f9751c33${_scopeId}><span class="team_name" data-v-f9751c33${_scopeId}>Equipo 1</span></td></tr><tr class="live-games-table__cell" data-v-f9751c33${_scopeId}><td class="team" data-v-f9751c33${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-f9751c33${_scopeId}><span class="team_name" data-v-f9751c33${_scopeId}>Equipo 1</span></td><td class="data" data-v-f9751c33${_scopeId}><div class="live" data-v-f9751c33${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Icon, { name: "futzo-icon:ellipse-red" }, null, _parent2, _scopeId));
        _push2(`<span data-v-f9751c33${_scopeId}>Live</span></div><div class="result" data-v-f9751c33${_scopeId}><div class="text" data-v-f9751c33${_scopeId}>1:3</div></div></td><td class="team" data-v-f9751c33${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-f9751c33${_scopeId}><span class="team_name" data-v-f9751c33${_scopeId}>Equipo 1</span></td></tr><tr class="live-games-table__cell" data-v-f9751c33${_scopeId}><td class="team" data-v-f9751c33${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-f9751c33${_scopeId}><span class="team_name" data-v-f9751c33${_scopeId}>Equipo 1</span></td><td class="data" data-v-f9751c33${_scopeId}><div class="live" data-v-f9751c33${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Icon, { name: "futzo-icon:ellipse-red" }, null, _parent2, _scopeId));
        _push2(`<span data-v-f9751c33${_scopeId}>Live</span></div><div class="result" data-v-f9751c33${_scopeId}><div class="text" data-v-f9751c33${_scopeId}>1:3</div></div></td><td class="team" data-v-f9751c33${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-f9751c33${_scopeId}><span class="team_name" data-v-f9751c33${_scopeId}>Equipo 1</span></td></tr></tbody></table></div>`);
      } else {
        return [
          createVNode("div", { class: "v-table__wrapper content" }, [
            createVNode("table", null, [
              createVNode("tbody", null, [
                createVNode("tr", { class: "live-games-table__cell" }, [
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ]),
                  createVNode("td", { class: "data" }, [
                    createVNode("div", { class: "live" }, [
                      createVNode(_component_Icon, { name: "futzo-icon:ellipse-red" }),
                      createVNode("span", null, "Live")
                    ]),
                    createVNode("div", { class: "result" }, [
                      createVNode("div", { class: "text" }, "1:3")
                    ])
                  ]),
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ])
                ]),
                createVNode("tr", { class: "live-games-table__cell" }, [
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ]),
                  createVNode("td", { class: "data" }, [
                    createVNode("div", { class: "live" }, [
                      createVNode(_component_Icon, { name: "futzo-icon:ellipse-red" }),
                      createVNode("span", null, "Live")
                    ]),
                    createVNode("div", { class: "result" }, [
                      createVNode("div", { class: "text" }, "1:3")
                    ])
                  ]),
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ])
                ]),
                createVNode("tr", { class: "live-games-table__cell" }, [
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ]),
                  createVNode("td", { class: "data" }, [
                    createVNode("div", { class: "live" }, [
                      createVNode(_component_Icon, { name: "futzo-icon:ellipse-red" }),
                      createVNode("span", null, "Live")
                    ]),
                    createVNode("div", { class: "result" }, [
                      createVNode("div", { class: "text" }, "1:3")
                    ])
                  ]),
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ])
                ])
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/live-games.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const LiveGames = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-f9751c33"]]);
const _sfc_main$5 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(ssrRenderComponent(VTable, mergeProps({
    class: "next-games-today-table futzo-rounded",
    density: "comfortable"
  }, _attrs), {
    top: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h2 class="next-games-today-table__title" data-v-2a867141${_scopeId}>Pr\xF3ximos partidos hoy</h2>`);
      } else {
        return [
          createVNode("h2", { class: "next-games-today-table__title" }, "Pr\xF3ximos partidos hoy")
        ];
      }
    }),
    wrapper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="v-table__wrapper content" data-v-2a867141${_scopeId}><table data-v-2a867141${_scopeId}><tbody data-v-2a867141${_scopeId}><tr class="next-games-today-table__cell" data-v-2a867141${_scopeId}><td class="team" data-v-2a867141${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-2a867141${_scopeId}><span class="team_name" data-v-2a867141${_scopeId}>Equipo 1</span></td><td class="data" data-v-2a867141${_scopeId}><span class="date" data-v-2a867141${_scopeId}>24/06/2024</span><span class="result" data-v-2a867141${_scopeId}>10:00</span><span class="field" data-v-2a867141${_scopeId}>Campo 1</span></td><td class="team" data-v-2a867141${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-2a867141${_scopeId}><span class="team_name" data-v-2a867141${_scopeId}>Equipo 1</span></td></tr><tr class="next-games-today-table__cell" data-v-2a867141${_scopeId}><td class="team" data-v-2a867141${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-2a867141${_scopeId}><span class="team_name" data-v-2a867141${_scopeId}>Equipo 1</span></td><td class="data" data-v-2a867141${_scopeId}><span class="date" data-v-2a867141${_scopeId}>24/06/2024</span><span class="result" data-v-2a867141${_scopeId}>10:00</span><span class="field" data-v-2a867141${_scopeId}>Campo 1</span></td><td class="team" data-v-2a867141${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-2a867141${_scopeId}><span class="team_name" data-v-2a867141${_scopeId}>Equipo 1</span></td></tr><tr class="next-games-today-table__cell" data-v-2a867141${_scopeId}><td class="team" data-v-2a867141${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-2a867141${_scopeId}><span class="team_name" data-v-2a867141${_scopeId}>Equipo 1</span></td><td class="data" data-v-2a867141${_scopeId}><span class="date" data-v-2a867141${_scopeId}>24/06/2024</span><span class="result" data-v-2a867141${_scopeId}>10:00</span><span class="field" data-v-2a867141${_scopeId}>Campo 1</span></td><td class="team" data-v-2a867141${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-2a867141${_scopeId}><span class="team_name" data-v-2a867141${_scopeId}>Equipo 1</span></td></tr></tbody></table></div>`);
      } else {
        return [
          createVNode("div", { class: "v-table__wrapper content" }, [
            createVNode("table", null, [
              createVNode("tbody", null, [
                createVNode("tr", { class: "next-games-today-table__cell" }, [
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ]),
                  createVNode("td", { class: "data" }, [
                    createVNode("span", { class: "date" }, "24/06/2024"),
                    createVNode("span", { class: "result" }, "10:00"),
                    createVNode("span", { class: "field" }, "Campo 1")
                  ]),
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ])
                ]),
                createVNode("tr", { class: "next-games-today-table__cell" }, [
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ]),
                  createVNode("td", { class: "data" }, [
                    createVNode("span", { class: "date" }, "24/06/2024"),
                    createVNode("span", { class: "result" }, "10:00"),
                    createVNode("span", { class: "field" }, "Campo 1")
                  ]),
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ])
                ]),
                createVNode("tr", { class: "next-games-today-table__cell" }, [
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ]),
                  createVNode("td", { class: "data" }, [
                    createVNode("span", { class: "date" }, "24/06/2024"),
                    createVNode("span", { class: "result" }, "10:00"),
                    createVNode("span", { class: "field" }, "Campo 1")
                  ]),
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ])
                ])
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/next-games-today.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const NextGamesToday = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-2a867141"]]);
const _sfc_main$4 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0;
  const _component_Icon = __nuxt_component_0$1;
  _push(ssrRenderComponent(VTable, mergeProps({
    class: "next-games-table futzo-rounded",
    hover: false
  }, _attrs), {
    top: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="next-games-table__header" data-v-caa74355${_scopeId}><h2 class="next-games-table-title" data-v-caa74355${_scopeId}>Pr\xF3ximos juegos</h2>`);
        _push2(ssrRenderComponent(_component_nuxt_link, {
          to: "/",
          class: "next-games-table-link"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Ver todos`);
            } else {
              return [
                createTextVNode("Ver todos")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "next-games-table__header" }, [
            createVNode("h2", { class: "next-games-table-title" }, "Pr\xF3ximos juegos"),
            createVNode(_component_nuxt_link, {
              to: "/",
              class: "next-games-table-link"
            }, {
              default: withCtx(() => [
                createTextVNode("Ver todos")
              ]),
              _: 1
            })
          ])
        ];
      }
    }),
    wrapper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="v-table__wrapper" data-v-caa74355${_scopeId}><table data-v-caa74355${_scopeId}><tbody data-v-caa74355${_scopeId}><tr data-v-caa74355${_scopeId}><td data-v-caa74355${_scopeId}><div class="game-container" data-v-caa74355${_scopeId}><div class="teams" data-v-caa74355${_scopeId}><div class="team-local" data-v-caa74355${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-caa74355${_scopeId}><span class="team_name" data-v-caa74355${_scopeId}>Equipo 1</span></div><div class="vs-container" data-v-caa74355${_scopeId}><div class="vs" data-v-caa74355${_scopeId}>vs</div></div><div class="team-away" data-v-caa74355${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-caa74355${_scopeId}><span class="team_name" data-v-caa74355${_scopeId}>Equipo 1</span></div></div><div class="data" data-v-caa74355${_scopeId}><span class="date" data-v-caa74355${_scopeId}>24/06/2024</span><span class="hour" data-v-caa74355${_scopeId}>10:00</span><span class="field" data-v-caa74355${_scopeId}>Campo 1</span></div><div class="btn-container" data-v-caa74355${_scopeId}>`);
        _push2(ssrRenderComponent(_component_nuxt_link, { class: "d-flex align-center" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<span class="btn-text" data-v-caa74355${_scopeId2}> Ver detalles</span>`);
              _push3(ssrRenderComponent(_component_Icon, { name: "futzo-icon:arrow-right" }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode("span", { class: "btn-text" }, " Ver detalles"),
                createVNode(_component_Icon, { name: "futzo-icon:arrow-right" })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></div></td></tr><tr data-v-caa74355${_scopeId}><td data-v-caa74355${_scopeId}><div class="game-container" data-v-caa74355${_scopeId}><div class="teams" data-v-caa74355${_scopeId}><div class="team-local" data-v-caa74355${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-caa74355${_scopeId}><span class="team_name" data-v-caa74355${_scopeId}>Equipo 1</span></div><div class="vs-container" data-v-caa74355${_scopeId}><div class="vs" data-v-caa74355${_scopeId}>vs</div></div><div class="team-away" data-v-caa74355${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-caa74355${_scopeId}><span class="team_name" data-v-caa74355${_scopeId}>Equipo 1</span></div></div><div class="data" data-v-caa74355${_scopeId}><span class="date" data-v-caa74355${_scopeId}>24/06/2024</span><span class="hour" data-v-caa74355${_scopeId}>10:00</span><span class="field" data-v-caa74355${_scopeId}>Campo 1</span></div><div class="btn-container" data-v-caa74355${_scopeId}>`);
        _push2(ssrRenderComponent(_component_nuxt_link, { class: "d-flex align-center" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<span class="btn-text" data-v-caa74355${_scopeId2}> Ver detalles</span>`);
              _push3(ssrRenderComponent(_component_Icon, { name: "futzo-icon:arrow-right" }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode("span", { class: "btn-text" }, " Ver detalles"),
                createVNode(_component_Icon, { name: "futzo-icon:arrow-right" })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></div></td></tr></tbody></table></div>`);
      } else {
        return [
          createVNode("div", { class: "v-table__wrapper" }, [
            createVNode("table", null, [
              createVNode("tbody", null, [
                createVNode("tr", null, [
                  createVNode("td", null, [
                    createVNode("div", { class: "game-container" }, [
                      createVNode("div", { class: "teams" }, [
                        createVNode("div", { class: "team-local" }, [
                          createVNode("img", {
                            src: "https://placehold.co/50x50",
                            alt: "team logo",
                            class: "logo"
                          }),
                          createVNode("span", { class: "team_name" }, "Equipo 1")
                        ]),
                        createVNode("div", { class: "vs-container" }, [
                          createVNode("div", { class: "vs" }, "vs")
                        ]),
                        createVNode("div", { class: "team-away" }, [
                          createVNode("img", {
                            src: "https://placehold.co/50x50",
                            alt: "team logo",
                            class: "logo"
                          }),
                          createVNode("span", { class: "team_name" }, "Equipo 1")
                        ])
                      ]),
                      createVNode("div", { class: "data" }, [
                        createVNode("span", { class: "date" }, "24/06/2024"),
                        createVNode("span", { class: "hour" }, "10:00"),
                        createVNode("span", { class: "field" }, "Campo 1")
                      ]),
                      createVNode("div", { class: "btn-container" }, [
                        createVNode(_component_nuxt_link, { class: "d-flex align-center" }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "btn-text" }, " Ver detalles"),
                            createVNode(_component_Icon, { name: "futzo-icon:arrow-right" })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ])
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, [
                    createVNode("div", { class: "game-container" }, [
                      createVNode("div", { class: "teams" }, [
                        createVNode("div", { class: "team-local" }, [
                          createVNode("img", {
                            src: "https://placehold.co/50x50",
                            alt: "team logo",
                            class: "logo"
                          }),
                          createVNode("span", { class: "team_name" }, "Equipo 1")
                        ]),
                        createVNode("div", { class: "vs-container" }, [
                          createVNode("div", { class: "vs" }, "vs")
                        ]),
                        createVNode("div", { class: "team-away" }, [
                          createVNode("img", {
                            src: "https://placehold.co/50x50",
                            alt: "team logo",
                            class: "logo"
                          }),
                          createVNode("span", { class: "team_name" }, "Equipo 1")
                        ])
                      ]),
                      createVNode("div", { class: "data" }, [
                        createVNode("span", { class: "date" }, "24/06/2024"),
                        createVNode("span", { class: "hour" }, "10:00"),
                        createVNode("span", { class: "field" }, "Campo 1")
                      ]),
                      createVNode("div", { class: "btn-container" }, [
                        createVNode(_component_nuxt_link, { class: "d-flex align-center" }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "btn-text" }, " Ver detalles"),
                            createVNode(_component_Icon, { name: "futzo-icon:arrow-right" })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/next-games.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const NextGames = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-caa74355"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "mark-as-input",
  __ssrInlineRender: true,
  setup(__props) {
    const { tournament } = storeToRefs(useTournamentStore());
    const items = [
      { value: "creado", text: "Creado", disabled: true },
      { value: "en curso", text: "En curso", disabled: false },
      { value: "completado", text: "Completado", disabled: false },
      { value: "cancelado", text: "Cancelado", disabled: false }
    ];
    const updateTournamentStatusHandler = (value) => {
      useTournamentStore().updateTournamentStatus(value).then(() => {
        useToast().toast("success", "Torneo", "Estado del torneo actualizado correctamente");
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VSelect, mergeProps({
        class: "app-bar-secondary-btn mr-4",
        width: "170",
        "item-title": "text",
        density: "compact",
        "item-value": "value",
        label: "Marcar como",
        variant: "outlined",
        modelValue: unref(tournament).status,
        "onUpdate:modelValue": [($event) => unref(tournament).status = $event, updateTournamentStatusHandler],
        items,
        "item-props": true
      }, _attrs), {
        selection: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="app-bar-secondary-btn__input_text"${_scopeId}>${ssrInterpolate(item.title)}</span>`);
          } else {
            return [
              createVNode("span", { class: "app-bar-secondary-btn__input_text" }, toDisplayString(item.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/torneo/mark-as-input.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "show-calendar-btn",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PrimaryBtn = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_PrimaryBtn, mergeProps({
        variant: "elevated",
        icon: "futzo-icon:calendar-white",
        text: "Ver calendario",
        disabled: unref(route).name === "torneos-torneo-calendario",
        onClick: ($event) => _ctx.$router.push({
          name: "torneos-torneo-calendario",
          params: { torneo: unref(route).params.torneo }
        })
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/torneo/show-calendar-btn.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "app-bar-btn",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex mr-8" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/torneo/app-bar-btn.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2$1, _attrs, {
        "app-bar": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$9, null, {
              buttons: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$1, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$9, null, {
                buttons: withCtx(() => [
                  createVNode(_sfc_main$1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tournament-details-container"${_scopeId}><div class="table-container"${_scopeId}>`);
            _push2(ssrRenderComponent(PositionsTable, null, null, _parent2, _scopeId));
            _push2(`</div><div class="games-container"${_scopeId}><div class="live-games"${_scopeId}>`);
            _push2(ssrRenderComponent(LiveGames, null, null, _parent2, _scopeId));
            _push2(`</div><div class="next-games-today"${_scopeId}>`);
            _push2(ssrRenderComponent(NextGamesToday, null, null, _parent2, _scopeId));
            _push2(`</div></div><div class="next-games"${_scopeId}>`);
            _push2(ssrRenderComponent(NextGames, null, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$8, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "tournament-details-container" }, [
                createVNode("div", { class: "table-container" }, [
                  createVNode(PositionsTable)
                ]),
                createVNode("div", { class: "games-container" }, [
                  createVNode("div", { class: "live-games" }, [
                    createVNode(LiveGames)
                  ]),
                  createVNode("div", { class: "next-games-today" }, [
                    createVNode(NextGamesToday)
                  ])
                ]),
                createVNode("div", { class: "next-games" }, [
                  createVNode(NextGames)
                ]),
                createVNode(_sfc_main$8)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/torneos/[torneo]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CO22Sq9A.mjs.map
