import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { promises, existsSync } from 'node:fs';
import { dirname as dirname$1, resolve as resolve$1, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getIcons } from '@iconify/utils';
import { createConsola as createConsola$1 } from 'consola/core';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class WordArray {
  constructor(words, sigBytes) {
    __publicField$1(this, "words");
    __publicField$1(this, "sigBytes");
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    __publicField$1(this, "_data", new WordArray());
    __publicField$1(this, "_nDataBytes", 0);
    __publicField$1(this, "_minBufferSize", 0);
    __publicField$1(this, "blockSize", 512 / 32);
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$3(obj, key + "" , value);
  return value;
};
const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    __publicField$3(this, "_hash", new WordArray([...H]));
  }
  /**
   * Resets the internal state of the hash object to initial values.
   */
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  /**
   * Finishes the hash calculation and returns the hash as a WordArray.
   *
   * @param {string} messageUpdate - Additional message content to include in the hash.
   * @returns {WordArray} The finalised hash as a WordArray.
   */
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

function isEqual(object1, object2, hashOptions = {}) {
  if (object1 === object2) {
    return true;
  }
  if (objectHash(object1, hashOptions) === objectHash(object2, hashOptions)) {
    return true;
  }
  return false;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  // eslint-disable-next-line require-yield
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function parseCookies(event) {
  return parse(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions) {
  serializeOptions = { path: "/", ...serializeOptions };
  const cookieStr = serialize(name, value, serializeOptions);
  let setCookies = event.node.res.getHeader("set-cookie");
  if (!Array.isArray(setCookies)) {
    setCookies = [setCookies];
  }
  const _optionsHash = objectHash(serializeOptions);
  setCookies = setCookies.filter((cookieValue) => {
    return cookieValue && _optionsHash !== objectHash(parse(cookieValue));
  });
  event.node.res.setHeader("set-cookie", [...setCookies, cookieStr]);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name)) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    // Hooks
    __publicField(this, "_onBeforeResponseCalled");
    __publicField(this, "_onAfterResponseCalled");
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch$1({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch$1 = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch$1({ fetch: fetch$1, Headers: Headers$1, AbortController });
const $fetch$1 = ofetch;

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error, isDev) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.unhandled || error.fatal) ? [] : (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.unhandled ? "internal server error" : error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, (error.message || error.toString() || "internal server error") + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('../_/error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

function defineNitroPlugin(def) {
  return def;
}

const _jNdgnWuqqe = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    const url = event.node.req.originalUrl.split("?")[0];
    if (url === "/verificar") return;
    html.head.push(`
        <style id="loader-styles">
        root {
            --initial-loader-bg: #9155FD;
            --initial-loader-color: #9155FD;
        }
        body {
          margin: 0;
        }
        html {
          /*overflow-x: hidden;*/
          /*overflow-y: hidden;*/
        }
        #loading-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        @keyframes scaleAndFade {
            0% {
                transform: scale(.9);
                opacity: 0;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        .animated-element {
          animation: scaleAndFade 1s ease-in-out;
        }
        .d-none {
            display: none;
        }
        </style>
        `);
    html.bodyPrepend.push(`
            <div id="loading-bg">
            <div class="loading-logo animated-element">
                <img src="/futzo/logos/circular/logo-22.png" height="180" alt="Logo" />
            </div>
            </div>`);
    html.head.push(`
        <script async>
        window.addEventListener('load', function () {

            document.querySelector('#loading-bg').classList.add('d-none')
            document.querySelector('#loader-styles').remove()
        })
        <\/script>`);
  });
});

const plugins = [
  _jNdgnWuqqe
];

