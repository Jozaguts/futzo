(function(){"use strict";try{if(typeof document<"u"){var a=document.createElement("style");a.appendChild(document.createTextNode(".mapdiv[data-v-d05fc6bc]{width:100%;height:100%}.custom-control-wrapper[data-v-d099a3a6]{display:none}.mapdiv .custom-control-wrapper[data-v-d099a3a6]{display:inline-block}.info-window-wrapper[data-v-cbe1707b]{display:none}.mapdiv .info-window-wrapper[data-v-cbe1707b]{display:inline-block}.custom-marker-wrapper[data-v-2d2d343a]{display:none}.mapdiv .custom-marker-wrapper[data-v-2d2d343a]{display:inline-block}")),document.head.appendChild(a)}}catch(d){console.error("vite-plugin-css-injected-by-js",d)}})();
var Be = Object.defineProperty;
var Ze = (n, e, t) => e in n ? Be(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var se = (n, e, t) => (Ze(n, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as P, ref as y, provide as U, watch as L, onMounted as Pe, onBeforeUnmount as q, markRaw as x, toRef as $, openBlock as J, createElementBlock as X, createElementVNode as ae, renderSlot as Q, normalizeProps as Ne, guardReactiveProps as Ue, inject as b, computed as H, Comment as Le, mergeProps as Se, createCommentVNode as xe } from "vue";
const B = Symbol("map"), Z = Symbol("api"), le = Symbol("marker"), ce = Symbol("markerCluster"), ee = Symbol("CustomMarker"), Ae = Symbol("mapTilesLoaded"), F = [
  "click",
  "dblclick",
  "drag",
  "dragend",
  "dragstart",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "rightclick"
];
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function De(n, e, t, s) {
  function r(o) {
    return o instanceof t ? o : new t(function(i) {
      i(o);
    });
  }
  return new (t || (t = Promise))(function(o, i) {
    function c(u) {
      try {
        d(s.next(u));
      } catch (l) {
        i(l);
      }
    }
    function a(u) {
      try {
        d(s.throw(u));
      } catch (l) {
        i(l);
      }
    }
    function d(u) {
      u.done ? o(u.value) : r(u.value).then(c, a);
    }
    d((s = s.apply(n, e || [])).next());
  });
}
var Fe = function n(e, t) {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    var s, r, o;
    if (Array.isArray(e)) {
      if (s = e.length, s != t.length)
        return !1;
      for (r = s; r-- !== 0; )
        if (!n(e[r], t[r]))
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    if (o = Object.keys(e), s = o.length, s !== Object.keys(t).length)
      return !1;
    for (r = s; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = s; r-- !== 0; ) {
      var i = o[r];
      if (!n(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
};
const pe = "__googleMapsScriptId";
var N;
(function(n) {
  n[n.INITIALIZED = 0] = "INITIALIZED", n[n.LOADING = 1] = "LOADING", n[n.SUCCESS = 2] = "SUCCESS", n[n.FAILURE = 3] = "FAILURE";
})(N || (N = {}));
class j {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({ apiKey: e, authReferrerPolicy: t, channel: s, client: r, id: o = pe, language: i, libraries: c = [], mapIds: a, nonce: d, region: u, retries: l = 3, url: h = "https://maps.googleapis.com/maps/api/js", version: p }) {
    if (this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = e, this.authReferrerPolicy = t, this.channel = s, this.client = r, this.id = o || pe, this.language = i, this.libraries = c, this.mapIds = a, this.nonce = d, this.region = u, this.retries = l, this.url = h, this.version = p, j.instance) {
      if (!Fe(this.options, j.instance.options))
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(j.instance.options)}`);
      return j.instance;
    }
    j.instance = this;
  }
  get options() {
    return {
      version: this.version,
      apiKey: this.apiKey,
      channel: this.channel,
      client: this.client,
      id: this.id,
      libraries: this.libraries,
      language: this.language,
      region: this.region,
      mapIds: this.mapIds,
      nonce: this.nonce,
      url: this.url,
      authReferrerPolicy: this.authReferrerPolicy
    };
  }
  get status() {
    return this.errors.length ? N.FAILURE : this.done ? N.SUCCESS : this.loading ? N.LOADING : N.INITIALIZED;
  }
  get failed() {
    return this.done && !this.loading && this.errors.length >= this.retries + 1;
  }
  /**
   * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
   *
   * @ignore
   * @deprecated
   */
  createUrl() {
    let e = this.url;
    return e += "?callback=__googleMapsCallback", this.apiKey && (e += `&key=${this.apiKey}`), this.channel && (e += `&channel=${this.channel}`), this.client && (e += `&client=${this.client}`), this.libraries.length > 0 && (e += `&libraries=${this.libraries.join(",")}`), this.language && (e += `&language=${this.language}`), this.region && (e += `&region=${this.region}`), this.version && (e += `&v=${this.version}`), this.mapIds && (e += `&map_ids=${this.mapIds.join(",")}`), this.authReferrerPolicy && (e += `&auth_referrer_policy=${this.authReferrerPolicy}`), e;
  }
  deleteScript() {
    const e = document.getElementById(this.id);
    e && e.remove();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   * @deprecated, use importLibrary() instead.
   */
  load() {
    return this.loadPromise();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   *
   * @ignore
   * @deprecated, use importLibrary() instead.
   */
  loadPromise() {
    return new Promise((e, t) => {
      this.loadCallback((s) => {
        s ? t(s.error) : e(window.google);
      });
    });
  }
  importLibrary(e) {
    return this.execute(), google.maps.importLibrary(e);
  }
  /**
   * Load the Google Maps JavaScript API script with a callback.
   * @deprecated, use importLibrary() instead.
   */
  loadCallback(e) {
    this.callbacks.push(e), this.execute();
  }
  /**
   * Set the script on document.
   */
  setScript() {
    var e, t;
    if (document.getElementById(this.id)) {
      this.callback();
      return;
    }
    const s = {
      key: this.apiKey,
      channel: this.channel,
      client: this.client,
      libraries: this.libraries.length && this.libraries,
      v: this.version,
      mapIds: this.mapIds,
      language: this.language,
      region: this.region,
      authReferrerPolicy: this.authReferrerPolicy
    };
    Object.keys(s).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (o) => !s[o] && delete s[o]
    ), !((t = (e = window == null ? void 0 : window.google) === null || e === void 0 ? void 0 : e.maps) === null || t === void 0) && t.importLibrary || ((o) => {
      let i, c, a, d = "The Google Maps JavaScript API", u = "google", l = "importLibrary", h = "__ib__", p = document, m = window;
      m = m[u] || (m[u] = {});
      const f = m.maps || (m.maps = {}), g = /* @__PURE__ */ new Set(), v = new URLSearchParams(), w = () => (
        // @ts-ignore
        i || (i = new Promise((_, O) => De(this, void 0, void 0, function* () {
          var M;
          yield c = p.createElement("script"), c.id = this.id, v.set("libraries", [...g] + "");
          for (a in o)
            v.set(a.replace(/[A-Z]/g, (E) => "_" + E[0].toLowerCase()), o[a]);
          v.set("callback", u + ".maps." + h), c.src = this.url + "?" + v, f[h] = _, c.onerror = () => i = O(Error(d + " could not load.")), c.nonce = this.nonce || ((M = p.querySelector("script[nonce]")) === null || M === void 0 ? void 0 : M.nonce) || "", p.head.append(c);
        })))
      );
      f[l] ? console.warn(d + " only loads once. Ignoring:", o) : f[l] = (_, ...O) => g.add(_) && w().then(() => f[l](_, ...O));
    })(s);
    const r = this.libraries.map((o) => this.importLibrary(o));
    r.length || r.push(this.importLibrary("core")), Promise.all(r).then(() => this.callback(), (o) => {
      const i = new ErrorEvent("error", { error: o });
      this.loadErrorCallback(i);
    });
  }
  /**
   * Reset the loader state.
   */
  reset() {
    this.deleteScript(), this.done = !1, this.loading = !1, this.errors = [], this.onerrorEvent = null;
  }
  resetIfRetryingFailed() {
    this.failed && this.reset();
  }
  loadErrorCallback(e) {
    if (this.errors.push(e), this.errors.length <= this.retries) {
      const t = this.errors.length * Math.pow(2, this.errors.length);
      console.error(`Failed to load Google Maps script, retrying in ${t} ms.`), setTimeout(() => {
        this.deleteScript(), this.setScript();
      }, t);
    } else
      this.onerrorEvent = e, this.callback();
  }
  callback() {
    this.done = !0, this.loading = !1, this.callbacks.forEach((e) => {
      e(this.onerrorEvent);
    }), this.callbacks = [];
  }
  execute() {
    if (this.resetIfRetryingFailed(), this.done)
      this.callback();
    else {
      if (window.google && window.google.maps && window.google.maps.version) {
        console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."), this.callback();
        return;
      }
      this.loading || (this.loading = !0, this.setScript());
    }
  }
}
function Ve(n) {
  return class extends n.OverlayView {
    constructor(s) {
      super();
      se(this, "element");
      se(this, "opts");
      const { element: r, ...o } = s;
      this.element = r, this.opts = o, this.opts.map && this.setMap(this.opts.map);
    }
    getPosition() {
      return this.opts.position ? this.opts.position instanceof n.LatLng ? this.opts.position : new n.LatLng(this.opts.position) : null;
    }
    getVisible() {
      if (!this.element)
        return !1;
      const s = this.element;
      return s.style.display !== "none" && s.style.visibility !== "hidden" && (s.style.opacity === "" || Number(s.style.opacity) > 0.01);
    }
    onAdd() {
      if (!this.element)
        return;
      const s = this.getPanes();
      s && s.overlayMouseTarget.appendChild(this.element);
    }
    draw() {
      if (!this.element)
        return;
      const s = this.getProjection(), r = s == null ? void 0 : s.fromLatLngToDivPixel(this.getPosition());
      if (r) {
        this.element.style.position = "absolute";
        let o, i;
        switch (this.opts.anchorPoint) {
          case "TOP_CENTER":
            o = "-50%", i = "-100%";
            break;
          case "BOTTOM_CENTER":
            o = "-50%", i = "0";
            break;
          case "LEFT_CENTER":
            o = "-100%", i = "-50%";
            break;
          case "RIGHT_CENTER":
            o = "0", i = "-50%";
            break;
          case "TOP_LEFT":
            o = "-100%", i = "-100%";
            break;
          case "TOP_RIGHT":
            o = "0", i = "-100%";
            break;
          case "BOTTOM_LEFT":
            o = "-100%", i = "0";
            break;
          case "BOTTOM_RIGHT":
            o = "0", i = "0";
            break;
          default:
            o = "-50%", i = "-50%";
        }
        const c = r.x + (this.opts.offsetX || 0) + "px", a = r.y + (this.opts.offsetY || 0) + "px";
        this.element.style.transform = `translateX(${o}) translateX(${c}) translateY(${i}) translateY(${a})`, this.opts.zIndex && (this.element.style.zIndex = this.opts.zIndex.toString());
      }
    }
    onRemove() {
      this.element && this.element.remove();
    }
    setOptions(s) {
      const { element: r, ...o } = s;
      this.element = r, this.opts = o, this.draw();
    }
  };
}
let fe;
const me = [
  "bounds_changed",
  "center_changed",
  "click",
  "contextmenu",
  "dblclick",
  "drag",
  "dragend",
  "dragstart",
  "heading_changed",
  "idle",
  "isfractionalzoomenabled_changed",
  "mapcapabilities_changed",
  "maptypeid_changed",
  "mousemove",
  "mouseout",
  "mouseover",
  "projection_changed",
  "renderingtype_changed",
  "rightclick",
  "tilesloaded",
  "tilt_changed",
  "zoom_changed"
], ze = P({
  props: {
    apiPromise: {
      type: Promise
    },
    apiKey: {
      type: String,
      default: ""
    },
    version: {
      type: String,
      default: "weekly"
    },
    libraries: {
      type: Array,
      default: () => ["places", "marker"]
    },
    region: {
      type: String,
      required: !1
    },
    language: {
      type: String,
      required: !1
    },
    backgroundColor: {
      type: String,
      required: !1
    },
    center: {
      type: Object,
      default: () => ({ lat: 0, lng: 0 })
    },
    clickableIcons: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    controlSize: {
      type: Number,
      required: !1
    },
    disableDefaultUi: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    disableDoubleClickZoom: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    draggable: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    draggableCursor: {
      type: String,
      required: !1
    },
    draggingCursor: {
      type: String,
      required: !1
    },
    fullscreenControl: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    fullscreenControlPosition: {
      type: String,
      required: !1
    },
    gestureHandling: {
      type: String,
      required: !1
    },
    heading: {
      type: Number,
      required: !1
    },
    isFractionalZoomEnabled: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    keyboardShortcuts: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    mapTypeControl: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    mapTypeControlOptions: {
      type: Object,
      required: !1
    },
    mapTypeId: {
      type: [Number, String],
      required: !1
    },
    mapId: {
      type: String,
      required: !1
    },
    maxZoom: {
      type: Number,
      required: !1
    },
    minZoom: {
      type: Number,
      required: !1
    },
    noClear: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    panControl: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    panControlPosition: {
      type: String,
      required: !1
    },
    restriction: {
      type: Object,
      required: !1
    },
    rotateControl: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    rotateControlPosition: {
      type: String,
      required: !1
    },
    scaleControl: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    scaleControlStyle: {
      type: Number,
      required: !1
    },
    scrollwheel: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    streetView: {
      type: Object,
      required: !1
    },
    streetViewControl: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    streetViewControlPosition: {
      type: String,
      required: !1
    },
    styles: {
      type: Array,
      required: !1
    },
    tilt: {
      type: Number,
      required: !1
    },
    zoom: {
      type: Number,
      required: !1
    },
    zoomControl: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    zoomControlPosition: {
      type: String,
      required: !1
    },
    nonce: {
      type: String,
      default: ""
    }
  },
  emits: me,
  setup(n, { emit: e }) {
    const t = y(), s = y(!1), r = y(), o = y(), i = y(!1);
    U(B, r), U(Z, o), U(Ae, i);
    const c = () => {
      const l = { ...n };
      Object.keys(l).forEach((f) => {
        l[f] === void 0 && delete l[f];
      });
      const p = (f) => {
        var g;
        return f ? { position: (g = o.value) == null ? void 0 : g.ControlPosition[f] } : {};
      }, m = {
        scaleControlOptions: n.scaleControlStyle ? { style: n.scaleControlStyle } : {},
        panControlOptions: p(n.panControlPosition),
        zoomControlOptions: p(n.zoomControlPosition),
        rotateControlOptions: p(n.rotateControlPosition),
        streetViewControlOptions: p(n.streetViewControlPosition),
        fullscreenControlOptions: p(n.fullscreenControlPosition),
        disableDefaultUI: n.disableDefaultUi
      };
      return { ...l, ...m };
    }, a = L(
      [o, r],
      ([l, h]) => {
        const p = l, m = h;
        p && m && (p.event.addListenerOnce(m, "tilesloaded", () => {
          i.value = !0;
        }), setTimeout(a, 0));
      },
      { immediate: !0 }
    ), d = () => {
      try {
        const { apiKey: l, region: h, version: p, language: m, libraries: f, nonce: g } = n;
        fe = new j({ apiKey: l, region: h, version: p, language: m, libraries: f, nonce: g });
      } catch (l) {
        console.error(l);
      }
    }, u = (l) => {
      o.value = x(l.maps), r.value = x(new l.maps.Map(t.value, c()));
      const h = Ve(o.value);
      o.value[ee] = h, me.forEach((m) => {
        var f;
        (f = r.value) == null || f.addListener(m, (g) => e(m, g));
      }), s.value = !0;
      const p = Object.keys(n).filter(
        (m) => !["apiPromise", "apiKey", "version", "libraries", "region", "language", "center", "zoom", "nonce"].includes(m)
      ).map((m) => $(n, m));
      L(
        [() => n.center, () => n.zoom, ...p],
        ([m, f], [g, v]) => {
          var E, k, S;
          const { center: w, zoom: _, ...O } = c();
          (E = r.value) == null || E.setOptions(O), f !== void 0 && f !== v && ((k = r.value) == null || k.setZoom(f));
          const M = !g || m.lng !== g.lng || m.lat !== g.lat;
          m && M && ((S = r.value) == null || S.panTo(m));
        }
      );
    };
    return Pe(() => {
      n.apiPromise && n.apiPromise instanceof Promise ? n.apiPromise.then(u) : (d(), fe.load().then(u));
    }), q(() => {
      var l;
      i.value = !1, r.value && ((l = o.value) == null || l.event.clearInstanceListeners(r.value));
    }), { mapRef: t, ready: s, map: r, api: o, mapTilesLoaded: i };
  }
});
const te = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, r] of e)
    t[s] = r;
  return t;
}, Ge = {
  ref: "mapRef",
  class: "mapdiv"
};
function He(n, e, t, s, r, o) {
  return J(), X("div", null, [
    ae("div", Ge, null, 512),
    Q(n.$slots, "default", Ne(Ue({ ready: n.ready, map: n.map, api: n.api, mapTilesLoaded: n.mapTilesLoaded })), void 0, !0)
  ]);
}
const Et = /* @__PURE__ */ te(ze, [["render", He], ["__scopeId", "data-v-d05fc6bc"]]);
function We(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Ke = function n(e, t) {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    var s, r, o;
    if (Array.isArray(e)) {
      if (s = e.length, s != t.length)
        return !1;
      for (r = s; r-- !== 0; )
        if (!n(e[r], t[r]))
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    if (o = Object.keys(e), s = o.length, s !== Object.keys(t).length)
      return !1;
    for (r = s; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = s; r-- !== 0; ) {
      var i = o[r];
      if (!n(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
};
const A = /* @__PURE__ */ We(Ke), ge = ["click", "drag", "dragend", "dragstart", "gmp-click"], Pt = P({
  name: "AdvancedMarker",
  props: {
    options: {
      type: Object,
      required: !0
    },
    pinOptions: {
      type: Object,
      required: !1
    }
  },
  emits: ge,
  setup(n, { emit: e, expose: t, slots: s }) {
    const r = $(n, "options"), o = $(n, "pinOptions"), i = y(), c = b(B, y()), a = b(Z, y()), d = b(ce, y()), u = H(
      () => !!(d.value && a.value && i.value instanceof google.maps.marker.AdvancedMarkerElement)
    );
    return L(
      [c, r, o],
      async (l, [h, p, m]) => {
        var _, O, M;
        const g = !A(r.value, p) || !A(o.value, m) || c.value !== h;
        if (!c.value || !a.value || !g)
          return;
        const { AdvancedMarkerElement: v, PinElement: w } = a.value.marker;
        if (i.value) {
          const { map: E, content: k, ...S } = r.value;
          Object.assign(i.value, {
            content: o.value ? new w(o.value).element : k,
            ...S
          }), u.value && ((_ = d.value) == null || _.removeMarker(i.value), (O = d.value) == null || O.addMarker(i.value));
        } else
          o.value && (r.value.content = new w(o.value).element), i.value = x(new v(r.value)), u.value ? (M = d.value) == null || M.addMarker(i.value) : i.value.map = c.value, ge.forEach((E) => {
            var k;
            (k = i.value) == null || k.addListener(E, (S) => e(E, S));
          });
      },
      {
        immediate: !0
      }
    ), q(() => {
      var l, h;
      i.value && ((l = a.value) == null || l.event.clearInstanceListeners(i.value), u.value ? (h = d.value) == null || h.removeMarker(i.value) : i.value.map = null);
    }), U(le, i), t({ marker: i }), () => {
      var l;
      return (l = s.default) == null ? void 0 : l.call(s);
    };
  }
}), Ye = (n) => n === "Marker", Je = (n) => n === ee, V = (n, e, t, s) => {
  const r = y(), o = b(B, y()), i = b(Z, y()), c = b(ce, y()), a = H(
    () => !!(c.value && i.value && (r.value instanceof i.value.Marker || r.value instanceof i.value[ee]))
  );
  return L(
    [o, t],
    (d, [u, l]) => {
      var p, m, f;
      const h = !A(t.value, l) || o.value !== u;
      !o.value || !i.value || !h || (r.value ? (r.value.setOptions(t.value), a.value && ((p = c.value) == null || p.removeMarker(r.value), (m = c.value) == null || m.addMarker(r.value))) : (Ye(n) ? r.value = x(
        new i.value[n](t.value)
      ) : Je(n) ? r.value = x(
        new i.value[n](t.value)
      ) : r.value = x(
        new i.value[n]({
          ...t.value,
          map: o.value
        })
      ), a.value ? (f = c.value) == null || f.addMarker(r.value) : r.value.setMap(o.value), e.forEach((g) => {
        var v;
        (v = r.value) == null || v.addListener(g, (w) => s(g, w));
      })));
    },
    {
      immediate: !0
    }
  ), q(() => {
    var d, u;
    r.value && ((d = i.value) == null || d.event.clearInstanceListeners(r.value), a.value ? (u = c.value) == null || u.removeMarker(r.value) : r.value.setMap(null));
  }), r;
}, ve = [
  "animation_changed",
  "click",
  "dblclick",
  "rightclick",
  "dragstart",
  "dragend",
  "drag",
  "mouseover",
  "mousedown",
  "mouseout",
  "mouseup",
  "draggable_changed",
  "clickable_changed",
  "contextmenu",
  "cursor_changed",
  "flat_changed",
  "rightclick",
  "zindex_changed",
  "icon_changed",
  "position_changed",
  "shape_changed",
  "title_changed",
  "visible_changed"
], Lt = P({
  name: "Marker",
  props: {
    options: {
      type: Object,
      required: !0
    }
  },
  emits: ve,
  setup(n, { emit: e, expose: t, slots: s }) {
    const r = $(n, "options"), o = V("Marker", ve, r, e);
    return U(le, o), t({ marker: o }), () => {
      var i;
      return (i = s.default) == null ? void 0 : i.call(s);
    };
  }
}), St = P({
  name: "Polyline",
  props: {
    options: {
      type: Object,
      required: !0
    }
  },
  emits: F,
  setup(n, { emit: e }) {
    const t = $(n, "options");
    return { polyline: V("Polyline", F, t, e) };
  },
  render: () => null
}), xt = P({
  name: "Polygon",
  props: {
    options: {
      type: Object,
      required: !0
    }
  },
  emits: F,
  setup(n, { emit: e }) {
    const t = $(n, "options");
    return { polygon: V("Polygon", F, t, e) };
  },
  render: () => null
}), ye = F.concat(["bounds_changed"]), At = P({
  name: "Rectangle",
  props: {
    options: {
      type: Object,
      required: !0
    }
  },
  emits: ye,
  setup(n, { emit: e }) {
    const t = $(n, "options");
    return { rectangle: V("Rectangle", ye, t, e) };
  },
  render: () => null
}), we = F.concat(["center_changed", "radius_changed"]), It = P({
  name: "Circle",
  props: {
    options: {
      type: Object,
      required: !0
    }
  },
  emits: we,
  setup(n, { emit: e }) {
    const t = $(n, "options");
    return { circle: V("Circle", we, t, e) };
  },
  render: () => null
}), Xe = P({
  props: {
    position: {
      type: String,
      required: !0
    },
    index: {
      type: Number,
      default: 1
    }
  },
  emits: ["content:loaded"],
  setup(n, { emit: e }) {
    const t = y(null), s = b(B, y()), r = b(Z, y()), o = b(Ae, y(!1)), i = L(
      [o, r, t],
      ([d, u, l]) => {
        u && d && l && (c(n.position), e("content:loaded"), setTimeout(i, 0));
      },
      { immediate: !0 }
    ), c = (d) => {
      if (s.value && r.value && t.value) {
        const u = r.value.ControlPosition[d];
        s.value.controls[u].push(t.value);
      }
    }, a = (d) => {
      if (s.value && r.value) {
        let u = null;
        const l = r.value.ControlPosition[d];
        s.value.controls[l].forEach((h, p) => {
          h === t.value && (u = p);
        }), u !== null && s.value.controls[l].removeAt(u);
      }
    };
    return q(() => a(n.position)), L(
      () => n.position,
      (d, u) => {
        a(u), c(d);
      }
    ), L(
      () => n.index,
      (d) => {
        d && t.value && (t.value.index = n.index);
      }
    ), { controlRef: t };
  }
});
const Qe = {
  ref: "controlRef",
  class: "custom-control-wrapper"
};
function et(n, e, t, s, r, o) {
  return J(), X("div", Qe, [
    Q(n.$slots, "default", {}, void 0, !0)
  ], 512);
}
const Tt = /* @__PURE__ */ te(Xe, [["render", et], ["__scopeId", "data-v-d099a3a6"]]), _e = ["closeclick", "content_changed", "domready", "position_changed", "visible", "zindex_changed"], tt = P({
  inheritAttrs: !1,
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: Boolean
    }
  },
  emits: [..._e, "update:modelValue"],
  setup(n, { slots: e, emit: t, expose: s }) {
    const r = y(), o = y(), i = b(B, y()), c = b(Z, y()), a = b(le, y());
    let d, u = n.modelValue;
    const l = H(() => {
      var f;
      return (f = e.default) == null ? void 0 : f.call(e).some((g) => g.type !== Le);
    }), h = (f) => {
      u = f, t("update:modelValue", f);
    }, p = (f) => {
      r.value && (r.value.open({ map: i.value, anchor: a.value, ...f }), h(!0));
    }, m = () => {
      r.value && (r.value.close(), h(!1));
    };
    return Pe(() => {
      L(
        [i, () => n.options],
        ([f, g], [v, w]) => {
          var O;
          const _ = !A(g, w) || i.value !== v;
          i.value && c.value && _ && (r.value ? (r.value.setOptions({
            ...g,
            content: l.value ? o.value : g.content
          }), a.value || p()) : (r.value = x(
            new c.value.InfoWindow({
              ...g,
              content: l.value ? o.value : g.content
            })
          ), a.value && (d = a.value.addListener("click", () => {
            p();
          })), (!a.value || u) && p(), _e.forEach((M) => {
            var E;
            (E = r.value) == null || E.addListener(M, (k) => t(M, k));
          }), (O = r.value) == null || O.addListener("closeclick", () => h(!1))));
        },
        {
          immediate: !0
        }
      ), L(
        () => n.modelValue,
        (f) => {
          f !== u && (f ? p() : m());
        }
      );
    }), q(() => {
      var f;
      d && d.remove(), r.value && ((f = c.value) == null || f.event.clearInstanceListeners(r.value), m());
    }), s({ infoWindow: r, open: p, close: m }), { infoWindow: r, infoWindowRef: o, hasSlotContent: l, open: p, close: m };
  }
});
const st = {
  key: 0,
  class: "info-window-wrapper"
};
function rt(n, e, t, s, r, o) {
  return n.hasSlotContent ? (J(), X("div", st, [
    ae("div", Se({ ref: "infoWindowRef" }, n.$attrs), [
      Q(n.$slots, "default", {}, void 0, !0)
    ], 16)
  ])) : xe("", !0);
}
const $t = /* @__PURE__ */ te(tt, [["render", rt], ["__scopeId", "data-v-cbe1707b"]]), ke = [
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array
], re = 1, z = 8;
class ue {
  /**
   * Creates an index from raw `ArrayBuffer` data.
   * @param {ArrayBuffer} data
   */
  static from(e) {
    if (!(e instanceof ArrayBuffer))
      throw new Error("Data must be an instance of ArrayBuffer.");
    const [t, s] = new Uint8Array(e, 0, 2);
    if (t !== 219)
      throw new Error("Data does not appear to be in a KDBush format.");
    const r = s >> 4;
    if (r !== re)
      throw new Error(`Got v${r} data when expected v${re}.`);
    const o = ke[s & 15];
    if (!o)
      throw new Error("Unrecognized array type.");
    const [i] = new Uint16Array(e, 2, 1), [c] = new Uint32Array(e, 4, 1);
    return new ue(c, i, o, e);
  }
  /**
   * Creates an index that will hold a given number of items.
   * @param {number} numItems
   * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
   * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
   * @param {ArrayBuffer} [data] (For internal use only)
   */
  constructor(e, t = 64, s = Float64Array, r) {
    if (isNaN(e) || e < 0)
      throw new Error(`Unpexpected numItems value: ${e}.`);
    this.numItems = +e, this.nodeSize = Math.min(Math.max(+t, 2), 65535), this.ArrayType = s, this.IndexArrayType = e < 65536 ? Uint16Array : Uint32Array;
    const o = ke.indexOf(this.ArrayType), i = e * 2 * this.ArrayType.BYTES_PER_ELEMENT, c = e * this.IndexArrayType.BYTES_PER_ELEMENT, a = (8 - c % 8) % 8;
    if (o < 0)
      throw new Error(`Unexpected typed array class: ${s}.`);
    r && r instanceof ArrayBuffer ? (this.data = r, this.ids = new this.IndexArrayType(this.data, z, e), this.coords = new this.ArrayType(this.data, z + c + a, e * 2), this._pos = e * 2, this._finished = !0) : (this.data = new ArrayBuffer(z + i + c + a), this.ids = new this.IndexArrayType(this.data, z, e), this.coords = new this.ArrayType(this.data, z + c + a, e * 2), this._pos = 0, this._finished = !1, new Uint8Array(this.data, 0, 2).set([219, (re << 4) + o]), new Uint16Array(this.data, 2, 1)[0] = t, new Uint32Array(this.data, 4, 1)[0] = e);
  }
  /**
   * Add a point to the index.
   * @param {number} x
   * @param {number} y
   * @returns {number} An incremental index associated with the added item (starting from `0`).
   */
  add(e, t) {
    const s = this._pos >> 1;
    return this.ids[s] = s, this.coords[this._pos++] = e, this.coords[this._pos++] = t, s;
  }
  /**
   * Perform indexing of the added points.
   */
  finish() {
    const e = this._pos >> 1;
    if (e !== this.numItems)
      throw new Error(`Added ${e} items when expected ${this.numItems}.`);
    return ie(this.ids, this.coords, this.nodeSize, 0, this.numItems - 1, 0), this._finished = !0, this;
  }
  /**
   * Search the index for items within a given bounding box.
   * @param {number} minX
   * @param {number} minY
   * @param {number} maxX
   * @param {number} maxY
   * @returns {number[]} An array of indices correponding to the found items.
   */
  range(e, t, s, r) {
    if (!this._finished)
      throw new Error("Data not yet indexed - call index.finish().");
    const { ids: o, coords: i, nodeSize: c } = this, a = [0, o.length - 1, 0], d = [];
    for (; a.length; ) {
      const u = a.pop() || 0, l = a.pop() || 0, h = a.pop() || 0;
      if (l - h <= c) {
        for (let g = h; g <= l; g++) {
          const v = i[2 * g], w = i[2 * g + 1];
          v >= e && v <= s && w >= t && w <= r && d.push(o[g]);
        }
        continue;
      }
      const p = h + l >> 1, m = i[2 * p], f = i[2 * p + 1];
      m >= e && m <= s && f >= t && f <= r && d.push(o[p]), (u === 0 ? e <= m : t <= f) && (a.push(h), a.push(p - 1), a.push(1 - u)), (u === 0 ? s >= m : r >= f) && (a.push(p + 1), a.push(l), a.push(1 - u));
    }
    return d;
  }
  /**
   * Search the index for items within a given radius.
   * @param {number} qx
   * @param {number} qy
   * @param {number} r Query radius.
   * @returns {number[]} An array of indices correponding to the found items.
   */
  within(e, t, s) {
    if (!this._finished)
      throw new Error("Data not yet indexed - call index.finish().");
    const { ids: r, coords: o, nodeSize: i } = this, c = [0, r.length - 1, 0], a = [], d = s * s;
    for (; c.length; ) {
      const u = c.pop() || 0, l = c.pop() || 0, h = c.pop() || 0;
      if (l - h <= i) {
        for (let g = h; g <= l; g++)
          Ce(o[2 * g], o[2 * g + 1], e, t) <= d && a.push(r[g]);
        continue;
      }
      const p = h + l >> 1, m = o[2 * p], f = o[2 * p + 1];
      Ce(m, f, e, t) <= d && a.push(r[p]), (u === 0 ? e - s <= m : t - s <= f) && (c.push(h), c.push(p - 1), c.push(1 - u)), (u === 0 ? e + s >= m : t + s >= f) && (c.push(p + 1), c.push(l), c.push(1 - u));
    }
    return a;
  }
}
function ie(n, e, t, s, r, o) {
  if (r - s <= t)
    return;
  const i = s + r >> 1;
  Ie(n, e, i, s, r, o), ie(n, e, t, s, i - 1, 1 - o), ie(n, e, t, i + 1, r, 1 - o);
}
function Ie(n, e, t, s, r, o) {
  for (; r > s; ) {
    if (r - s > 600) {
      const d = r - s + 1, u = t - s + 1, l = Math.log(d), h = 0.5 * Math.exp(2 * l / 3), p = 0.5 * Math.sqrt(l * h * (d - h) / d) * (u - d / 2 < 0 ? -1 : 1), m = Math.max(s, Math.floor(t - u * h / d + p)), f = Math.min(r, Math.floor(t + (d - u) * h / d + p));
      Ie(n, e, t, m, f, o);
    }
    const i = e[2 * t + o];
    let c = s, a = r;
    for (G(n, e, s, t), e[2 * r + o] > i && G(n, e, s, r); c < a; ) {
      for (G(n, e, c, a), c++, a--; e[2 * c + o] < i; )
        c++;
      for (; e[2 * a + o] > i; )
        a--;
    }
    e[2 * s + o] === i ? G(n, e, s, a) : (a++, G(n, e, a, r)), a <= t && (s = a + 1), t <= a && (r = a - 1);
  }
}
function G(n, e, t, s) {
  ne(n, t, s), ne(e, 2 * t, 2 * s), ne(e, 2 * t + 1, 2 * s + 1);
}
function ne(n, e, t) {
  const s = n[e];
  n[e] = n[t], n[t] = s;
}
function Ce(n, e, t, s) {
  const r = n - t, o = e - s;
  return r * r + o * o;
}
const nt = {
  minZoom: 0,
  // min zoom to generate clusters on
  maxZoom: 16,
  // max zoom level to cluster the points on
  minPoints: 2,
  // minimum points to form a cluster
  radius: 40,
  // cluster radius in pixels
  extent: 512,
  // tile extent (radius is calculated relative to it)
  nodeSize: 64,
  // size of the KD-tree leaf node, affects performance
  log: !1,
  // whether to log timing info
  // whether to generate numeric ids for input features (in vector tiles)
  generateId: !1,
  // a reduce function for calculating custom cluster properties
  reduce: null,
  // (accumulated, props) => { accumulated.sum += props.sum; }
  // properties to use for individual points when running the reducer
  map: (n) => n
  // props => ({sum: props.my_value})
}, be = Math.fround || ((n) => (e) => (n[0] = +e, n[0]))(new Float32Array(1)), R = 2, T = 3, oe = 4, I = 5, Te = 6;
class $e {
  constructor(e) {
    this.options = Object.assign(Object.create(nt), e), this.trees = new Array(this.options.maxZoom + 1), this.stride = this.options.reduce ? 7 : 6, this.clusterProps = [];
  }
  load(e) {
    const { log: t, minZoom: s, maxZoom: r } = this.options;
    t && console.time("total time");
    const o = `prepare ${e.length} points`;
    t && console.time(o), this.points = e;
    const i = [];
    for (let a = 0; a < e.length; a++) {
      const d = e[a];
      if (!d.geometry)
        continue;
      const [u, l] = d.geometry.coordinates, h = be(K(u)), p = be(Y(l));
      i.push(
        h,
        p,
        // projected point coordinates
        1 / 0,
        // the last zoom the point was processed at
        a,
        // index of the source feature in the original input array
        -1,
        // parent cluster id
        1
        // number of points in a cluster
      ), this.options.reduce && i.push(0);
    }
    let c = this.trees[r + 1] = this._createTree(i);
    t && console.timeEnd(o);
    for (let a = r; a >= s; a--) {
      const d = +Date.now();
      c = this.trees[a] = this._createTree(this._cluster(c, a)), t && console.log("z%d: %d clusters in %dms", a, c.numItems, +Date.now() - d);
    }
    return t && console.timeEnd("total time"), this;
  }
  getClusters(e, t) {
    let s = ((e[0] + 180) % 360 + 360) % 360 - 180;
    const r = Math.max(-90, Math.min(90, e[1]));
    let o = e[2] === 180 ? 180 : ((e[2] + 180) % 360 + 360) % 360 - 180;
    const i = Math.max(-90, Math.min(90, e[3]));
    if (e[2] - e[0] >= 360)
      s = -180, o = 180;
    else if (s > o) {
      const l = this.getClusters([s, r, 180, i], t), h = this.getClusters([-180, r, o, i], t);
      return l.concat(h);
    }
    const c = this.trees[this._limitZoom(t)], a = c.range(K(s), Y(i), K(o), Y(r)), d = c.data, u = [];
    for (const l of a) {
      const h = this.stride * l;
      u.push(d[h + I] > 1 ? Me(d, h, this.clusterProps) : this.points[d[h + T]]);
    }
    return u;
  }
  getChildren(e) {
    const t = this._getOriginId(e), s = this._getOriginZoom(e), r = "No cluster with the specified id.", o = this.trees[s];
    if (!o)
      throw new Error(r);
    const i = o.data;
    if (t * this.stride >= i.length)
      throw new Error(r);
    const c = this.options.radius / (this.options.extent * Math.pow(2, s - 1)), a = i[t * this.stride], d = i[t * this.stride + 1], u = o.within(a, d, c), l = [];
    for (const h of u) {
      const p = h * this.stride;
      i[p + oe] === e && l.push(i[p + I] > 1 ? Me(i, p, this.clusterProps) : this.points[i[p + T]]);
    }
    if (l.length === 0)
      throw new Error(r);
    return l;
  }
  getLeaves(e, t, s) {
    t = t || 10, s = s || 0;
    const r = [];
    return this._appendLeaves(r, e, t, s, 0), r;
  }
  getTile(e, t, s) {
    const r = this.trees[this._limitZoom(e)], o = Math.pow(2, e), { extent: i, radius: c } = this.options, a = c / i, d = (s - a) / o, u = (s + 1 + a) / o, l = {
      features: []
    };
    return this._addTileFeatures(
      r.range((t - a) / o, d, (t + 1 + a) / o, u),
      r.data,
      t,
      s,
      o,
      l
    ), t === 0 && this._addTileFeatures(
      r.range(1 - a / o, d, 1, u),
      r.data,
      o,
      s,
      o,
      l
    ), t === o - 1 && this._addTileFeatures(
      r.range(0, d, a / o, u),
      r.data,
      -1,
      s,
      o,
      l
    ), l.features.length ? l : null;
  }
  getClusterExpansionZoom(e) {
    let t = this._getOriginZoom(e) - 1;
    for (; t <= this.options.maxZoom; ) {
      const s = this.getChildren(e);
      if (t++, s.length !== 1)
        break;
      e = s[0].properties.cluster_id;
    }
    return t;
  }
  _appendLeaves(e, t, s, r, o) {
    const i = this.getChildren(t);
    for (const c of i) {
      const a = c.properties;
      if (a && a.cluster ? o + a.point_count <= r ? o += a.point_count : o = this._appendLeaves(e, a.cluster_id, s, r, o) : o < r ? o++ : e.push(c), e.length === s)
        break;
    }
    return o;
  }
  _createTree(e) {
    const t = new ue(e.length / this.stride | 0, this.options.nodeSize, Float32Array);
    for (let s = 0; s < e.length; s += this.stride)
      t.add(e[s], e[s + 1]);
    return t.finish(), t.data = e, t;
  }
  _addTileFeatures(e, t, s, r, o, i) {
    for (const c of e) {
      const a = c * this.stride, d = t[a + I] > 1;
      let u, l, h;
      if (d)
        u = Re(t, a, this.clusterProps), l = t[a], h = t[a + 1];
      else {
        const f = this.points[t[a + T]];
        u = f.properties;
        const [g, v] = f.geometry.coordinates;
        l = K(g), h = Y(v);
      }
      const p = {
        type: 1,
        geometry: [[
          Math.round(this.options.extent * (l * o - s)),
          Math.round(this.options.extent * (h * o - r))
        ]],
        tags: u
      };
      let m;
      d || this.options.generateId ? m = t[a + T] : m = this.points[t[a + T]].id, m !== void 0 && (p.id = m), i.features.push(p);
    }
  }
  _limitZoom(e) {
    return Math.max(this.options.minZoom, Math.min(Math.floor(+e), this.options.maxZoom + 1));
  }
  _cluster(e, t) {
    const { radius: s, extent: r, reduce: o, minPoints: i } = this.options, c = s / (r * Math.pow(2, t)), a = e.data, d = [], u = this.stride;
    for (let l = 0; l < a.length; l += u) {
      if (a[l + R] <= t)
        continue;
      a[l + R] = t;
      const h = a[l], p = a[l + 1], m = e.within(a[l], a[l + 1], c), f = a[l + I];
      let g = f;
      for (const v of m) {
        const w = v * u;
        a[w + R] > t && (g += a[w + I]);
      }
      if (g > f && g >= i) {
        let v = h * f, w = p * f, _, O = -1;
        const M = ((l / u | 0) << 5) + (t + 1) + this.points.length;
        for (const E of m) {
          const k = E * u;
          if (a[k + R] <= t)
            continue;
          a[k + R] = t;
          const S = a[k + I];
          v += a[k] * S, w += a[k + 1] * S, a[k + oe] = M, o && (_ || (_ = this._map(a, l, !0), O = this.clusterProps.length, this.clusterProps.push(_)), o(_, this._map(a, k)));
        }
        a[l + oe] = M, d.push(v / g, w / g, 1 / 0, M, -1, g), o && d.push(O);
      } else {
        for (let v = 0; v < u; v++)
          d.push(a[l + v]);
        if (g > 1)
          for (const v of m) {
            const w = v * u;
            if (!(a[w + R] <= t)) {
              a[w + R] = t;
              for (let _ = 0; _ < u; _++)
                d.push(a[w + _]);
            }
          }
      }
    }
    return d;
  }
  // get index of the point from which the cluster originated
  _getOriginId(e) {
    return e - this.points.length >> 5;
  }
  // get zoom of the point from which the cluster originated
  _getOriginZoom(e) {
    return (e - this.points.length) % 32;
  }
  _map(e, t, s) {
    if (e[t + I] > 1) {
      const i = this.clusterProps[e[t + Te]];
      return s ? Object.assign({}, i) : i;
    }
    const r = this.points[e[t + T]].properties, o = this.options.map(r);
    return s && o === r ? Object.assign({}, o) : o;
  }
}
function Me(n, e, t) {
  return {
    type: "Feature",
    id: n[e + T],
    properties: Re(n, e, t),
    geometry: {
      type: "Point",
      coordinates: [ot(n[e]), it(n[e + 1])]
    }
  };
}
function Re(n, e, t) {
  const s = n[e + I], r = s >= 1e4 ? `${Math.round(s / 1e3)}k` : s >= 1e3 ? `${Math.round(s / 100) / 10}k` : s, o = n[e + Te], i = o === -1 ? {} : Object.assign({}, t[o]);
  return Object.assign(i, {
    cluster: !0,
    cluster_id: n[e + T],
    point_count: s,
    point_count_abbreviated: r
  });
}
function K(n) {
  return n / 360 + 0.5;
}
function Y(n) {
  const e = Math.sin(n * Math.PI / 180), t = 0.5 - 0.25 * Math.log((1 + e) / (1 - e)) / Math.PI;
  return t < 0 ? 0 : t > 1 ? 1 : t;
}
function ot(n) {
  return (n - 0.5) * 360;
}
function it(n) {
  const e = (180 - n * 360) * Math.PI / 180;
  return 360 * Math.atan(Math.exp(e)) / Math.PI - 90;
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function de(n, e) {
  var t = {};
  for (var s in n)
    Object.prototype.hasOwnProperty.call(n, s) && e.indexOf(s) < 0 && (t[s] = n[s]);
  if (n != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, s = Object.getOwnPropertySymbols(n); r < s.length; r++)
      e.indexOf(s[r]) < 0 && Object.prototype.propertyIsEnumerable.call(n, s[r]) && (t[s[r]] = n[s[r]]);
  return t;
}
class C {
  static isAdvancedMarkerAvailable(e) {
    return google.maps.marker && e.getMapCapabilities().isAdvancedMarkersAvailable === !0;
  }
  static isAdvancedMarker(e) {
    return google.maps.marker && e instanceof google.maps.marker.AdvancedMarkerElement;
  }
  static setMap(e, t) {
    this.isAdvancedMarker(e) ? e.map = t : e.setMap(t);
  }
  static getPosition(e) {
    if (this.isAdvancedMarker(e)) {
      if (e.position) {
        if (e.position instanceof google.maps.LatLng)
          return e.position;
        if (e.position.lat && e.position.lng)
          return new google.maps.LatLng(e.position.lat, e.position.lng);
      }
      return new google.maps.LatLng(null);
    }
    return e.getPosition();
  }
  static getVisible(e) {
    return this.isAdvancedMarker(e) ? !0 : e.getVisible();
  }
}
class W {
  constructor({ markers: e, position: t }) {
    this.markers = e, t && (t instanceof google.maps.LatLng ? this._position = t : this._position = new google.maps.LatLng(t));
  }
  get bounds() {
    if (this.markers.length === 0 && !this._position)
      return;
    const e = new google.maps.LatLngBounds(this._position, this._position);
    for (const t of this.markers)
      e.extend(C.getPosition(t));
    return e;
  }
  get position() {
    return this._position || this.bounds.getCenter();
  }
  /**
   * Get the count of **visible** markers.
   */
  get count() {
    return this.markers.filter((e) => C.getVisible(e)).length;
  }
  /**
   * Add a marker to the cluster.
   */
  push(e) {
    this.markers.push(e);
  }
  /**
   * Cleanup references and remove marker from map.
   */
  delete() {
    this.marker && (C.setMap(this.marker, null), this.marker = void 0), this.markers.length = 0;
  }
}
const at = (n, e, t, s) => {
  const r = je(n.getBounds(), e, s);
  return t.filter((o) => r.contains(C.getPosition(o)));
}, je = (n, e, t) => {
  const { northEast: s, southWest: r } = lt(n, e), o = ct({ northEast: s, southWest: r }, t);
  return ut(o, e);
}, Oe = (n, e, t) => {
  const s = je(n, e, t), r = s.getNorthEast(), o = s.getSouthWest();
  return [o.lng(), o.lat(), r.lng(), r.lat()];
}, lt = (n, e) => ({
  northEast: e.fromLatLngToDivPixel(n.getNorthEast()),
  southWest: e.fromLatLngToDivPixel(n.getSouthWest())
}), ct = ({ northEast: n, southWest: e }, t) => (n.x += t, n.y -= t, e.x -= t, e.y += t, { northEast: n, southWest: e }), ut = ({ northEast: n, southWest: e }, t) => {
  const s = t.fromDivPixelToLatLng(e), r = t.fromDivPixelToLatLng(n);
  return new google.maps.LatLngBounds(s, r);
};
class qe {
  constructor({ maxZoom: e = 16 }) {
    this.maxZoom = e;
  }
  /**
   * Helper function to bypass clustering based upon some map state such as
   * zoom, number of markers, etc.
   *
   * ```typescript
   *  cluster({markers, map}: AlgorithmInput): Cluster[] {
   *    if (shouldBypassClustering(map)) {
   *      return this.noop({markers})
   *    }
   * }
   * ```
   */
  noop({ markers: e }) {
    return ht(e);
  }
}
class dt extends qe {
  constructor(e) {
    var { viewportPadding: t = 60 } = e, s = de(e, ["viewportPadding"]);
    super(s), this.viewportPadding = 60, this.viewportPadding = t;
  }
  calculate({ markers: e, map: t, mapCanvasProjection: s }) {
    return t.getZoom() >= this.maxZoom ? {
      clusters: this.noop({
        markers: e
      }),
      changed: !1
    } : {
      clusters: this.cluster({
        markers: at(t, s, e, this.viewportPadding),
        map: t,
        mapCanvasProjection: s
      })
    };
  }
}
const ht = (n) => n.map((t) => new W({
  position: C.getPosition(t),
  markers: [t]
}));
class pt extends qe {
  constructor(e) {
    var { maxZoom: t, radius: s = 60 } = e, r = de(e, ["maxZoom", "radius"]);
    super({ maxZoom: t }), this.state = { zoom: -1 }, this.superCluster = new $e(Object.assign({ maxZoom: this.maxZoom, radius: s }, r));
  }
  calculate(e) {
    let t = !1;
    const s = { zoom: e.map.getZoom() };
    if (!A(e.markers, this.markers)) {
      t = !0, this.markers = [...e.markers];
      const r = this.markers.map((o) => {
        const i = C.getPosition(o);
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [i.lng(), i.lat()]
          },
          properties: { marker: o }
        };
      });
      this.superCluster.load(r);
    }
    return t || (this.state.zoom <= this.maxZoom || s.zoom <= this.maxZoom) && (t = !A(this.state, s)), this.state = s, t && (this.clusters = this.cluster(e)), { clusters: this.clusters, changed: t };
  }
  cluster({ map: e }) {
    return this.superCluster.getClusters([-180, -90, 180, 90], Math.round(e.getZoom())).map((t) => this.transformCluster(t));
  }
  transformCluster({ geometry: { coordinates: [e, t] }, properties: s }) {
    if (s.cluster)
      return new W({
        markers: this.superCluster.getLeaves(s.cluster_id, 1 / 0).map((o) => o.properties.marker),
        position: { lat: t, lng: e }
      });
    const r = s.marker;
    return new W({
      markers: [r],
      position: C.getPosition(r)
    });
  }
}
class ft extends dt {
  constructor(e) {
    var { maxZoom: t, radius: s = 60, viewportPadding: r = 60 } = e, o = de(e, ["maxZoom", "radius", "viewportPadding"]);
    super({ maxZoom: t, viewportPadding: r }), this.superCluster = new $e(Object.assign({ maxZoom: this.maxZoom, radius: s }, o)), this.state = { zoom: -1, view: [0, 0, 0, 0] };
  }
  calculate(e) {
    const t = {
      zoom: Math.round(e.map.getZoom()),
      view: Oe(e.map.getBounds(), e.mapCanvasProjection, this.viewportPadding)
    };
    let s = !A(this.state, t);
    if (!A(e.markers, this.markers)) {
      s = !0, this.markers = [...e.markers];
      const r = this.markers.map((o) => {
        const i = C.getPosition(o);
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [i.lng(), i.lat()]
          },
          properties: { marker: o }
        };
      });
      this.superCluster.load(r);
    }
    return s && (this.clusters = this.cluster(e), this.state = t), { clusters: this.clusters, changed: s };
  }
  cluster({ map: e, mapCanvasProjection: t }) {
    const s = {
      zoom: Math.round(e.getZoom()),
      view: Oe(e.getBounds(), t, this.viewportPadding)
    };
    return this.superCluster.getClusters(s.view, s.zoom).map((r) => this.transformCluster(r));
  }
  transformCluster({ geometry: { coordinates: [e, t] }, properties: s }) {
    if (s.cluster)
      return new W({
        markers: this.superCluster.getLeaves(s.cluster_id, 1 / 0).map((o) => o.properties.marker),
        position: { lat: t, lng: e }
      });
    const r = s.marker;
    return new W({
      markers: [r],
      position: C.getPosition(r)
    });
  }
}
class mt {
  constructor(e, t) {
    this.markers = { sum: e.length };
    const s = t.map((o) => o.count), r = s.reduce((o, i) => o + i, 0);
    this.clusters = {
      count: t.length,
      markers: {
        mean: r / t.length,
        sum: r,
        min: Math.min(...s),
        max: Math.max(...s)
      }
    };
  }
}
class gt {
  /**
   * The default render function for the library used by {@link MarkerClusterer}.
   *
   * Currently set to use the following:
   *
   * ```typescript
   * // change color if this cluster has more markers than the mean cluster
   * const color =
   *   count > Math.max(10, stats.clusters.markers.mean)
   *     ? "#ff0000"
   *     : "#0000ff";
   *
   * // create svg url with fill color
   * const svg = window.btoa(`
   * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
   *   <circle cx="120" cy="120" opacity=".6" r="70" />
   *   <circle cx="120" cy="120" opacity=".3" r="90" />
   *   <circle cx="120" cy="120" opacity=".2" r="110" />
   *   <circle cx="120" cy="120" opacity=".1" r="130" />
   * </svg>`);
   *
   * // create marker using svg icon
   * return new google.maps.Marker({
   *   position,
   *   icon: {
   *     url: `data:image/svg+xml;base64,${svg}`,
   *     scaledSize: new google.maps.Size(45, 45),
   *   },
   *   label: {
   *     text: String(count),
   *     color: "rgba(255,255,255,0.9)",
   *     fontSize: "12px",
   *   },
   *   // adjust zIndex to be above other markers
   *   zIndex: 1000 + count,
   * });
   * ```
   */
  render({ count: e, position: t }, s, r) {
    const i = `<svg fill="${e > Math.max(10, s.clusters.markers.mean) ? "#ff0000" : "#0000ff"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
<circle cx="120" cy="120" opacity=".6" r="70" />
<circle cx="120" cy="120" opacity=".3" r="90" />
<circle cx="120" cy="120" opacity=".2" r="110" />
<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${e}</text>
</svg>`, c = `Cluster of ${e} markers`, a = Number(google.maps.Marker.MAX_ZINDEX) + e;
    if (C.isAdvancedMarkerAvailable(r)) {
      const u = document.createElement("div");
      u.innerHTML = i;
      const l = u.firstElementChild;
      l.setAttribute("transform", "translate(0 25)");
      const h = {
        map: r,
        position: t,
        zIndex: a,
        title: c,
        content: l
      };
      return new google.maps.marker.AdvancedMarkerElement(h);
    }
    const d = {
      position: t,
      zIndex: a,
      title: c,
      icon: {
        url: `data:image/svg+xml;base64,${btoa(i)}`,
        anchor: new google.maps.Point(25, 25)
      }
    };
    return new google.maps.Marker(d);
  }
}
function vt(n, e) {
  for (let t in e.prototype)
    n.prototype[t] = e.prototype[t];
}
class he {
  constructor() {
    vt(he, google.maps.OverlayView);
  }
}
var D;
(function(n) {
  n.CLUSTERING_BEGIN = "clusteringbegin", n.CLUSTERING_END = "clusteringend", n.CLUSTER_CLICK = "click";
})(D || (D = {}));
const yt = (n, e, t) => {
  t.fitBounds(e.bounds);
};
class wt extends he {
  constructor({ map: e, markers: t = [], algorithmOptions: s = {}, algorithm: r = new pt(s), renderer: o = new gt(), onClusterClick: i = yt }) {
    super(), this.markers = [...t], this.clusters = [], this.algorithm = r, this.renderer = o, this.onClusterClick = i, e && this.setMap(e);
  }
  addMarker(e, t) {
    this.markers.includes(e) || (this.markers.push(e), t || this.render());
  }
  addMarkers(e, t) {
    e.forEach((s) => {
      this.addMarker(s, !0);
    }), t || this.render();
  }
  removeMarker(e, t) {
    const s = this.markers.indexOf(e);
    return s === -1 ? !1 : (C.setMap(e, null), this.markers.splice(s, 1), t || this.render(), !0);
  }
  removeMarkers(e, t) {
    let s = !1;
    return e.forEach((r) => {
      s = this.removeMarker(r, !0) || s;
    }), s && !t && this.render(), s;
  }
  clearMarkers(e) {
    this.markers.length = 0, e || this.render();
  }
  /**
   * Recalculates and draws all the marker clusters.
   */
  render() {
    const e = this.getMap();
    if (e instanceof google.maps.Map && e.getProjection()) {
      google.maps.event.trigger(this, D.CLUSTERING_BEGIN, this);
      const { clusters: t, changed: s } = this.algorithm.calculate({
        markers: this.markers,
        map: e,
        mapCanvasProjection: this.getProjection()
      });
      if (s || s == null) {
        const r = /* @__PURE__ */ new Set();
        for (const i of t)
          i.markers.length == 1 && r.add(i.markers[0]);
        const o = [];
        for (const i of this.clusters)
          i.marker != null && (i.markers.length == 1 ? r.has(i.marker) || C.setMap(i.marker, null) : o.push(i.marker));
        this.clusters = t, this.renderClusters(), requestAnimationFrame(() => o.forEach((i) => C.setMap(i, null)));
      }
      google.maps.event.trigger(this, D.CLUSTERING_END, this);
    }
  }
  onAdd() {
    this.idleListener = this.getMap().addListener("idle", this.render.bind(this)), this.render();
  }
  onRemove() {
    google.maps.event.removeListener(this.idleListener), this.reset();
  }
  reset() {
    this.markers.forEach((e) => C.setMap(e, null)), this.clusters.forEach((e) => e.delete()), this.clusters = [];
  }
  renderClusters() {
    const e = new mt(this.markers, this.clusters), t = this.getMap();
    this.clusters.forEach((s) => {
      s.markers.length === 1 ? s.marker = s.markers[0] : (s.marker = this.renderer.render(s, e, t), s.markers.forEach((r) => C.setMap(r, null)), this.onClusterClick && s.marker.addListener(
        "click",
        /* istanbul ignore next */
        (r) => {
          google.maps.event.trigger(this, D.CLUSTER_CLICK, s), this.onClusterClick(r, s, t);
        }
      )), C.setMap(s.marker, t);
    });
  }
}
const Ee = Object.values(D), Rt = P({
  name: "MarkerCluster",
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  emits: Ee,
  setup(n, { emit: e, expose: t, slots: s }) {
    const r = y(), o = b(B, y()), i = b(Z, y());
    return U(ce, r), L(
      o,
      () => {
        o.value && (r.value = x(
          new wt({
            map: o.value,
            // Better perf than the default `SuperClusterAlgorithm`. See:
            // https://github.com/googlemaps/js-markerclusterer/pull/640
            algorithm: new ft(n.options.algorithmOptions ?? {}),
            ...n.options
          })
        ), Ee.forEach((c) => {
          var a;
          (a = r.value) == null || a.addListener(c, (d) => e(c, d));
        }));
      },
      {
        immediate: !0
      }
    ), q(() => {
      var c;
      r.value && ((c = i.value) == null || c.event.clearInstanceListeners(r.value), r.value.clearMarkers(), r.value.setMap(null));
    }), t({ markerCluster: r }), () => {
      var c;
      return (c = s.default) == null ? void 0 : c.call(s);
    };
  }
}), _t = P({
  inheritAttrs: !1,
  props: {
    options: {
      type: Object,
      required: !0
    }
  },
  setup(n, { slots: e, emit: t, expose: s }) {
    const r = y(), o = H(() => {
      var a;
      return (a = e.default) == null ? void 0 : a.call(e).some((d) => d.type !== Le);
    }), i = H(() => ({
      ...n.options,
      element: r.value
    })), c = V(ee, [], i, t);
    return s({
      customMarker: c
    }), { customMarkerRef: r, customMarker: c, hasSlotContent: o };
  }
});
const kt = {
  key: 0,
  class: "custom-marker-wrapper"
};
function Ct(n, e, t, s, r, o) {
  return n.hasSlotContent ? (J(), X("div", kt, [
    ae("div", Se({
      ref: "customMarkerRef",
      style: { cursor: n.$attrs.onClick ? "pointer" : void 0 }
    }, n.$attrs), [
      Q(n.$slots, "default", {}, void 0, !0)
    ], 16)
  ])) : xe("", !0);
}
const jt = /* @__PURE__ */ te(_t, [["render", Ct], ["__scopeId", "data-v-2d2d343a"]]), qt = P({
  name: "HeatmapLayer",
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(n) {
    const e = y(), t = b(B, y()), s = b(Z, y());
    return L(
      [t, () => n.options],
      ([r, o], [i, c]) => {
        var d;
        const a = !A(o, c) || t.value !== i;
        if (t.value && s.value && a) {
          const u = structuredClone(o);
          if (u.data && !(u.data instanceof s.value.MVCArray)) {
            const l = s.value.LatLng;
            u.data = (d = u.data) == null ? void 0 : d.map((h) => h instanceof l || "location" in h && (h.location instanceof l || h.location === null) ? h : "location" in h ? { ...h, location: new l(h.location) } : new l(h));
          }
          e.value ? e.value.setOptions(u) : e.value = x(
            new s.value.visualization.HeatmapLayer({
              ...u,
              map: t.value
            })
          );
        }
      },
      { immediate: !0 }
    ), q(() => {
      e.value && e.value.setMap(null);
    }), { heatmapLayer: e };
  },
  render: () => null
});
export {
  Pt as AdvancedMarker,
  It as Circle,
  Tt as CustomControl,
  jt as CustomMarker,
  Et as GoogleMap,
  qt as HeatmapLayer,
  $t as InfoWindow,
  Lt as Marker,
  Rt as MarkerCluster,
  xt as Polygon,
  St as Polyline,
  At as Rectangle
};