const assets$1 = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-uwtwNOJtVZfOZ2fqRH3FJC3HrRQ\"",
    "mtime": "2025-01-05T09:19:40.248Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/logo.png": {
    "type": "image/png",
    "etag": "\"72a0-TfR6WTbqrAh0OCztOxStIoVkt6c\"",
    "mtime": "2025-01-05T09:19:40.248Z",
    "size": 29344,
    "path": "../public/logo.png"
  },
  "/css/nuxt-google-fonts.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8b7-DJ7xQhZ+FiUKWF/yFSu77Ro6GPg\"",
    "mtime": "2025-01-05T09:19:40.108Z",
    "size": 2231,
    "path": "../public/css/nuxt-google-fonts.css"
  },
  "/fonts/Inter-200_900-1.woff2": {
    "type": "font/woff2",
    "etag": "\"6520-ZPN63f5CbAs+du8gr4AxkcON9bM\"",
    "mtime": "2025-01-05T09:19:40.108Z",
    "size": 25888,
    "path": "../public/fonts/Inter-200_900-1.woff2"
  },
  "/fonts/Inter-200_900-2.woff2": {
    "type": "font/woff2",
    "etag": "\"4934-2DpHlCV17rgNMOvHv5pbb4PJMPs\"",
    "mtime": "2025-01-05T09:19:40.109Z",
    "size": 18740,
    "path": "../public/fonts/Inter-200_900-2.woff2"
  },
  "/fonts/Inter-200_900-3.woff2": {
    "type": "font/woff2",
    "etag": "\"2bc0-4RJqkAfSfa5JZkesG5c1br84Zxw\"",
    "mtime": "2025-01-05T09:19:40.108Z",
    "size": 11200,
    "path": "../public/fonts/Inter-200_900-3.woff2"
  },
  "/fonts/Inter-200_900-4.woff2": {
    "type": "font/woff2",
    "etag": "\"4a80-xHUXj1OV6ywtVWyPDpJQI3wBncg\"",
    "mtime": "2025-01-05T09:19:40.108Z",
    "size": 19072,
    "path": "../public/fonts/Inter-200_900-4.woff2"
  },
  "/fonts/Inter-200_900-5.woff2": {
    "type": "font/woff2",
    "etag": "\"280c-nBythjoDQ0+5wVAendJ6wU7Xz2M\"",
    "mtime": "2025-01-05T09:19:40.108Z",
    "size": 10252,
    "path": "../public/fonts/Inter-200_900-5.woff2"
  },
  "/fonts/Inter-200_900-6.woff2": {
    "type": "font/woff2",
    "etag": "\"12258-7g69LvBHk3zYylRxciKRVYE/+Tk\"",
    "mtime": "2025-01-05T09:19:40.108Z",
    "size": 74328,
    "path": "../public/fonts/Inter-200_900-6.woff2"
  },
  "/fonts/Inter-200_900-7.woff2": {
    "type": "font/woff2",
    "etag": "\"bd3c-10AkFnU64btMvUsQ0zoMEFF4OL0\"",
    "mtime": "2025-01-05T09:19:40.109Z",
    "size": 48444,
    "path": "../public/fonts/Inter-200_900-7.woff2"
  },
  "/_nuxt/2cPTsbQs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"748-KYJwfN2mtBP6lLhoh2dFB7byisQ\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 1864,
    "path": "../public/_nuxt/2cPTsbQs.js"
  },
  "/_nuxt/75g9jHny.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20e-jYQVQ8Z4AX+C+Rt2LeWM/Sbh4ZI\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 526,
    "path": "../public/_nuxt/75g9jHny.js"
  },
  "/_nuxt/ARNutF5u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"989-pUlh5fSsu+5I6PiWiU/i7V/ilIc\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 2441,
    "path": "../public/_nuxt/ARNutF5u.js"
  },
  "/_nuxt/AppBar.DLEIx5UB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10b5-+LbfpGATo+LBDqCfXeNA0nACUYI\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 4277,
    "path": "../public/_nuxt/AppBar.DLEIx5UB.css"
  },
  "/_nuxt/B5CsekkT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"866-B11XmyKkaSam9B/hq6hTC0gTXdk\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 2150,
    "path": "../public/_nuxt/B5CsekkT.js"
  },
  "/_nuxt/B8TA8Ikg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"28f-TTpzt1nNY4RfhJjv38tme4jhyWQ\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 655,
    "path": "../public/_nuxt/B8TA8Ikg.js"
  },
  "/_nuxt/BANHBo3m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2f9-GBEMjOIQ5r2KPld1A4/xNPOnh7Y\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 761,
    "path": "../public/_nuxt/BANHBo3m.js"
  },
  "/_nuxt/BP482Xix.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2ae8-H0RcWRNHmdI6tCcPvLmO14ByN9E\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 10984,
    "path": "../public/_nuxt/BP482Xix.js"
  },
  "/_nuxt/BS3h1U0i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7b-UoISWlWnyY0ql8V0FSdfIUJIomk\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 123,
    "path": "../public/_nuxt/BS3h1U0i.js"
  },
  "/_nuxt/BaseCalendarInput.De0fEBGq.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"100f-d5X6IY1UE3pmVsxMVXKZWeGTkFs\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 4111,
    "path": "../public/_nuxt/BaseCalendarInput.De0fEBGq.css"
  },
  "/_nuxt/Bc7O0-SY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2132-kT60bHBzLjnUKzOQFVno/7lXims\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 8498,
    "path": "../public/_nuxt/Bc7O0-SY.js"
  },
  "/_nuxt/BfJgVM5X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dab9-SucAm5lz7GoVLr5TU3cdClSvyfI\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 55993,
    "path": "../public/_nuxt/BfJgVM5X.js"
  },
  "/_nuxt/Bg3uYZkJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e28-piJGG3y27mYekq2qLn9n1QNX+L4\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 3624,
    "path": "../public/_nuxt/Bg3uYZkJ.js"
  },
  "/_nuxt/BlTITfZ9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"220f-J9Xz9Q1vwfTvpwJWNN6Cl3kTShI\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 8719,
    "path": "../public/_nuxt/BlTITfZ9.js"
  },
  "/_nuxt/Bn-Bzcar.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"411a-XZMDxDiqUr3NXKlmau0t1ITlZi4\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 16666,
    "path": "../public/_nuxt/Bn-Bzcar.js"
  },
  "/_nuxt/BoIj_gP6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2d941-e5I/27k0eUiNIouaflwooqG51v0\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 186689,
    "path": "../public/_nuxt/BoIj_gP6.js"
  },
  "/_nuxt/BpWxZBgK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1191-nVIHxZUNA6rix5UUZ0ARTX1+KkY\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 4497,
    "path": "../public/_nuxt/BpWxZBgK.js"
  },
  "/_nuxt/BqQ_yVBR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c19-IzV5c6C8oeSUEeGR3741EUUaaCg\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 7193,
    "path": "../public/_nuxt/BqQ_yVBR.js"
  },
  "/_nuxt/BtUZ-HXc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"379d-JA9zEP8REUupbgDY464makRucv8\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 14237,
    "path": "../public/_nuxt/BtUZ-HXc.js"
  },
  "/_nuxt/BuiAxr_Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8e9-g/Bow8Ij3hP7dnK5YYhOjW+aFOU\"",
    "mtime": "2025-01-05T09:19:40.212Z",
    "size": 2281,
    "path": "../public/_nuxt/BuiAxr_Y.js"
  },
  "/_nuxt/BvbUba97.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12c0-dJKWFbQSHpH4DZG9/9kbfq07qYA\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 4800,
    "path": "../public/_nuxt/BvbUba97.js"
  },
  "/_nuxt/By2nJAWV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bd-oRnSacVdqlzQujGPflyqUll9Xuw\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 445,
    "path": "../public/_nuxt/By2nJAWV.js"
  },
  "/_nuxt/ByFfn7pq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2dc-vmXE11pQJaIcEfOGM42kV6s0psU\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 732,
    "path": "../public/_nuxt/ByFfn7pq.js"
  },
  "/_nuxt/ByU7tvlk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2497-C1S6CSrsmVDBQacpUmxWHxt1zcE\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 9367,
    "path": "../public/_nuxt/ByU7tvlk.js"
  },
  "/_nuxt/C59SY41P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b1d-0lzZk0K5OmTWh3togD39IRalAoo\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 2845,
    "path": "../public/_nuxt/C59SY41P.js"
  },
  "/_nuxt/C5FJ8iO1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2d3-Q2w6m5lE5yVnQrDoAwUnOvtyRtE\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 723,
    "path": "../public/_nuxt/C5FJ8iO1.js"
  },
  "/_nuxt/C7aTH8FE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15f5-fwAJeh0cqHxeh3wfXdS3HvxmhaI\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 5621,
    "path": "../public/_nuxt/C7aTH8FE.js"
  },
  "/_nuxt/C9KdGBVb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"972-tgE4Bf8+DI+1JpxWBnCuK68nXS0\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 2418,
    "path": "../public/_nuxt/C9KdGBVb.js"
  },
  "/_nuxt/CDWs0q6a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c813-h7CJpVXInkKiks38nTl5VA+sToI\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 116755,
    "path": "../public/_nuxt/CDWs0q6a.js"
  },
  "/_nuxt/CMeiQ-1y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4383-JBEHrxGzjgkAWVb9V+CmreJ+QMI\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 17283,
    "path": "../public/_nuxt/CMeiQ-1y.js"
  },
  "/_nuxt/CQEmX5Pi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ef-vjE639y6GteHGlJW2d3fytgMA7I\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 239,
    "path": "../public/_nuxt/CQEmX5Pi.js"
  },
  "/_nuxt/CdGL1w5P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bd6-xBFXu6vWpQfBNo59l/Gr9rgtFC8\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 7126,
    "path": "../public/_nuxt/CdGL1w5P.js"
  },
  "/_nuxt/CddbG9uA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"726-xzsBicBrCJn1eauOeAXMQZKUsiU\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 1830,
    "path": "../public/_nuxt/CddbG9uA.js"
  },
  "/_nuxt/CqdbYewM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e1b-y/pyC7OTl3Oaln7CYfgQRnjiJwc\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 3611,
    "path": "../public/_nuxt/CqdbYewM.js"
  },
  "/_nuxt/D38D1crN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e253c-p29A2xwbHm9StfkxyEV0thZZH3g\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 927036,
    "path": "../public/_nuxt/D38D1crN.js"
  },
  "/_nuxt/D6b5yViA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"682-Mzfmyf6h06ikY2G1VWwB+zWZTwc\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 1666,
    "path": "../public/_nuxt/D6b5yViA.js"
  },
  "/_nuxt/D7ztVA15.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1fe-YxLCBWXA27MWeDAK3q4BlpW4CUc\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 510,
    "path": "../public/_nuxt/D7ztVA15.js"
  },
  "/_nuxt/DAz9hhGs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e4-o18V9hkQ4qIf6zJZHUM2MCNzZYY\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 484,
    "path": "../public/_nuxt/DAz9hhGs.js"
  },
  "/_nuxt/DH_HHTls.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5656-d+ftdKMT044fOpfAY7jrqmGzlQI\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 22102,
    "path": "../public/_nuxt/DH_HHTls.js"
  },
  "/_nuxt/DJqQFm0B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9372-iH0bT/RHzDwVEtKqrP+pN8yMGCU\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 37746,
    "path": "../public/_nuxt/DJqQFm0B.js"
  },
  "/_nuxt/DKEqDzWj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e832-SQtKXRSQblpDojwMlE4MpflGRfs\"",
    "mtime": "2025-01-05T09:19:40.213Z",
    "size": 59442,
    "path": "../public/_nuxt/DKEqDzWj.js"
  },
  "/_nuxt/DMJ8BWle.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"241c-2ppaYuKk+/3U+Z/PcUxrG38fA5s\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 9244,
    "path": "../public/_nuxt/DMJ8BWle.js"
  },
  "/_nuxt/DP5m7wrX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10e6-oTv+cx4raTrMQ8nuaTqZXM+p8nA\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 4326,
    "path": "../public/_nuxt/DP5m7wrX.js"
  },
  "/_nuxt/DXMBouTS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"262-nFPaLJmNmBbmDF6kTOnr40kZybI\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 610,
    "path": "../public/_nuxt/DXMBouTS.js"
  },
  "/_nuxt/DYteuh8h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4ac8-2voih3381df5ba8mQ9Mz3b7Mb28\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 19144,
    "path": "../public/_nuxt/DYteuh8h.js"
  },
  "/_nuxt/DfBHtsYq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1679-UNLfyMQyIT9mBP+ZFNUbHtCU8WA\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 5753,
    "path": "../public/_nuxt/DfBHtsYq.js"
  },
  "/_nuxt/DhaJo0gy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3cd-sdn6Y8MyFBSFNpj/LDqKezjrRF0\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 973,
    "path": "../public/_nuxt/DhaJo0gy.js"
  },
  "/_nuxt/Dk148Ilt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3f95-oqvXt8xEJFd058GcKBX1LAmJh8M\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 16277,
    "path": "../public/_nuxt/Dk148Ilt.js"
  },
  "/_nuxt/DpSICy-F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3376-IrCx5eqcv5QLOPGo5jKu7mOZox8\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 13174,
    "path": "../public/_nuxt/DpSICy-F.js"
  },
  "/_nuxt/DxDhBjKN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"320-zznn3IZpu9d44dXZOAFp4yyxI3w\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 800,
    "path": "../public/_nuxt/DxDhBjKN.js"
  },
  "/_nuxt/DxL3qiWe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c45a-4SGtIk7dHciyfnvkxL4hLZNz+Hg\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 50266,
    "path": "../public/_nuxt/DxL3qiWe.js"
  },
  "/_nuxt/DxicphAI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12b-9Z6BmPKjo+RBo17b4SQxV78Szok\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 299,
    "path": "../public/_nuxt/DxicphAI.js"
  },
  "/_nuxt/I4eAVs8E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b4-R3SU7U2tPNt86tUt4fbDmUbRRIQ\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 948,
    "path": "../public/_nuxt/I4eAVs8E.js"
  },
  "/_nuxt/I8pzY8dt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"390-as0r618WIbhad/B/L2RRy2bkGC8\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 912,
    "path": "../public/_nuxt/I8pzY8dt.js"
  },
  "/_nuxt/IndicatorStep.CJWLhDY3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1502-nFOF7sSyzchCCUYko6Txuf8OSQE\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 5378,
    "path": "../public/_nuxt/IndicatorStep.CJWLhDY3.css"
  },
  "/_nuxt/Inter-200_900-1.B2xhLi22.woff2": {
    "type": "font/woff2",
    "etag": "\"6520-ZPN63f5CbAs+du8gr4AxkcON9bM\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 25888,
    "path": "../public/_nuxt/Inter-200_900-1.B2xhLi22.woff2"
  },
  "/_nuxt/Inter-200_900-2.CMZtQduZ.woff2": {
    "type": "font/woff2",
    "etag": "\"4934-2DpHlCV17rgNMOvHv5pbb4PJMPs\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 18740,
    "path": "../public/_nuxt/Inter-200_900-2.CMZtQduZ.woff2"
  },
  "/_nuxt/Inter-200_900-3.CGAr0uHJ.woff2": {
    "type": "font/woff2",
    "etag": "\"2bc0-4RJqkAfSfa5JZkesG5c1br84Zxw\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 11200,
    "path": "../public/_nuxt/Inter-200_900-3.CGAr0uHJ.woff2"
  },
  "/_nuxt/Inter-200_900-4.CaVNZxsx.woff2": {
    "type": "font/woff2",
    "etag": "\"4a80-xHUXj1OV6ywtVWyPDpJQI3wBncg\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 19072,
    "path": "../public/_nuxt/Inter-200_900-4.CaVNZxsx.woff2"
  },
  "/_nuxt/Inter-200_900-5.CBcvBZtf.woff2": {
    "type": "font/woff2",
    "etag": "\"280c-nBythjoDQ0+5wVAendJ6wU7Xz2M\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 10252,
    "path": "../public/_nuxt/Inter-200_900-5.CBcvBZtf.woff2"
  },
  "/_nuxt/Inter-200_900-6.CFHvXkgd.woff2": {
    "type": "font/woff2",
    "etag": "\"12258-7g69LvBHk3zYylRxciKRVYE/+Tk\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 74328,
    "path": "../public/_nuxt/Inter-200_900-6.CFHvXkgd.woff2"
  },
  "/_nuxt/Inter-200_900-7.C2S99t-D.woff2": {
    "type": "font/woff2",
    "etag": "\"bd3c-10AkFnU64btMvUsQ0zoMEFF4OL0\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 48444,
    "path": "../public/_nuxt/Inter-200_900-7.C2S99t-D.woff2"
  },
  "/_nuxt/MMHQkxt8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2deb-264ooFbGMbtkzwi7+YhB+riFaDI\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 11755,
    "path": "../public/_nuxt/MMHQkxt8.js"
  },
  "/_nuxt/NJsbE-Pi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b79-YpV8/IolCrzORduJJGZSj2ar8Hg\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 15225,
    "path": "../public/_nuxt/NJsbE-Pi.js"
  },
  "/_nuxt/Oqf97a5s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"175-mp+/CRAR1wJZ9tvQ5N8Zr4T+2Bs\"",
    "mtime": "2025-01-05T09:19:40.216Z",
    "size": 373,
    "path": "../public/_nuxt/Oqf97a5s.js"
  },
  "/_nuxt/PrimaryBtn.C0fx1CoL.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e7-qw2IkymR7f4+wwawPBzPDoEcXs4\"",
    "mtime": "2025-01-05T09:19:40.214Z",
    "size": 231,
    "path": "../public/_nuxt/PrimaryBtn.C0fx1CoL.css"
  },
  "/_nuxt/QyFeneXa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"34f8-Sgvdjcwo82aY+JCArsE446FAgos\"",
    "mtime": "2025-01-05T09:19:40.216Z",
    "size": 13560,
    "path": "../public/_nuxt/QyFeneXa.js"
  },
  "/_nuxt/Rn3rNQNP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"263-I5u+sofQhL1c12hfxOqa759HYm8\"",
    "mtime": "2025-01-05T09:19:40.216Z",
    "size": 611,
    "path": "../public/_nuxt/Rn3rNQNP.js"
  },
  "/_nuxt/SearchInput.-m4T-MW5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a9-a7RtfbHFgldsCPmPP+rVOIIFuII\"",
    "mtime": "2025-01-05T09:19:40.216Z",
    "size": 169,
    "path": "../public/_nuxt/SearchInput.-m4T-MW5.css"
  },
  "/_nuxt/VBtn.Bh6kLUXj.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"338b-0OxG0XGGHUUEYXK6pnP+JIEup+E\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 13195,
    "path": "../public/_nuxt/VBtn.Bh6kLUXj.css"
  },
  "/_nuxt/VEmptyState.CY43CGv5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3da-+kuQCop4VC5Jxo40+nU1kq1zOiQ\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 986,
    "path": "../public/_nuxt/VEmptyState.CY43CGv5.css"
  },
  "/_nuxt/VFileInput.D24N9p85.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"375-jlBNKzS6UNSD6CffHjH1GV6v45E\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 885,
    "path": "../public/_nuxt/VFileInput.D24N9p85.css"
  },
  "/_nuxt/VFooter.DnKbEaCM.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"450-3Z1yce8jyG2qBu0iWXlB36ePbl8\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 1104,
    "path": "../public/_nuxt/VFooter.DnKbEaCM.css"
  },
  "/_nuxt/VGrid.D0S0a0cH.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2541-tmtX0/5zNIAF9o+LeBGWWhWESKI\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 9537,
    "path": "../public/_nuxt/VGrid.D0S0a0cH.css"
  },
  "/_nuxt/VItem.D-0vg8zC.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"65-IN2r/XvkJIEQ5JtBC4BG/jh0Qy8\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 101,
    "path": "../public/_nuxt/VItem.D-0vg8zC.css"
  },
  "/_nuxt/VSheet.BOaw1GDg.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2a7-zfqDAwvwv4zh7k4J31uj+r6hY6E\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 679,
    "path": "../public/_nuxt/VSheet.BOaw1GDg.css"
  },
  "/_nuxt/VTooltip.B8D_82Vi.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10c5-LrdVRKfIRTKKoXnSzmmwPokf8l8\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 4293,
    "path": "../public/_nuxt/VTooltip.B8D_82Vi.css"
  },
  "/_nuxt/XBCVkFOx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"aff-/JWFm3zgltYp4ko1khkGcbRmxxU\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 2815,
    "path": "../public/_nuxt/XBCVkFOx.js"
  },
  "/_nuxt/ad.BOo-tPI4.svg": {
    "type": "image/svg+xml",
    "etag": "\"838b-zKSUiGtoYv494NkicLLsd89Rq4E\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 33675,
    "path": "../public/_nuxt/ad.BOo-tPI4.svg"
  },
  "/_nuxt/ad.CDtWnnSA.svg": {
    "type": "image/svg+xml",
    "etag": "\"7ece-5vDdt+rYKHRWLQNKdhZxgZOAFJ8\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 32462,
    "path": "../public/_nuxt/ad.CDtWnnSA.svg"
  },
  "/_nuxt/af.CI4E3ER1.svg": {
    "type": "image/svg+xml",
    "etag": "\"5240-0azjBv919ZYiYXpYfy4zPOnVR6w\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 21056,
    "path": "../public/_nuxt/af.CI4E3ER1.svg"
  },
  "/_nuxt/af.Cc32fsDB.svg": {
    "type": "image/svg+xml",
    "etag": "\"51b8-oF8PkypwSzgJebLRQ7rT1nAVrx4\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 20920,
    "path": "../public/_nuxt/af.Cc32fsDB.svg"
  },
  "/_nuxt/arab.DwNob5Qo.svg": {
    "type": "image/svg+xml",
    "etag": "\"66e4-TyFF6zfAuvtKJfEq3fnq8lxM4Zo\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 26340,
    "path": "../public/_nuxt/arab.DwNob5Qo.svg"
  },
  "/_nuxt/arab.PzQTPYwO.svg": {
    "type": "image/svg+xml",
    "etag": "\"6758-H+Am1ycULhy7VxzWu1inn0oV5Oc\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 26456,
    "path": "../public/_nuxt/arab.PzQTPYwO.svg"
  },
  "/_nuxt/as.D2gsNMrP.svg": {
    "type": "image/svg+xml",
    "etag": "\"7df9-hfmLvB+OtIPlwSGZbgtvUnWceYc\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 32249,
    "path": "../public/_nuxt/as.D2gsNMrP.svg"
  },
  "/_nuxt/as._t1IQUdv.svg": {
    "type": "image/svg+xml",
    "etag": "\"7ef0-qth8CNDCPJ2wU/j/1cLc+3sRiwU\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 32496,
    "path": "../public/_nuxt/as._t1IQUdv.svg"
  },
  "/_nuxt/aw.CLCX8uk5.svg": {
    "type": "image/svg+xml",
    "etag": "\"2873-4krtEff2CwV+UypuoZDBuoBm+zw\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 10355,
    "path": "../public/_nuxt/aw.CLCX8uk5.svg"
  },
  "/_nuxt/aw.W0PWLK5p.svg": {
    "type": "image/svg+xml",
    "etag": "\"232b-JRw1kavJhxJqEswJm/XzPSnOmoY\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 9003,
    "path": "../public/_nuxt/aw.W0PWLK5p.svg"
  },
  "/_nuxt/bienvenido.KyDmuz1o.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"665-Uf5WJeaeKL5f3mwhixyyncKZBD8\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 1637,
    "path": "../public/_nuxt/bienvenido.KyDmuz1o.css"
  },
  "/_nuxt/bm.BoWRAtUx.svg": {
    "type": "image/svg+xml",
    "etag": "\"591b-rmrCsdvbRuouLhC/JoIkrg3t+Kw\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 22811,
    "path": "../public/_nuxt/bm.BoWRAtUx.svg"
  },
  "/_nuxt/bm.D2j4bkLD.svg": {
    "type": "image/svg+xml",
    "etag": "\"58ce-xXZKFuPzrixmtFtoQDEhhZKq8Jk\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 22734,
    "path": "../public/_nuxt/bm.D2j4bkLD.svg"
  },
  "/_nuxt/bn.BDKbSv-u.svg": {
    "type": "image/svg+xml",
    "etag": "\"37ec-Xsw53oOC838N3wifjWXwSkJJoro\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 14316,
    "path": "../public/_nuxt/bn.BDKbSv-u.svg"
  },
  "/_nuxt/bn.UGyQANfK.svg": {
    "type": "image/svg+xml",
    "etag": "\"3879-kzjktVGJI7O6nQStXaaaKRAzuHU\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 14457,
    "path": "../public/_nuxt/bn.UGyQANfK.svg"
  },
  "/_nuxt/bo.BqtZbaiW.svg": {
    "type": "image/svg+xml",
    "etag": "\"1b5d4-Hz2ls+tCFrlIhRBZwVJYIQrlV1o\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 112084,
    "path": "../public/_nuxt/bo.BqtZbaiW.svg"
  },
  "/_nuxt/bo.CP9m75_5.svg": {
    "type": "image/svg+xml",
    "etag": "\"1bd5b-vX6lL3ptekqeSr5Z3IQ6yaYwvW0\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 114011,
    "path": "../public/_nuxt/bo.CP9m75_5.svg"
  },
  "/_nuxt/br.DaE4AJQY.svg": {
    "type": "image/svg+xml",
    "etag": "\"1fa0-F5abWsDNckUsWGPTTgDw9d7Bxs8\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 8096,
    "path": "../public/_nuxt/br.DaE4AJQY.svg"
  },
  "/_nuxt/br.Yf30zEjB.svg": {
    "type": "image/svg+xml",
    "etag": "\"1e03-xP9bmz+AzCjSTU88P8Fiju0RcKY\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 7683,
    "path": "../public/_nuxt/br.Yf30zEjB.svg"
  },
  "/_nuxt/bt.Cm0R6rAQ.svg": {
    "type": "image/svg+xml",
    "etag": "\"6150-jmiarjxhzIoiSJMQRMLG/rxgawM\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 24912,
    "path": "../public/_nuxt/bt.Cm0R6rAQ.svg"
  },
  "/_nuxt/bt.Csq9bKsA.svg": {
    "type": "image/svg+xml",
    "etag": "\"621b-MpRM3Xl4xTWJEX6lM8CiEFxMZbw\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 25115,
    "path": "../public/_nuxt/bt.Csq9bKsA.svg"
  },
  "/_nuxt/bz.CqiVUvof.svg": {
    "type": "image/svg+xml",
    "etag": "\"b76e-+cbEbvG8yEAuJvLbT+Ukq7bE/Ks\"",
    "mtime": "2025-01-05T09:19:40.217Z",
    "size": 46958,
    "path": "../public/_nuxt/bz.CqiVUvof.svg"
  },
  "/_nuxt/bz.YpwBidLU.svg": {
    "type": "image/svg+xml",
    "etag": "\"b64f-HWi8dQpY/aUlIHHIRpZPSxZWmgE\"",
    "mtime": "2025-01-05T09:19:40.218Z",
    "size": 46671,
    "path": "../public/_nuxt/bz.YpwBidLU.svg"
  },
  "/_nuxt/calendario.DvCRK6FG.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3d2-4xaaSZtiE2K4FsOJYcfEpbv+vKU\"",
    "mtime": "2025-01-05T09:19:40.218Z",
    "size": 978,
    "path": "../public/_nuxt/calendario.DvCRK6FG.css"
  },
  "/_nuxt/configuracion.C98Fcc4a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"17f7-A19k2NHAtJtUVVwdm6t5nl+AQFg\"",
    "mtime": "2025-01-05T09:19:40.218Z",
    "size": 6135,
    "path": "../public/_nuxt/configuracion.C98Fcc4a.css"
  },
  "/_nuxt/cy.Bgo0XIP0.svg": {
    "type": "image/svg+xml",
    "etag": "\"1774-bbjhsbMj0d44heWkaKLYP/IYFNA\"",
    "mtime": "2025-01-05T09:19:40.218Z",
    "size": 6004,
    "path": "../public/_nuxt/cy.Bgo0XIP0.svg"
  },
  "/_nuxt/cy.VQFkW-qk.svg": {
    "type": "image/svg+xml",
    "etag": "\"171a-vUcEtCQluC4wNmIddal9OunLI7I\"",
    "mtime": "2025-01-05T09:19:40.218Z",
    "size": 5914,
    "path": "../public/_nuxt/cy.VQFkW-qk.svg"
  },
  "/_nuxt/default.DNjfXfnG.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b83-IlaK19kPgPpnDzp8vxIN5vew4HA\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 2947,
    "path": "../public/_nuxt/default.DNjfXfnG.css"
  },
  "/_nuxt/dg.B55Nvqqm.svg": {
    "type": "image/svg+xml",
    "etag": "\"5a7b-8aM6i3VAph7EZpsh/Rc46tcbD5s\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 23163,
    "path": "../public/_nuxt/dg.B55Nvqqm.svg"
  },
  "/_nuxt/dg.CPWO5scz.svg": {
    "type": "image/svg+xml",
    "etag": "\"595d-7d/KIWp4GL17E0rcBlua2OqcJUo\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 22877,
    "path": "../public/_nuxt/dg.CPWO5scz.svg"
  },
  "/_nuxt/dm.BlhP-6zy.svg": {
    "type": "image/svg+xml",
    "etag": "\"3dce-wWNeZwYc66uajVJzYqrrn7n1j3A\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 15822,
    "path": "../public/_nuxt/dm.BlhP-6zy.svg"
  },
  "/_nuxt/dm.ClJ_IDld.svg": {
    "type": "image/svg+xml",
    "etag": "\"3fb6-r1/aLdyywmzSYaA6vWzWEW+RKeQ\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 16310,
    "path": "../public/_nuxt/dm.ClJ_IDld.svg"
  },
  "/_nuxt/do.-tGVu9lQ.svg": {
    "type": "image/svg+xml",
    "etag": "\"c392-ymbyvfCP7QfojHT3Qnc0Q89kWAM\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 50066,
    "path": "../public/_nuxt/do.-tGVu9lQ.svg"
  },
  "/_nuxt/do.DJGo0v5t.svg": {
    "type": "image/svg+xml",
    "etag": "\"c6a8-20l0q1pMX+5VoMH6YHieaSZ5Y8c\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 50856,
    "path": "../public/_nuxt/do.DJGo0v5t.svg"
  },
  "/_nuxt/eac.CZCl_pn7.svg": {
    "type": "image/svg+xml",
    "etag": "\"378c-l4XpoZAWJ85FmxbOR2LIpRpMoCw\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 14220,
    "path": "../public/_nuxt/eac.CZCl_pn7.svg"
  },
  "/_nuxt/eac.D_uIzpYR.svg": {
    "type": "image/svg+xml",
    "etag": "\"3795-WDkiRA+8YsL8zPAECKgHPl/XBq0\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 14229,
    "path": "../public/_nuxt/eac.D_uIzpYR.svg"
  },
  "/_nuxt/ec.LNhQ9L4k.svg": {
    "type": "image/svg+xml",
    "etag": "\"712d-5Izcf86XqxIVCpltL7HCM3BslTQ\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 28973,
    "path": "../public/_nuxt/ec.LNhQ9L4k.svg"
  },
  "/_nuxt/ec.sTVr1A3S.svg": {
    "type": "image/svg+xml",
    "etag": "\"736e-Q/ntUqwX/IYyttEfNUfMIKXtJsg\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 29550,
    "path": "../public/_nuxt/ec.sTVr1A3S.svg"
  },
  "/_nuxt/eg.BIzzVp3n.svg": {
    "type": "image/svg+xml",
    "etag": "\"267e-G6AbGe6PxzCzJG8r2Hq2KV5tFRE\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 9854,
    "path": "../public/_nuxt/eg.BIzzVp3n.svg"
  },
  "/_nuxt/eg.C1MYAOXe.svg": {
    "type": "image/svg+xml",
    "etag": "\"268b-OkDdWxxz8yaCPf2ZXwUC0zzHce8\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 9867,
    "path": "../public/_nuxt/eg.C1MYAOXe.svg"
  },
  "/_nuxt/entry.zQvh-T_M.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a7ce9-UoJ38gJGhK50P1uuqzQHAY1KVOA\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 687337,
    "path": "../public/_nuxt/entry.zQvh-T_M.css"
  },
  "/_nuxt/es-ga.BbFllROk.svg": {
    "type": "image/svg+xml",
    "etag": "\"6fd4-92kfPdSVFyXAwVHntn6hM7xz/6Q\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 28628,
    "path": "../public/_nuxt/es-ga.BbFllROk.svg"
  },
  "/_nuxt/es-ga.RI_ZudJJ.svg": {
    "type": "image/svg+xml",
    "etag": "\"7043-5iclR1hrCAyoSeUmuZF8UMfpnGo\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 28739,
    "path": "../public/_nuxt/es-ga.RI_ZudJJ.svg"
  },
  "/_nuxt/es.CR0ZfKpD.svg": {
    "type": "image/svg+xml",
    "etag": "\"16a80-vMXID8juwLkjp2d59nQZEEEYzoM\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 92800,
    "path": "../public/_nuxt/es.CR0ZfKpD.svg"
  },
  "/_nuxt/es.DL6RIaKh.svg": {
    "type": "image/svg+xml",
    "etag": "\"16383-TxqSzxIKATDe5ztQuFAAkWLlrOY\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 91011,
    "path": "../public/_nuxt/es.DL6RIaKh.svg"
  },
  "/_nuxt/fj.CJDn3VQ8.svg": {
    "type": "image/svg+xml",
    "etag": "\"64c1-13a1JugCfK6QodALSyH/ZpFL+nc\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 25793,
    "path": "../public/_nuxt/fj.CJDn3VQ8.svg"
  },
  "/_nuxt/fj.DLvzYbo8.svg": {
    "type": "image/svg+xml",
    "etag": "\"6456-jTxtRaxMk9v6sJbing745iBl5v0\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 25686,
    "path": "../public/_nuxt/fj.DLvzYbo8.svg"
  },
  "/_nuxt/fk.Be42QBCW.svg": {
    "type": "image/svg+xml",
    "etag": "\"7668-cbrs2GXuaLISQoBTt/x13S1LDa4\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 30312,
    "path": "../public/_nuxt/fk.Be42QBCW.svg"
  },
  "/_nuxt/fk.Ck9cznm4.svg": {
    "type": "image/svg+xml",
    "etag": "\"755c-rIsWLcdf3lbQ7N5nvSqLiqsrOuI\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 30044,
    "path": "../public/_nuxt/fk.Ck9cznm4.svg"
  },
  "/_nuxt/gb-nir.BOm9QMOa.svg": {
    "type": "image/svg+xml",
    "etag": "\"5c29-M1X27XklYnbKV+JquHubbkGuuOk\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 23593,
    "path": "../public/_nuxt/gb-nir.BOm9QMOa.svg"
  },
  "/_nuxt/gb-nir.BZUeOVwE.svg": {
    "type": "image/svg+xml",
    "etag": "\"622b-pFbWt9pBYpipQZetmVsBFojwQrk\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 25131,
    "path": "../public/_nuxt/gb-nir.BZUeOVwE.svg"
  },
  "/_nuxt/gb-wls.C4LdH8Nd.svg": {
    "type": "image/svg+xml",
    "etag": "\"23da-+9zSyqksEmVABgyqOswFNFaxvwk\"",
    "mtime": "2025-01-05T09:19:40.219Z",
    "size": 9178,
    "path": "../public/_nuxt/gb-wls.C4LdH8Nd.svg"
  },
  "/_nuxt/gb-wls.lLp_JivI.svg": {
    "type": "image/svg+xml",
    "etag": "\"236e-xBOwbyEZrBEL8NQC37nqbJKMC9A\"",
    "mtime": "2025-01-05T09:19:40.220Z",
    "size": 9070,
    "path": "../public/_nuxt/gb-wls.lLp_JivI.svg"
  },
  "/_nuxt/gq.BvOxIUGP.svg": {
    "type": "image/svg+xml",
    "etag": "\"142a-mweHWWpgt7t9V3rStNDd0hYu9N4\"",
    "mtime": "2025-01-05T09:19:40.220Z",
    "size": 5162,
    "path": "../public/_nuxt/gq.BvOxIUGP.svg"
  },
  "/_nuxt/gq.OBiOttRB.svg": {
    "type": "image/svg+xml",
    "etag": "\"13d0-Fm8fwSr/rTr8ReI/Wr1SQuGXL+A\"",
    "mtime": "2025-01-05T09:19:40.220Z",
    "size": 5072,
    "path": "../public/_nuxt/gq.OBiOttRB.svg"
  },
  "/_nuxt/gs.Di8hLP4g.svg": {
    "type": "image/svg+xml",
    "etag": "\"7f0d-JhC7AMFkh5vlDBf5gfn3wcvCFNM\"",
    "mtime": "2025-01-05T09:19:40.220Z",
    "size": 32525,
    "path": "../public/_nuxt/gs.Di8hLP4g.svg"
  },
  "/_nuxt/gs.PK6r6yhR.svg": {
    "type": "image/svg+xml",
    "etag": "\"80fd-fs9dDFKCRggEe4MjOX1yh0oFqIw\"",
    "mtime": "2025-01-05T09:19:40.220Z",
    "size": 33021,
    "path": "../public/_nuxt/gs.PK6r6yhR.svg"
  },
  "/_nuxt/gt.CovS1bZs.svg": {
    "type": "image/svg+xml",
    "etag": "\"8913-7f9YVmk0aphwLxBRRhm59TNiX/w\"",
    "mtime": "2025-01-05T09:19:40.220Z",
    "size": 35091,
    "path": "../public/_nuxt/gt.CovS1bZs.svg"
  },
  "/_nuxt/gt.Ufdm0MFv.svg": {
    "type": "image/svg+xml",
    "etag": "\"8913-nrrUD8qqfAsTiPlqpDV8ADH8M8I\"",
    "mtime": "2025-01-05T09:19:40.220Z",
    "size": 35091,
    "path": "../public/_nuxt/gt.Ufdm0MFv.svg"
  },
  "/_nuxt/gu.Bkjkorus.svg": {
    "type": "image/svg+xml",
    "etag": "\"13e8-NFe141OaTqmp9+TdeDzB1OYkynA\"",
    "mtime": "2025-01-05T09:19:40.220Z",
    "size": 5096,
    "path": "../public/_nuxt/gu.Bkjkorus.svg"
  },
  "/_nuxt/gu.wFhsTC1Y.svg": {
    "type": "image/svg+xml",
    "etag": "\"132f-+gJFPNb8ZSCx7wqc246cbFbiJVo\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 4911,
    "path": "../public/_nuxt/gu.wFhsTC1Y.svg"
  },
  "/_nuxt/headers-table.Dra9mZcD.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1b07-PQdCk37Bx3U4NIZCAXShqj5zEvI\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 6919,
    "path": "../public/_nuxt/headers-table.Dra9mZcD.css"
  },
  "/_nuxt/hr.C7VqhX5l.svg": {
    "type": "image/svg+xml",
    "etag": "\"a19e-nclYcAX7qWdEl8bcvUGhYq3LkkI\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 41374,
    "path": "../public/_nuxt/hr.C7VqhX5l.svg"
  },
  "/_nuxt/hr.cWEworf7.svg": {
    "type": "image/svg+xml",
    "etag": "\"a0d9-JCtbCuVI3s7Q1nUST9Ib8N0KIzI\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 41177,
    "path": "../public/_nuxt/hr.cWEworf7.svg"
  },
  "/_nuxt/ht.DPCqX9cm.svg": {
    "type": "image/svg+xml",
    "etag": "\"38ea-Lq0Py7Kll+t0Dqd8fdB3ojo/k3U\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 14570,
    "path": "../public/_nuxt/ht.DPCqX9cm.svg"
  },
  "/_nuxt/ht.HoSCtdNQ.svg": {
    "type": "image/svg+xml",
    "etag": "\"396a-OsT2xspfyhy21hpFiEWep6Lt08k\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 14698,
    "path": "../public/_nuxt/ht.HoSCtdNQ.svg"
  },
  "/_nuxt/im.BAoxVCMv.svg": {
    "type": "image/svg+xml",
    "etag": "\"26a8-gS99M5ZUKHTgspviJIgEibTusbQ\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 9896,
    "path": "../public/_nuxt/im.BAoxVCMv.svg"
  },
  "/_nuxt/im.deD7ny0b.svg": {
    "type": "image/svg+xml",
    "etag": "\"27ee-ZfQIfgANKiFp7V6mtnh5G53Vyzs\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 10222,
    "path": "../public/_nuxt/im.deD7ny0b.svg"
  },
  "/_nuxt/index.6bqkyynS.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"42fb-cNdFy9RNwgwg/uXyDgwwGLwIVDw\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 17147,
    "path": "../public/_nuxt/index.6bqkyynS.css"
  },
  "/_nuxt/index.B6IP1l0C.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"237f-99wj8w6M9Y+6ucFZqdk4uNpLWHk\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 9087,
    "path": "../public/_nuxt/index.B6IP1l0C.css"
  },
  "/_nuxt/index.BGCtaZnN.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e80-FszmiZZ0zq0VSB2I4oX/nhik3fs\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 3712,
    "path": "../public/_nuxt/index.BGCtaZnN.css"
  },
  "/_nuxt/index.BH1I8ygL.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2b72-vHbwaveZQREuhvdcakNsor/K0XA\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 11122,
    "path": "../public/_nuxt/index.BH1I8ygL.css"
  },
  "/_nuxt/index.BUKEHfo7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e72-ooSHErvF6eubufINJEtsezciJbc\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 7794,
    "path": "../public/_nuxt/index.BUKEHfo7.css"
  },
  "/_nuxt/index.Bgbu6HTz.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7f-CkM+baJ/HQfEhfa7Ch2GOWbRjjQ\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 127,
    "path": "../public/_nuxt/index.Bgbu6HTz.css"
  },
  "/_nuxt/index.DuQYW5Kc.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b82-cMMwIJgJNftGgBkvp8m6WjbZ/p0\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 2946,
    "path": "../public/_nuxt/index.DuQYW5Kc.css"
  },
  "/_nuxt/io.Bkx8USW1.svg": {
    "type": "image/svg+xml",
    "etag": "\"5a7b-+LAxCeOs6SEBzmPOvgcBSWhqTds\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 23163,
    "path": "../public/_nuxt/io.Bkx8USW1.svg"
  },
  "/_nuxt/io.BzKkDPkD.svg": {
    "type": "image/svg+xml",
    "etag": "\"595d-dnt1crf4dXSbzWxV7W+IviJqO2U\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 22877,
    "path": "../public/_nuxt/io.BzKkDPkD.svg"
  },
  "/_nuxt/ir.CXFV1BFU.svg": {
    "type": "image/svg+xml",
    "etag": "\"3bcf-MKLQudcMQ0c7RCJmSpz+o+vemEs\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 15311,
    "path": "../public/_nuxt/ir.CXFV1BFU.svg"
  },
  "/_nuxt/ir.cCIgaNf6.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c25-QtOTulbNrpKS/HlnL2x4LKmwvWk\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 15397,
    "path": "../public/_nuxt/ir.cCIgaNf6.svg"
  },
  "/_nuxt/je.PUw16g1j.svg": {
    "type": "image/svg+xml",
    "etag": "\"b3f5-Uyy8jPLlAYycPYl5MogJRheOq6U\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 46069,
    "path": "../public/_nuxt/je.PUw16g1j.svg"
  },
  "/_nuxt/je.YWv5VSiQ.svg": {
    "type": "image/svg+xml",
    "etag": "\"b6af-FtPbppMs+9C/Rz2DIQpFXGT8lZY\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 46767,
    "path": "../public/_nuxt/je.YWv5VSiQ.svg"
  },
  "/_nuxt/kh.CAffWc0R.svg": {
    "type": "image/svg+xml",
    "etag": "\"1c6e-v4URv0ZByZgrohcStpeFTcFjH6U\"",
    "mtime": "2025-01-05T09:19:40.222Z",
    "size": 7278,
    "path": "../public/_nuxt/kh.CAffWc0R.svg"
  },
  "/_nuxt/kh.V4Sa3vlt.svg": {
    "type": "image/svg+xml",
    "etag": "\"1c6d-U2Ey0FoJUNcL/9jAs7aTPVK0o8o\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 7277,
    "path": "../public/_nuxt/kh.V4Sa3vlt.svg"
  },
  "/_nuxt/ki.CM44VBPm.svg": {
    "type": "image/svg+xml",
    "etag": "\"16b2-2Od6iFPctNDwlFeVSqqe5P1Q/cE\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 5810,
    "path": "../public/_nuxt/ki.CM44VBPm.svg"
  },
  "/_nuxt/ki.COZ8g898.svg": {
    "type": "image/svg+xml",
    "etag": "\"1605-BcNCtjkQTTw40tJzGgdN6fQ+Npo\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 5637,
    "path": "../public/_nuxt/ki.COZ8g898.svg"
  },
  "/_nuxt/ky.BqProAqG.svg": {
    "type": "image/svg+xml",
    "etag": "\"5dc5-cIgOXXAYIT77jaKStDOvuEdXzbk\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 24005,
    "path": "../public/_nuxt/ky.BqProAqG.svg"
  },
  "/_nuxt/ky.D_l3blFP.svg": {
    "type": "image/svg+xml",
    "etag": "\"5db7-5Xf2PuyWvK0euKAq9WAVYGvP7hw\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 23991,
    "path": "../public/_nuxt/ky.D_l3blFP.svg"
  },
  "/_nuxt/kz.BBCbe9jj.svg": {
    "type": "image/svg+xml",
    "etag": "\"1c7b-pHnRcMt5RdVz9frLk0LuoUCF4uU\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 7291,
    "path": "../public/_nuxt/kz.BBCbe9jj.svg"
  },
  "/_nuxt/kz.DBjWpOlG.svg": {
    "type": "image/svg+xml",
    "etag": "\"1c79-wGKoicj/PC4uqQbxT7KYnpShZAI\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 7289,
    "path": "../public/_nuxt/kz.DBjWpOlG.svg"
  },
  "/_nuxt/li.DgeenFRc.svg": {
    "type": "image/svg+xml",
    "etag": "\"2035-Vd2HIjJVjz18P1G/MZHb8/QPG/w\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 8245,
    "path": "../public/_nuxt/li.DgeenFRc.svg"
  },
  "/_nuxt/li.y6TPS81M.svg": {
    "type": "image/svg+xml",
    "etag": "\"204b-ulsuAWSUJr9e7FJxCMkTwJGCQYU\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 8267,
    "path": "../public/_nuxt/li.y6TPS81M.svg"
  },
  "/_nuxt/lk.B2IfFxoh.svg": {
    "type": "image/svg+xml",
    "etag": "\"2c4a-eBUcIdSSJFr2s3yBKoZ5b+cShr4\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 11338,
    "path": "../public/_nuxt/lk.B2IfFxoh.svg"
  },
  "/_nuxt/lk.DIvkWByA.svg": {
    "type": "image/svg+xml",
    "etag": "\"2c56-7KvEBsMpihZ4BRGyFVrTzA4NhxM\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 11350,
    "path": "../public/_nuxt/lk.DIvkWByA.svg"
  },
  "/_nuxt/login.xTuoVA0l.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"66d-ZaaFn/9rjAMUfca2NUbjeNsOteI\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 1645,
    "path": "../public/_nuxt/login.xTuoVA0l.css"
  },
  "/_nuxt/main.DILGjs9L.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5b0b-pPgmJ+icMnW+gmycNhvzmH3kjPw\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 23307,
    "path": "../public/_nuxt/main.DILGjs9L.css"
  },
  "/_nuxt/md.DArlF80d.svg": {
    "type": "image/svg+xml",
    "etag": "\"2bc3-T+1oKPMOOpfkA+z5rr/Bg6Yn+Kw\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 11203,
    "path": "../public/_nuxt/md.DArlF80d.svg"
  },
  "/_nuxt/md.DRw6DF0o.svg": {
    "type": "image/svg+xml",
    "etag": "\"2c2d-hgQ9nrlBwAUUuRVtKLOmnGnV768\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 11309,
    "path": "../public/_nuxt/md.DRw6DF0o.svg"
  },
  "/_nuxt/me.B32CQdRA.svg": {
    "type": "image/svg+xml",
    "etag": "\"f466-RnuPM85PTSW7cISdtcOT4cZXFjU\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 62566,
    "path": "../public/_nuxt/me.B32CQdRA.svg"
  },
  "/_nuxt/me.BUFcTh_w.svg": {
    "type": "image/svg+xml",
    "etag": "\"f83e-f5mZbcTFILRfVcle6EIgoG6l208\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 63550,
    "path": "../public/_nuxt/me.BUFcTh_w.svg"
  },
  "/_nuxt/mp.DOjKDFJv.svg": {
    "type": "image/svg+xml",
    "etag": "\"5c18-E2pcAGTyFdSSkqJAvYSXMfQpIHM\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 23576,
    "path": "../public/_nuxt/mp.DOjKDFJv.svg"
  },
  "/_nuxt/mp.xI88Vk3c.svg": {
    "type": "image/svg+xml",
    "etag": "\"5b24-bNeX01DtH7ykKfkktynDGTe/9OY\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 23332,
    "path": "../public/_nuxt/mp.xI88Vk3c.svg"
  },
  "/_nuxt/ms.7tNehsjt.svg": {
    "type": "image/svg+xml",
    "etag": "\"17b2-ylB6FZM5ZrhQ6zdwGxyactkekxA\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 6066,
    "path": "../public/_nuxt/ms.7tNehsjt.svg"
  },
  "/_nuxt/ms.D--tLJBo.svg": {
    "type": "image/svg+xml",
    "etag": "\"17ea-hNdsLYosTa9p3GPBG+6SeKF5DG0\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 6122,
    "path": "../public/_nuxt/ms.D--tLJBo.svg"
  },
  "/_nuxt/mt.0OWB-5b3.svg": {
    "type": "image/svg+xml",
    "etag": "\"392e-X6SYKB0/nAR7Gl8BPeUZuZqosws\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 14638,
    "path": "../public/_nuxt/mt.0OWB-5b3.svg"
  },
  "/_nuxt/mt.DeenPMqd.svg": {
    "type": "image/svg+xml",
    "etag": "\"359d-Nm7zglHAj/PE3CAGR5Qp1jwJ8Qc\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 13725,
    "path": "../public/_nuxt/mt.DeenPMqd.svg"
  },
  "/_nuxt/mx.4c9y9ryX.svg": {
    "type": "image/svg+xml",
    "etag": "\"15b05-EOEQ1mYX48IS/98YkQSVsLsMFOg\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 88837,
    "path": "../public/_nuxt/mx.4c9y9ryX.svg"
  },
  "/_nuxt/mx.C7ivyfFO.svg": {
    "type": "image/svg+xml",
    "etag": "\"16d0b-NJLU4xgb9218suvI1wTL9VEoHLE\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 93451,
    "path": "../public/_nuxt/mx.C7ivyfFO.svg"
  },
  "/_nuxt/nf.-j2oelto.svg": {
    "type": "image/svg+xml",
    "etag": "\"15b8-63YC52XUcndqCX4onmD59HPd2zk\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 5560,
    "path": "../public/_nuxt/nf.-j2oelto.svg"
  },
  "/_nuxt/nf.COchEj81.svg": {
    "type": "image/svg+xml",
    "etag": "\"16b4-zr1tagCv6WTZNI0lBybW5OiWIl4\"",
    "mtime": "2025-01-05T09:19:40.223Z",
    "size": 5812,
    "path": "../public/_nuxt/nf.COchEj81.svg"
  },
  "/_nuxt/ni.CC3zFI7h.svg": {
    "type": "image/svg+xml",
    "etag": "\"4803-aqlOQvykjrjtUMj/jqZj2Sh5s3c\"",
    "mtime": "2025-01-05T09:19:40.224Z",
    "size": 18435,
    "path": "../public/_nuxt/ni.CC3zFI7h.svg"
  },
  "/_nuxt/ni.ChnV2lR-.svg": {
    "type": "image/svg+xml",
    "etag": "\"483e-Rbd1RHLdbkNKW7DkHH3e5q79L2k\"",
    "mtime": "2025-01-05T09:19:40.224Z",
    "size": 18494,
    "path": "../public/_nuxt/ni.ChnV2lR-.svg"
  },
  "/_nuxt/om.DnUPbroW.svg": {
    "type": "image/svg+xml",
    "etag": "\"585f-I64b/6vgBIW1rza/o7vzCRtbeSo\"",
    "mtime": "2025-01-05T09:19:40.224Z",
    "size": 22623,
    "path": "../public/_nuxt/om.DnUPbroW.svg"
  },
  "/_nuxt/om.Ri__rIwP.svg": {
    "type": "image/svg+xml",
    "etag": "\"584f-kQRHNzRH3Nc8XoUiFqF1uXjIhvM\"",
    "mtime": "2025-01-05T09:19:40.224Z",
    "size": 22607,
    "path": "../public/_nuxt/om.Ri__rIwP.svg"
  },
  "/_nuxt/pf.CEX9Vx76.svg": {
    "type": "image/svg+xml",
    "etag": "\"100b-9T41gdnhhtULKPrJzOnbZNbEbvQ\"",
    "mtime": "2025-01-05T09:19:40.224Z",
    "size": 4107,
    "path": "../public/_nuxt/pf.CEX9Vx76.svg"
  },
  "/_nuxt/pf.CMTHIumB.svg": {
    "type": "image/svg+xml",
    "etag": "\"1038-UAQr8zKLFQepaQSZ+oN/H77t6WU\"",
    "mtime": "2025-01-05T09:19:40.224Z",
    "size": 4152,
    "path": "../public/_nuxt/pf.CMTHIumB.svg"
  },
  "/_nuxt/pn.DEs-Vj71.svg": {
    "type": "image/svg+xml",
    "etag": "\"360f-IILd4QB3lg0BxSPCk76rKn5Y7t8\"",
    "mtime": "2025-01-05T09:19:40.224Z",
    "size": 13839,
    "path": "../public/_nuxt/pn.DEs-Vj71.svg"
  },
  "/_nuxt/pn.vyD5VXw1.svg": {
    "type": "image/svg+xml",
    "etag": "\"3638-O+Nk8k5nLICB9/RWruEdwYtHuIA\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 13880,
    "path": "../public/_nuxt/pn.vyD5VXw1.svg"
  },
  "/_nuxt/politica-de-privacidad.B6kW2J9Y.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"13f-qFnbw83jrycCm6YV1cK27Ij2PDI\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 319,
    "path": "../public/_nuxt/politica-de-privacidad.B6kW2J9Y.css"
  },
  "/_nuxt/pt.BLLm3V0o.svg": {
    "type": "image/svg+xml",
    "etag": "\"21e0-plBCA9VT+LwzBRkD1T09FGYBxLI\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 8672,
    "path": "../public/_nuxt/pt.BLLm3V0o.svg"
  },
  "/_nuxt/pt.BV5okG4O.svg": {
    "type": "image/svg+xml",
    "etag": "\"207c-DZz76Gk+7Op83qX8qn4spn6j0io\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 8316,
    "path": "../public/_nuxt/pt.BV5okG4O.svg"
  },
  "/_nuxt/py.BfpB8kRi.svg": {
    "type": "image/svg+xml",
    "etag": "\"432a-q76E3oGrOpvOxG9beXxEltBCMjo\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 17194,
    "path": "../public/_nuxt/py.BfpB8kRi.svg"
  },
  "/_nuxt/py.CRTEf2ay.svg": {
    "type": "image/svg+xml",
    "etag": "\"43d1-90ixgSYxmvqa6hKybsT+1ix4PCE\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 17361,
    "path": "../public/_nuxt/py.CRTEf2ay.svg"
  },
  "/_nuxt/register-img.Ddaudsln.webp": {
    "type": "image/webp",
    "etag": "\"130e0-9cxOm6MKQv69smJqzJp/+aV0ZRc\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 78048,
    "path": "../public/_nuxt/register-img.Ddaudsln.webp"
  },
  "/_nuxt/rs.D2wyuxjv.svg": {
    "type": "image/svg+xml",
    "etag": "\"2cef4-y4zrvbC9jBRTmtQ9jldw8vZ1yVY\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 184052,
    "path": "../public/_nuxt/rs.D2wyuxjv.svg"
  },
  "/_nuxt/rs.Dv4N4BPN.svg": {
    "type": "image/svg+xml",
    "etag": "\"2cf6c-z7QPxJMeZX8Gixek9/lSRpNI8t8\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 184172,
    "path": "../public/_nuxt/rs.Dv4N4BPN.svg"
  },
  "/_nuxt/sa.DLf2NaXn.svg": {
    "type": "image/svg+xml",
    "etag": "\"27fd-5rl/XENqWT6dH8TAfa24NaVHqGY\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 10237,
    "path": "../public/_nuxt/sa.DLf2NaXn.svg"
  },
  "/_nuxt/sa.eH5F7cXy.svg": {
    "type": "image/svg+xml",
    "etag": "\"27be-sfYHlPpcNFfpWM23zeVyrJrUjz8\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 10174,
    "path": "../public/_nuxt/sa.eH5F7cXy.svg"
  },
  "/_nuxt/sh-ac.6pU0wZVL.svg": {
    "type": "image/svg+xml",
    "etag": "\"25744-ovQws23+/frODvvPUsKRtTqW0KQ\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 153412,
    "path": "../public/_nuxt/sh-ac.6pU0wZVL.svg"
  },
  "/_nuxt/sh-ac.Ch9Jh9Lp.svg": {
    "type": "image/svg+xml",
    "etag": "\"261e0-Kdl748LJddR6XL5qWY54cL0RAdk\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 156128,
    "path": "../public/_nuxt/sh-ac.Ch9Jh9Lp.svg"
  },
  "/_nuxt/sh-hl.CnGxQM93.svg": {
    "type": "image/svg+xml",
    "etag": "\"97ab-j80NLUyPEwo7YfDlwri0EJHU5hQ\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 38827,
    "path": "../public/_nuxt/sh-hl.CnGxQM93.svg"
  },
  "/_nuxt/sh-hl.DWwv0HRi.svg": {
    "type": "image/svg+xml",
    "etag": "\"95a5-hWqsqCpQtCcJHDe+q+/kH5ItlRI\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 38309,
    "path": "../public/_nuxt/sh-hl.DWwv0HRi.svg"
  },
  "/_nuxt/sh-ta.DNDOtP8t.svg": {
    "type": "image/svg+xml",
    "etag": "\"776c-qAVeRLM6h7oV3QyjEcbXCVIj5oU\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 30572,
    "path": "../public/_nuxt/sh-ta.DNDOtP8t.svg"
  },
  "/_nuxt/sh-ta.clv2MsBt.svg": {
    "type": "image/svg+xml",
    "etag": "\"7872-xxzeYzfkKiuoicYIySPiug9EELc\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 30834,
    "path": "../public/_nuxt/sh-ta.clv2MsBt.svg"
  },
  "/_nuxt/sm.1NcqoN_z.svg": {
    "type": "image/svg+xml",
    "etag": "\"3d9e-1EX1V6lyvgW1EQqls/FsdBABGpw\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 15774,
    "path": "../public/_nuxt/sm.1NcqoN_z.svg"
  },
  "/_nuxt/sm.DHRSzt4z.svg": {
    "type": "image/svg+xml",
    "etag": "\"3d2b-QrIHyw+vhX7umh2NjbwI5B2xBfk\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 15659,
    "path": "../public/_nuxt/sm.DHRSzt4z.svg"
  },
  "/_nuxt/sv.BGK8a8aZ.svg": {
    "type": "image/svg+xml",
    "etag": "\"1458f-oZlLHrxNLl9rLNdm4sT3RVGhU2U\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 83343,
    "path": "../public/_nuxt/sv.BGK8a8aZ.svg"
  },
  "/_nuxt/sv.n55iiUxg.svg": {
    "type": "image/svg+xml",
    "etag": "\"1437f-Z9ynIiU7fAxgjsuZGCkn7PvIUas\"",
    "mtime": "2025-01-05T09:19:40.225Z",
    "size": 82815,
    "path": "../public/_nuxt/sv.n55iiUxg.svg"
  },
  "/_nuxt/sx.4BiL6F_v.svg": {
    "type": "image/svg+xml",
    "etag": "\"3358-tIHxL3MAz0E56fsLKS4jtwOya04\"",
    "mtime": "2025-01-05T09:19:40.227Z",
    "size": 13144,
    "path": "../public/_nuxt/sx.4BiL6F_v.svg"
  },
  "/_nuxt/sx.DzlMoqh2.svg": {
    "type": "image/svg+xml",
    "etag": "\"3294-ok7KvP6cWB+Vbm/pkeQqgDxlqJs\"",
    "mtime": "2025-01-05T09:19:40.227Z",
    "size": 12948,
    "path": "../public/_nuxt/sx.DzlMoqh2.svg"
  },
  "/_nuxt/sz.BC3w3Gmj.svg": {
    "type": "image/svg+xml",
    "etag": "\"12c3-KFxaq3YFBfRsxWtoJqSPs309qy8\"",
    "mtime": "2025-01-05T09:19:40.227Z",
    "size": 4803,
    "path": "../public/_nuxt/sz.BC3w3Gmj.svg"
  },
  "/_nuxt/sz.DpZ3V1AK.svg": {
    "type": "image/svg+xml",
    "etag": "\"128f-SnsKgkkns1IwLZFdMffiTdbugQE\"",
    "mtime": "2025-01-05T09:19:40.227Z",
    "size": 4751,
    "path": "../public/_nuxt/sz.DpZ3V1AK.svg"
  },
  "/_nuxt/tc.BB3tFO-G.svg": {
    "type": "image/svg+xml",
    "etag": "\"1bee-cqo5jcphi+qBJIkt34qWuz5VbYU\"",
    "mtime": "2025-01-05T09:19:40.227Z",
    "size": 7150,
    "path": "../public/_nuxt/tc.BB3tFO-G.svg"
  },
  "/_nuxt/tc.CYGgqbY-.svg": {
    "type": "image/svg+xml",
    "etag": "\"1bea-utHND6/XUpuLbM3Ay0Xt7pm9bII\"",
    "mtime": "2025-01-05T09:19:40.227Z",
    "size": 7146,
    "path": "../public/_nuxt/tc.CYGgqbY-.svg"
  },
  "/_nuxt/terminos-de-servicio.HY3AJXlT.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"13f-GomNzgePxTUOf1HCarXuxLsxIac\"",
    "mtime": "2025-01-05T09:19:40.227Z",
    "size": 319,
    "path": "../public/_nuxt/terminos-de-servicio.HY3AJXlT.css"
  },
  "/_nuxt/tm.CCv743R_.svg": {
    "type": "image/svg+xml",
    "etag": "\"95df-QxZV+tf51fm9Jomzfsa2jjEtEFU\"",
    "mtime": "2025-01-05T09:19:40.227Z",
    "size": 38367,
    "path": "../public/_nuxt/tm.CCv743R_.svg"
  },
  "/_nuxt/tm.DYhdxDK7.svg": {
    "type": "image/svg+xml",
    "etag": "\"9661-TeTGSP2ifJlXeVDAOIeb4o0pXO0\"",
    "mtime": "2025-01-05T09:19:40.227Z",
    "size": 38497,
    "path": "../public/_nuxt/tm.DYhdxDK7.svg"
  },
  "/_nuxt/un.0G1DCZ6c.svg": {
    "type": "image/svg+xml",
    "etag": "\"4e52-VefNz9dVrbL3dIMFhe2MMqD61oE\"",
    "mtime": "2025-01-05T09:19:40.227Z",
    "size": 20050,
    "path": "../public/_nuxt/un.0G1DCZ6c.svg"
  },
  "/_nuxt/un.BQ1kEGox.svg": {
    "type": "image/svg+xml",
    "etag": "\"4f42-78ge3RBLjFn5Qxk4fKcpbo5+D6Y\"",
    "mtime": "2025-01-05T09:19:40.227Z",
    "size": 20290,
    "path": "../public/_nuxt/un.BQ1kEGox.svg"
  },
  "/_nuxt/useImage.C1I95or1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"dd-LncXpaMPBd8j01A/7OU6ec8ijQ0\"",
    "mtime": "2025-01-05T09:19:40.227Z",
    "size": 221,
    "path": "../public/_nuxt/useImage.C1I95or1.css"
  },
  "/_nuxt/va.BntFJQHU.svg": {
    "type": "image/svg+xml",
    "etag": "\"72d8-7WZnyZPSvLNpnz9ROkcyYPosmk4\"",
    "mtime": "2025-01-05T09:19:40.227Z",
    "size": 29400,
    "path": "../public/_nuxt/va.BntFJQHU.svg"
  },
  "/_nuxt/va.maDzWwNR.svg": {
    "type": "image/svg+xml",
    "etag": "\"7315-1fWUaGsydFQksg6Eh+MuFuO52wo\"",
    "mtime": "2025-01-05T09:19:40.227Z",
    "size": 29461,
    "path": "../public/_nuxt/va.maDzWwNR.svg"
  },
  "/_nuxt/verificar.CLP_Fgc3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e98-U4Gpg4GbMZ8HXtTIXE0sLmGL9B4\"",
    "mtime": "2025-01-05T09:19:40.228Z",
    "size": 3736,
    "path": "../public/_nuxt/verificar.CLP_Fgc3.css"
  },
  "/_nuxt/vg.DKEU1GdO.svg": {
    "type": "image/svg+xml",
    "etag": "\"28ad-m6v2ugwhJzsMFrMZ3nhPgim5qNI\"",
    "mtime": "2025-01-05T09:19:40.228Z",
    "size": 10413,
    "path": "../public/_nuxt/vg.DKEU1GdO.svg"
  },
  "/_nuxt/vg.qlt33Cv3.svg": {
    "type": "image/svg+xml",
    "etag": "\"2896-neZKxUwtoG3SaJiR2uhWOrcdSlQ\"",
    "mtime": "2025-01-05T09:19:40.228Z",
    "size": 10390,
    "path": "../public/_nuxt/vg.qlt33Cv3.svg"
  },
  "/_nuxt/vi.1FTBesw2.svg": {
    "type": "image/svg+xml",
    "etag": "\"21a9-khHRzRimth1bylh8LGytCB1qLUI\"",
    "mtime": "2025-01-05T09:19:40.228Z",
    "size": 8617,
    "path": "../public/_nuxt/vi.1FTBesw2.svg"
  },
  "/_nuxt/vi.DatfOFqY.svg": {
    "type": "image/svg+xml",
    "etag": "\"21ea-oQDPWIEsuwTEQlchLT1jV1P4d30\"",
    "mtime": "2025-01-05T09:19:40.228Z",
    "size": 8682,
    "path": "../public/_nuxt/vi.DatfOFqY.svg"
  },
  "/_nuxt/xk.B6uU6dIH.svg": {
    "type": "image/svg+xml",
    "etag": "\"21b2-jxR00OakRKtOyM5DJjMzV4cTAkQ\"",
    "mtime": "2025-01-05T09:19:40.228Z",
    "size": 8626,
    "path": "../public/_nuxt/xk.B6uU6dIH.svg"
  },
  "/_nuxt/xk.F5dDvX79.svg": {
    "type": "image/svg+xml",
    "etag": "\"245f-Xq2thU1f0lmsHxSI/c815FW3by8\"",
    "mtime": "2025-01-05T09:19:40.228Z",
    "size": 9311,
    "path": "../public/_nuxt/xk.F5dDvX79.svg"
  },
  "/_nuxt/zm.BmHUGSoa.svg": {
    "type": "image/svg+xml",
    "etag": "\"1588-YVolkqeKPlkFKPnW4FXYqTwqMA4\"",
    "mtime": "2025-01-05T09:19:40.228Z",
    "size": 5512,
    "path": "../public/_nuxt/zm.BmHUGSoa.svg"
  },
  "/_nuxt/zm.CNg0kgkw.svg": {
    "type": "image/svg+xml",
    "etag": "\"1525-RcwhEKBc1WEmRPzLrwi1mhB0sIE\"",
    "mtime": "2025-01-05T09:19:40.228Z",
    "size": 5413,
    "path": "../public/_nuxt/zm.CNg0kgkw.svg"
  },
  "/_nuxt/zw.Ceqd3Xj3.svg": {
    "type": "image/svg+xml",
    "etag": "\"1a10-LZNMDTWi/cKgEnfZkG64S/faRXg\"",
    "mtime": "2025-01-05T09:19:40.228Z",
    "size": 6672,
    "path": "../public/_nuxt/zw.Ceqd3Xj3.svg"
  },
  "/_nuxt/zw.DGkTG73v.svg": {
    "type": "image/svg+xml",
    "etag": "\"19fb-xmiXfFOqi4zn532gxBDT5cbYQ6o\"",
    "mtime": "2025-01-05T09:19:40.228Z",
    "size": 6651,
    "path": "../public/_nuxt/zw.DGkTG73v.svg"
  },
  "/futzo/logos/presentation-01.jpg": {
    "type": "image/jpeg",
    "etag": "\"bb853-km/ABEd9g8UoNPhm5zBUWlmUV3U\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 768083,
    "path": "../public/futzo/logos/presentation-01.jpg"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-pFBXeHcHK//gS/cT51mXiVPRiTY\"",
    "mtime": "2025-01-05T09:19:40.103Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/futzo/logos/circular/logo-21.png": {
    "type": "image/png",
    "etag": "\"31b97-oUc9Cvg403Z0fMUkLfGiUdoliJM\"",
    "mtime": "2025-01-05T09:19:40.249Z",
    "size": 203671,
    "path": "../public/futzo/logos/circular/logo-21.png"
  },
  "/futzo/logos/circular/logo-22.png": {
    "type": "image/png",
    "etag": "\"b7b-3j6VRApzJNVJuhcR2C21WzIJG8I\"",
    "mtime": "2025-01-05T09:19:40.250Z",
    "size": 2939,
    "path": "../public/futzo/logos/circular/logo-22.png"
  },
  "/futzo/logos/circular/logo-23.png": {
    "type": "image/png",
    "etag": "\"21f77-2H0l4Duiv9kUYb3kzJa46+W1CVw\"",
    "mtime": "2025-01-05T09:19:40.250Z",
    "size": 139127,
    "path": "../public/futzo/logos/circular/logo-23.png"
  },
  "/futzo/logos/circular/logo-24.png": {
    "type": "image/png",
    "etag": "\"1f45a-eYBnTt80SNHVCiWkXUX68Z+jKuk\"",
    "mtime": "2025-01-05T09:19:40.250Z",
    "size": 128090,
    "path": "../public/futzo/logos/circular/logo-24.png"
  },
  "/futzo/logos/circular/logo-25.png": {
    "type": "image/png",
    "etag": "\"219b0-j9rlsWjL4dvGgzcuXC4Gqzq8jeY\"",
    "mtime": "2025-01-05T09:19:40.250Z",
    "size": 137648,
    "path": "../public/futzo/logos/circular/logo-25.png"
  },
  "/futzo/logos/horizontal/logo-11.png": {
    "type": "image/png",
    "etag": "\"17c84-OpwyGn7vetXnpJTTMo7FeUcfXJg\"",
    "mtime": "2025-01-05T09:19:40.250Z",
    "size": 97412,
    "path": "../public/futzo/logos/horizontal/logo-11.png"
  },
  "/futzo/logos/horizontal/logo-12.png": {
    "type": "image/png",
    "etag": "\"1747a-r43N6fx/1SXeBIeY/7s5GWj+Hk8\"",
    "mtime": "2025-01-05T09:19:40.249Z",
    "size": 95354,
    "path": "../public/futzo/logos/horizontal/logo-12.png"
  },
  "/futzo/logos/horizontal/logo-13.png": {
    "type": "image/png",
    "etag": "\"174c2-2klb4daYoEI/N51lDPW5D6PaNP4\"",
    "mtime": "2025-01-05T09:19:40.250Z",
    "size": 95426,
    "path": "../public/futzo/logos/horizontal/logo-13.png"
  },
  "/futzo/logos/horizontal/logo-14.png": {
    "type": "image/png",
    "etag": "\"15975-S01iG09dPWboYyqygajC+HSJS2M\"",
    "mtime": "2025-01-05T09:19:40.250Z",
    "size": 88437,
    "path": "../public/futzo/logos/horizontal/logo-14.png"
  },
  "/futzo/logos/horizontal/logo-15.png": {
    "type": "image/png",
    "etag": "\"16f62-z5QMTT++qQtye8w/MRtOJQByUqI\"",
    "mtime": "2025-01-05T09:19:40.250Z",
    "size": 94050,
    "path": "../public/futzo/logos/horizontal/logo-15.png"
  },
  "/futzo/logos/favicon/android-icon-144x144.png": {
    "type": "image/png",
    "etag": "\"3c15-lWLJPFtDO5xdwOJ7M7hM/OoHm3o\"",
    "mtime": "2025-01-05T09:19:40.250Z",
    "size": 15381,
    "path": "../public/futzo/logos/favicon/android-icon-144x144.png"
  },
  "/futzo/logos/favicon/android-icon-192x192.png": {
    "type": "image/png",
    "etag": "\"490e-R7oXTgtuz3QPRcIdFkvE/GDUHF0\"",
    "mtime": "2025-01-05T09:19:40.252Z",
    "size": 18702,
    "path": "../public/futzo/logos/favicon/android-icon-192x192.png"
  },
  "/futzo/logos/favicon/android-icon-36x36.png": {
    "type": "image/png",
    "etag": "\"c90-WfKLNUzkRUcjI6P64oo/Eje5Me4\"",
    "mtime": "2025-01-05T09:19:40.250Z",
    "size": 3216,
    "path": "../public/futzo/logos/favicon/android-icon-36x36.png"
  },
  "/futzo/logos/favicon/android-icon-48x48.png": {
    "type": "image/png",
    "etag": "\"1127-NuFMzp5FZwSZ1wsxungWlgGP9lE\"",
    "mtime": "2025-01-05T09:19:40.250Z",
    "size": 4391,
    "path": "../public/futzo/logos/favicon/android-icon-48x48.png"
  },
  "/futzo/logos/favicon/android-icon-72x72.png": {
    "type": "image/png",
    "etag": "\"1afb-q5YyJxQp/FFM/n8EKVmrFM6zIHY\"",
    "mtime": "2025-01-05T09:19:40.252Z",
    "size": 6907,
    "path": "../public/futzo/logos/favicon/android-icon-72x72.png"
  },
  "/futzo/logos/favicon/android-icon-96x96.png": {
    "type": "image/png",
    "etag": "\"25b8-88DXao+6xVPnPBx1O9j5MKTlts4\"",
    "mtime": "2025-01-05T09:19:40.252Z",
    "size": 9656,
    "path": "../public/futzo/logos/favicon/android-icon-96x96.png"
  },
  "/futzo/logos/favicon/apple-icon-114x114.png": {
    "type": "image/png",
    "etag": "\"2dea-WU5IoMl+Jwn+tky3GHBaeuwL1QA\"",
    "mtime": "2025-01-05T09:19:40.250Z",
    "size": 11754,
    "path": "../public/futzo/logos/favicon/apple-icon-114x114.png"
  },
  "/futzo/logos/favicon/apple-icon-120x120.png": {
    "type": "image/png",
    "etag": "\"3050-LfmjBdV9hBLjfDPNLGI/rdBXOkQ\"",
    "mtime": "2025-01-05T09:19:40.252Z",
    "size": 12368,
    "path": "../public/futzo/logos/favicon/apple-icon-120x120.png"
  },
  "/futzo/logos/favicon/apple-icon-144x144.png": {
    "type": "image/png",
    "etag": "\"3c15-lWLJPFtDO5xdwOJ7M7hM/OoHm3o\"",
    "mtime": "2025-01-05T09:19:40.252Z",
    "size": 15381,
    "path": "../public/futzo/logos/favicon/apple-icon-144x144.png"
  },
  "/futzo/logos/favicon/apple-icon-152x152.png": {
    "type": "image/png",
    "etag": "\"4031-SeuVffJXN+uZFt2BJAKUew32/Cc\"",
    "mtime": "2025-01-05T09:19:40.252Z",
    "size": 16433,
    "path": "../public/futzo/logos/favicon/apple-icon-152x152.png"
  },
  "/futzo/logos/favicon/apple-icon-180x180.png": {
    "type": "image/png",
    "etag": "\"4fa5-wMB871Rjoy1tqQrrt/ykb3I57iE\"",
    "mtime": "2025-01-05T09:19:40.252Z",
    "size": 20389,
    "path": "../public/futzo/logos/favicon/apple-icon-180x180.png"
  },
  "/futzo/logos/favicon/apple-icon-57x57.png": {
    "type": "image/png",
    "etag": "\"14ad-JjGMqubNhGW357FN/15xWE33qXc\"",
    "mtime": "2025-01-05T09:19:40.252Z",
    "size": 5293,
    "path": "../public/futzo/logos/favicon/apple-icon-57x57.png"
  },
  "/futzo/logos/favicon/apple-icon-60x60.png": {
    "type": "image/png",
    "etag": "\"160a-MsHDPwglYL3M76bWzlPY+OCVxIs\"",
    "mtime": "2025-01-05T09:19:40.244Z",
    "size": 5642,
    "path": "../public/futzo/logos/favicon/apple-icon-60x60.png"
  },
  "/futzo/logos/favicon/apple-icon-72x72.png": {
    "type": "image/png",
    "etag": "\"1afb-q5YyJxQp/FFM/n8EKVmrFM6zIHY\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 6907,
    "path": "../public/futzo/logos/favicon/apple-icon-72x72.png"
  },
  "/futzo/logos/favicon/apple-icon-76x76.png": {
    "type": "image/png",
    "etag": "\"1c9b-Dx2zWLeZrNU9pX3v94HJ0t5y0oE\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 7323,
    "path": "../public/futzo/logos/favicon/apple-icon-76x76.png"
  },
  "/futzo/logos/favicon/apple-icon-precomposed.png": {
    "type": "image/png",
    "etag": "\"4b2e-2nmjfKBdLzjYeYXFWxtp9fc0TqE\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 19246,
    "path": "../public/futzo/logos/favicon/apple-icon-precomposed.png"
  },
  "/futzo/logos/favicon/apple-icon.png": {
    "type": "image/png",
    "etag": "\"4b2e-2nmjfKBdLzjYeYXFWxtp9fc0TqE\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 19246,
    "path": "../public/futzo/logos/favicon/apple-icon.png"
  },
  "/futzo/logos/favicon/browserconfig.xml": {
    "type": "application/xml",
    "etag": "\"119-hTOJtsQnOWWJnrEwLWZeuROV/Qw\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 281,
    "path": "../public/futzo/logos/favicon/browserconfig.xml"
  },
  "/futzo/logos/favicon/favicon-16x16.png": {
    "type": "image/png",
    "etag": "\"553-6IMX/33brFqzdDNVgSuNwmZAj3w\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 1363,
    "path": "../public/futzo/logos/favicon/favicon-16x16.png"
  },
  "/futzo/logos/favicon/favicon-32x32.png": {
    "type": "image/png",
    "etag": "\"afb-jn6PR587OYNNlKN8p5haL2HQrA0\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 2811,
    "path": "../public/futzo/logos/favicon/favicon-32x32.png"
  },
  "/futzo/logos/favicon/favicon-96x96.png": {
    "type": "image/png",
    "etag": "\"25b8-88DXao+6xVPnPBx1O9j5MKTlts4\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 9656,
    "path": "../public/futzo/logos/favicon/favicon-96x96.png"
  },
  "/futzo/logos/favicon/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"47e-KvTr8xU/6r+wlhNuzUK8W7YkXdw\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 1150,
    "path": "../public/futzo/logos/favicon/favicon.ico"
  },
  "/futzo/logos/favicon/manifest.json": {
    "type": "application/json",
    "etag": "\"2d0-0R/r+ecIqeEbruN+19xemZAlgL4\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 720,
    "path": "../public/futzo/logos/favicon/manifest.json"
  },
  "/futzo/logos/favicon/ms-icon-144x144.png": {
    "type": "image/png",
    "etag": "\"3c15-lWLJPFtDO5xdwOJ7M7hM/OoHm3o\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 15381,
    "path": "../public/futzo/logos/favicon/ms-icon-144x144.png"
  },
  "/futzo/logos/favicon/ms-icon-150x150.png": {
    "type": "image/png",
    "etag": "\"3fa6-rxrX55PXJdvXVoy9mmk9j9Mgk8Q\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 16294,
    "path": "../public/futzo/logos/favicon/ms-icon-150x150.png"
  },
  "/futzo/logos/favicon/ms-icon-310x310.png": {
    "type": "image/png",
    "etag": "\"b35c-Ii3LghgFNyOb3uf7Rj/mtHyTGW4\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 45916,
    "path": "../public/futzo/logos/favicon/ms-icon-310x310.png"
  },
  "/futzo/logos/favicon/ms-icon-70x70.png": {
    "type": "image/png",
    "etag": "\"1a4d-lcf5OWhynQZRcYxFtj73n16ZFSU\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 6733,
    "path": "../public/futzo/logos/favicon/ms-icon-70x70.png"
  },
  "/futzo/logos/icon/logo-01.png": {
    "type": "image/png",
    "etag": "\"2b899-wqAGsJUtNMDieyzLuMAbNTrKuOU\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 178329,
    "path": "../public/futzo/logos/icon/logo-01.png"
  },
  "/futzo/logos/icon/logo-02.png": {
    "type": "image/png",
    "etag": "\"20c9e-dnbsAZqCR89/FqXTDe5J1IvWfYA\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 134302,
    "path": "../public/futzo/logos/icon/logo-02.png"
  },
  "/futzo/logos/icon/logo-03.png": {
    "type": "image/png",
    "etag": "\"20ca3-Yg23wjvF6NoaurW25WbuoBv7e88\"",
    "mtime": "2025-01-05T09:19:40.244Z",
    "size": 134307,
    "path": "../public/futzo/logos/icon/logo-03.png"
  },
  "/futzo/logos/icon/logo-04.png": {
    "type": "image/png",
    "etag": "\"1e433-DyNNFdeoUMXCoL1EIYoFWSatByc\"",
    "mtime": "2025-01-05T09:19:40.247Z",
    "size": 123955,
    "path": "../public/futzo/logos/icon/logo-04.png"
  },
  "/futzo/logos/icon/logo-05.png": {
    "type": "image/png",
    "etag": "\"20993-gGXFXroL8Nu8C/o8bOP7uaOQSNI\"",
    "mtime": "2025-01-05T09:19:40.247Z",
    "size": 133523,
    "path": "../public/futzo/logos/icon/logo-05.png"
  },
  "/futzo/logos/text only/logo-16.png": {
    "type": "image/png",
    "etag": "\"11eff-9Q0iqHlG6YZrdylgyeta77+g+9g\"",
    "mtime": "2025-01-05T09:19:40.244Z",
    "size": 73471,
    "path": "../public/futzo/logos/text only/logo-16.png"
  },
  "/futzo/logos/text only/logo-17.png": {
    "type": "image/png",
    "etag": "\"fdec-PWGQ/wETqsGBZifZSrWWqHeEHcw\"",
    "mtime": "2025-01-05T09:19:40.247Z",
    "size": 65004,
    "path": "../public/futzo/logos/text only/logo-17.png"
  },
  "/futzo/logos/text only/logo-18.png": {
    "type": "image/png",
    "etag": "\"fe00-qachdAkDVZw8ypRh9TD1gv+cs3g\"",
    "mtime": "2025-01-05T09:19:40.247Z",
    "size": 65024,
    "path": "../public/futzo/logos/text only/logo-18.png"
  },
  "/futzo/logos/text only/logo-19.png": {
    "type": "image/png",
    "etag": "\"f003-61Nqflx+7NDJmEgYVw0s5y+gK0c\"",
    "mtime": "2025-01-05T09:19:40.247Z",
    "size": 61443,
    "path": "../public/futzo/logos/text only/logo-19.png"
  },
  "/futzo/logos/text only/logo-20.png": {
    "type": "image/png",
    "etag": "\"fb43-HdNgo05+FrgTyesOzBe66VBiZH0\"",
    "mtime": "2025-01-05T09:19:40.247Z",
    "size": 64323,
    "path": "../public/futzo/logos/text only/logo-20.png"
  },
  "/futzo/logos/vertical/logo-06.png": {
    "type": "image/png",
    "etag": "\"1c0fb-omw4nMKL0zWzO0+6Cxvq2TTnKlo\"",
    "mtime": "2025-01-05T09:19:40.245Z",
    "size": 114939,
    "path": "../public/futzo/logos/vertical/logo-06.png"
  },
  "/futzo/logos/vertical/logo-07.png": {
    "type": "image/png",
    "etag": "\"208ee-p9sBTQP3xmMW1DXg0AftyIB4T5k\"",
    "mtime": "2025-01-05T09:19:40.247Z",
    "size": 133358,
    "path": "../public/futzo/logos/vertical/logo-07.png"
  },
  "/futzo/logos/vertical/logo-08.png": {
    "type": "image/png",
    "etag": "\"2097a-1xvvIuecwY76VQbRFhu4i4hysyI\"",
    "mtime": "2025-01-05T09:19:40.247Z",
    "size": 133498,
    "path": "../public/futzo/logos/vertical/logo-08.png"
  },
  "/futzo/logos/vertical/logo-09.png": {
    "type": "image/png",
    "etag": "\"1e49b-ZFH72BF9up6geihSqvPy/1GWEtM\"",
    "mtime": "2025-01-05T09:19:40.247Z",
    "size": 124059,
    "path": "../public/futzo/logos/vertical/logo-09.png"
  },
  "/futzo/logos/vertical/logo-10.png": {
    "type": "image/png",
    "etag": "\"20698-BaRsa5lFove5v9RONX8VJzVjOWw\"",
    "mtime": "2025-01-05T09:19:40.247Z",
    "size": 132760,
    "path": "../public/futzo/logos/vertical/logo-10.png"
  },
  "/_nuxt/builds/meta/6893b2c6-1682-4680-ac1d-fd29bb9e29a6.json": {
    "type": "application/json",
    "etag": "\"8b-3meD+KQMtYIWZUmNgy0WEp5KJRY\"",
    "mtime": "2025-01-05T09:19:40.095Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/6893b2c6-1682-4680-ac1d-fd29bb9e29a6.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};
const basename = function(p, extension) {
  const lastSegment = normalizeWindowsPath(p).split("/").pop();
  return extension && lastSegment.endsWith(extension) ? lastSegment.slice(0, -extension.length) : lastSegment;
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets$1[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets$1[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets$1[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _zjg3CC = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const basicReporter = {
  log(logObj) {
    (console[logObj.type] || console.log)(...logObj.args);
  }
};
function createConsola(options = {}) {
  return createConsola$1({
    reporters: [basicReporter],
    ...options
  });
}
const consola = createConsola();
consola.consola = consola;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const defineAppConfig = (config) => config;

const appConfig0 = defineAppConfig({
  sanctum: {
    interceptors: {
      onRequest: async (app, ctx, logger) => {
      }
    }
  }
});

const inlineAppConfig = {
  "nuxt": {},
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons",
      "futzo-icon"
    ],
    "fetchTimeout": 1500
  }
};

const appConfig = defuFn(appConfig0, inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "6893b2c6-1682-4680-ac1d-fd29bb9e29a6",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "baseURLBackend": "https://app.futzo.io",
    "backendPrefix": "api/v1",
    "appName": "Futzo",
    "i18n": {
      "baseUrl": "",
      "defaultLocale": "",
      "defaultDirection": "ltr",
      "strategy": "prefix_except_default",
      "lazy": false,
      "rootRedirect": "",
      "routesNameSeparator": "___",
      "defaultLocaleRouteNameSuffix": "default",
      "skipSettingLocaleOnNavigate": false,
      "differentDomains": false,
      "trailingSlash": false,
      "configLocales": [],
      "locales": {},
      "detectBrowserLanguage": {
        "alwaysRedirect": false,
        "cookieCrossOrigin": false,
        "cookieDomain": "",
        "cookieKey": "i18n_redirected",
        "cookieSecure": false,
        "fallbackLocale": "",
        "redirectOn": "root",
        "useCookie": true
      },
      "experimental": {
        "localeDetector": "",
        "switchLocalePathLinkSSR": false,
        "autoImportTranslationFunctions": false
      },
      "multiDomainLocales": false
    },
    "sanctum": {
      "baseUrl": "https://app.futzo.io",
      "mode": "cookie",
      "userStateKey": "sanctum.user.identity",
      "redirectIfAuthenticated": true,
      "redirectIfUnauthenticated": false,
      "endpoints": {
        "csrf": "/sanctum/csrf-cookie",
        "login": "/auth/login",
        "logout": "/auth/logout",
        "user": "/api/v1/me"
      },
      "csrf": {
        "cookie": "XSRF-TOKEN",
        "header": "X-XSRF-TOKEN"
      },
      "client": {
        "retry": false,
        "initialRequest": true
      },
      "redirect": {
        "keepRequestedRoute": false,
        "onLogin": "/",
        "onLogout": "/login",
        "onAuthOnly": "/login",
        "onGuestOnly": "/"
      },
      "globalMiddleware": {
        "enabled": true,
        "prepend": false,
        "allow404WithoutAuth": false
      },
      "logLevel": 3,
      "appendPlugin": false
    }
  },
  "googleMapsSecret": "AIzaSyCEQ_vXTkXUIxE-exwES14KvkoGaAHOGFQ",
  "icon": {
    "serverKnownCssClasses": []
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  {
    return _sharedAppConfig;
  }
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof Buffer === "undefined") {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base64 = Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base64;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter(
        (key) => key.startsWith(base) && key[key.length - 1] !== "$"
      ) : allKeys.filter((key) => key[key.length - 1] !== "$");
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
};

const assets = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"/home/jozaguts/Projects/personal/futzo_container/futzo/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[nitro] [cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

function baseURL() {
  return useRuntimeConfig().app.baseURL;
}
function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const collections = {
  'line-md': () => import('../_/icons.mjs').then(m => m.default),
  'futzo-icon': () => ({"prefix":"futzo-icon","icons":{"apple":{"width":24,"height":25,"body":"<defs><clipPath id=\"clip0_1191_2458\">\n<rect width=\"24\" height=\"24\" fill=\"white\" transform=\"translate(0 0.5)\"/>\n</clipPath></defs><g fill=\"none\"><g id=\"Social icon\" clip-path=\"url(#clip0_1191_2458)\">\n<path id=\"path4\" d=\"M20.8428 17.6447C20.5101 18.4133 20.1163 19.1208 19.66 19.7713C19.0381 20.658 18.5288 21.2719 18.1364 21.6127C17.528 22.1722 16.8762 22.4587 16.1782 22.475C15.6771 22.475 15.0728 22.3324 14.3693 22.0432C13.6636 21.7553 13.015 21.6127 12.422 21.6127C11.8 21.6127 11.133 21.7553 10.4195 22.0432C9.70493 22.3324 9.12928 22.4832 8.68916 22.4981C8.01981 22.5266 7.35264 22.2319 6.68668 21.6127C6.26164 21.242 5.72999 20.6064 5.09309 19.7061C4.40976 18.7446 3.84796 17.6297 3.40784 16.3587C2.93648 14.9857 2.7002 13.6563 2.7002 12.3692C2.7002 10.8948 3.01878 9.62321 3.65689 8.5576C4.1584 7.70166 4.82557 7.02647 5.66059 6.53081C6.49562 6.03514 7.39786 5.78256 8.36949 5.7664C8.90114 5.7664 9.59833 5.93085 10.4647 6.25405C11.3287 6.57834 11.8834 6.74279 12.1266 6.74279C12.3085 6.74279 12.9247 6.5505 13.9694 6.16714C14.9573 5.81162 15.7911 5.66441 16.4742 5.7224C18.3251 5.87178 19.7157 6.60142 20.6405 7.91595C18.9851 8.91896 18.1662 10.3238 18.1825 12.126C18.1975 13.5297 18.7067 14.6979 19.7076 15.6254C20.1611 16.0558 20.6676 16.3885 21.2312 16.6248C21.109 16.9793 20.98 17.3188 20.8428 17.6447ZM16.5978 0.940125C16.5978 2.04038 16.1958 3.06768 15.3946 4.01854C14.4277 5.14892 13.2582 5.80211 11.99 5.69904C11.9738 5.56705 11.9645 5.42812 11.9645 5.28214C11.9645 4.2259 12.4243 3.09552 13.2408 2.17127C13.6485 1.70331 14.167 1.31421 14.7957 1.00381C15.4231 0.69805 16.0166 0.528957 16.5747 0.5C16.591 0.647086 16.5978 0.794182 16.5978 0.940111V0.940125Z\" fill=\"black\"/>\n</g></g>"},"arrow-down":{"width":21,"height":20,"body":"<g fill=\"none\"><path d=\"M10.3333 4.16675V15.8334M10.3333 15.8334L16.1667 10.0001M10.3333 15.8334L4.5 10.0001\" stroke=\"#F04438\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"arrow-left":{"width":21,"height":21,"body":"<g fill=\"none\"><path d=\"M16.3334 10.5001H4.66669M4.66669 10.5001L10.5 16.3334M4.66669 10.5001L10.5 4.66675\" stroke=\"#475467\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"arrow-right":{"width":20,"height":20,"body":"<g fill=\"none\"><path d=\"M4.16699 10.0001H15.8337M15.8337 10.0001L10.0003 4.16675M15.8337 10.0001L10.0003 15.8334\" stroke=\"#344054\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"arrow-up":{"width":20,"height":20,"body":"<g fill=\"none\"><path d=\"M9.99984 15.8334V4.16675M9.99984 4.16675L4.1665 10.0001M9.99984 4.16675L15.8332 10.0001\" stroke=\"#17B26A\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"ball":{"width":24,"height":24,"body":"<g fill=\"none\"><g id=\"fluent:sport-soccer-24-filled\">\n<path id=\"Vector\" d=\"M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM8.244 4.373L11.252 6.173V8.366L8.461 10.394L6.417 9.687L5.83 6.153C6.5228 5.42127 7.34019 4.81855 8.244 4.373ZM3.621 13.439L5.948 11.112L7.988 11.817L9.07 15.15L8.1 16.725L4.807 16.531C4.21277 15.5881 3.80979 14.5375 3.621 13.439ZM10.53 20.373L9.346 17.564L10.309 15.997H13.681L14.593 17.578L13.553 20.358C12.5541 20.5415 11.5306 20.5465 10.53 20.373ZM18.892 16.976L15.868 16.786L14.93 15.162L16.017 11.817L18.03 11.121L20.342 13.641C20.1049 14.8443 19.6103 15.982 18.892 16.976ZM18.172 6.156L17.583 9.689L15.543 10.394L12.752 8.366V6.172L15.754 4.372C16.6596 4.81835 17.4783 5.42245 18.172 6.156Z\" fill=\"#525056\"/>\n</g></g>"},"breadcrumbs-arrow":{"width":8,"height":14,"body":"<g fill=\"none\"><path d=\"M1 13L7 7L1 1\" stroke=\"#182230\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"calendar-arrow-left":{"width":20,"height":20,"body":"<g fill=\"none\"><path d=\"M12.5 15L7.5 10L12.5 5\" stroke=\"#344054\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"calendar-arrow-right":{"width":20,"height":20,"body":"<g fill=\"none\"><path d=\"M7.5 15L12.5 10L7.5 5\" stroke=\"#344054\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"calendar-white":{"width":20,"height":20,"body":"<g fill=\"none\"><g id=\"calendar\">\n<path id=\"Icon\" d=\"M17.5 8.33317H2.5M13.3333 1.6665V4.99984M6.66667 1.6665V4.99984M6.5 18.3332H13.5C14.9001 18.3332 15.6002 18.3332 16.135 18.0607C16.6054 17.821 16.9878 17.4386 17.2275 16.9681C17.5 16.4334 17.5 15.7333 17.5 14.3332V7.33317C17.5 5.93304 17.5 5.23297 17.2275 4.69819C16.9878 4.22779 16.6054 3.84534 16.135 3.60565C15.6002 3.33317 14.9001 3.33317 13.5 3.33317H6.5C5.09987 3.33317 4.3998 3.33317 3.86502 3.60565C3.39462 3.84534 3.01217 4.22779 2.77248 4.69819C2.5 5.23297 2.5 5.93304 2.5 7.33317V14.3332C2.5 15.7333 2.5 16.4334 2.77248 16.9681C3.01217 17.4386 3.39462 17.821 3.86502 18.0607C4.3998 18.3332 5.09987 18.3332 6.5 18.3332Z\" stroke=\"white\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g></g>"},"calendar":{"width":24,"height":24,"body":"<g fill=\"none\"><path d=\"M19 19H5V8H19M16 1V3H8V1H6V3H5C3.89 3 3 3.89 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H18V1M17 12H12V17H17V12Z\" fill=\"#525056\"/></g>"},"check-box":{"width":16,"height":16,"body":"<g fill=\"none\"><path d=\"M0 4C0 1.79086 1.79086 0 4 0H12C14.2091 0 16 1.79086 16 4V12C16 14.2091 14.2091 16 12 16H4C1.79086 16 0 14.2091 0 12V4Z\" fill=\"#6400E6\"/>\n<path d=\"M12 5L6.5 10.5L4 8\" stroke=\"white\" stroke-width=\"1.6666\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"check-circle-broken":{"width":20,"height":20,"body":"<defs><clipPath id=\"clip0_1082_2801\">\n<rect width=\"20\" height=\"20\" fill=\"white\"/>\n</clipPath></defs><g fill=\"none\"><g clip-path=\"url(#clip0_1082_2801)\">\n<path d=\"M18.3337 9.23818V10.0049C18.3326 11.8019 17.7507 13.5504 16.6748 14.9897C15.5988 16.429 14.0864 17.4819 12.3631 17.9914C10.6399 18.501 8.79804 18.4398 7.11238 17.817C5.42673 17.1942 3.98754 16.0433 3.00946 14.5357C2.03138 13.0282 1.56682 11.2449 1.68506 9.45178C1.80329 7.65866 2.498 5.95179 3.66556 4.58575C4.83312 3.2197 6.41098 2.26767 8.16382 1.87164C9.91665 1.47561 11.7505 1.6568 13.392 2.38818M18.3337 3.33341L10.0003 11.6751L7.50033 9.17508\" stroke=\"white\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g></g>"},"check-circle":{"width":28,"height":29,"body":"<g fill=\"none\"><path d=\"M8.74998 14.4999L12.25 17.9999L19.25 10.9999M25.6666 14.4999C25.6666 20.9432 20.4433 26.1666 14 26.1666C7.55666 26.1666 2.33331 20.9432 2.33331 14.4999C2.33331 8.0566 7.55666 2.83325 14 2.83325C20.4433 2.83325 25.6666 8.0566 25.6666 14.4999Z\" stroke=\"#344054\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"check-icon-secondary":{"width":20,"height":21,"body":"<g fill=\"none\"><path d=\"M0 10.5C0 4.97715 4.47715 0.5 10 0.5C15.5228 0.5 20 4.97715 20 10.5C20 16.0228 15.5228 20.5 10 20.5C4.47715 20.5 0 16.0228 0 10.5Z\" fill=\"#D0D5DD\"/>\n<path d=\"M6.25 10.5L8.75 13L13.75 8\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"check-icon":{"width":20,"height":21,"body":"<g fill=\"none\"><g id=\"Check icon\">\n<path d=\"M0 10.5C0 4.97715 4.47715 0.5 10 0.5C15.5228 0.5 20 4.97715 20 10.5C20 16.0228 15.5228 20.5 10 20.5C4.47715 20.5 0 16.0228 0 10.5Z\" fill=\"#9155FD\"/>\n<path id=\"Icon\" d=\"M6.25 10.5L8.75 13L13.75 8\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g></g>"},"check-verified-green":{"width":92,"height":93,"body":"<g fill=\"none\"><g opacity=\"0.3\">\n<rect x=\"12\" y=\"12.5\" width=\"68\" height=\"68\" rx=\"34\" stroke=\"#66C61C\" stroke-width=\"4\"/>\n</g>\n<g opacity=\"0.1\">\n<rect x=\"2\" y=\"2.5\" width=\"88\" height=\"88\" rx=\"44\" stroke=\"#66C61C\" stroke-width=\"4\"/>\n</g>\n<path d=\"M38.9993 46.5001L43.666 51.1667L54.166 40.6667M39.4704 66.5688C40.2352 66.4677 41.0077 66.6751 41.6169 67.1443L44.4245 69.2987C45.3525 70.0117 46.6436 70.0117 47.569 69.2987L50.4829 67.0614C51.0273 66.644 51.7142 66.4599 52.3934 66.5506L56.0383 67.0303C57.1971 67.1832 58.3144 66.5377 58.7629 65.4566L60.1654 62.0656C60.4272 61.4304 60.9301 60.9275 61.5653 60.6656L64.9561 59.2631C66.0371 58.8171 66.6826 57.6972 66.5297 56.5383L66.0682 53.0255C65.9671 52.2607 66.1745 51.4881 66.6437 50.8788L68.798 48.0711C69.5109 47.143 69.5109 45.8519 68.798 44.9264L66.5608 42.0124C66.1434 41.468 65.9594 40.781 66.0501 40.1017L66.5297 36.4567C66.6826 35.2978 66.0371 34.1804 64.9561 33.7319L61.5653 32.3294C60.9301 32.0675 60.4272 31.5646 60.1654 30.9294L58.7629 27.5384C58.317 26.4573 57.1971 25.8118 56.0383 25.9647L52.3934 26.4443C51.7142 26.5377 51.0273 26.3536 50.4855 25.9388L47.5716 23.7015C46.6436 22.9885 45.3525 22.9885 44.4271 23.7015L41.5132 25.9388C40.9688 26.3536 40.2819 26.5377 39.6027 26.4495L35.9578 25.9699C34.799 25.817 33.6817 26.4625 33.2332 27.5436L31.8333 30.9346C31.5689 31.5672 31.066 32.0701 30.4334 32.3345L27.0426 33.7345C25.9616 34.183 25.3161 35.3004 25.469 36.4592L25.9486 40.1043C26.0368 40.7836 25.8527 41.4706 25.4379 42.0124L23.2007 44.9264C22.4878 45.8545 22.4878 47.1456 23.2007 48.0711L25.4379 50.9851C25.8553 51.5296 26.0393 52.2166 25.9486 52.8958L25.469 56.5409C25.3161 57.6998 25.9616 58.8171 27.0426 59.2657L30.4334 60.6682C31.0686 60.9301 31.5715 61.433 31.8333 62.0682L33.2358 65.4592C33.6817 66.5403 34.8016 67.1858 35.9604 67.0328L39.4704 66.5688Z\" stroke=\"#66C61C\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"content":{"width":25,"height":24,"body":"<g fill=\"none\"><rect x=\"0.333984\" width=\"24\" height=\"24\" rx=\"12\" fill=\"#9155FD\"/>\n<circle cx=\"12.334\" cy=\"12\" r=\"4\" fill=\"white\"/></g>"},"ellipse-red":{"width":12,"height":12,"body":"<g fill=\"none\"><circle id=\"Ellipse 1\" cx=\"6\" cy=\"6\" r=\"6\" fill=\"#E8454A\"/></g>"},"error-alert":{"width":38,"height":38,"body":"<defs><clipPath id=\"clip0_1397_10214\">\n<rect width=\"20\" height=\"20\" fill=\"white\" transform=\"translate(9 9)\"/>\n</clipPath></defs><g fill=\"none\"><g opacity=\"0.3\">\n<rect x=\"6\" y=\"6\" width=\"26\" height=\"26\" rx=\"13\" stroke=\"#D92D20\" stroke-width=\"2\"/>\n</g>\n<g opacity=\"0.1\">\n<rect x=\"1\" y=\"1\" width=\"36\" height=\"36\" rx=\"18\" stroke=\"#D92D20\" stroke-width=\"2\"/>\n</g>\n<g clip-path=\"url(#clip0_1397_10214)\">\n<path d=\"M19 15.6667V19M19 22.3333H19.0083M27.3333 19C27.3333 23.6024 23.6024 27.3333 19 27.3333C14.3976 27.3333 10.6667 23.6024 10.6667 19C10.6667 14.3976 14.3976 10.6667 19 10.6667C23.6024 10.6667 27.3333 14.3976 27.3333 19Z\" stroke=\"#D92D20\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g></g>"},"error-close-alert":{"width":36,"height":36,"body":"<g fill=\"none\"><path d=\"M23 13L13 23M13 13L23 23\" stroke=\"#D92D20\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"facebook":{"width":24,"height":25,"body":"<defs><clipPath id=\"clip0_1191_2454\">\n<rect width=\"24\" height=\"24\" fill=\"white\" transform=\"translate(0 0.5)\"/>\n</clipPath></defs><g fill=\"none\"><g id=\"Social icon\" clip-path=\"url(#clip0_1191_2454)\">\n<path id=\"Vector\" d=\"M24 12.5C24 5.87258 18.6274 0.5 12 0.5C5.37258 0.5 0 5.87258 0 12.5C0 18.4895 4.3882 23.454 10.125 24.3542V15.9688H7.07812V12.5H10.125V9.85625C10.125 6.84875 11.9166 5.1875 14.6576 5.1875C15.9701 5.1875 17.3438 5.42188 17.3438 5.42188V8.375H15.8306C14.34 8.375 13.875 9.30008 13.875 10.25V12.5H17.2031L16.6711 15.9688H13.875V24.3542C19.6118 23.454 24 18.4895 24 12.5Z\" fill=\"#1877F2\"/>\n<path id=\"Vector_2\" d=\"M16.6711 15.9688L17.2031 12.5H13.875V10.25C13.875 9.30102 14.34 8.375 15.8306 8.375H17.3438V5.42188C17.3438 5.42188 15.9705 5.1875 14.6576 5.1875C11.9166 5.1875 10.125 6.84875 10.125 9.85625V12.5H7.07812V15.9688H10.125V24.3542C11.3674 24.5486 12.6326 24.5486 13.875 24.3542V15.9688H16.6711Z\" fill=\"white\"/>\n</g></g>"},"file-type-img":{"width":40,"height":40,"body":"<g fill=\"none\"><path d=\"M7.75 4C7.75 2.20508 9.20508 0.75 11 0.75H27C27.1212 0.75 27.2375 0.798159 27.3232 0.883885L38.1161 11.6768C38.2018 11.7625 38.25 11.8788 38.25 12V36C38.25 37.7949 36.7949 39.25 35 39.25H11C9.20507 39.25 7.75 37.7949 7.75 36V4Z\" stroke=\"#D0D5DD\" stroke-width=\"1.5\"/>\n<path d=\"M27 0.5V8C27 10.2091 28.7909 12 31 12H38.5\" stroke=\"#D0D5DD\" stroke-width=\"1.5\"/>\n<path d=\"M1 20C1 18.8954 1.89543 18 3 18H25C26.1046 18 27 18.8954 27 20V32C27 33.1046 26.1046 34 25 34H3C1.89543 34 1 33.1046 1 32V20Z\" fill=\"#9155FD\"/>\n<path d=\"M6.38947 22.7273V30H4.85183V22.7273H6.38947ZM7.65456 22.7273H9.55087L11.5537 27.6136H11.6389L13.6418 22.7273H15.5381V30H14.0466V25.2663H13.9862L12.1041 29.9645H11.0885L9.20641 25.2486H9.14604V30H7.65456V22.7273ZM21.6274 25.0781C21.5777 24.9053 21.5078 24.7526 21.4179 24.62C21.3279 24.4851 21.2178 24.3714 21.0876 24.2791C20.9598 24.1844 20.813 24.1122 20.6473 24.0625C20.4839 24.0128 20.3028 23.9879 20.104 23.9879C19.7323 23.9879 19.4056 24.0803 19.1238 24.2649C18.8445 24.4496 18.6267 24.7183 18.4704 25.071C18.3142 25.4214 18.2361 25.8499 18.2361 26.3565C18.2361 26.8632 18.313 27.294 18.4669 27.6491C18.6208 28.0043 18.8386 28.2753 19.1203 28.4624C19.402 28.647 19.7346 28.7393 20.1182 28.7393C20.4662 28.7393 20.7633 28.6778 21.0095 28.5547C21.2581 28.4292 21.4475 28.2528 21.5777 28.0256C21.7103 27.7983 21.7765 27.5296 21.7765 27.2195L22.089 27.2656H20.214V26.108H23.2574V27.0241C23.2574 27.6634 23.1224 28.2126 22.8525 28.6719C22.5827 29.1288 22.211 29.4815 21.7375 29.7301C21.264 29.9763 20.7219 30.0994 20.1111 30.0994C19.4292 30.0994 18.8303 29.9491 18.3142 29.6484C17.7981 29.3454 17.3956 28.9157 17.1068 28.3594C16.8203 27.8007 16.6771 27.1378 16.6771 26.3707C16.6771 25.7812 16.7623 25.2557 16.9328 24.794C17.1056 24.33 17.3471 23.937 17.6572 23.6151C17.9674 23.2931 18.3284 23.0481 18.7403 22.88C19.1523 22.7119 19.5985 22.6278 20.0791 22.6278C20.491 22.6278 20.8746 22.6882 21.2297 22.8089C21.5848 22.9273 21.8997 23.0954 22.1743 23.3132C22.4513 23.531 22.6773 23.7902 22.8525 24.0909C23.0277 24.3892 23.1402 24.7183 23.1899 25.0781H21.6274Z\" fill=\"white\"/></g>"},"file-type":{"width":40,"height":40,"body":"<g fill=\"none\"><path d=\"M4 4C4 1.79086 5.79086 0 8 0H24L36 12V36C36 38.2091 34.2091 40 32 40H8C5.79086 40 4 38.2091 4 36V4Z\" fill=\"#079455\"/>\n<path opacity=\"0.3\" d=\"M24 0L36 12H28C25.7909 12 24 10.2091 24 8V0Z\" fill=\"white\"/>\n<path d=\"M9.93093 25.4545L11.2509 27.6854H11.302L12.6284 25.4545H14.1912L12.1937 28.7273L14.236 32H12.6444L11.302 29.766H11.2509L9.90856 32H8.32333L10.372 28.7273L8.36168 25.4545H9.93093ZM15.0669 32V25.4545H16.4508V30.859H19.2569V32H15.0669ZM23.7242 27.337C23.6986 27.0792 23.5889 26.8789 23.395 26.7362C23.2011 26.5934 22.9379 26.522 22.6056 26.522C22.3797 26.522 22.189 26.554 22.0335 26.6179C21.8779 26.6797 21.7586 26.766 21.6755 26.8768C21.5945 26.9876 21.5541 27.1133 21.5541 27.2539C21.5498 27.3711 21.5743 27.4734 21.6276 27.5607C21.683 27.6481 21.7586 27.7237 21.8545 27.7876C21.9504 27.8494 22.0612 27.9038 22.1869 27.9506C22.3126 27.9954 22.4468 28.0337 22.5896 28.0657L23.1776 28.2063C23.4632 28.2702 23.7252 28.3555 23.9639 28.462C24.2025 28.5685 24.4092 28.6996 24.5839 28.8551C24.7586 29.0107 24.8939 29.1939 24.9898 29.4048C25.0878 29.6158 25.1379 29.8576 25.14 30.1303C25.1379 30.5309 25.0356 30.8782 24.8332 31.1722C24.6329 31.4641 24.3431 31.6911 23.9639 31.853C23.5867 32.0128 23.1318 32.0927 22.5992 32.0927C22.0708 32.0927 21.6105 32.0117 21.2185 31.8498C20.8286 31.6879 20.5239 31.4482 20.3044 31.1307C20.0871 30.8111 19.9731 30.4158 19.9624 29.945H21.3016C21.3165 30.1644 21.3794 30.3477 21.4901 30.4947C21.6031 30.6396 21.7533 30.7493 21.9408 30.8239C22.1304 30.8963 22.3445 30.9325 22.5832 30.9325C22.8176 30.9325 23.021 30.8984 23.1936 30.8303C23.3683 30.7621 23.5036 30.6673 23.5995 30.5458C23.6954 30.4244 23.7433 30.2848 23.7433 30.1271C23.7433 29.9801 23.6997 29.8565 23.6123 29.7564C23.5271 29.6562 23.4014 29.571 23.2352 29.5007C23.0711 29.4304 22.8698 29.3665 22.6311 29.3089L21.9184 29.13C21.3666 28.9957 20.9308 28.7859 20.6112 28.5004C20.2916 28.2148 20.1329 27.8303 20.135 27.3466C20.1329 26.9503 20.2384 26.604 20.4514 26.3079C20.6666 26.0117 20.9617 25.7805 21.3367 25.6143C21.7117 25.4482 22.1379 25.3651 22.6151 25.3651C23.1009 25.3651 23.5249 25.4482 23.8872 25.6143C24.2515 25.7805 24.5349 26.0117 24.7373 26.3079C24.9397 26.604 25.0441 26.9471 25.0505 27.337H23.7242ZM27.3684 25.4545L28.6884 27.6854H28.7395L30.0659 25.4545H31.6287L29.6312 28.7273L31.6735 32H30.0819L28.7395 29.766H28.6884L27.3461 32H25.7608L27.8095 28.7273L25.7992 25.4545H27.3684Z\" fill=\"white\"/></g>"},"file":{"width":24,"height":24,"body":"<g fill=\"none\"><path d=\"M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M14 17H8M16 13H8M20 9.98822V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H12.0118C12.7455 2 13.1124 2 13.4577 2.08289C13.7638 2.15638 14.0564 2.27759 14.3249 2.44208C14.6276 2.6276 14.887 2.88703 15.4059 3.40589L18.5941 6.59411C19.113 7.11297 19.3724 7.3724 19.5579 7.67515C19.7224 7.94356 19.8436 8.2362 19.9171 8.5423C20 8.88757 20 9.25445 20 9.98822Z\" stroke=\"#1F2A37\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"football":{"width":24,"height":24,"body":"<g fill=\"none\"><g id=\"icon-park-outline:soccer-one\">\n<g id=\"Group\">\n<path id=\"Vector\" d=\"M14.5 7C15.163 7 15.7989 6.73661 16.2678 6.26777C16.7366 5.79893 17 5.16304 17 4.5C17 3.83696 16.7366 3.20107 16.2678 2.73223C15.7989 2.26339 15.163 2 14.5 2C13.837 2 13.2011 2.26339 12.7322 2.73223C12.2634 3.20107 12 3.83696 12 4.5C12 5.16304 12.2634 5.79893 12.7322 6.26777C13.2011 6.73661 13.837 7 14.5 7Z\" stroke=\"#1F2A37\" stroke-width=\"2\" stroke-miterlimit=\"2\"/>\n<path id=\"Vector_2\" d=\"M9.5 23C9.89782 23 10.2794 22.842 10.5607 22.5607C10.842 22.2794 11 21.8978 11 21.5C11 21.1022 10.842 20.7206 10.5607 20.4393C10.2794 20.158 9.89782 20 9.5 20C9.10218 20 8.72064 20.158 8.43934 20.4393C8.15804 20.7206 8 21.1022 8 21.5C8 21.8978 8.15804 22.2794 8.43934 22.5607C8.72064 22.842 9.10218 23 9.5 23Z\" fill=\"#1F2A37\"/>\n<path id=\"Vector_3\" d=\"M12.19 9.45508L10 13.5001M10 13.5001L13.655 16.5101C13.81 16.6301 13.92 16.7951 13.985 16.9801L15.5 22.0001M10 13.5001L7.255 17.3201C6.985 17.7151 6.475 17.8651 6.035 17.6801L2 16.0001\" stroke=\"#1F2A37\" stroke-width=\"2\" stroke-miterlimit=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path id=\"Vector_4\" d=\"M21 11.9999H17.5C17.32 11.9999 17.14 11.9549 16.98 11.8649L15.375 10.9599C13.37 9.78494 11.175 8.97994 8.89 8.56994L7.28 8.28494C7.055 8.24494 6.82 8.28494 6.62 8.39494L3.5 9.99994\" stroke=\"#1F2A37\" stroke-width=\"2\" stroke-miterlimit=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g>\n</g></g>"},"futzo-horizontal":{"width":3508,"height":1630,"body":"<g transform=\"translate(0.000000,1630.000000) scale(0.100000,-0.100000)\"\n       fill=\"#9155FD\" stroke=\"none\">\n        <path d=\"M6350 13624 c-19 -2 -91 -9 -160 -14 -754 -65 -1538 -312 -2212 -699\n-1394 -799 -2363 -2156 -2667 -3731 -103 -539 -123 -1153 -55 -1700 131 -1053\n553 -2019 1244 -2850 132 -159 509 -536 665 -666 662 -550 1401 -928 2207\n-1128 449 -112 844 -159 1323 -159 471 0 869 47 1305 154 1427 351 2644 1253\n3410 2529 99 166 278 520 350 695 597 1452 551 3073 -129 4480 -698 1445\n-2016 2527 -3561 2924 -270 69 -504 112 -810 147 -127 14 -818 28 -910 18z\nm-691 -1009 c549 -399 626 -463 706 -589 54 -85 100 -189 127 -287 23 -83 23\n-90 23 -664 0 -640 3 -607 -66 -787 l-30 -77 -1052 -4 c-1020 -3 -1055 -4\n-1142 -24 -178 -41 -324 -113 -467 -230 -118 -96 -248 -276 -298 -414 -13 -35\n-26 -68 -31 -73 -20 -23 -203 121 -289 230 -101 126 -134 210 -351 879 -111\n341 -204 625 -206 631 -2 6 35 60 83 120 601 755 1362 1308 2264 1644 146 55\n156 58 179 43 13 -9 261 -188 550 -398z m2951 299 c145 -58 481 -221 625 -304\n434 -249 859 -585 1197 -947 173 -184 388 -447 388 -474 0 -31 -396 -1223\n-428 -1289 -48 -98 -137 -216 -215 -283 -69 -59 -121 -97 -134 -97 -5 0 -14\n30 -21 66 -42 223 -206 433 -417 534 -186 90 -81 83 -1446 87 l-1206 4 -22 77\nc-55 198 -54 182 -58 742 -5 563 -1 621 44 765 46 147 125 274 240 387 39 38\n299 234 606 457 l539 390 96 -35 c53 -19 149 -55 212 -80z m792 -3055 c127\n-41 239 -148 289 -276 19 -48 23 -78 24 -168 0 -106 -1 -112 -36 -185 -61\n-125 -147 -203 -277 -253 l-57 -22 -1885 -5 -1885 -5 -50 -24 c-66 -33 -125\n-94 -161 -167 -25 -51 -29 -70 -29 -144 1 -65 6 -96 22 -132 43 -94 109 -157\n205 -196 40 -16 149 -17 1373 -22 l1330 -5 57 -28 c88 -43 152 -107 195 -195\n37 -74 38 -79 38 -186 0 -101 -3 -116 -28 -167 -51 -106 -140 -184 -252 -225\n-46 -17 -105 -19 -760 -24 l-710 -5 -50 -24 c-107 -53 -180 -162 -192 -283\n-10 -111 6 -145 208 -439 345 -502 348 -508 356 -669 9 -167 -43 -305 -157\n-420 -217 -218 -561 -225 -775 -17 -39 38 -345 441 -800 1052 -406 545 -925\n1241 -1154 1547 -267 357 -431 585 -457 637 -75 145 -97 292 -70 450 52 298\n258 525 547 601 72 18 135 19 2576 19 2501 1 2503 1 2565 -20z m935 -750 c105\n-14 247 -62 333 -113 38 -22 315 -219 615 -436 l546 -395 -6 -145 c-22 -545\n-99 -988 -255 -1460 -149 -453 -331 -828 -593 -1227 l-100 -153 -691 0 c-429\n0 -716 4 -756 11 -100 15 -251 71 -342 125 -158 94 -213 160 -834 1014 l-563\n775 287 6 c325 7 367 15 517 91 112 58 244 190 303 305 112 217 113 468 2 681\n-96 186 -254 313 -460 372 -62 18 -112 23 -282 27 -194 5 -208 7 -208 24 0 18\n25 19 723 19 423 0 750 4 791 10 255 37 449 178 601 434 21 36 224 55 372 35z\nm-6995 -25 c34 -6 38 -10 43 -43 29 -190 72 -319 144 -438 26 -43 406 -559\n844 -1146 438 -588 797 -1073 797 -1079 0 -21 -62 -111 -327 -475 -161 -222\n-295 -396 -337 -439 -131 -131 -291 -216 -481 -255 -83 -17 -146 -19 -803 -19\nl-713 0 -103 158 c-139 212 -212 340 -327 577 -325 669 -481 1305 -513 2090\nl-4 110 571 415 c314 228 603 431 643 450 80 41 159 68 249 86 65 13 257 18\n317 8z m4558 -2860 c355 -486 662 -913 682 -947 50 -82 95 -208 114 -321 17\n-97 14 -257 -7 -346 -14 -64 -428 -1333 -437 -1342 -4 -4 -72 -25 -152 -48\n-920 -260 -1862 -263 -2782 -9 -81 23 -154 46 -162 53 -17 13 -418 1245 -442\n1357 -12 55 -15 109 -11 214 9 271 44 343 407 839 148 203 276 376 283 383 12\n12 52 -37 274 -334 143 -192 282 -368 309 -392 164 -145 339 -217 554 -228\n320 -15 605 129 780 394 95 146 140 301 140 487 0 138 -30 268 -87 381 -21 42\n-138 222 -261 400 -123 179 -220 329 -217 335 4 6 76 10 188 10 l182 -1 645\n-885z\"/>\n        <path d=\"M15675 10291 c-183 -35 -311 -85 -450 -175 -99 -65 -208 -165 -275\n-255 -100 -132 -189 -338 -224 -516 -9 -44 -147 -1023 -306 -2175 -159 -1152\n-292 -2107 -295 -2122 l-4 -28 584 0 c430 0 585 3 585 11 0 7 70 506 155 1111\n85 604 155 1103 155 1109 0 5 387 9 1018 9 l1017 0 49 373 c27 204 51 384 53\n400 l6 27 -1012 0 c-956 0 -1011 1 -1011 18 0 9 31 238 69 508 49 340 77 509\n92 550 45 122 110 187 228 227 l66 22 1020 3 1020 3 69 411 c50 304 65 412 56\n418 -12 7 -243 33 -455 50 -293 24 -561 31 -1310 35 -754 5 -806 4 -900 -14z\"/>\n        <path d=\"M23765 9828 c-2 -7 -36 -240 -76 -518 -39 -278 -75 -509 -79 -513 -4\n-5 -159 -17 -344 -27 -185 -9 -338 -19 -340 -21 -2 -2 -22 -152 -45 -334 -23\n-181 -45 -338 -47 -347 -5 -17 17 -18 333 -20 l339 -3 -153 -1050 c-84 -577\n-155 -1095 -159 -1150 -12 -179 29 -368 107 -503 19 -31 75 -98 124 -148 81\n-81 102 -97 205 -147 184 -91 315 -116 591 -117 201 0 425 19 649 55 164 27\n359 71 374 85 7 7 -20 476 -40 702 l-6 67 -332 4 c-220 2 -343 7 -367 15 -54\n18 -100 53 -123 91 -42 73 -38 122 108 1141 75 519 136 948 136 952 0 4 237 9\n527 10 l527 3 53 360 c28 198 52 363 53 368 0 4 -236 7 -525 7 -289 0 -525 4\n-525 8 0 11 138 979 144 1015 l6 27 -556 0 c-435 0 -556 -3 -559 -12z\"/>\n        <path d=\"M31765 8879 c-355 -27 -667 -104 -905 -225 -345 -175 -567 -441 -733\n-879 -106 -280 -194 -687 -228 -1056 -17 -193 -7 -575 20 -715 119 -628 499\n-941 1271 -1051 183 -26 797 -26 990 0 629 85 990 284 1255 690 243 374 409\n1041 422 1702 6 286 -6 418 -51 597 -148 583 -587 873 -1420 938 -149 12 -461\n11 -621 -1z m565 -833 c204 -44 314 -150 355 -341 20 -93 20 -381 0 -573 -22\n-208 -59 -430 -106 -619 -73 -300 -139 -442 -264 -569 -93 -94 -175 -139 -320\n-176 -123 -31 -436 -33 -560 -5 -156 37 -258 105 -311 209 -76 149 -81 429\n-18 882 120 858 307 1144 789 1206 100 13 346 5 435 -14z\"/>\n        <path d=\"M18525 7358 c-208 -1498 -219 -1597 -196 -1758 68 -463 444 -712\n1036 -687 465 19 893 221 1385 653 58 50 114 102 125 114 11 12 32 30 46 40\nl25 19 -4 -360 -5 -359 441 0 440 0 6 38 c4 20 119 856 256 1857 137 1001 252\n1832 255 1848 l5 27 -559 0 -559 0 -6 -27 c-3 -16 -76 -536 -161 -1158 -85\n-621 -157 -1139 -160 -1151 -9 -39 -391 -331 -572 -437 -159 -93 -341 -147\n-500 -147 -188 0 -289 57 -324 185 -25 87 -11 205 170 1465 100 690 181 1258\n181 1262 0 4 -253 8 -563 8 l-562 0 -200 -1432z\"/>\n        <path d=\"M26250 8778 c-1 -7 -22 -183 -49 -390 l-47 -378 993 -2 994 -3 -1173\n-1101 -1174 -1101 -47 -374 c-26 -206 -47 -382 -47 -391 0 -17 87 -18 1693\n-18 l1693 0 48 353 c27 193 51 367 53 384 l6 33 -1033 2 -1033 3 1174 1102\n1174 1102 48 388 c26 213 48 391 47 396 0 4 -747 7 -1660 7 -1321 0 -1660 -3\n-1660 -12z\"/>\n    </g>"},"google":{"width":24,"height":25,"body":"<defs><clipPath id=\"clip0_1191_2448\">\n<rect width=\"24\" height=\"24\" fill=\"white\" transform=\"translate(0 0.5)\"/>\n</clipPath></defs><g fill=\"none\"><g id=\"Social icon\" clip-path=\"url(#clip0_1191_2448)\">\n<path id=\"Vector\" d=\"M23.7663 12.7763C23.7663 11.9605 23.7001 11.1404 23.559 10.3379H12.2402V14.9589H18.722C18.453 16.4492 17.5888 17.7676 16.3233 18.6054V21.6037H20.1903C22.4611 19.5137 23.7663 16.4272 23.7663 12.7763Z\" fill=\"#4285F4\"/>\n<path id=\"Vector_2\" d=\"M12.2401 24.5013C15.4766 24.5013 18.2059 23.4387 20.1945 21.6044L16.3276 18.606C15.2517 19.338 13.8627 19.7525 12.2445 19.7525C9.11388 19.7525 6.45946 17.6404 5.50705 14.8008H1.5166V17.8917C3.55371 21.9439 7.7029 24.5013 12.2401 24.5013Z\" fill=\"#34A853\"/>\n<path id=\"Vector_3\" d=\"M5.50277 14.8007C5.00011 13.3103 5.00011 11.6965 5.50277 10.2062V7.11523H1.51674C-0.185266 10.506 -0.185266 14.5009 1.51674 17.8916L5.50277 14.8007Z\" fill=\"#FBBC04\"/>\n<path id=\"Vector_4\" d=\"M12.2401 5.24966C13.9509 5.2232 15.6044 5.86697 16.8434 7.04867L20.2695 3.62262C18.1001 1.5855 15.2208 0.465534 12.2401 0.500809C7.7029 0.500809 3.55371 3.05822 1.5166 7.11481L5.50264 10.2058C6.45064 7.36173 9.10947 5.24966 12.2401 5.24966Z\" fill=\"#EA4335\"/>\n</g></g>"},"help-circle":{"width":16,"height":16,"body":"<defs><clipPath id=\"clip0_770_4805\">\n<rect width=\"16\" height=\"16\" fill=\"white\"/>\n</clipPath></defs><g fill=\"none\"><g clip-path=\"url(#clip0_770_4805)\">\n<path d=\"M6.06004 6.00004C6.21678 5.55449 6.52614 5.17878 6.93334 4.93946C7.34055 4.70015 7.8193 4.61267 8.28483 4.69252C8.75035 4.77236 9.17259 5.01439 9.47676 5.37573C9.78093 5.73706 9.94741 6.19439 9.94671 6.66671C9.94671 8.00004 7.94671 8.66671 7.94671 8.66671M8.00004 11.3334H8.00671M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00004C1.33337 4.31814 4.31814 1.33337 8.00004 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z\" stroke=\"#667085\" stroke-width=\"1.33333\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g></g>"},"home":{"width":24,"height":24,"body":"<g fill=\"none\"><g id=\"Icons\">\n<path id=\"Vector\" d=\"M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z\" fill=\"#525056\"/>\n</g></g>"},"image-plus-avatar":{"width":16,"height":16,"body":"<g fill=\"none\"><g id=\"image-plus\">\n<path id=\"Icon\" d=\"M8.33333 1.99967H5.2C4.0799 1.99967 3.51984 1.99967 3.09202 2.21766C2.71569 2.40941 2.40973 2.71537 2.21799 3.09169C2 3.51952 2 4.07957 2 5.19967V10.7997C2 11.9198 2 12.4798 2.21799 12.9077C2.40973 13.284 2.71569 13.5899 3.09202 13.7817C3.51984 13.9997 4.07989 13.9997 5.2 13.9997H11.3333C11.9533 13.9997 12.2633 13.9997 12.5176 13.9315C13.2078 13.7466 13.7469 13.2075 13.9319 12.5173C14 12.263 14 11.953 14 11.333M12.6667 5.33301V1.33301M10.6667 3.33301H14.6667M7 5.66634C7 6.40272 6.40305 6.99967 5.66667 6.99967C4.93029 6.99967 4.33333 6.40272 4.33333 5.66634C4.33333 4.92996 4.93029 4.33301 5.66667 4.33301C6.40305 4.33301 7 4.92996 7 5.66634ZM9.99336 7.94511L4.3541 13.0717C4.03691 13.3601 3.87831 13.5042 3.86429 13.6291C3.85213 13.7374 3.89364 13.8448 3.97546 13.9167C4.06985 13.9997 4.28419 13.9997 4.71286 13.9997H10.9707C11.9301 13.9997 12.4098 13.9997 12.7866 13.8385C13.2596 13.6361 13.6365 13.2593 13.8388 12.7863C14 12.4095 14 11.9298 14 10.9703C14 10.6475 14 10.4861 13.9647 10.3358C13.9204 10.1469 13.8353 9.96991 13.7155 9.81727C13.6202 9.69581 13.4941 9.59497 13.242 9.39331L11.3772 7.90145C11.1249 7.69961 10.9988 7.5987 10.8599 7.56308C10.7374 7.53169 10.6086 7.53575 10.4884 7.5748C10.352 7.6191 10.2324 7.72777 9.99336 7.94511Z\" stroke=\"#1F2A37\" stroke-width=\"1.33333\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g></g>"},"image-plus":{"width":32,"height":32,"body":"<g fill=\"none\"><path d=\"M16.6667 3.99984H10.4C8.15979 3.99984 7.03969 3.99984 6.18404 4.43581C5.43139 4.8193 4.81947 5.43123 4.43597 6.18388C4 7.03952 4 8.15963 4 10.3998V21.5998C4 23.84 4 24.9602 4.43597 25.8158C4.81947 26.5685 5.43139 27.1804 6.18404 27.5639C7.03969 27.9998 8.15979 27.9998 10.4 27.9998H22.6667C23.9066 27.9998 24.5266 27.9998 25.0353 27.8635C26.4156 27.4937 27.4938 26.4155 27.8637 25.0351C28 24.5264 28 23.9065 28 22.6665M25.3333 10.6665V2.6665M21.3333 6.6665H29.3333M14 11.3332C14 12.8059 12.8061 13.9998 11.3333 13.9998C9.86057 13.9998 8.66667 12.8059 8.66667 11.3332C8.66667 9.86041 9.86057 8.6665 11.3333 8.6665C12.8061 8.6665 14 9.86041 14 11.3332ZM19.9867 15.8907L8.7082 26.1439C8.07382 26.7206 7.75663 27.009 7.72857 27.2588C7.70425 27.4753 7.78727 27.69 7.95091 27.8339C8.13971 27.9998 8.56837 27.9998 9.42571 27.9998H21.9413C23.8602 27.9998 24.8196 27.9998 25.5732 27.6775C26.5193 27.2728 27.2729 26.5191 27.6776 25.5731C28 24.8195 28 23.86 28 21.9411C28 21.2955 28 20.9727 27.9294 20.672C27.8407 20.2942 27.6706 19.9403 27.431 19.635C27.2403 19.3921 26.9883 19.1904 26.4841 18.7871L22.7544 15.8034C22.2499 15.3997 21.9976 15.1979 21.7197 15.1267C21.4748 15.0639 21.2172 15.072 20.9767 15.1501C20.7039 15.2387 20.4648 15.456 19.9867 15.8907Z\" stroke=\"#667085\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"inbox-02":{"width":28,"height":29,"body":"<g fill=\"none\"><path d=\"M2.33331 14.5001H6.86227C7.66168 14.5001 8.39247 14.9517 8.74998 15.6667C9.10748 16.3818 9.83828 16.8334 10.6377 16.8334H17.3623C18.1617 16.8334 18.8925 16.3818 19.25 15.6667C19.6075 14.9517 20.3383 14.5001 21.1377 14.5001H25.6666M2.33331 14.5001V10.7667C2.33331 8.80656 2.33331 7.82647 2.71479 7.07778C3.05035 6.41921 3.58578 5.88378 4.24435 5.54823C4.99304 5.16675 5.97313 5.16675 7.93331 5.16675H20.0666C22.0268 5.16675 23.0069 5.16675 23.7556 5.54823C24.4142 5.88378 24.9496 6.41921 25.2852 7.07778C25.6666 7.82647 25.6666 8.80656 25.6666 10.7667V14.5001M2.33331 14.5001V18.2334C2.33331 20.1936 2.33331 21.1737 2.71479 21.9224C3.05035 22.5809 3.58578 23.1164 4.24435 23.4519C4.99304 23.8334 5.97313 23.8334 7.93331 23.8334H20.0666C22.0268 23.8334 23.0069 23.8334 23.7556 23.4519C24.4142 23.1164 24.9496 22.5809 25.2852 21.9224C25.6666 21.1737 25.6666 20.1936 25.6666 18.2334V14.5001\" stroke=\"#344054\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"info-alert":{"width":38,"height":38,"body":"<defs><clipPath id=\"clip0_1397_10397\">\n<rect width=\"20\" height=\"20\" fill=\"white\" transform=\"translate(9 9)\"/>\n</clipPath></defs><g fill=\"none\"><g opacity=\"0.3\">\n<rect x=\"6\" y=\"6\" width=\"26\" height=\"26\" rx=\"13\" stroke=\"#155EEF\" stroke-width=\"2\"/>\n</g>\n<g opacity=\"0.1\">\n<rect x=\"1\" y=\"1\" width=\"36\" height=\"36\" rx=\"18\" stroke=\"#155EEF\" stroke-width=\"2\"/>\n</g>\n<g clip-path=\"url(#clip0_1397_10397)\">\n<path d=\"M19 22.3333V19M19 15.6666H19.0083M27.3333 19C27.3333 23.6023 23.6024 27.3333 19 27.3333C14.3976 27.3333 10.6667 23.6023 10.6667 19C10.6667 14.3976 14.3976 10.6666 19 10.6666C23.6024 10.6666 27.3333 14.3976 27.3333 19Z\" stroke=\"#155EEF\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g></g>"},"info-close-alert":{"width":36,"height":36,"body":"<g fill=\"none\"><path d=\"M23 13L13 23M13 13L23 23\" stroke=\"#155EEF\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"league-created":{"width":92,"height":93,"body":"<g fill=\"none\"><g opacity=\"0.3\">\n<rect x=\"12\" y=\"12.5\" width=\"68\" height=\"68\" rx=\"34\" stroke=\"#66C61C\" stroke-width=\"4\"/>\n</g>\n<g opacity=\"0.1\">\n<rect x=\"2\" y=\"2.5\" width=\"88\" height=\"88\" rx=\"44\" stroke=\"#66C61C\" stroke-width=\"4\"/>\n</g>\n<path d=\"M39.0003 46.4998L43.667 51.1665L54.167 40.6665M39.4714 66.5685C40.2362 66.4674 41.0087 66.6748 41.6179 67.1441L44.4255 69.2985C45.3535 70.0114 46.6445 70.0114 47.57 69.2985L50.4838 67.0611C51.0282 66.6437 51.7152 66.4596 52.3944 66.5504L56.0393 67.03C57.1981 67.183 58.3154 66.5374 58.7639 65.4563L60.1664 62.0653C60.4282 61.4302 60.9311 60.9272 61.5662 60.6654L64.9571 59.2628C66.0381 58.8169 66.6836 57.6969 66.5307 56.5381L66.0692 53.0252C65.9681 52.2604 66.1755 51.4878 66.6447 50.8786L68.799 48.0709C69.5119 47.1428 69.5119 45.8517 68.799 44.9262L66.5618 42.0122C66.1444 41.4678 65.9603 40.7807 66.0511 40.1015L66.5307 36.4564C66.6836 35.2976 66.0381 34.1802 64.9571 33.7317L61.5662 32.3291C60.9311 32.0673 60.4282 31.5643 60.1664 30.9292L58.7639 27.5381C58.318 26.4571 57.1981 25.8115 56.0393 25.9645L52.3944 26.4441C51.7152 26.5374 51.0282 26.3534 50.4864 25.9386L47.5726 23.7012C46.6445 22.9883 45.3535 22.9883 44.428 23.7012L41.5142 25.9386C40.9698 26.3534 40.2828 26.5374 39.6036 26.4493L35.9588 25.9697C34.8 25.8167 33.6826 26.4622 33.2342 27.5433L31.8343 30.9343C31.5699 31.5669 31.0669 32.0699 30.4344 32.3343L27.0436 33.7343C25.9626 34.1828 25.317 35.3001 25.47 36.459L25.9496 40.1041C26.0377 40.7833 25.8537 41.4703 25.4389 42.0122L23.2017 44.9262C22.4888 45.8543 22.4888 47.1454 23.2017 48.0709L25.4389 50.9849C25.8563 51.5293 26.0403 52.2163 25.9496 52.8956L25.47 56.5407C25.317 57.6995 25.9626 58.8169 27.0436 59.2654L30.4344 60.668C31.0695 60.9298 31.5725 61.4328 31.8343 62.0679L33.2368 65.4589C33.6826 66.54 34.8026 67.1856 35.9613 67.0326L39.4714 66.5685Z\" stroke=\"#66C61C\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"logo-22":{"width":3508,"height":2481,"body":"<g transform=\"translate(0.000000,2481.000000) scale(0.100000,-0.100000)\"\nfill=\"#9155FD\" stroke=\"none\">\n<path d=\"M17407 22538 c-3 -13 -27 -156 -53 -319 l-48 -297 -210 -8 -210 -9\n-31 -212 -31 -213 203 0 c171 0 203 -2 203 -15 0 -8 -47 -307 -105 -665 -59\n-363 -105 -681 -105 -718 0 -188 103 -358 264 -437 124 -61 177 -70 396 -70\n202 1 303 11 479 47 l104 21 -7 151 c-3 83 -9 188 -13 234 l-6 82 -61 1 c-177\n2 -353 16 -380 29 -50 25 -69 62 -69 127 1 44 139 946 179 1169 l6 31 318 -5\n318 -5 6 29 c15 73 66 407 62 411 -2 2 -146 7 -320 10 -313 6 -316 6 -311 27\n12 56 97 607 94 610 -2 2 -153 6 -335 10 l-332 7 -5 -23z\"/>\n<path d=\"M15722 21787 l-313 -92 7 -50 c3 -27 50 -349 104 -715 l97 -665 -51\n-74 c-90 -130 -217 -281 -275 -328 -70 -56 -182 -111 -247 -121 -116 -18 -177\n23 -207 139 -10 35 -65 404 -123 819 -58 415 -107 756 -108 758 -2 2 -149 -39\n-327 -91 l-324 -95 3 -33 c2 -19 59 -420 128 -891 89 -614 131 -879 149 -937\n47 -146 147 -262 272 -312 51 -21 74 -24 198 -24 115 0 154 4 220 23 106 30\n264 108 350 173 142 107 295 285 421 489 68 112 63 104 68 99 3 -3 29 -93 59\n-202 30 -109 57 -200 61 -204 3 -3 120 27 259 67 l252 73 -167 1141 c-92 627\n-168 1142 -168 1144 0 6 -47 -6 -338 -91z\"/>\n<path d=\"M19208 21592 c-48 -114 -88 -213 -90 -221 -2 -10 140 -55 565 -176\n312 -89 568 -165 569 -170 0 -5 -387 -210 -860 -454 l-861 -445 -94 -221 c-52\n-121 -92 -221 -88 -222 3 -1 445 -127 980 -279 536 -152 980 -278 985 -280 6\n-2 54 94 106 214 l96 218 -596 168 c-327 93 -599 171 -603 174 -5 2 382 206\n860 452 l868 448 96 224 c53 122 96 224 95 224 0 1 -433 124 -960 274 -528\n150 -965 274 -970 276 -6 2 -50 -89 -98 -204z\"/>\n<path d=\"M12615 21654 c-173 -96 -299 -176 -560 -352 -411 -277 -578 -396\n-647 -461 -226 -211 -288 -515 -164 -801 24 -56 1200 -2365 1210 -2377 2 -3\n556 383 570 397 5 5 -126 273 -303 621 -171 337 -310 613 -308 614 55 36 978\n683 990 695 17 16 13 26 -95 232 l-112 216 -26 -18 c-279 -198 -974 -680 -981\n-680 -5 0 -75 132 -155 294 -139 276 -147 297 -148 352 0 68 15 102 72 160 21\n23 258 194 525 381 l486 340 -107 223 c-60 123 -112 225 -118 227 -5 2 -63\n-27 -129 -63z\"/>\n<path d=\"M22050 20555 c-234 -48 -466 -198 -730 -471 -442 -458 -562 -849\n-363 -1188 195 -334 775 -726 1163 -787 98 -15 255 -6 350 21 197 55 377 176\n615 415 336 335 498 607 512 860 18 314 -195 608 -651 899 -340 218 -644 303\n-896 251z m481 -604 c161 -55 335 -186 380 -286 11 -24 19 -64 19 -101 0 -52\n-6 -74 -39 -140 -55 -108 -187 -272 -355 -439 -146 -146 -265 -235 -361 -271\n-70 -27 -191 -25 -266 4 -126 49 -274 159 -335 248 -37 54 -39 60 -39 133 1\n65 5 85 32 136 108 209 477 594 658 688 99 50 211 61 306 28z\"/>\n<path d=\"M23816 18645 c-84 -30 -145 -119 -146 -213 0 -75 20 -113 108 -210\n429 -470 763 -911 1064 -1407 1295 -2135 1580 -4765 774 -7141 -367 -1083\n-941 -2065 -1725 -2949 -161 -182 -526 -544 -716 -710 -1032 -904 -2214 -1532\n-3510 -1865 -1220 -314 -2510 -353 -3745 -115 -1502 290 -2887 978 -4055 2014\n-167 148 -538 519 -686 686 -1234 1392 -1968 3084 -2134 4915 -57 632 -39\n1332 51 1960 179 1256 631 2447 1329 3500 256 386 495 691 863 1099 95 105\n112 138 112 215 0 153 -143 257 -298 216 -56 -15 -133 -90 -338 -327 -1688\n-1944 -2457 -4464 -2144 -7015 191 -1547 789 -3025 1735 -4283 274 -364 483\n-603 835 -955 354 -355 591 -561 965 -843 1296 -974 2840 -1581 4445 -1746\n369 -38 519 -45 950 -45 440 0 648 11 1019 54 2937 336 5528 2111 6923 4745\n1150 2170 1351 4750 553 7095 -393 1153 -1015 2204 -1858 3137 -111 123 -151\n161 -191 179 -58 27 -121 30 -180 9z\"/>\n<path d=\"M17210 17549 c-439 -30 -884 -117 -1295 -254 -746 -248 -1438 -673\n-1997 -1227 -854 -848 -1372 -1928 -1505 -3138 -14 -128 -18 -245 -18 -520 0\n-388 11 -536 65 -855 362 -2159 2066 -3863 4225 -4225 319 -54 467 -65 855\n-65 390 0 538 11 860 66 1806 305 3324 1561 3968 3284 360 965 420 2029 171\n3035 -194 780 -570 1504 -1108 2130 -131 152 -435 450 -591 580 -810 673\n-1757 1069 -2810 1175 -189 19 -636 27 -820 14z m-667 -931 c281 -205 539\n-399 573 -432 147 -147 233 -335 255 -554 7 -64 9 -276 6 -551 -5 -487 -6\n-502 -67 -659 l-31 -82 -930 0 c-983 0 -1057 -3 -1208 -46 -157 -46 -284 -119\n-407 -236 -107 -102 -187 -227 -260 -406 l-9 -22 -55 36 c-135 91 -240 206\n-307 338 -20 40 -123 338 -234 676 l-197 605 29 40 c154 209 510 584 729 766\n452 377 919 648 1465 850 72 27 131 48 133 49 1 0 233 -167 515 -372z m2682\n307 c813 -305 1532 -827 2076 -1505 49 -61 95 -121 104 -133 14 -22 3 -58\n-170 -593 -102 -313 -199 -598 -215 -633 -57 -122 -159 -244 -276 -333 -58\n-44 -73 -42 -74 8 0 34 -39 144 -78 219 -26 49 -64 97 -127 161 -100 100 -189\n154 -325 196 l-75 22 -1141 4 -1141 3 -22 72 c-52 177 -54 194 -58 687 -5 504\n1 597 44 729 48 148 153 309 260 400 27 22 271 202 543 400 374 272 500 359\n515 354 11 -3 83 -29 160 -58z m907 -2933 c73 -36 141 -96 182 -160 76 -121\n88 -288 29 -413 -50 -108 -129 -182 -244 -231 l-54 -23 -1775 -5 -1775 -5 -57\n-28 c-117 -57 -183 -172 -176 -307 6 -126 72 -225 186 -278 l57 -27 1250 -5\n1250 -5 60 -28 c156 -73 252 -248 225 -411 -24 -148 -126 -267 -275 -319 -20\n-8 -260 -13 -700 -17 l-670 -5 -47 -23 c-65 -32 -125 -94 -156 -160 -34 -74\n-37 -184 -5 -253 11 -25 112 -178 223 -340 112 -162 218 -323 236 -359 191\n-384 -156 -826 -578 -739 -79 16 -186 71 -245 126 -46 42 -2173 2884 -2248\n3003 -15 24 -42 80 -59 125 -28 75 -30 88 -31 220 0 128 2 148 29 229 72 219\n260 399 478 456 71 18 138 19 2448 17 l2375 -2 67 -33z m794 -682 c108 -11\n233 -48 324 -96 36 -19 299 -204 585 -412 l520 -378 3 -90 c2 -49 -2 -161 -8\n-249 -58 -840 -325 -1627 -793 -2337 l-90 -138 -628 0 c-390 0 -657 4 -706 11\n-109 15 -244 61 -337 117 -157 93 -191 134 -780 942 l-544 745 277 6 c219 5\n288 10 336 24 155 44 300 147 386 272 41 59 93 175 110 243 18 77 16 241 -4\n320 -49 188 -190 366 -357 448 -126 62 -183 72 -407 72 l-193 0 0 25 0 24 733\n3 732 3 70 24 c195 65 340 181 435 348 27 48 33 52 82 62 29 6 71 12 93 14 22\n2 47 4 55 5 8 1 56 -3 106 -8z m-6542 -28 l40 -7 12 -87 c16 -106 53 -218 105\n-318 23 -44 278 -396 610 -840 314 -421 658 -883 766 -1027 l195 -263 -32 -52\nc-40 -65 -462 -646 -537 -741 -108 -135 -293 -252 -473 -300 -84 -22 -93 -22\n-775 -22 l-690 0 -58 85 c-165 241 -374 632 -486 913 -206 513 -340 1164 -341\n1652 l0 111 502 364 c565 412 592 430 691 472 133 56 341 83 471 60z m4298\n-2702 c637 -872 674 -928 718 -1080 30 -105 38 -290 16 -396 -16 -81 -399\n-1271 -413 -1285 -13 -13 -273 -86 -420 -118 -352 -77 -572 -102 -950 -108\n-390 -7 -613 10 -963 73 -145 26 -382 82 -516 123 l-70 21 -197 607 c-108 335\n-202 628 -209 653 -7 27 -12 102 -12 190 1 128 4 156 27 233 15 48 43 120 63\n160 31 62 541 778 564 792 5 3 115 -137 245 -312 131 -174 260 -338 287 -365\n93 -90 191 -148 328 -194 79 -26 96 -28 245 -28 153 0 164 1 255 32 160 53\n298 149 393 275 131 172 186 348 174 560 -12 209 -50 290 -318 678 -111 162\n-205 304 -207 317 l-4 22 173 -2 174 -3 617 -845z\"/>\n</g>"},"logout":{"width":20,"height":20,"body":"<g fill=\"none\"><g id=\"log-out-01\">\n<path id=\"Icon\" d=\"M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5M7.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5H7.5\" stroke=\"#475467\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g></g>"},"match-polygon":{"width":9,"height":14,"body":"<g fill=\"#EAECF0\"><polygon points=\"9,0 14,18 0,7\" fill=\"#EAECF0\"/></g>"},"players":{"width":24,"height":24,"body":"<g fill=\"none\"><g id=\"Icons\">\n<path id=\"Vector\" d=\"M16 17V19H2V17C2 17 2 13 9 13C16 13 16 17 16 17ZM12.5 7.50004C12.5 6.8078 12.2947 6.13111 11.9101 5.55554C11.5256 4.97997 10.9789 4.53137 10.3394 4.26646C9.69985 4.00155 8.99612 3.93224 8.31718 4.06729C7.63825 4.20234 7.01461 4.53568 6.52513 5.02516C6.03564 5.51465 5.7023 6.13829 5.56725 6.81722C5.4322 7.49615 5.50152 8.19989 5.76642 8.83943C6.03133 9.47897 6.47993 10.0256 7.0555 10.4102C7.63108 10.7948 8.30777 11 9 11C9.92826 11 10.8185 10.6313 11.4749 9.97491C12.1313 9.31853 12.5 8.42829 12.5 7.50004ZM15.94 13C16.5547 13.4758 17.0578 14.0805 17.4137 14.7715C17.7696 15.4626 17.9697 16.2233 18 17V19H22V17C22 17 22 13.37 15.94 13ZM15 4.00004C14.3118 3.99684 13.6388 4.20257 13.07 4.59004C13.6774 5.43877 14.0041 6.45632 14.0041 7.50004C14.0041 8.54375 13.6774 9.5613 13.07 10.41C13.6388 10.7975 14.3118 11.0032 15 11C15.9283 11 16.8185 10.6313 17.4749 9.97491C18.1313 9.31853 18.5 8.42829 18.5 7.50004C18.5 6.57178 18.1313 5.68154 17.4749 5.02516C16.8185 4.36879 15.9283 4.00004 15 4.00004Z\" fill=\"#525056\"/>\n</g></g>"},"plus":{"width":20,"height":20,"body":"<g fill=\"none\"><path d=\"M10.0003 4.16675V15.8334M4.16699 10.0001H15.8337\" stroke=\"white\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"polygon":{"width":66,"height":44,"body":"<defs><filter\n                id=\"filter0_dd_1285_9440\"\n                x=\"0\"\n                y=\"0\"\n                width=\"66\"\n                height=\"43.8516\"\n                filterUnits=\"userSpaceOnUse\"\n                color-interpolation-filters=\"sRGB\"\n        >\n            <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n            <feColorMatrix\n                    in=\"SourceAlpha\"\n                    type=\"matrix\"\n                    values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\"\n                    result=\"hardAlpha\"\n            />\n            <feMorphology\n                    radius=\"2\"\n                    operator=\"erode\"\n                    in=\"SourceAlpha\"\n                    result=\"effect1_dropShadow_1285_9440\"\n            />\n            <feOffset dy=\"4\" />\n            <feGaussianBlur stdDeviation=\"3\" />\n            <feComposite in2=\"hardAlpha\" operator=\"out\" />\n            <feColorMatrix\n                    type=\"matrix\"\n                    values=\"0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.03 0\"\n            />\n            <feBlend\n                    mode=\"normal\"\n                    in2=\"BackgroundImageFix\"\n                    result=\"effect1_dropShadow_1285_9440\"\n            />\n            <feColorMatrix\n                    in=\"SourceAlpha\"\n                    type=\"matrix\"\n                    values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\"\n                    result=\"hardAlpha\"\n            />\n            <feMorphology\n                    radius=\"4\"\n                    operator=\"erode\"\n                    in=\"SourceAlpha\"\n                    result=\"effect2_dropShadow_1285_9440\"\n            />\n            <feOffset dy=\"12\" />\n            <feGaussianBlur stdDeviation=\"8\" />\n            <feComposite in2=\"hardAlpha\" operator=\"out\" />\n            <feColorMatrix\n                    type=\"matrix\"\n                    values=\"0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.08 0\"\n            />\n            <feBlend\n                    mode=\"normal\"\n                    in2=\"effect1_dropShadow_1285_9440\"\n                    result=\"effect2_dropShadow_1285_9440\"\n            />\n            <feBlend\n                    mode=\"normal\"\n                    in=\"SourceGraphic\"\n                    in2=\"effect2_dropShadow_1285_9440\"\n                    result=\"shape\"\n            />\n        </filter></defs><g fill=\"none\"><g filter=\"url(#filter0_dd_1285_9440)\">\n        <path\n                d=\"M39.0206 17.1193C35.8333 20.7619 30.1667 20.7619 26.9794 17.1193L12 1.4294e-07L54 3.8147e-06L39.0206 17.1193Z\"\n                fill=\"white\"\n        />\n    </g></g>"},"roles":{"width":24,"height":24,"body":"<path fill=\"currentColor\" d=\"M10 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m7 8a.26.26 0 0 0-.26.21l-.19 1.32c-.3.13-.59.29-.85.47l-1.24-.5c-.11 0-.24 0-.31.13l-1 1.73c-.06.11-.04.24.06.32l1.06.82a4.2 4.2 0 0 0 0 1l-1.06.82a.26.26 0 0 0-.06.32l1 1.73c.06.13.19.13.31.13l1.24-.5c.26.18.54.35.85.47l.19 1.32c.02.12.12.21.26.21h2c.11 0 .22-.09.24-.21l.19-1.32c.3-.13.57-.29.84-.47l1.23.5c.13 0 .26 0 .33-.13l1-1.73a.26.26 0 0 0-.06-.32l-1.07-.82c.02-.17.04-.33.04-.5s-.01-.33-.04-.5l1.06-.82a.26.26 0 0 0 .06-.32l-1-1.73c-.06-.13-.19-.13-.32-.13l-1.23.5c-.27-.18-.54-.35-.85-.47l-.19-1.32A.236.236 0 0 0 19 12zm-7 2c-4.42 0-8 1.79-8 4v2h9.68a7 7 0 0 1-.68-3a7 7 0 0 1 .64-2.91c-.53-.06-1.08-.09-1.64-.09m8 1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5c-.84 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5\" />"},"settings-01":{"width":24,"height":24,"body":"<g fill=\"none\"><g id=\"settings-01\">\n<g id=\"Icon\">\n<path d=\"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z\" stroke=\"#667085\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M18.7273 14.7273C18.6063 15.0015 18.5702 15.3056 18.6236 15.6005C18.6771 15.8954 18.8177 16.1676 19.0273 16.3818L19.0818 16.4364C19.2509 16.6052 19.385 16.8057 19.4765 17.0265C19.568 17.2472 19.6151 17.4838 19.6151 17.7227C19.6151 17.9617 19.568 18.1983 19.4765 18.419C19.385 18.6397 19.2509 18.8402 19.0818 19.0091C18.913 19.1781 18.7124 19.3122 18.4917 19.4037C18.271 19.4952 18.0344 19.5423 17.7955 19.5423C17.5565 19.5423 17.3199 19.4952 17.0992 19.4037C16.8785 19.3122 16.678 19.1781 16.5091 19.0091L16.4545 18.9545C16.2403 18.745 15.9682 18.6044 15.6733 18.5509C15.3784 18.4974 15.0742 18.5335 14.8 18.6545C14.5311 18.7698 14.3018 18.9611 14.1403 19.205C13.9788 19.4489 13.8921 19.7347 13.8909 20.0273V20.1818C13.8909 20.664 13.6994 21.1265 13.3584 21.4675C13.0174 21.8084 12.5549 22 12.0727 22C11.5905 22 11.1281 21.8084 10.7871 21.4675C10.4461 21.1265 10.2545 20.664 10.2545 20.1818V20.1C10.2475 19.7991 10.1501 19.5073 9.97501 19.2625C9.79991 19.0176 9.55521 18.8312 9.27273 18.7273C8.99853 18.6063 8.69437 18.5702 8.39947 18.6236C8.10456 18.6771 7.83244 18.8177 7.61818 19.0273L7.56364 19.0818C7.39478 19.2509 7.19425 19.385 6.97353 19.4765C6.7528 19.568 6.51621 19.6151 6.27727 19.6151C6.03834 19.6151 5.80174 19.568 5.58102 19.4765C5.36029 19.385 5.15977 19.2509 4.99091 19.0818C4.82186 18.913 4.68775 18.7124 4.59626 18.4917C4.50476 18.271 4.45766 18.0344 4.45766 17.7955C4.45766 17.5565 4.50476 17.3199 4.59626 17.0992C4.68775 16.8785 4.82186 16.678 4.99091 16.5091L5.04545 16.4545C5.25503 16.2403 5.39562 15.9682 5.4491 15.6733C5.50257 15.3784 5.46647 15.0742 5.34545 14.8C5.23022 14.5311 5.03887 14.3018 4.79497 14.1403C4.55107 13.9788 4.26526 13.8921 3.97273 13.8909H3.81818C3.33597 13.8909 2.87351 13.6994 2.53253 13.3584C2.19156 13.0174 2 12.5549 2 12.0727C2 11.5905 2.19156 11.1281 2.53253 10.7871C2.87351 10.4461 3.33597 10.2545 3.81818 10.2545H3.9C4.2009 10.2475 4.49273 10.1501 4.73754 9.97501C4.98236 9.79991 5.16883 9.55521 5.27273 9.27273C5.39374 8.99853 5.42984 8.69437 5.37637 8.39947C5.3229 8.10456 5.18231 7.83244 4.97273 7.61818L4.91818 7.56364C4.74913 7.39478 4.61503 7.19425 4.52353 6.97353C4.43203 6.7528 4.38493 6.51621 4.38493 6.27727C4.38493 6.03834 4.43203 5.80174 4.52353 5.58102C4.61503 5.36029 4.74913 5.15977 4.91818 4.99091C5.08704 4.82186 5.28757 4.68775 5.50829 4.59626C5.72901 4.50476 5.96561 4.45766 6.20455 4.45766C6.44348 4.45766 6.68008 4.50476 6.9008 4.59626C7.12152 4.68775 7.32205 4.82186 7.49091 4.99091L7.54545 5.04545C7.75971 5.25503 8.03183 5.39562 8.32674 5.4491C8.62164 5.50257 8.9258 5.46647 9.2 5.34545H9.27273C9.54161 5.23022 9.77093 5.03887 9.93245 4.79497C10.094 4.55107 10.1807 4.26526 10.1818 3.97273V3.81818C10.1818 3.33597 10.3734 2.87351 10.7144 2.53253C11.0553 2.19156 11.5178 2 12 2C12.4822 2 12.9447 2.19156 13.2856 2.53253C13.6266 2.87351 13.8182 3.33597 13.8182 3.81818V3.9C13.8193 4.19253 13.906 4.47834 14.0676 4.72224C14.2291 4.96614 14.4584 5.15749 14.7273 5.27273C15.0015 5.39374 15.3056 5.42984 15.6005 5.37637C15.8954 5.3229 16.1676 5.18231 16.3818 4.97273L16.4364 4.91818C16.6052 4.74913 16.8057 4.61503 17.0265 4.52353C17.2472 4.43203 17.4838 4.38493 17.7227 4.38493C17.9617 4.38493 18.1983 4.43203 18.419 4.52353C18.6397 4.61503 18.8402 4.74913 19.0091 4.91818C19.1781 5.08704 19.3122 5.28757 19.4037 5.50829C19.4952 5.72901 19.5423 5.96561 19.5423 6.20455C19.5423 6.44348 19.4952 6.68008 19.4037 6.9008C19.3122 7.12152 19.1781 7.32205 19.0091 7.49091L18.9545 7.54545C18.745 7.75971 18.6044 8.03183 18.5509 8.32674C18.4974 8.62164 18.5335 8.9258 18.6545 9.2V9.27273C18.7698 9.54161 18.9611 9.77093 19.205 9.93245C19.4489 10.094 19.7347 10.1807 20.0273 10.1818H20.1818C20.664 10.1818 21.1265 10.3734 21.4675 10.7144C21.8084 11.0553 22 11.5178 22 12C22 12.4822 21.8084 12.9447 21.4675 13.2856C21.1265 13.6266 20.664 13.8182 20.1818 13.8182H20.1C19.8075 13.8193 19.5217 13.906 19.2778 14.0676C19.0339 14.2291 18.8425 14.4584 18.7273 14.7273Z\" stroke=\"#667085\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g>\n</g></g>"},"shirt-sharp":{"width":24,"height":24,"body":"<g fill=\"none\"><g id=\"ion:shirt-sharp\">\n<path id=\"Vector\" d=\"M12 1.96875C10.4119 1.96875 9 1.5 9 1.5V1.59375C9 2.3894 9.31607 3.15246 9.87868 3.71507C10.4413 4.27768 11.2044 4.59375 12 4.59375C12.7956 4.59375 13.5587 4.27768 14.1213 3.71507C14.6839 3.15246 15 2.3894 15 1.59375V1.5C15 1.5 13.5881 1.96875 12 1.96875Z\" fill=\"#525056\"/>\n<path id=\"Vector_2\" d=\"M16.5 2.0625C16.2427 4.30125 14.3067 6.04688 12 6.04688C9.69328 6.04688 7.75734 4.30125 7.5 2.0625L0.75 4.40625L1.59375 9.75L4.48641 10.0978C4.81828 10.14 4.81922 10.14 4.81922 10.4817L4.5 22.5H19.5L19.1808 10.4817C19.1709 10.1536 19.1709 10.1536 19.5136 10.0978L22.4062 9.75L23.25 4.40625L16.5 2.0625Z\" fill=\"#525056\"/>\n</g></g>"},"success-alert":{"width":38,"height":38,"body":"<defs><clipPath id=\"clip0_1397_10370\">\n<rect width=\"20\" height=\"20\" fill=\"white\" transform=\"translate(9 9)\"/>\n</clipPath></defs><g fill=\"none\"><g opacity=\"0.3\">\n<rect x=\"6\" y=\"6\" width=\"26\" height=\"26\" rx=\"13\" stroke=\"#079455\" stroke-width=\"2\"/>\n</g>\n<g opacity=\"0.1\">\n<rect x=\"1\" y=\"1\" width=\"36\" height=\"36\" rx=\"18\" stroke=\"#079455\" stroke-width=\"2\"/>\n</g>\n<g clip-path=\"url(#clip0_1397_10370)\">\n<path d=\"M15.25 19L17.75 21.5L22.75 16.5M27.3333 19C27.3333 23.6024 23.6024 27.3334 19 27.3334C14.3976 27.3334 10.6667 23.6024 10.6667 19C10.6667 14.3976 14.3976 10.6667 19 10.6667C23.6024 10.6667 27.3333 14.3976 27.3333 19Z\" stroke=\"#079455\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g></g>"},"success-close-alert":{"width":36,"height":36,"body":"<g fill=\"none\"><path d=\"M23 13L13 23M13 13L23 23\" stroke=\"#4CA30D\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"trash-error":{"width":36,"height":36,"body":"<g fill=\"none\"><path d=\"M21.3333 13V12.3333C21.3333 11.3999 21.3333 10.9332 21.1517 10.5766C20.9919 10.263 20.7369 10.0081 20.4233 9.84828C20.0668 9.66663 19.6001 9.66663 18.6667 9.66663H17.3333C16.3999 9.66663 15.9332 9.66663 15.5767 9.84828C15.2631 10.0081 15.0081 10.263 14.8483 10.5766C14.6667 10.9332 14.6667 11.3999 14.6667 12.3333V13M16.3333 17.5833V21.75M19.6667 17.5833V21.75M10.5 13H25.5M23.8333 13V22.3333C23.8333 23.7334 23.8333 24.4335 23.5608 24.9683C23.3212 25.4387 22.9387 25.8211 22.4683 26.0608C21.9335 26.3333 21.2335 26.3333 19.8333 26.3333H16.1667C14.7665 26.3333 14.0665 26.3333 13.5317 26.0608C13.0613 25.8211 12.6788 25.4387 12.4392 24.9683C12.1667 24.4335 12.1667 23.7334 12.1667 22.3333V13\" stroke=\"#B42318\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"trash":{"width":20,"height":20,"body":"<g fill=\"none\"><path d=\"M13.3333 4.99996V4.33329C13.3333 3.39987 13.3333 2.93316 13.1517 2.57664C12.9919 2.26304 12.7369 2.00807 12.4233 1.84828C12.0668 1.66663 11.6001 1.66663 10.6667 1.66663H9.33333C8.39991 1.66663 7.9332 1.66663 7.57668 1.84828C7.26308 2.00807 7.00811 2.26304 6.84832 2.57664C6.66667 2.93316 6.66667 3.39987 6.66667 4.33329V4.99996M8.33333 9.58329V13.75M11.6667 9.58329V13.75M2.5 4.99996H17.5M15.8333 4.99996V14.3333C15.8333 15.7334 15.8333 16.4335 15.5608 16.9683C15.3212 17.4387 14.9387 17.8211 14.4683 18.0608C13.9335 18.3333 13.2335 18.3333 11.8333 18.3333H8.16667C6.76654 18.3333 6.06647 18.3333 5.53169 18.0608C5.06129 17.8211 4.67883 17.4387 4.43915 16.9683C4.16667 16.4335 4.16667 15.7334 4.16667 14.3333V4.99996\" stroke=\"#475467\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"trophy-01":{"width":28,"height":29,"body":"<g fill=\"none\"><path d=\"M13.9999 17.9999C10.1339 17.9999 6.99992 14.8659 6.99992 10.9999V4.51844C6.99992 4.03562 6.99992 3.7942 7.07028 3.6009C7.18823 3.27683 7.4435 3.02156 7.76756 2.90361C7.96087 2.83325 8.20228 2.83325 8.6851 2.83325H19.3147C19.7976 2.83325 20.039 2.83325 20.2323 2.90361C20.5563 3.02156 20.8116 3.27683 20.9296 3.6009C20.9999 3.7942 20.9999 4.03562 20.9999 4.51844V10.9999C20.9999 14.8659 17.8659 17.9999 13.9999 17.9999ZM13.9999 17.9999V21.4999M20.9999 5.16659H23.9166C24.4602 5.16659 24.732 5.16659 24.9464 5.25539C25.2322 5.3738 25.4594 5.60092 25.5778 5.88679C25.6666 6.10119 25.6666 6.37299 25.6666 6.91659V7.49992C25.6666 8.58489 25.6666 9.12737 25.5473 9.57245C25.2237 10.7803 24.2803 11.7237 23.0725 12.0473C22.6274 12.1666 22.0849 12.1666 20.9999 12.1666M6.99992 5.16659H4.08325C3.53965 5.16659 3.26785 5.16659 3.05345 5.25539C2.76759 5.3738 2.54047 5.60092 2.42206 5.88679C2.33325 6.10119 2.33325 6.37299 2.33325 6.91659V7.49992C2.33325 8.58489 2.33325 9.12737 2.45251 9.57245C2.77615 10.7803 3.71956 11.7237 4.92739 12.0473C5.37247 12.1666 5.91495 12.1666 6.99992 12.1666M8.6851 26.1666H19.3147C19.6011 26.1666 19.8333 25.9344 19.8333 25.6481C19.8333 23.3571 17.9761 21.4999 15.6851 21.4999H12.3147C10.0238 21.4999 8.16659 23.3571 8.16659 25.6481C8.16659 25.9344 8.39873 26.1666 8.6851 26.1666Z\" stroke=\"#344054\" stroke-width=\"2.33333\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"trophy":{"width":24,"height":24,"body":"<g fill=\"none\"><path d=\"M7 21V19H11V15.9C10.1833 15.7167 9.45433 15.371 8.813 14.863C8.17167 14.355 7.70067 13.7173 7.4 12.95C6.15 12.8 5.10433 12.2543 4.263 11.313C3.42167 10.3717 3.00067 9.26733 3 8V7C3 6.45 3.196 5.97933 3.588 5.588C3.98 5.19667 4.45067 5.00067 5 5H7V3H17V5H19C19.55 5 20.021 5.196 20.413 5.588C20.805 5.98 21.0007 6.45067 21 7V8C21 9.26667 20.579 10.371 19.737 11.313C18.895 12.255 17.8493 12.8007 16.6 12.95C16.3 13.7167 15.8293 14.3543 15.188 14.863C14.5467 15.3717 13.8173 15.7173 13 15.9V19H17V21H7ZM7 10.8V7H5V8C5 8.63333 5.18333 9.20433 5.55 9.713C5.91667 10.2217 6.4 10.584 7 10.8ZM17 10.8C17.6 10.5833 18.0833 10.2207 18.45 9.712C18.8167 9.20333 19 8.63267 19 8V7H17V10.8Z\" fill=\"#525056\"/></g>"},"upload":{"width":20,"height":20,"body":"<g fill=\"none\"><path d=\"M6.66602 13.3333L9.99935 10M9.99935 10L13.3327 13.3333M9.99935 10V17.5M16.666 13.9524C17.6839 13.1117 18.3327 11.8399 18.3327 10.4167C18.3327 7.88536 16.2807 5.83333 13.7493 5.83333C13.5673 5.83333 13.3969 5.73833 13.3044 5.58145C12.2177 3.73736 10.2114 2.5 7.91602 2.5C4.46424 2.5 1.66602 5.29822 1.66602 8.75C1.66602 10.4718 2.36222 12.0309 3.48847 13.1613\"\n          stroke=\"#475467\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"warning-alert":{"width":38,"height":38,"body":"<defs><clipPath id=\"clip0_1397_10328\">\n<rect width=\"20\" height=\"20\" fill=\"white\" transform=\"translate(9 9)\"/>\n</clipPath></defs><g fill=\"none\"><g opacity=\"0.3\">\n<rect x=\"6\" y=\"6\" width=\"26\" height=\"26\" rx=\"13\" stroke=\"#DC6803\" stroke-width=\"2\"/>\n</g>\n<g opacity=\"0.1\">\n<rect x=\"1\" y=\"1\" width=\"36\" height=\"36\" rx=\"18\" stroke=\"#DC6803\" stroke-width=\"2\"/>\n</g>\n<g clip-path=\"url(#clip0_1397_10328)\">\n<path d=\"M19 15.6667V19M19 22.3334H19.0083M27.3333 19C27.3333 23.6024 23.6024 27.3334 19 27.3334C14.3976 27.3334 10.6667 23.6024 10.6667 19C10.6667 14.3976 14.3976 10.6667 19 10.6667C23.6024 10.6667 27.3333 14.3976 27.3333 19Z\" stroke=\"#DC6803\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g></g>"},"warning-close-alert":{"width":36,"height":36,"body":"<g fill=\"none\"><path d=\"M23 13L13 23M13 13L23 23\" stroke=\"#DC6803\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"x-close":{"width":20,"height":20,"body":"<g fill=\"none\"><path d=\"M15 5L5 15M5 5L15 15\" stroke=\"#344054\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g>"},"x-dialog":{"width":24,"height":24,"body":"<g fill=\"none\"><g id=\"x-close\">\n<path id=\"Icon\" d=\"M18 6L6 18M6 6L18 18\" stroke=\"#98A2B3\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g></g>"}}}),
};

const DEFAULT_ENDPOINT = "https://api.iconify.design";
const _rZwA5t = defineCachedEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (!url)
    return createError$1({ status: 400, message: "Invalid icon request" });
  const options = useAppConfig().icon;
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint || DEFAULT_ENDPOINT;
  const icons = url.searchParams.get("icons")?.split(",");
  if (collection) {
    if (icons?.length) {
      const data = getIcons(
        collection,
        icons
      );
      consola.debug(`[Icon] serving ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
      return data;
    }
  }
  if (options.fallbackToApi === true || options.fallbackToApi === "server-only") {
    const apiUrl = new URL("./" + basename(url.pathname) + url.search, apiEndPoint);
    consola.debug(`[Icon] fetching ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError$1({ status: 400, message: "Invalid icon request" });
    }
    try {
      const data = await $fetch(apiUrl.href);
      return data;
    } catch (e) {
      consola.error(e);
      if (e.status === 404)
        return createError$1({ status: 404 });
      else
        return createError$1({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError$1({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(getQuery(event).icons || "");
    return `${collection}_${icons.split(",")[0]}_${icons.length}_${hash(icons)}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

const _lazy_8Em2na = () => import('../routes/renderer.mjs');

const handlers = [
  { route: '', handler: _zjg3CC, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_8Em2na, lazy: true, middleware: false, method: undefined },
  { route: '/api/_nuxt_icon/:collection', handler: _rZwA5t, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_8Em2na, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { $fetch$1 as $, createRouter$1 as A, createConsola as B, getRequestHeaders as C, splitCookiesString as D, appendResponseHeader as E, FetchError as F, nodeServer as G, getRouteRules as a, buildAssetsURL as b, createError$1 as c, defineRenderHandler as d, getResponseStatus as e, getResponseStatusText as f, getQuery as g, useNitroApp as h, baseURL as i, parse as j, klona as k, getRequestHeader as l, getRequestURL as m, defu as n, destr as o, publicAssetsURL as p, isEqual as q, setCookie as r, sanitizeStatusCode as s, getCookie as t, useRuntimeConfig as u, deleteCookie as v, getContext as w, createHooks as x, defuFn as y, toRouteMatcher as z };
//# sourceMappingURL=nitro.mjs.map
