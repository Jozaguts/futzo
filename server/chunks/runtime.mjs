import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { promises, existsSync } from 'fs';
import { dirname as dirname$1, resolve as resolve$1, join } from 'path';
import { promises as promises$1 } from 'node:fs';
import { fileURLToPath } from 'node:url';

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
function encode$1(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode$1(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
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
  const [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  const { pathname, search, hash } = parsePath(
    path.replace(/\/(?=[A-Za-z]:)/, "")
  );
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

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
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
function serialize(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encode;
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
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
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

class WordArray {
  constructor(words, sigBytes) {
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
    this._data = new WordArray();
    this._nDataBytes = 0;
    this._minBufferSize = 0;
    this.blockSize = 512 / 32;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    this._hash = new WordArray([...H]);
  }
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
      cookiesStrings.push(cookiesString.slice(start, cookiesString.length));
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
  const fetchHeaders = mergeHeaders(
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
function mergeHeaders(defaults, ...inputs) {
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
      const { pathname } = parseURL(info.url || "/");
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
function mergeFetchOptions(input, defaults, Headers = globalThis.Headers) {
  const merged = {
    ...defaults,
    ...input
  };
  if (defaults?.params && input?.params) {
    merged.params = {
      ...defaults?.params,
      ...input?.params
    };
  }
  if (defaults?.query && input?.query) {
    merged.query = {
      ...defaults?.query,
      ...input?.query
    };
  }
  if (defaults?.headers && input?.headers) {
    merged.headers = new Headers(defaults?.headers || {});
    for (const [key, value] of new Headers(input?.headers || {})) {
      merged.headers.set(key, value);
    }
  }
  return merged;
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
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
        const retryDelay = context.options.retryDelay || 0;
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
      options: mergeFetchOptions(_options, globalOptions.defaults, Headers),
      response: void 0,
      error: void 0
    };
    context.options.method = context.options.method?.toUpperCase();
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
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
      abortTimeout = setTimeout(
        () => controller.abort(),
        context.options.timeout
      );
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
        await context.options.onRequestError(context);
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = context.response.body && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
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
          context.response._data = context.response.body;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
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
  $fetch.create = (defaultOptions = {}) => createFetch$1({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
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
const fetch = globalThis.fetch || createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch$1({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

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
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner ) : "";
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

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "fa51b0db-3c71-4455-8da4-e4529a507610",
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
      }
    },
    "sanctum": {
      "mode": "cookie",
      "userStateKey": "sanctum.user.identity",
      "redirectIfAuthenticated": false,
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
        "retry": false
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
        "allow404WithoutAuth": false
      },
      "logLevel": 3,
      "baseUrl": "https://app.futzo.io"
    }
  },
  "googleMapsSecret": "AIzaSyCEQ_vXTkXUIxE-exwES14KvkoGaAHOGFQ"
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
_deepFreeze(klona(appConfig));
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
  if (typeof Buffer === void 0) {
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
    options: {},
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
      return Array.from(data.keys());
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
        const keys = rawKeys.map((key) => mount.mountpoint + normalizeKey$1(key)).filter((key) => !maskedMounts.some((p) => key.startsWith(p)));
        allKeys.push(...keys);
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter((key) => key.startsWith(base) && !key.endsWith("$")) : allKeys.filter((key) => !key.endsWith("$"));
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
    }
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

const assets$1 = {
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

const PATH_TRAVERSE_RE = /\.\.\:|\.\.$/;
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

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"/home/jozaguts/Projects/personal/futzo_container/futzo/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
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
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
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
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
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
        variableHeaders[header] = incomingEvent.node.req.headers[header];
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
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
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
    const response = await _cachedHandler(event);
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
        event.node.res.setHeader(name, value);
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
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
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

function defineNitroPlugin(def) {
  return def;
}

const _jNdgnWuqqe = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    const url = event.node.req.originalUrl.split("?")[0];
    if (url === "/verify-email")
      return;
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
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
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
    const { template } = await import('./_/error-500.mjs');
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

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-uwtwNOJtVZfOZ2fqRH3FJC3HrRQ\"",
    "mtime": "2024-07-21T03:18:16.558Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/logo.png": {
    "type": "image/png",
    "etag": "\"72a0-TfR6WTbqrAh0OCztOxStIoVkt6c\"",
    "mtime": "2024-07-21T03:18:16.558Z",
    "size": 29344,
    "path": "../public/logo.png"
  },
  "/css/nuxt-google-fonts.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"87e-Aq3OyGFR52e0cvS7FZZmwFl78/g\"",
    "mtime": "2024-07-21T03:18:16.358Z",
    "size": 2174,
    "path": "../public/css/nuxt-google-fonts.css"
  },
  "/fonts/Inter-200_900-1.woff2": {
    "type": "font/woff2",
    "etag": "\"6a94-p7ZBseVEPLFzwr2bLKPEBds+s3Y\"",
    "mtime": "2024-07-21T03:18:16.358Z",
    "size": 27284,
    "path": "../public/fonts/Inter-200_900-1.woff2"
  },
  "/fonts/Inter-200_900-2.woff2": {
    "type": "font/woff2",
    "etag": "\"44c0-Jt/1moqAs9SnNh30zblI3A4YOnk\"",
    "mtime": "2024-07-21T03:18:16.358Z",
    "size": 17600,
    "path": "../public/fonts/Inter-200_900-2.woff2"
  },
  "/fonts/Inter-200_900-3.woff2": {
    "type": "font/woff2",
    "etag": "\"31bc-SyzyE2bnRK/a6w+Slw669+p1mHg\"",
    "mtime": "2024-07-21T03:18:16.358Z",
    "size": 12732,
    "path": "../public/fonts/Inter-200_900-3.woff2"
  },
  "/fonts/Inter-200_900-4.woff2": {
    "type": "font/woff2",
    "etag": "\"57d0-YJqZ3TJ+G4oaD17iIJ9w4JzoLMg\"",
    "mtime": "2024-07-21T03:18:16.358Z",
    "size": 22480,
    "path": "../public/fonts/Inter-200_900-4.woff2"
  },
  "/fonts/Inter-200_900-5.woff2": {
    "type": "font/woff2",
    "etag": "\"292c-Y8sHnyFc8scLABqcKYLA+rVGWkA\"",
    "mtime": "2024-07-21T03:18:16.358Z",
    "size": 10540,
    "path": "../public/fonts/Inter-200_900-5.woff2"
  },
  "/fonts/Inter-200_900-6.woff2": {
    "type": "font/woff2",
    "etag": "\"13844-NO6dhCwNDkYyWuYI/NdZKeeycmk\"",
    "mtime": "2024-07-21T03:18:16.358Z",
    "size": 79940,
    "path": "../public/fonts/Inter-200_900-6.woff2"
  },
  "/fonts/Inter-200_900-7.woff2": {
    "type": "font/woff2",
    "etag": "\"b670-OTMRveJrmaStk1+lW60dznmUOIs\"",
    "mtime": "2024-07-21T03:18:16.358Z",
    "size": 46704,
    "path": "../public/fonts/Inter-200_900-7.woff2"
  },
  "/_nuxt/2cZnrudS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"364-iRLRnhLuQkD6Y+0yaU4U+gDnACs\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 868,
    "path": "../public/_nuxt/2cZnrudS.js"
  },
  "/_nuxt/B50XRNPy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7f4-MNUvuL87WUhOMWLMx+ziG/1xWmU\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 2036,
    "path": "../public/_nuxt/B50XRNPy.js"
  },
  "/_nuxt/B7oFthJ_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"173-sU4irGn0S8a4Lxz8Vo0dlnI2Nts\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 371,
    "path": "../public/_nuxt/B7oFthJ_.js"
  },
  "/_nuxt/BFbbGAGV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"32815-IWZ1XbgHJQCWmBvAseq9ses3bik\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 206869,
    "path": "../public/_nuxt/BFbbGAGV.js"
  },
  "/_nuxt/BLMemMCp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b90-0RXUraMNgZwEv2UHuY33Bop1HcU\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 2960,
    "path": "../public/_nuxt/BLMemMCp.js"
  },
  "/_nuxt/BMKyWvLg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1db2-WC84dDmP5zNkfLQsCuIrx+q7Zeg\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 7602,
    "path": "../public/_nuxt/BMKyWvLg.js"
  },
  "/_nuxt/BNPViHNj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f14-rnApTS5I1ii2BmJsPwzk5QUUZvE\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 3860,
    "path": "../public/_nuxt/BNPViHNj.js"
  },
  "/_nuxt/BOoSnw35.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1fe9-C/M/ZP35v2uX/fHx5HcNmzGZAoQ\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 8169,
    "path": "../public/_nuxt/BOoSnw35.js"
  },
  "/_nuxt/BUBjv_sT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"396-aIPUp+YVGGAIA25JnKWF9hwm8Cs\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 918,
    "path": "../public/_nuxt/BUBjv_sT.js"
  },
  "/_nuxt/BW4XWOVI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4e-kuTHCus9FJe0iLMcXuKWPSVDn1k\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 78,
    "path": "../public/_nuxt/BW4XWOVI.js"
  },
  "/_nuxt/BcZMTwVl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"602-Jc5/iaB4KkQHfUBJaMOct5Rt15g\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 1538,
    "path": "../public/_nuxt/BcZMTwVl.js"
  },
  "/_nuxt/Bo9IJ0jO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24f-OkiIqE5Pzr4ExXILzTjpjjZAjOo\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 591,
    "path": "../public/_nuxt/Bo9IJ0jO.js"
  },
  "/_nuxt/BqQUTXwP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ff-bmGIfD8+B33crYuOICyK70q7Mmc\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 511,
    "path": "../public/_nuxt/BqQUTXwP.js"
  },
  "/_nuxt/BriucJv9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2d7-UoTrS7qAy0aD85/F7uVj1j68AeE\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 727,
    "path": "../public/_nuxt/BriucJv9.js"
  },
  "/_nuxt/BtU-zrrT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5c5-Ky4znab74RF63uL19aArL0tvD74\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 1477,
    "path": "../public/_nuxt/BtU-zrrT.js"
  },
  "/_nuxt/BuNlPwoA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14e6-Eczezw/FPgRU8TpKtIM+thrSVZs\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 5350,
    "path": "../public/_nuxt/BuNlPwoA.js"
  },
  "/_nuxt/BvYRuVIg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"78e-47D9mFxdxXHbyjNJ6EF43jOiskM\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 1934,
    "path": "../public/_nuxt/BvYRuVIg.js"
  },
  "/_nuxt/Bx8xKRPt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13ad-GA0x0st6dXwezOOHJmIE9PPu5fc\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 5037,
    "path": "../public/_nuxt/Bx8xKRPt.js"
  },
  "/_nuxt/BxjyJ8_s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5f0-Mx7SsyzHXt7Qa4sL0XkPvKnb/VU\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 1520,
    "path": "../public/_nuxt/BxjyJ8_s.js"
  },
  "/_nuxt/ByEutKP2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13e-fGf6uPQO5f1CcO1tY7o+h1/ckX0\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 318,
    "path": "../public/_nuxt/ByEutKP2.js"
  },
  "/_nuxt/C2GUlUw4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"45c-YgY1uFz+cZruf8cPlGhQctZ/r2k\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 1116,
    "path": "../public/_nuxt/C2GUlUw4.js"
  },
  "/_nuxt/C5De4dxJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c0195-QxwUR8lvXOzkG9Jg/rD4bE3/TFY\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 786837,
    "path": "../public/_nuxt/C5De4dxJ.js"
  },
  "/_nuxt/C5gnZ_9J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7ed-em4J7ZKGnKhFqB1HjX93tExgZ1I\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 2029,
    "path": "../public/_nuxt/C5gnZ_9J.js"
  },
  "/_nuxt/C7256n7k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7b-Agfqv/qFFk7NCFKtyyYvIyH+4vU\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 123,
    "path": "../public/_nuxt/C7256n7k.js"
  },
  "/_nuxt/C7frkDtQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b1b-UjMnxMVWudpPfcUY4Dqa0wGrKWM\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 2843,
    "path": "../public/_nuxt/C7frkDtQ.js"
  },
  "/_nuxt/CHbwVsOX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"39f-WWSlstPJvdsXJo+1dR9VDsKMC6c\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 927,
    "path": "../public/_nuxt/CHbwVsOX.js"
  },
  "/_nuxt/CMSRP9a6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d8e-s0yCcBwXjM8etZ1LrD4vGlyZQjQ\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 3470,
    "path": "../public/_nuxt/CMSRP9a6.js"
  },
  "/_nuxt/CNZdhTjH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"388-mHprXSPRr/epvr8mRLjD4ZyYQ3k\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 904,
    "path": "../public/_nuxt/CNZdhTjH.js"
  },
  "/_nuxt/CSl6zbOD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b8-aMqVhKwtJ/3zJ53kv2aKPHQbWj8\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 952,
    "path": "../public/_nuxt/CSl6zbOD.js"
  },
  "/_nuxt/CU_XsKd2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1be-n0EsPJvi2l992KFKoP0TK9IfjTo\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 446,
    "path": "../public/_nuxt/CU_XsKd2.js"
  },
  "/_nuxt/CVUYNXwP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33c-Ofw98r+oNcT5Kq7bPpPPzG1LqEw\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 828,
    "path": "../public/_nuxt/CVUYNXwP.js"
  },
  "/_nuxt/CVoFRpJl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"34c-LR6Tdu6f+nQmR0G70VGbYduBDVg\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 844,
    "path": "../public/_nuxt/CVoFRpJl.js"
  },
  "/_nuxt/CWdj5CKq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11a-uosY+G58z/Zt1CAStu/K1f4+BnA\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 282,
    "path": "../public/_nuxt/CWdj5CKq.js"
  },
  "/_nuxt/ChCiNfGl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"78c-x/S60jzZVgCQRRZ1rHjsKsn3M7I\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 1932,
    "path": "../public/_nuxt/ChCiNfGl.js"
  },
  "/_nuxt/CjJH4AmS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b0b-kaDSNcfX0HOZMqXH+03bv4h6srg\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 2827,
    "path": "../public/_nuxt/CjJH4AmS.js"
  },
  "/_nuxt/Cja49wK1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2f9-y465mEEkLQ6CT0IMk+4ZT7ofBSM\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 761,
    "path": "../public/_nuxt/Cja49wK1.js"
  },
  "/_nuxt/CnP74jH2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"102c6-JNof5L+ZaBE5OGzR4SyfbPQ0wd0\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 66246,
    "path": "../public/_nuxt/CnP74jH2.js"
  },
  "/_nuxt/D0g6J0la.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d4-biHDjpJ0+Sid/UD5mm6k0UwXIKQ\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 468,
    "path": "../public/_nuxt/D0g6J0la.js"
  },
  "/_nuxt/D2BHweOH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6feb-tRl+YZ/JN+zUSIGPAbpo/zEhvz8\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 28651,
    "path": "../public/_nuxt/D2BHweOH.js"
  },
  "/_nuxt/D8ZG7js4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"28a7-V3YOOqFa/MN+t91DsmS7A/z4tAM\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 10407,
    "path": "../public/_nuxt/D8ZG7js4.js"
  },
  "/_nuxt/DDoIZKHa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b1-T3h/VbDRc5U6z846A8WHHTa9mek\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 177,
    "path": "../public/_nuxt/DDoIZKHa.js"
  },
  "/_nuxt/DFxmI0gE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"121-oqb1TDbC05E+pE52lLyKH3a5G0Q\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 289,
    "path": "../public/_nuxt/DFxmI0gE.js"
  },
  "/_nuxt/DKumWslk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"81-y+r6VUtXWVoV7U08kjfjKHTnM48\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 129,
    "path": "../public/_nuxt/DKumWslk.js"
  },
  "/_nuxt/DP0tEOZb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1424-OLNPftOaYKsMgov9GWM2ZHZqUrI\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 5156,
    "path": "../public/_nuxt/DP0tEOZb.js"
  },
  "/_nuxt/DRETVAKN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6ad-cd3usj8BrF8Fb2sn3P9gxresO4I\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 1709,
    "path": "../public/_nuxt/DRETVAKN.js"
  },
  "/_nuxt/DRjXxsyI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"144-5cupDsuKilwtTywlsFVF/AOVe0Y\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 324,
    "path": "../public/_nuxt/DRjXxsyI.js"
  },
  "/_nuxt/DW1CYMZ3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8c0-HeNtLXSGLUFGu0U8hfdSmWMecnM\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 2240,
    "path": "../public/_nuxt/DW1CYMZ3.js"
  },
  "/_nuxt/DcLEd24q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bf-YuwRslWMP4GAVqsqi9abo2Do2/E\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 447,
    "path": "../public/_nuxt/DcLEd24q.js"
  },
  "/_nuxt/Dd1xgWGn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"343-4pQG/Rp9uVWRFSL9X2W4O8z1hXE\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 835,
    "path": "../public/_nuxt/Dd1xgWGn.js"
  },
  "/_nuxt/Dialog.DBTm9KBm.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6360-b61sSAFTyi86BmZGLL4oIF//kIQ\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 25440,
    "path": "../public/_nuxt/Dialog.DBTm9KBm.css"
  },
  "/_nuxt/DjP7AsPm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c3b-U5lQZvyw8FgiasOOa494k+062zc\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 7227,
    "path": "../public/_nuxt/DjP7AsPm.js"
  },
  "/_nuxt/DkZPoX3i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ef-IHDURRz0L8crqOcTyaJYyDub2E0\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 239,
    "path": "../public/_nuxt/DkZPoX3i.js"
  },
  "/_nuxt/DklV9L3G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"325-TecAflokIL7/gTo5lLUTK1CEQu0\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 805,
    "path": "../public/_nuxt/DklV9L3G.js"
  },
  "/_nuxt/DmB6uoX5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"61b-lkHYAOMOOSh8JuIfluh7W46Pfwg\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 1563,
    "path": "../public/_nuxt/DmB6uoX5.js"
  },
  "/_nuxt/DnNZG4db.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a9-w1Va0XsAsfuYY+rDZhpVfOhGcoI\"",
    "mtime": "2024-07-21T03:18:16.470Z",
    "size": 1193,
    "path": "../public/_nuxt/DnNZG4db.js"
  },
  "/_nuxt/DpNImd1k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d7-bOTxbKy9+CkiPfevw9PEXZrBL58\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 471,
    "path": "../public/_nuxt/DpNImd1k.js"
  },
  "/_nuxt/Dqfei-jO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"248c-/c9oMkuM1MGpubN1bQDZXbsIKi8\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 9356,
    "path": "../public/_nuxt/Dqfei-jO.js"
  },
  "/_nuxt/Druj0snS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11a-egIopz7jp8Rkls2j6DhqjWPMuDM\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 282,
    "path": "../public/_nuxt/Druj0snS.js"
  },
  "/_nuxt/Dt7s5FeC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a0fa-A0HmJ/4GoLc7O6kybIvCNQSore4\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 41210,
    "path": "../public/_nuxt/Dt7s5FeC.js"
  },
  "/_nuxt/DunzAcVZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15ec-SXNDTXtOoK2ueIieEM7KmWVRAo4\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 5612,
    "path": "../public/_nuxt/DunzAcVZ.js"
  },
  "/_nuxt/Dyt_fIAU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c4-atIDvKUHRNyDQCe9uXsrbzUWo1k\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 196,
    "path": "../public/_nuxt/Dyt_fIAU.js"
  },
  "/_nuxt/HfgTYLSr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1085-zjNS+LIuNPBCGqQZAy51cwIw+nE\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 4229,
    "path": "../public/_nuxt/HfgTYLSr.js"
  },
  "/_nuxt/Inter-200_900-1.DIEz8p5i.woff2": {
    "type": "font/woff2",
    "etag": "\"6a94-p7ZBseVEPLFzwr2bLKPEBds+s3Y\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 27284,
    "path": "../public/_nuxt/Inter-200_900-1.DIEz8p5i.woff2"
  },
  "/_nuxt/Inter-200_900-2.BmJJXa8e.woff2": {
    "type": "font/woff2",
    "etag": "\"44c0-Jt/1moqAs9SnNh30zblI3A4YOnk\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 17600,
    "path": "../public/_nuxt/Inter-200_900-2.BmJJXa8e.woff2"
  },
  "/_nuxt/Inter-200_900-3.D5AYLNiq.woff2": {
    "type": "font/woff2",
    "etag": "\"31bc-SyzyE2bnRK/a6w+Slw669+p1mHg\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 12732,
    "path": "../public/_nuxt/Inter-200_900-3.D5AYLNiq.woff2"
  },
  "/_nuxt/Inter-200_900-4.DyIDNIyN.woff2": {
    "type": "font/woff2",
    "etag": "\"57d0-YJqZ3TJ+G4oaD17iIJ9w4JzoLMg\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 22480,
    "path": "../public/_nuxt/Inter-200_900-4.DyIDNIyN.woff2"
  },
  "/_nuxt/Inter-200_900-5._GQuwPVU.woff2": {
    "type": "font/woff2",
    "etag": "\"292c-Y8sHnyFc8scLABqcKYLA+rVGWkA\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 10540,
    "path": "../public/_nuxt/Inter-200_900-5._GQuwPVU.woff2"
  },
  "/_nuxt/Inter-200_900-6.CN1pIXkb.woff2": {
    "type": "font/woff2",
    "etag": "\"13844-NO6dhCwNDkYyWuYI/NdZKeeycmk\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 79940,
    "path": "../public/_nuxt/Inter-200_900-6.CN1pIXkb.woff2"
  },
  "/_nuxt/Inter-200_900-7.BgVq2Tq4.woff2": {
    "type": "font/woff2",
    "etag": "\"b670-OTMRveJrmaStk1+lW60dznmUOIs\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 46704,
    "path": "../public/_nuxt/Inter-200_900-7.BgVq2Tq4.woff2"
  },
  "/_nuxt/JYnuemkY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"71a-7mUCqTSp6xOqPPROMxvs4gWDLaw\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 1818,
    "path": "../public/_nuxt/JYnuemkY.js"
  },
  "/_nuxt/JqPaHhRY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24a-iNxkjUif/nTZ0WYRSMfnOal6C3E\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 586,
    "path": "../public/_nuxt/JqPaHhRY.js"
  },
  "/_nuxt/SwZ3GYAp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1134-9AS37da8cN3Y2TnQwA13lPVh/tc\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 4404,
    "path": "../public/_nuxt/SwZ3GYAp.js"
  },
  "/_nuxt/VAlert.otwwEEvt.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1065-OpeSyatN+fftghR7qbntvro9Yro\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 4197,
    "path": "../public/_nuxt/VAlert.otwwEEvt.css"
  },
  "/_nuxt/VAutocomplete.CEo2B5Ox.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9a2-N+lwcu/Ye5ZQ9EBJNddChL3Z6P0\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 2466,
    "path": "../public/_nuxt/VAutocomplete.CEo2B5Ox.css"
  },
  "/_nuxt/VDialog.Qw3ffbUp.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"94e-6cJIOsiL1OZnPxeYW8Ypr9xc5Bk\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 2382,
    "path": "../public/_nuxt/VDialog.Qw3ffbUp.css"
  },
  "/_nuxt/VFooter.BXvdw8-8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"43c-0cmP6Ndv3Ib4PgJtW9g0if59Tjg\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 1084,
    "path": "../public/_nuxt/VFooter.BXvdw8-8.css"
  },
  "/_nuxt/VSheet.DZ598_kt.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"295-GsQVu/lOriQtzNpzXtoqeWSEqRU\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 661,
    "path": "../public/_nuxt/VSheet.DZ598_kt.css"
  },
  "/_nuxt/VTable.nqsxRZhw.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e76-Lr6YchJh3trRflyHEEFTdTR9/Ns\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 3702,
    "path": "../public/_nuxt/VTable.nqsxRZhw.css"
  },
  "/_nuxt/VTabs.DCJ990fJ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e36-H3ZCWURp+AOng8sCh9qu1q7nKP8\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 3638,
    "path": "../public/_nuxt/VTabs.DCJ990fJ.css"
  },
  "/_nuxt/YxmQccDe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29bb-ynaKjBS3OKrEwO3yd1wLygNJChE\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 10683,
    "path": "../public/_nuxt/YxmQccDe.js"
  },
  "/_nuxt/_torneo_.C6L8IOl-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2307-/fLXCr1bbMQD4ZzyTGDqCKg/nLg\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 8967,
    "path": "../public/_nuxt/_torneo_.C6L8IOl-.css"
  },
  "/_nuxt/ad.BOo-tPI4.svg": {
    "type": "image/svg+xml",
    "etag": "\"838b-zKSUiGtoYv494NkicLLsd89Rq4E\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 33675,
    "path": "../public/_nuxt/ad.BOo-tPI4.svg"
  },
  "/_nuxt/ad.CDtWnnSA.svg": {
    "type": "image/svg+xml",
    "etag": "\"7ece-5vDdt+rYKHRWLQNKdhZxgZOAFJ8\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 32462,
    "path": "../public/_nuxt/ad.CDtWnnSA.svg"
  },
  "/_nuxt/af.CI4E3ER1.svg": {
    "type": "image/svg+xml",
    "etag": "\"5240-0azjBv919ZYiYXpYfy4zPOnVR6w\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 21056,
    "path": "../public/_nuxt/af.CI4E3ER1.svg"
  },
  "/_nuxt/af.Cc32fsDB.svg": {
    "type": "image/svg+xml",
    "etag": "\"51b8-oF8PkypwSzgJebLRQ7rT1nAVrx4\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 20920,
    "path": "../public/_nuxt/af.Cc32fsDB.svg"
  },
  "/_nuxt/arab.DwNob5Qo.svg": {
    "type": "image/svg+xml",
    "etag": "\"66e4-TyFF6zfAuvtKJfEq3fnq8lxM4Zo\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 26340,
    "path": "../public/_nuxt/arab.DwNob5Qo.svg"
  },
  "/_nuxt/arab.PzQTPYwO.svg": {
    "type": "image/svg+xml",
    "etag": "\"6758-H+Am1ycULhy7VxzWu1inn0oV5Oc\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 26456,
    "path": "../public/_nuxt/arab.PzQTPYwO.svg"
  },
  "/_nuxt/as.D2gsNMrP.svg": {
    "type": "image/svg+xml",
    "etag": "\"7df9-hfmLvB+OtIPlwSGZbgtvUnWceYc\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 32249,
    "path": "../public/_nuxt/as.D2gsNMrP.svg"
  },
  "/_nuxt/as._t1IQUdv.svg": {
    "type": "image/svg+xml",
    "etag": "\"7ef0-qth8CNDCPJ2wU/j/1cLc+3sRiwU\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 32496,
    "path": "../public/_nuxt/as._t1IQUdv.svg"
  },
  "/_nuxt/aw.CLCX8uk5.svg": {
    "type": "image/svg+xml",
    "etag": "\"2873-4krtEff2CwV+UypuoZDBuoBm+zw\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 10355,
    "path": "../public/_nuxt/aw.CLCX8uk5.svg"
  },
  "/_nuxt/aw.W0PWLK5p.svg": {
    "type": "image/svg+xml",
    "etag": "\"232b-JRw1kavJhxJqEswJm/XzPSnOmoY\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 9003,
    "path": "../public/_nuxt/aw.W0PWLK5p.svg"
  },
  "/_nuxt/bienvenido.BrU0iAbs.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"665-Uf5WJeaeKL5f3mwhixyyncKZBD8\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 1637,
    "path": "../public/_nuxt/bienvenido.BrU0iAbs.css"
  },
  "/_nuxt/bm.BoWRAtUx.svg": {
    "type": "image/svg+xml",
    "etag": "\"591b-rmrCsdvbRuouLhC/JoIkrg3t+Kw\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 22811,
    "path": "../public/_nuxt/bm.BoWRAtUx.svg"
  },
  "/_nuxt/bm.D2j4bkLD.svg": {
    "type": "image/svg+xml",
    "etag": "\"58ce-xXZKFuPzrixmtFtoQDEhhZKq8Jk\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 22734,
    "path": "../public/_nuxt/bm.D2j4bkLD.svg"
  },
  "/_nuxt/bn.BDKbSv-u.svg": {
    "type": "image/svg+xml",
    "etag": "\"37ec-Xsw53oOC838N3wifjWXwSkJJoro\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 14316,
    "path": "../public/_nuxt/bn.BDKbSv-u.svg"
  },
  "/_nuxt/bn.UGyQANfK.svg": {
    "type": "image/svg+xml",
    "etag": "\"3879-kzjktVGJI7O6nQStXaaaKRAzuHU\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 14457,
    "path": "../public/_nuxt/bn.UGyQANfK.svg"
  },
  "/_nuxt/bo.BqtZbaiW.svg": {
    "type": "image/svg+xml",
    "etag": "\"1b5d4-Hz2ls+tCFrlIhRBZwVJYIQrlV1o\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 112084,
    "path": "../public/_nuxt/bo.BqtZbaiW.svg"
  },
  "/_nuxt/bo.CP9m75_5.svg": {
    "type": "image/svg+xml",
    "etag": "\"1bd5b-vX6lL3ptekqeSr5Z3IQ6yaYwvW0\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 114011,
    "path": "../public/_nuxt/bo.CP9m75_5.svg"
  },
  "/_nuxt/br.DaE4AJQY.svg": {
    "type": "image/svg+xml",
    "etag": "\"1fa0-F5abWsDNckUsWGPTTgDw9d7Bxs8\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 8096,
    "path": "../public/_nuxt/br.DaE4AJQY.svg"
  },
  "/_nuxt/br.Yf30zEjB.svg": {
    "type": "image/svg+xml",
    "etag": "\"1e03-xP9bmz+AzCjSTU88P8Fiju0RcKY\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 7683,
    "path": "../public/_nuxt/br.Yf30zEjB.svg"
  },
  "/_nuxt/bt.Cm0R6rAQ.svg": {
    "type": "image/svg+xml",
    "etag": "\"6150-jmiarjxhzIoiSJMQRMLG/rxgawM\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 24912,
    "path": "../public/_nuxt/bt.Cm0R6rAQ.svg"
  },
  "/_nuxt/bt.Csq9bKsA.svg": {
    "type": "image/svg+xml",
    "etag": "\"621b-MpRM3Xl4xTWJEX6lM8CiEFxMZbw\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 25115,
    "path": "../public/_nuxt/bt.Csq9bKsA.svg"
  },
  "/_nuxt/bz.CqiVUvof.svg": {
    "type": "image/svg+xml",
    "etag": "\"b76e-+cbEbvG8yEAuJvLbT+Ukq7bE/Ks\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 46958,
    "path": "../public/_nuxt/bz.CqiVUvof.svg"
  },
  "/_nuxt/bz.YpwBidLU.svg": {
    "type": "image/svg+xml",
    "etag": "\"b64f-HWi8dQpY/aUlIHHIRpZPSxZWmgE\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 46671,
    "path": "../public/_nuxt/bz.YpwBidLU.svg"
  },
  "/_nuxt/cJZVhmiK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"66c5-jRZIMACoWkz+O9LcD3+S+9L9LBU\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 26309,
    "path": "../public/_nuxt/cJZVhmiK.js"
  },
  "/_nuxt/calendario.jIf2nEcB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1db-MWDG9UaHRMqeX67aIt41IMc3Dns\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 475,
    "path": "../public/_nuxt/calendario.jIf2nEcB.css"
  },
  "/_nuxt/configuracion.D69j1F_L.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"98d-VeeqBPmf2gbE9SPBZTeEUJcpgDM\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 2445,
    "path": "../public/_nuxt/configuracion.D69j1F_L.css"
  },
  "/_nuxt/cy.Bgo0XIP0.svg": {
    "type": "image/svg+xml",
    "etag": "\"1774-bbjhsbMj0d44heWkaKLYP/IYFNA\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 6004,
    "path": "../public/_nuxt/cy.Bgo0XIP0.svg"
  },
  "/_nuxt/cy.VQFkW-qk.svg": {
    "type": "image/svg+xml",
    "etag": "\"171a-vUcEtCQluC4wNmIddal9OunLI7I\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 5914,
    "path": "../public/_nuxt/cy.VQFkW-qk.svg"
  },
  "/_nuxt/default.DPXvUJXj.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1d51-izzQWDHL3Ta+TPH/dtIpSb0WiX8\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 7505,
    "path": "../public/_nuxt/default.DPXvUJXj.css"
  },
  "/_nuxt/dg.B55Nvqqm.svg": {
    "type": "image/svg+xml",
    "etag": "\"5a7b-8aM6i3VAph7EZpsh/Rc46tcbD5s\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 23163,
    "path": "../public/_nuxt/dg.B55Nvqqm.svg"
  },
  "/_nuxt/dg.CPWO5scz.svg": {
    "type": "image/svg+xml",
    "etag": "\"595d-7d/KIWp4GL17E0rcBlua2OqcJUo\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 22877,
    "path": "../public/_nuxt/dg.CPWO5scz.svg"
  },
  "/_nuxt/dm.BlhP-6zy.svg": {
    "type": "image/svg+xml",
    "etag": "\"3dce-wWNeZwYc66uajVJzYqrrn7n1j3A\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 15822,
    "path": "../public/_nuxt/dm.BlhP-6zy.svg"
  },
  "/_nuxt/dm.ClJ_IDld.svg": {
    "type": "image/svg+xml",
    "etag": "\"3fb6-r1/aLdyywmzSYaA6vWzWEW+RKeQ\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 16310,
    "path": "../public/_nuxt/dm.ClJ_IDld.svg"
  },
  "/_nuxt/do.-tGVu9lQ.svg": {
    "type": "image/svg+xml",
    "etag": "\"c392-ymbyvfCP7QfojHT3Qnc0Q89kWAM\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 50066,
    "path": "../public/_nuxt/do.-tGVu9lQ.svg"
  },
  "/_nuxt/do.DJGo0v5t.svg": {
    "type": "image/svg+xml",
    "etag": "\"c6a8-20l0q1pMX+5VoMH6YHieaSZ5Y8c\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 50856,
    "path": "../public/_nuxt/do.DJGo0v5t.svg"
  },
  "/_nuxt/eOn310OG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"142-gj1lSiIWDYDtzTe3Xop1bJAsDr8\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 322,
    "path": "../public/_nuxt/eOn310OG.js"
  },
  "/_nuxt/eac.CZCl_pn7.svg": {
    "type": "image/svg+xml",
    "etag": "\"378c-l4XpoZAWJ85FmxbOR2LIpRpMoCw\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 14220,
    "path": "../public/_nuxt/eac.CZCl_pn7.svg"
  },
  "/_nuxt/eac.D_uIzpYR.svg": {
    "type": "image/svg+xml",
    "etag": "\"3795-WDkiRA+8YsL8zPAECKgHPl/XBq0\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 14229,
    "path": "../public/_nuxt/eac.D_uIzpYR.svg"
  },
  "/_nuxt/ec.LNhQ9L4k.svg": {
    "type": "image/svg+xml",
    "etag": "\"712d-5Izcf86XqxIVCpltL7HCM3BslTQ\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 28973,
    "path": "../public/_nuxt/ec.LNhQ9L4k.svg"
  },
  "/_nuxt/ec.sTVr1A3S.svg": {
    "type": "image/svg+xml",
    "etag": "\"736e-Q/ntUqwX/IYyttEfNUfMIKXtJsg\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 29550,
    "path": "../public/_nuxt/ec.sTVr1A3S.svg"
  },
  "/_nuxt/eg.BIzzVp3n.svg": {
    "type": "image/svg+xml",
    "etag": "\"267e-G6AbGe6PxzCzJG8r2Hq2KV5tFRE\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 9854,
    "path": "../public/_nuxt/eg.BIzzVp3n.svg"
  },
  "/_nuxt/eg.C1MYAOXe.svg": {
    "type": "image/svg+xml",
    "etag": "\"268b-OkDdWxxz8yaCPf2ZXwUC0zzHce8\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 9867,
    "path": "../public/_nuxt/eg.C1MYAOXe.svg"
  },
  "/_nuxt/entry.DspRvK37.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"fb31e-u1nRMuzGZDjeNp06dyS32UWGbQE\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 1028894,
    "path": "../public/_nuxt/entry.DspRvK37.css"
  },
  "/_nuxt/es-ga.BbFllROk.svg": {
    "type": "image/svg+xml",
    "etag": "\"6fd4-92kfPdSVFyXAwVHntn6hM7xz/6Q\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 28628,
    "path": "../public/_nuxt/es-ga.BbFllROk.svg"
  },
  "/_nuxt/es-ga.RI_ZudJJ.svg": {
    "type": "image/svg+xml",
    "etag": "\"7043-5iclR1hrCAyoSeUmuZF8UMfpnGo\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 28739,
    "path": "../public/_nuxt/es-ga.RI_ZudJJ.svg"
  },
  "/_nuxt/es.CR0ZfKpD.svg": {
    "type": "image/svg+xml",
    "etag": "\"16a80-vMXID8juwLkjp2d59nQZEEEYzoM\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 92800,
    "path": "../public/_nuxt/es.CR0ZfKpD.svg"
  },
  "/_nuxt/es.DL6RIaKh.svg": {
    "type": "image/svg+xml",
    "etag": "\"16383-TxqSzxIKATDe5ztQuFAAkWLlrOY\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 91011,
    "path": "../public/_nuxt/es.DL6RIaKh.svg"
  },
  "/_nuxt/fj.CJDn3VQ8.svg": {
    "type": "image/svg+xml",
    "etag": "\"64c1-13a1JugCfK6QodALSyH/ZpFL+nc\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 25793,
    "path": "../public/_nuxt/fj.CJDn3VQ8.svg"
  },
  "/_nuxt/fj.DLvzYbo8.svg": {
    "type": "image/svg+xml",
    "etag": "\"6456-jTxtRaxMk9v6sJbing745iBl5v0\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 25686,
    "path": "../public/_nuxt/fj.DLvzYbo8.svg"
  },
  "/_nuxt/fk.Be42QBCW.svg": {
    "type": "image/svg+xml",
    "etag": "\"7668-cbrs2GXuaLISQoBTt/x13S1LDa4\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 30312,
    "path": "../public/_nuxt/fk.Be42QBCW.svg"
  },
  "/_nuxt/fk.Ck9cznm4.svg": {
    "type": "image/svg+xml",
    "etag": "\"755c-rIsWLcdf3lbQ7N5nvSqLiqsrOuI\"",
    "mtime": "2024-07-21T03:18:16.474Z",
    "size": 30044,
    "path": "../public/_nuxt/fk.Ck9cznm4.svg"
  },
  "/_nuxt/gb-nir.BOm9QMOa.svg": {
    "type": "image/svg+xml",
    "etag": "\"5c29-M1X27XklYnbKV+JquHubbkGuuOk\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 23593,
    "path": "../public/_nuxt/gb-nir.BOm9QMOa.svg"
  },
  "/_nuxt/gb-nir.BZUeOVwE.svg": {
    "type": "image/svg+xml",
    "etag": "\"622b-pFbWt9pBYpipQZetmVsBFojwQrk\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 25131,
    "path": "../public/_nuxt/gb-nir.BZUeOVwE.svg"
  },
  "/_nuxt/gb-wls.C4LdH8Nd.svg": {
    "type": "image/svg+xml",
    "etag": "\"23da-+9zSyqksEmVABgyqOswFNFaxvwk\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 9178,
    "path": "../public/_nuxt/gb-wls.C4LdH8Nd.svg"
  },
  "/_nuxt/gb-wls.lLp_JivI.svg": {
    "type": "image/svg+xml",
    "etag": "\"236e-xBOwbyEZrBEL8NQC37nqbJKMC9A\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 9070,
    "path": "../public/_nuxt/gb-wls.lLp_JivI.svg"
  },
  "/_nuxt/gq.BvOxIUGP.svg": {
    "type": "image/svg+xml",
    "etag": "\"142a-mweHWWpgt7t9V3rStNDd0hYu9N4\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 5162,
    "path": "../public/_nuxt/gq.BvOxIUGP.svg"
  },
  "/_nuxt/gq.OBiOttRB.svg": {
    "type": "image/svg+xml",
    "etag": "\"13d0-Fm8fwSr/rTr8ReI/Wr1SQuGXL+A\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 5072,
    "path": "../public/_nuxt/gq.OBiOttRB.svg"
  },
  "/_nuxt/gs.Di8hLP4g.svg": {
    "type": "image/svg+xml",
    "etag": "\"7f0d-JhC7AMFkh5vlDBf5gfn3wcvCFNM\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 32525,
    "path": "../public/_nuxt/gs.Di8hLP4g.svg"
  },
  "/_nuxt/gs.PK6r6yhR.svg": {
    "type": "image/svg+xml",
    "etag": "\"80fd-fs9dDFKCRggEe4MjOX1yh0oFqIw\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 33021,
    "path": "../public/_nuxt/gs.PK6r6yhR.svg"
  },
  "/_nuxt/gt.CovS1bZs.svg": {
    "type": "image/svg+xml",
    "etag": "\"8913-7f9YVmk0aphwLxBRRhm59TNiX/w\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 35091,
    "path": "../public/_nuxt/gt.CovS1bZs.svg"
  },
  "/_nuxt/gt.Ufdm0MFv.svg": {
    "type": "image/svg+xml",
    "etag": "\"8913-nrrUD8qqfAsTiPlqpDV8ADH8M8I\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 35091,
    "path": "../public/_nuxt/gt.Ufdm0MFv.svg"
  },
  "/_nuxt/gu.Bkjkorus.svg": {
    "type": "image/svg+xml",
    "etag": "\"13e8-NFe141OaTqmp9+TdeDzB1OYkynA\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 5096,
    "path": "../public/_nuxt/gu.Bkjkorus.svg"
  },
  "/_nuxt/gu.wFhsTC1Y.svg": {
    "type": "image/svg+xml",
    "etag": "\"132f-+gJFPNb8ZSCx7wqc246cbFbiJVo\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 4911,
    "path": "../public/_nuxt/gu.wFhsTC1Y.svg"
  },
  "/_nuxt/hr.C7VqhX5l.svg": {
    "type": "image/svg+xml",
    "etag": "\"a19e-nclYcAX7qWdEl8bcvUGhYq3LkkI\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 41374,
    "path": "../public/_nuxt/hr.C7VqhX5l.svg"
  },
  "/_nuxt/hr.cWEworf7.svg": {
    "type": "image/svg+xml",
    "etag": "\"a0d9-JCtbCuVI3s7Q1nUST9Ib8N0KIzI\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 41177,
    "path": "../public/_nuxt/hr.cWEworf7.svg"
  },
  "/_nuxt/ht.DPCqX9cm.svg": {
    "type": "image/svg+xml",
    "etag": "\"38ea-Lq0Py7Kll+t0Dqd8fdB3ojo/k3U\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 14570,
    "path": "../public/_nuxt/ht.DPCqX9cm.svg"
  },
  "/_nuxt/ht.HoSCtdNQ.svg": {
    "type": "image/svg+xml",
    "etag": "\"396a-OsT2xspfyhy21hpFiEWep6Lt08k\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 14698,
    "path": "../public/_nuxt/ht.HoSCtdNQ.svg"
  },
  "/_nuxt/im.BAoxVCMv.svg": {
    "type": "image/svg+xml",
    "etag": "\"26a8-gS99M5ZUKHTgspviJIgEibTusbQ\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 9896,
    "path": "../public/_nuxt/im.BAoxVCMv.svg"
  },
  "/_nuxt/im.deD7ny0b.svg": {
    "type": "image/svg+xml",
    "etag": "\"27ee-ZfQIfgANKiFp7V6mtnh5G53Vyzs\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 10222,
    "path": "../public/_nuxt/im.deD7ny0b.svg"
  },
  "/_nuxt/index.CWfWe43L.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e98-U4Gpg4GbMZ8HXtTIXE0sLmGL9B4\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 3736,
    "path": "../public/_nuxt/index.CWfWe43L.css"
  },
  "/_nuxt/index.CrowGLN2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1c2b-4Ev5Dlg7EG3/tTGO+a8ToMQn3SU\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 7211,
    "path": "../public/_nuxt/index.CrowGLN2.css"
  },
  "/_nuxt/inscribir.BQ4_iF2y.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"200-0VL9m9TtLlczK8nhXHljd13N+7I\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 512,
    "path": "../public/_nuxt/inscribir.BQ4_iF2y.css"
  },
  "/_nuxt/io.Bkx8USW1.svg": {
    "type": "image/svg+xml",
    "etag": "\"5a7b-+LAxCeOs6SEBzmPOvgcBSWhqTds\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 23163,
    "path": "../public/_nuxt/io.Bkx8USW1.svg"
  },
  "/_nuxt/io.BzKkDPkD.svg": {
    "type": "image/svg+xml",
    "etag": "\"595d-dnt1crf4dXSbzWxV7W+IviJqO2U\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 22877,
    "path": "../public/_nuxt/io.BzKkDPkD.svg"
  },
  "/_nuxt/ir.CXFV1BFU.svg": {
    "type": "image/svg+xml",
    "etag": "\"3bcf-MKLQudcMQ0c7RCJmSpz+o+vemEs\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 15311,
    "path": "../public/_nuxt/ir.CXFV1BFU.svg"
  },
  "/_nuxt/ir.cCIgaNf6.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c25-QtOTulbNrpKS/HlnL2x4LKmwvWk\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 15397,
    "path": "../public/_nuxt/ir.cCIgaNf6.svg"
  },
  "/_nuxt/je.PUw16g1j.svg": {
    "type": "image/svg+xml",
    "etag": "\"b3f5-Uyy8jPLlAYycPYl5MogJRheOq6U\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 46069,
    "path": "../public/_nuxt/je.PUw16g1j.svg"
  },
  "/_nuxt/je.YWv5VSiQ.svg": {
    "type": "image/svg+xml",
    "etag": "\"b6af-FtPbppMs+9C/Rz2DIQpFXGT8lZY\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 46767,
    "path": "../public/_nuxt/je.YWv5VSiQ.svg"
  },
  "/_nuxt/jy4bTDCk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"525-woV8FU0A+3sS35LvO/hvevMNVHs\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 1317,
    "path": "../public/_nuxt/jy4bTDCk.js"
  },
  "/_nuxt/kh.CAffWc0R.svg": {
    "type": "image/svg+xml",
    "etag": "\"1c6e-v4URv0ZByZgrohcStpeFTcFjH6U\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 7278,
    "path": "../public/_nuxt/kh.CAffWc0R.svg"
  },
  "/_nuxt/kh.V4Sa3vlt.svg": {
    "type": "image/svg+xml",
    "etag": "\"1c6d-U2Ey0FoJUNcL/9jAs7aTPVK0o8o\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 7277,
    "path": "../public/_nuxt/kh.V4Sa3vlt.svg"
  },
  "/_nuxt/ki.CM44VBPm.svg": {
    "type": "image/svg+xml",
    "etag": "\"16b2-2Od6iFPctNDwlFeVSqqe5P1Q/cE\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 5810,
    "path": "../public/_nuxt/ki.CM44VBPm.svg"
  },
  "/_nuxt/ki.COZ8g898.svg": {
    "type": "image/svg+xml",
    "etag": "\"1605-BcNCtjkQTTw40tJzGgdN6fQ+Npo\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 5637,
    "path": "../public/_nuxt/ki.COZ8g898.svg"
  },
  "/_nuxt/ky.BqProAqG.svg": {
    "type": "image/svg+xml",
    "etag": "\"5dc5-cIgOXXAYIT77jaKStDOvuEdXzbk\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 24005,
    "path": "../public/_nuxt/ky.BqProAqG.svg"
  },
  "/_nuxt/ky.D_l3blFP.svg": {
    "type": "image/svg+xml",
    "etag": "\"5db7-5Xf2PuyWvK0euKAq9WAVYGvP7hw\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 23991,
    "path": "../public/_nuxt/ky.D_l3blFP.svg"
  },
  "/_nuxt/kz.BBCbe9jj.svg": {
    "type": "image/svg+xml",
    "etag": "\"1c7b-pHnRcMt5RdVz9frLk0LuoUCF4uU\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 7291,
    "path": "../public/_nuxt/kz.BBCbe9jj.svg"
  },
  "/_nuxt/kz.DBjWpOlG.svg": {
    "type": "image/svg+xml",
    "etag": "\"1c79-wGKoicj/PC4uqQbxT7KYnpShZAI\"",
    "mtime": "2024-07-21T03:18:16.478Z",
    "size": 7289,
    "path": "../public/_nuxt/kz.DBjWpOlG.svg"
  },
  "/_nuxt/li.DgeenFRc.svg": {
    "type": "image/svg+xml",
    "etag": "\"2035-Vd2HIjJVjz18P1G/MZHb8/QPG/w\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 8245,
    "path": "../public/_nuxt/li.DgeenFRc.svg"
  },
  "/_nuxt/li.y6TPS81M.svg": {
    "type": "image/svg+xml",
    "etag": "\"204b-ulsuAWSUJr9e7FJxCMkTwJGCQYU\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 8267,
    "path": "../public/_nuxt/li.y6TPS81M.svg"
  },
  "/_nuxt/lk.B2IfFxoh.svg": {
    "type": "image/svg+xml",
    "etag": "\"2c4a-eBUcIdSSJFr2s3yBKoZ5b+cShr4\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 11338,
    "path": "../public/_nuxt/lk.B2IfFxoh.svg"
  },
  "/_nuxt/lk.DIvkWByA.svg": {
    "type": "image/svg+xml",
    "etag": "\"2c56-7KvEBsMpihZ4BRGyFVrTzA4NhxM\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 11350,
    "path": "../public/_nuxt/lk.DIvkWByA.svg"
  },
  "/_nuxt/login.UwFdQd-r.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"342-/RORqJqyrYcI+W2O7BHgzmCrMlQ\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 834,
    "path": "../public/_nuxt/login.UwFdQd-r.css"
  },
  "/_nuxt/materialdesignicons-webfont.B7mPwVP_.ttf": {
    "type": "font/ttf",
    "etag": "\"13f40c-T1Gk3HWmjT5XMhxEjv3eojyKnbA\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 1307660,
    "path": "../public/_nuxt/materialdesignicons-webfont.B7mPwVP_.ttf"
  },
  "/_nuxt/materialdesignicons-webfont.CSr8KVlo.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"13f4e8-ApygSKV9BTQg/POr5dCUzjU5OZw\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 1307880,
    "path": "../public/_nuxt/materialdesignicons-webfont.CSr8KVlo.eot"
  },
  "/_nuxt/materialdesignicons-webfont.Dp5v-WZN.woff2": {
    "type": "font/woff2",
    "etag": "\"62710-TiD2zPQxmd6lyFsjoODwuoH/7iY\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 403216,
    "path": "../public/_nuxt/materialdesignicons-webfont.Dp5v-WZN.woff2"
  },
  "/_nuxt/materialdesignicons-webfont.PXm3-2wK.woff": {
    "type": "font/woff",
    "etag": "\"8f8d0-zD3UavWtb7zNpwtFPVWUs57NasQ\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 587984,
    "path": "../public/_nuxt/materialdesignicons-webfont.PXm3-2wK.woff"
  },
  "/_nuxt/md.DArlF80d.svg": {
    "type": "image/svg+xml",
    "etag": "\"2bc3-T+1oKPMOOpfkA+z5rr/Bg6Yn+Kw\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 11203,
    "path": "../public/_nuxt/md.DArlF80d.svg"
  },
  "/_nuxt/md.DRw6DF0o.svg": {
    "type": "image/svg+xml",
    "etag": "\"2c2d-hgQ9nrlBwAUUuRVtKLOmnGnV768\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 11309,
    "path": "../public/_nuxt/md.DRw6DF0o.svg"
  },
  "/_nuxt/me.B32CQdRA.svg": {
    "type": "image/svg+xml",
    "etag": "\"f466-RnuPM85PTSW7cISdtcOT4cZXFjU\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 62566,
    "path": "../public/_nuxt/me.B32CQdRA.svg"
  },
  "/_nuxt/me.BUFcTh_w.svg": {
    "type": "image/svg+xml",
    "etag": "\"f83e-f5mZbcTFILRfVcle6EIgoG6l208\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 63550,
    "path": "../public/_nuxt/me.BUFcTh_w.svg"
  },
  "/_nuxt/mp.DOjKDFJv.svg": {
    "type": "image/svg+xml",
    "etag": "\"5c18-E2pcAGTyFdSSkqJAvYSXMfQpIHM\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 23576,
    "path": "../public/_nuxt/mp.DOjKDFJv.svg"
  },
  "/_nuxt/mp.xI88Vk3c.svg": {
    "type": "image/svg+xml",
    "etag": "\"5b24-bNeX01DtH7ykKfkktynDGTe/9OY\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 23332,
    "path": "../public/_nuxt/mp.xI88Vk3c.svg"
  },
  "/_nuxt/ms.7tNehsjt.svg": {
    "type": "image/svg+xml",
    "etag": "\"17b2-ylB6FZM5ZrhQ6zdwGxyactkekxA\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 6066,
    "path": "../public/_nuxt/ms.7tNehsjt.svg"
  },
  "/_nuxt/ms.D--tLJBo.svg": {
    "type": "image/svg+xml",
    "etag": "\"17ea-hNdsLYosTa9p3GPBG+6SeKF5DG0\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 6122,
    "path": "../public/_nuxt/ms.D--tLJBo.svg"
  },
  "/_nuxt/mt.0OWB-5b3.svg": {
    "type": "image/svg+xml",
    "etag": "\"392e-X6SYKB0/nAR7Gl8BPeUZuZqosws\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 14638,
    "path": "../public/_nuxt/mt.0OWB-5b3.svg"
  },
  "/_nuxt/mt.DeenPMqd.svg": {
    "type": "image/svg+xml",
    "etag": "\"359d-Nm7zglHAj/PE3CAGR5Qp1jwJ8Qc\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 13725,
    "path": "../public/_nuxt/mt.DeenPMqd.svg"
  },
  "/_nuxt/mx.4c9y9ryX.svg": {
    "type": "image/svg+xml",
    "etag": "\"15b05-EOEQ1mYX48IS/98YkQSVsLsMFOg\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 88837,
    "path": "../public/_nuxt/mx.4c9y9ryX.svg"
  },
  "/_nuxt/mx.C7ivyfFO.svg": {
    "type": "image/svg+xml",
    "etag": "\"16d0b-NJLU4xgb9218suvI1wTL9VEoHLE\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 93451,
    "path": "../public/_nuxt/mx.C7ivyfFO.svg"
  },
  "/_nuxt/nf.-j2oelto.svg": {
    "type": "image/svg+xml",
    "etag": "\"15b8-63YC52XUcndqCX4onmD59HPd2zk\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 5560,
    "path": "../public/_nuxt/nf.-j2oelto.svg"
  },
  "/_nuxt/nf.COchEj81.svg": {
    "type": "image/svg+xml",
    "etag": "\"16b4-zr1tagCv6WTZNI0lBybW5OiWIl4\"",
    "mtime": "2024-07-21T03:18:16.482Z",
    "size": 5812,
    "path": "../public/_nuxt/nf.COchEj81.svg"
  },
  "/_nuxt/ni.CC3zFI7h.svg": {
    "type": "image/svg+xml",
    "etag": "\"4803-aqlOQvykjrjtUMj/jqZj2Sh5s3c\"",
    "mtime": "2024-07-21T03:18:16.486Z",
    "size": 18435,
    "path": "../public/_nuxt/ni.CC3zFI7h.svg"
  },
  "/_nuxt/ni.ChnV2lR-.svg": {
    "type": "image/svg+xml",
    "etag": "\"483e-Rbd1RHLdbkNKW7DkHH3e5q79L2k\"",
    "mtime": "2024-07-21T03:18:16.486Z",
    "size": 18494,
    "path": "../public/_nuxt/ni.ChnV2lR-.svg"
  },
  "/_nuxt/nuxt-icon.D08378P0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"fe-23rdvH8wBVm0gSnUqmHDhubj+to\"",
    "mtime": "2024-07-21T03:18:16.486Z",
    "size": 254,
    "path": "../public/_nuxt/nuxt-icon.D08378P0.css"
  },
  "/_nuxt/om.DnUPbroW.svg": {
    "type": "image/svg+xml",
    "etag": "\"585f-I64b/6vgBIW1rza/o7vzCRtbeSo\"",
    "mtime": "2024-07-21T03:18:16.486Z",
    "size": 22623,
    "path": "../public/_nuxt/om.DnUPbroW.svg"
  },
  "/_nuxt/om.Ri__rIwP.svg": {
    "type": "image/svg+xml",
    "etag": "\"584f-kQRHNzRH3Nc8XoUiFqF1uXjIhvM\"",
    "mtime": "2024-07-21T03:18:16.486Z",
    "size": 22607,
    "path": "../public/_nuxt/om.Ri__rIwP.svg"
  },
  "/_nuxt/pf.CEX9Vx76.svg": {
    "type": "image/svg+xml",
    "etag": "\"100b-9T41gdnhhtULKPrJzOnbZNbEbvQ\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 4107,
    "path": "../public/_nuxt/pf.CEX9Vx76.svg"
  },
  "/_nuxt/pf.CMTHIumB.svg": {
    "type": "image/svg+xml",
    "etag": "\"1038-UAQr8zKLFQepaQSZ+oN/H77t6WU\"",
    "mtime": "2024-07-21T03:18:16.486Z",
    "size": 4152,
    "path": "../public/_nuxt/pf.CMTHIumB.svg"
  },
  "/_nuxt/pn.DEs-Vj71.svg": {
    "type": "image/svg+xml",
    "etag": "\"360f-IILd4QB3lg0BxSPCk76rKn5Y7t8\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 13839,
    "path": "../public/_nuxt/pn.DEs-Vj71.svg"
  },
  "/_nuxt/pn.vyD5VXw1.svg": {
    "type": "image/svg+xml",
    "etag": "\"3638-O+Nk8k5nLICB9/RWruEdwYtHuIA\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 13880,
    "path": "../public/_nuxt/pn.vyD5VXw1.svg"
  },
  "/_nuxt/pt.BLLm3V0o.svg": {
    "type": "image/svg+xml",
    "etag": "\"21e0-plBCA9VT+LwzBRkD1T09FGYBxLI\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 8672,
    "path": "../public/_nuxt/pt.BLLm3V0o.svg"
  },
  "/_nuxt/pt.BV5okG4O.svg": {
    "type": "image/svg+xml",
    "etag": "\"207c-DZz76Gk+7Op83qX8qn4spn6j0io\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 8316,
    "path": "../public/_nuxt/pt.BV5okG4O.svg"
  },
  "/_nuxt/py.BfpB8kRi.svg": {
    "type": "image/svg+xml",
    "etag": "\"432a-q76E3oGrOpvOxG9beXxEltBCMjo\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 17194,
    "path": "../public/_nuxt/py.BfpB8kRi.svg"
  },
  "/_nuxt/py.CRTEf2ay.svg": {
    "type": "image/svg+xml",
    "etag": "\"43d1-90ixgSYxmvqa6hKybsT+1ix4PCE\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 17361,
    "path": "../public/_nuxt/py.CRTEf2ay.svg"
  },
  "/_nuxt/register-img.Ddaudsln.webp": {
    "type": "image/webp",
    "etag": "\"130e0-9cxOm6MKQv69smJqzJp/+aV0ZRc\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 78048,
    "path": "../public/_nuxt/register-img.Ddaudsln.webp"
  },
  "/_nuxt/rs.D2wyuxjv.svg": {
    "type": "image/svg+xml",
    "etag": "\"2cef4-y4zrvbC9jBRTmtQ9jldw8vZ1yVY\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 184052,
    "path": "../public/_nuxt/rs.D2wyuxjv.svg"
  },
  "/_nuxt/rs.Dv4N4BPN.svg": {
    "type": "image/svg+xml",
    "etag": "\"2cf6c-z7QPxJMeZX8Gixek9/lSRpNI8t8\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 184172,
    "path": "../public/_nuxt/rs.Dv4N4BPN.svg"
  },
  "/_nuxt/sa.DLf2NaXn.svg": {
    "type": "image/svg+xml",
    "etag": "\"27fd-5rl/XENqWT6dH8TAfa24NaVHqGY\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 10237,
    "path": "../public/_nuxt/sa.DLf2NaXn.svg"
  },
  "/_nuxt/sa.eH5F7cXy.svg": {
    "type": "image/svg+xml",
    "etag": "\"27be-sfYHlPpcNFfpWM23zeVyrJrUjz8\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 10174,
    "path": "../public/_nuxt/sa.eH5F7cXy.svg"
  },
  "/_nuxt/sh-ac.6pU0wZVL.svg": {
    "type": "image/svg+xml",
    "etag": "\"25744-ovQws23+/frODvvPUsKRtTqW0KQ\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 153412,
    "path": "../public/_nuxt/sh-ac.6pU0wZVL.svg"
  },
  "/_nuxt/sh-ac.Ch9Jh9Lp.svg": {
    "type": "image/svg+xml",
    "etag": "\"261e0-Kdl748LJddR6XL5qWY54cL0RAdk\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 156128,
    "path": "../public/_nuxt/sh-ac.Ch9Jh9Lp.svg"
  },
  "/_nuxt/sh-hl.CnGxQM93.svg": {
    "type": "image/svg+xml",
    "etag": "\"97ab-j80NLUyPEwo7YfDlwri0EJHU5hQ\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 38827,
    "path": "../public/_nuxt/sh-hl.CnGxQM93.svg"
  },
  "/_nuxt/sh-hl.DWwv0HRi.svg": {
    "type": "image/svg+xml",
    "etag": "\"95a5-hWqsqCpQtCcJHDe+q+/kH5ItlRI\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 38309,
    "path": "../public/_nuxt/sh-hl.DWwv0HRi.svg"
  },
  "/_nuxt/sh-ta.DNDOtP8t.svg": {
    "type": "image/svg+xml",
    "etag": "\"776c-qAVeRLM6h7oV3QyjEcbXCVIj5oU\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 30572,
    "path": "../public/_nuxt/sh-ta.DNDOtP8t.svg"
  },
  "/_nuxt/sh-ta.clv2MsBt.svg": {
    "type": "image/svg+xml",
    "etag": "\"7872-xxzeYzfkKiuoicYIySPiug9EELc\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 30834,
    "path": "../public/_nuxt/sh-ta.clv2MsBt.svg"
  },
  "/_nuxt/sm.1NcqoN_z.svg": {
    "type": "image/svg+xml",
    "etag": "\"3d9e-1EX1V6lyvgW1EQqls/FsdBABGpw\"",
    "mtime": "2024-07-21T03:18:16.490Z",
    "size": 15774,
    "path": "../public/_nuxt/sm.1NcqoN_z.svg"
  },
  "/_nuxt/sm.DHRSzt4z.svg": {
    "type": "image/svg+xml",
    "etag": "\"3d2b-QrIHyw+vhX7umh2NjbwI5B2xBfk\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 15659,
    "path": "../public/_nuxt/sm.DHRSzt4z.svg"
  },
  "/_nuxt/sv.BGK8a8aZ.svg": {
    "type": "image/svg+xml",
    "etag": "\"1458f-oZlLHrxNLl9rLNdm4sT3RVGhU2U\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 83343,
    "path": "../public/_nuxt/sv.BGK8a8aZ.svg"
  },
  "/_nuxt/sv.n55iiUxg.svg": {
    "type": "image/svg+xml",
    "etag": "\"1437f-Z9ynIiU7fAxgjsuZGCkn7PvIUas\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 82815,
    "path": "../public/_nuxt/sv.n55iiUxg.svg"
  },
  "/_nuxt/sx.4BiL6F_v.svg": {
    "type": "image/svg+xml",
    "etag": "\"3358-tIHxL3MAz0E56fsLKS4jtwOya04\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 13144,
    "path": "../public/_nuxt/sx.4BiL6F_v.svg"
  },
  "/_nuxt/sx.DzlMoqh2.svg": {
    "type": "image/svg+xml",
    "etag": "\"3294-ok7KvP6cWB+Vbm/pkeQqgDxlqJs\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 12948,
    "path": "../public/_nuxt/sx.DzlMoqh2.svg"
  },
  "/_nuxt/sz.BC3w3Gmj.svg": {
    "type": "image/svg+xml",
    "etag": "\"12c3-KFxaq3YFBfRsxWtoJqSPs309qy8\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 4803,
    "path": "../public/_nuxt/sz.BC3w3Gmj.svg"
  },
  "/_nuxt/sz.DpZ3V1AK.svg": {
    "type": "image/svg+xml",
    "etag": "\"128f-SnsKgkkns1IwLZFdMffiTdbugQE\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 4751,
    "path": "../public/_nuxt/sz.DpZ3V1AK.svg"
  },
  "/_nuxt/tc.BB3tFO-G.svg": {
    "type": "image/svg+xml",
    "etag": "\"1bee-cqo5jcphi+qBJIkt34qWuz5VbYU\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 7150,
    "path": "../public/_nuxt/tc.BB3tFO-G.svg"
  },
  "/_nuxt/tc.CYGgqbY-.svg": {
    "type": "image/svg+xml",
    "etag": "\"1bea-utHND6/XUpuLbM3Ay0Xt7pm9bII\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 7146,
    "path": "../public/_nuxt/tc.CYGgqbY-.svg"
  },
  "/_nuxt/tm.CCv743R_.svg": {
    "type": "image/svg+xml",
    "etag": "\"95df-QxZV+tf51fm9Jomzfsa2jjEtEFU\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 38367,
    "path": "../public/_nuxt/tm.CCv743R_.svg"
  },
  "/_nuxt/tm.DYhdxDK7.svg": {
    "type": "image/svg+xml",
    "etag": "\"9661-TeTGSP2ifJlXeVDAOIeb4o0pXO0\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 38497,
    "path": "../public/_nuxt/tm.DYhdxDK7.svg"
  },
  "/_nuxt/u4s050gm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"429-AoHLnUFqGt1VBDYMM1j3kOnqo3U\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 1065,
    "path": "../public/_nuxt/u4s050gm.js"
  },
  "/_nuxt/uY430icM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"100-+Bgxv4ZEnGchONBacposd90Qnnk\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 256,
    "path": "../public/_nuxt/uY430icM.js"
  },
  "/_nuxt/un.0G1DCZ6c.svg": {
    "type": "image/svg+xml",
    "etag": "\"4e52-VefNz9dVrbL3dIMFhe2MMqD61oE\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 20050,
    "path": "../public/_nuxt/un.0G1DCZ6c.svg"
  },
  "/_nuxt/un.BQ1kEGox.svg": {
    "type": "image/svg+xml",
    "etag": "\"4f42-78ge3RBLjFn5Qxk4fKcpbo5+D6Y\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 20290,
    "path": "../public/_nuxt/un.BQ1kEGox.svg"
  },
  "/_nuxt/useSchemas.kb4-kzuW.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"375-jlBNKzS6UNSD6CffHjH1GV6v45E\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 885,
    "path": "../public/_nuxt/useSchemas.kb4-kzuW.css"
  },
  "/_nuxt/va.BntFJQHU.svg": {
    "type": "image/svg+xml",
    "etag": "\"72d8-7WZnyZPSvLNpnz9ROkcyYPosmk4\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 29400,
    "path": "../public/_nuxt/va.BntFJQHU.svg"
  },
  "/_nuxt/va.maDzWwNR.svg": {
    "type": "image/svg+xml",
    "etag": "\"7315-1fWUaGsydFQksg6Eh+MuFuO52wo\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 29461,
    "path": "../public/_nuxt/va.maDzWwNR.svg"
  },
  "/_nuxt/vg.DKEU1GdO.svg": {
    "type": "image/svg+xml",
    "etag": "\"28ad-m6v2ugwhJzsMFrMZ3nhPgim5qNI\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 10413,
    "path": "../public/_nuxt/vg.DKEU1GdO.svg"
  },
  "/_nuxt/vg.qlt33Cv3.svg": {
    "type": "image/svg+xml",
    "etag": "\"2896-neZKxUwtoG3SaJiR2uhWOrcdSlQ\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 10390,
    "path": "../public/_nuxt/vg.qlt33Cv3.svg"
  },
  "/_nuxt/vi.1FTBesw2.svg": {
    "type": "image/svg+xml",
    "etag": "\"21a9-khHRzRimth1bylh8LGytCB1qLUI\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 8617,
    "path": "../public/_nuxt/vi.1FTBesw2.svg"
  },
  "/_nuxt/vi.DatfOFqY.svg": {
    "type": "image/svg+xml",
    "etag": "\"21ea-oQDPWIEsuwTEQlchLT1jV1P4d30\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 8682,
    "path": "../public/_nuxt/vi.DatfOFqY.svg"
  },
  "/_nuxt/wVtiQwmN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"287-xNZnADRs2iTxQ/R0LV94wUKf1vs\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 647,
    "path": "../public/_nuxt/wVtiQwmN.js"
  },
  "/_nuxt/xk.B6uU6dIH.svg": {
    "type": "image/svg+xml",
    "etag": "\"21b2-jxR00OakRKtOyM5DJjMzV4cTAkQ\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 8626,
    "path": "../public/_nuxt/xk.B6uU6dIH.svg"
  },
  "/_nuxt/xk.F5dDvX79.svg": {
    "type": "image/svg+xml",
    "etag": "\"245f-Xq2thU1f0lmsHxSI/c815FW3by8\"",
    "mtime": "2024-07-21T03:18:16.494Z",
    "size": 9311,
    "path": "../public/_nuxt/xk.F5dDvX79.svg"
  },
  "/_nuxt/z5zyCxro.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"246-skMFMiquKRLAy9dKy032atptEPU\"",
    "mtime": "2024-07-21T03:18:16.498Z",
    "size": 582,
    "path": "../public/_nuxt/z5zyCxro.js"
  },
  "/_nuxt/zm.BmHUGSoa.svg": {
    "type": "image/svg+xml",
    "etag": "\"1588-YVolkqeKPlkFKPnW4FXYqTwqMA4\"",
    "mtime": "2024-07-21T03:18:16.498Z",
    "size": 5512,
    "path": "../public/_nuxt/zm.BmHUGSoa.svg"
  },
  "/_nuxt/zm.CNg0kgkw.svg": {
    "type": "image/svg+xml",
    "etag": "\"1525-RcwhEKBc1WEmRPzLrwi1mhB0sIE\"",
    "mtime": "2024-07-21T03:18:16.498Z",
    "size": 5413,
    "path": "../public/_nuxt/zm.CNg0kgkw.svg"
  },
  "/_nuxt/zw.Ceqd3Xj3.svg": {
    "type": "image/svg+xml",
    "etag": "\"1a10-LZNMDTWi/cKgEnfZkG64S/faRXg\"",
    "mtime": "2024-07-21T03:18:16.498Z",
    "size": 6672,
    "path": "../public/_nuxt/zw.Ceqd3Xj3.svg"
  },
  "/_nuxt/zw.DGkTG73v.svg": {
    "type": "image/svg+xml",
    "etag": "\"19fb-xmiXfFOqi4zn532gxBDT5cbYQ6o\"",
    "mtime": "2024-07-21T03:18:16.498Z",
    "size": 6651,
    "path": "../public/_nuxt/zw.DGkTG73v.svg"
  },
  "/futzo/logos/presentation-01.jpg": {
    "type": "image/jpeg",
    "etag": "\"bb853-km/ABEd9g8UoNPhm5zBUWlmUV3U\"",
    "mtime": "2024-07-21T03:18:16.550Z",
    "size": 768083,
    "path": "../public/futzo/logos/presentation-01.jpg"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-0ma0EGbtsbGdkeqnbDP8bOpzTJ8\"",
    "mtime": "2024-07-21T03:18:16.354Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/futzo/logos/circular/logo-21.png": {
    "type": "image/png",
    "etag": "\"31b97-oUc9Cvg403Z0fMUkLfGiUdoliJM\"",
    "mtime": "2024-07-21T03:18:16.562Z",
    "size": 203671,
    "path": "../public/futzo/logos/circular/logo-21.png"
  },
  "/futzo/logos/circular/logo-22.png": {
    "type": "image/png",
    "etag": "\"21f55-kYN0iW8LBHIQZDG145KEP/XoibM\"",
    "mtime": "2024-07-21T03:18:16.562Z",
    "size": 139093,
    "path": "../public/futzo/logos/circular/logo-22.png"
  },
  "/futzo/logos/circular/logo-23.png": {
    "type": "image/png",
    "etag": "\"21f77-2H0l4Duiv9kUYb3kzJa46+W1CVw\"",
    "mtime": "2024-07-21T03:18:16.558Z",
    "size": 139127,
    "path": "../public/futzo/logos/circular/logo-23.png"
  },
  "/futzo/logos/circular/logo-24.png": {
    "type": "image/png",
    "etag": "\"1f45a-eYBnTt80SNHVCiWkXUX68Z+jKuk\"",
    "mtime": "2024-07-21T03:18:16.558Z",
    "size": 128090,
    "path": "../public/futzo/logos/circular/logo-24.png"
  },
  "/futzo/logos/circular/logo-25.png": {
    "type": "image/png",
    "etag": "\"219b0-j9rlsWjL4dvGgzcuXC4Gqzq8jeY\"",
    "mtime": "2024-07-21T03:18:16.558Z",
    "size": 137648,
    "path": "../public/futzo/logos/circular/logo-25.png"
  },
  "/futzo/logos/horizontal/logo-11.png": {
    "type": "image/png",
    "etag": "\"17c84-OpwyGn7vetXnpJTTMo7FeUcfXJg\"",
    "mtime": "2024-07-21T03:18:16.562Z",
    "size": 97412,
    "path": "../public/futzo/logos/horizontal/logo-11.png"
  },
  "/futzo/logos/horizontal/logo-12.png": {
    "type": "image/png",
    "etag": "\"1747a-r43N6fx/1SXeBIeY/7s5GWj+Hk8\"",
    "mtime": "2024-07-21T03:18:16.566Z",
    "size": 95354,
    "path": "../public/futzo/logos/horizontal/logo-12.png"
  },
  "/futzo/logos/horizontal/logo-13.png": {
    "type": "image/png",
    "etag": "\"174c2-2klb4daYoEI/N51lDPW5D6PaNP4\"",
    "mtime": "2024-07-21T03:18:16.558Z",
    "size": 95426,
    "path": "../public/futzo/logos/horizontal/logo-13.png"
  },
  "/futzo/logos/horizontal/logo-14.png": {
    "type": "image/png",
    "etag": "\"15975-S01iG09dPWboYyqygajC+HSJS2M\"",
    "mtime": "2024-07-21T03:18:16.562Z",
    "size": 88437,
    "path": "../public/futzo/logos/horizontal/logo-14.png"
  },
  "/futzo/logos/horizontal/logo-15.png": {
    "type": "image/png",
    "etag": "\"16f62-z5QMTT++qQtye8w/MRtOJQByUqI\"",
    "mtime": "2024-07-21T03:18:16.562Z",
    "size": 94050,
    "path": "../public/futzo/logos/horizontal/logo-15.png"
  },
  "/futzo/logos/favicon/android-icon-144x144.png": {
    "type": "image/png",
    "etag": "\"3c15-lWLJPFtDO5xdwOJ7M7hM/OoHm3o\"",
    "mtime": "2024-07-21T03:18:16.562Z",
    "size": 15381,
    "path": "../public/futzo/logos/favicon/android-icon-144x144.png"
  },
  "/futzo/logos/favicon/android-icon-192x192.png": {
    "type": "image/png",
    "etag": "\"490e-R7oXTgtuz3QPRcIdFkvE/GDUHF0\"",
    "mtime": "2024-07-21T03:18:16.566Z",
    "size": 18702,
    "path": "../public/futzo/logos/favicon/android-icon-192x192.png"
  },
  "/futzo/logos/favicon/android-icon-36x36.png": {
    "type": "image/png",
    "etag": "\"c90-WfKLNUzkRUcjI6P64oo/Eje5Me4\"",
    "mtime": "2024-07-21T03:18:16.566Z",
    "size": 3216,
    "path": "../public/futzo/logos/favicon/android-icon-36x36.png"
  },
  "/futzo/logos/favicon/android-icon-48x48.png": {
    "type": "image/png",
    "etag": "\"1127-NuFMzp5FZwSZ1wsxungWlgGP9lE\"",
    "mtime": "2024-07-21T03:18:16.566Z",
    "size": 4391,
    "path": "../public/futzo/logos/favicon/android-icon-48x48.png"
  },
  "/futzo/logos/favicon/android-icon-72x72.png": {
    "type": "image/png",
    "etag": "\"1afb-q5YyJxQp/FFM/n8EKVmrFM6zIHY\"",
    "mtime": "2024-07-21T03:18:16.566Z",
    "size": 6907,
    "path": "../public/futzo/logos/favicon/android-icon-72x72.png"
  },
  "/futzo/logos/favicon/android-icon-96x96.png": {
    "type": "image/png",
    "etag": "\"25b8-88DXao+6xVPnPBx1O9j5MKTlts4\"",
    "mtime": "2024-07-21T03:18:16.566Z",
    "size": 9656,
    "path": "../public/futzo/logos/favicon/android-icon-96x96.png"
  },
  "/futzo/logos/favicon/apple-icon-114x114.png": {
    "type": "image/png",
    "etag": "\"2dea-WU5IoMl+Jwn+tky3GHBaeuwL1QA\"",
    "mtime": "2024-07-21T03:18:16.566Z",
    "size": 11754,
    "path": "../public/futzo/logos/favicon/apple-icon-114x114.png"
  },
  "/futzo/logos/favicon/apple-icon-120x120.png": {
    "type": "image/png",
    "etag": "\"3050-LfmjBdV9hBLjfDPNLGI/rdBXOkQ\"",
    "mtime": "2024-07-21T03:18:16.566Z",
    "size": 12368,
    "path": "../public/futzo/logos/favicon/apple-icon-120x120.png"
  },
  "/futzo/logos/favicon/apple-icon-144x144.png": {
    "type": "image/png",
    "etag": "\"3c15-lWLJPFtDO5xdwOJ7M7hM/OoHm3o\"",
    "mtime": "2024-07-21T03:18:16.546Z",
    "size": 15381,
    "path": "../public/futzo/logos/favicon/apple-icon-144x144.png"
  },
  "/futzo/logos/favicon/apple-icon-152x152.png": {
    "type": "image/png",
    "etag": "\"4031-SeuVffJXN+uZFt2BJAKUew32/Cc\"",
    "mtime": "2024-07-21T03:18:16.546Z",
    "size": 16433,
    "path": "../public/futzo/logos/favicon/apple-icon-152x152.png"
  },
  "/futzo/logos/favicon/apple-icon-180x180.png": {
    "type": "image/png",
    "etag": "\"4fa5-wMB871Rjoy1tqQrrt/ykb3I57iE\"",
    "mtime": "2024-07-21T03:18:16.546Z",
    "size": 20389,
    "path": "../public/futzo/logos/favicon/apple-icon-180x180.png"
  },
  "/futzo/logos/favicon/apple-icon-57x57.png": {
    "type": "image/png",
    "etag": "\"14ad-JjGMqubNhGW357FN/15xWE33qXc\"",
    "mtime": "2024-07-21T03:18:16.550Z",
    "size": 5293,
    "path": "../public/futzo/logos/favicon/apple-icon-57x57.png"
  },
  "/futzo/logos/favicon/apple-icon-60x60.png": {
    "type": "image/png",
    "etag": "\"160a-MsHDPwglYL3M76bWzlPY+OCVxIs\"",
    "mtime": "2024-07-21T03:18:16.546Z",
    "size": 5642,
    "path": "../public/futzo/logos/favicon/apple-icon-60x60.png"
  },
  "/futzo/logos/favicon/apple-icon-72x72.png": {
    "type": "image/png",
    "etag": "\"1afb-q5YyJxQp/FFM/n8EKVmrFM6zIHY\"",
    "mtime": "2024-07-21T03:18:16.546Z",
    "size": 6907,
    "path": "../public/futzo/logos/favicon/apple-icon-72x72.png"
  },
  "/futzo/logos/favicon/apple-icon-76x76.png": {
    "type": "image/png",
    "etag": "\"1c9b-Dx2zWLeZrNU9pX3v94HJ0t5y0oE\"",
    "mtime": "2024-07-21T03:18:16.546Z",
    "size": 7323,
    "path": "../public/futzo/logos/favicon/apple-icon-76x76.png"
  },
  "/futzo/logos/favicon/apple-icon-precomposed.png": {
    "type": "image/png",
    "etag": "\"4b2e-2nmjfKBdLzjYeYXFWxtp9fc0TqE\"",
    "mtime": "2024-07-21T03:18:16.550Z",
    "size": 19246,
    "path": "../public/futzo/logos/favicon/apple-icon-precomposed.png"
  },
  "/futzo/logos/favicon/apple-icon.png": {
    "type": "image/png",
    "etag": "\"4b2e-2nmjfKBdLzjYeYXFWxtp9fc0TqE\"",
    "mtime": "2024-07-21T03:18:16.550Z",
    "size": 19246,
    "path": "../public/futzo/logos/favicon/apple-icon.png"
  },
  "/futzo/logos/favicon/browserconfig.xml": {
    "type": "application/xml",
    "etag": "\"119-hTOJtsQnOWWJnrEwLWZeuROV/Qw\"",
    "mtime": "2024-07-21T03:18:16.550Z",
    "size": 281,
    "path": "../public/futzo/logos/favicon/browserconfig.xml"
  },
  "/futzo/logos/favicon/favicon-16x16.png": {
    "type": "image/png",
    "etag": "\"553-6IMX/33brFqzdDNVgSuNwmZAj3w\"",
    "mtime": "2024-07-21T03:18:16.550Z",
    "size": 1363,
    "path": "../public/futzo/logos/favicon/favicon-16x16.png"
  },
  "/futzo/logos/favicon/favicon-32x32.png": {
    "type": "image/png",
    "etag": "\"afb-jn6PR587OYNNlKN8p5haL2HQrA0\"",
    "mtime": "2024-07-21T03:18:16.550Z",
    "size": 2811,
    "path": "../public/futzo/logos/favicon/favicon-32x32.png"
  },
  "/futzo/logos/favicon/favicon-96x96.png": {
    "type": "image/png",
    "etag": "\"25b8-88DXao+6xVPnPBx1O9j5MKTlts4\"",
    "mtime": "2024-07-21T03:18:16.550Z",
    "size": 9656,
    "path": "../public/futzo/logos/favicon/favicon-96x96.png"
  },
  "/futzo/logos/favicon/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"47e-KvTr8xU/6r+wlhNuzUK8W7YkXdw\"",
    "mtime": "2024-07-21T03:18:16.554Z",
    "size": 1150,
    "path": "../public/futzo/logos/favicon/favicon.ico"
  },
  "/futzo/logos/favicon/manifest.json": {
    "type": "application/json",
    "etag": "\"2d0-0R/r+ecIqeEbruN+19xemZAlgL4\"",
    "mtime": "2024-07-21T03:18:16.550Z",
    "size": 720,
    "path": "../public/futzo/logos/favicon/manifest.json"
  },
  "/futzo/logos/favicon/ms-icon-144x144.png": {
    "type": "image/png",
    "etag": "\"3c15-lWLJPFtDO5xdwOJ7M7hM/OoHm3o\"",
    "mtime": "2024-07-21T03:18:16.550Z",
    "size": 15381,
    "path": "../public/futzo/logos/favicon/ms-icon-144x144.png"
  },
  "/futzo/logos/favicon/ms-icon-150x150.png": {
    "type": "image/png",
    "etag": "\"3fa6-rxrX55PXJdvXVoy9mmk9j9Mgk8Q\"",
    "mtime": "2024-07-21T03:18:16.550Z",
    "size": 16294,
    "path": "../public/futzo/logos/favicon/ms-icon-150x150.png"
  },
  "/futzo/logos/favicon/ms-icon-310x310.png": {
    "type": "image/png",
    "etag": "\"b35c-Ii3LghgFNyOb3uf7Rj/mtHyTGW4\"",
    "mtime": "2024-07-21T03:18:16.550Z",
    "size": 45916,
    "path": "../public/futzo/logos/favicon/ms-icon-310x310.png"
  },
  "/futzo/logos/favicon/ms-icon-70x70.png": {
    "type": "image/png",
    "etag": "\"1a4d-lcf5OWhynQZRcYxFtj73n16ZFSU\"",
    "mtime": "2024-07-21T03:18:16.550Z",
    "size": 6733,
    "path": "../public/futzo/logos/favicon/ms-icon-70x70.png"
  },
  "/futzo/logos/icon/logo-01.png": {
    "type": "image/png",
    "etag": "\"2b899-wqAGsJUtNMDieyzLuMAbNTrKuOU\"",
    "mtime": "2024-07-21T03:18:16.558Z",
    "size": 178329,
    "path": "../public/futzo/logos/icon/logo-01.png"
  },
  "/futzo/logos/icon/logo-02.png": {
    "type": "image/png",
    "etag": "\"20c9e-dnbsAZqCR89/FqXTDe5J1IvWfYA\"",
    "mtime": "2024-07-21T03:18:16.566Z",
    "size": 134302,
    "path": "../public/futzo/logos/icon/logo-02.png"
  },
  "/futzo/logos/icon/logo-03.png": {
    "type": "image/png",
    "etag": "\"20ca3-Yg23wjvF6NoaurW25WbuoBv7e88\"",
    "mtime": "2024-07-21T03:18:16.562Z",
    "size": 134307,
    "path": "../public/futzo/logos/icon/logo-03.png"
  },
  "/futzo/logos/icon/logo-04.png": {
    "type": "image/png",
    "etag": "\"1e433-DyNNFdeoUMXCoL1EIYoFWSatByc\"",
    "mtime": "2024-07-21T03:18:16.562Z",
    "size": 123955,
    "path": "../public/futzo/logos/icon/logo-04.png"
  },
  "/futzo/logos/icon/logo-05.png": {
    "type": "image/png",
    "etag": "\"20993-gGXFXroL8Nu8C/o8bOP7uaOQSNI\"",
    "mtime": "2024-07-21T03:18:16.566Z",
    "size": 133523,
    "path": "../public/futzo/logos/icon/logo-05.png"
  },
  "/futzo/logos/text only/logo-16.png": {
    "type": "image/png",
    "etag": "\"11eff-9Q0iqHlG6YZrdylgyeta77+g+9g\"",
    "mtime": "2024-07-21T03:18:16.546Z",
    "size": 73471,
    "path": "../public/futzo/logos/text only/logo-16.png"
  },
  "/futzo/logos/text only/logo-17.png": {
    "type": "image/png",
    "etag": "\"fdec-PWGQ/wETqsGBZifZSrWWqHeEHcw\"",
    "mtime": "2024-07-21T03:18:16.554Z",
    "size": 65004,
    "path": "../public/futzo/logos/text only/logo-17.png"
  },
  "/futzo/logos/text only/logo-18.png": {
    "type": "image/png",
    "etag": "\"fe00-qachdAkDVZw8ypRh9TD1gv+cs3g\"",
    "mtime": "2024-07-21T03:18:16.554Z",
    "size": 65024,
    "path": "../public/futzo/logos/text only/logo-18.png"
  },
  "/futzo/logos/text only/logo-19.png": {
    "type": "image/png",
    "etag": "\"f003-61Nqflx+7NDJmEgYVw0s5y+gK0c\"",
    "mtime": "2024-07-21T03:18:16.554Z",
    "size": 61443,
    "path": "../public/futzo/logos/text only/logo-19.png"
  },
  "/futzo/logos/text only/logo-20.png": {
    "type": "image/png",
    "etag": "\"fb43-HdNgo05+FrgTyesOzBe66VBiZH0\"",
    "mtime": "2024-07-21T03:18:16.554Z",
    "size": 64323,
    "path": "../public/futzo/logos/text only/logo-20.png"
  },
  "/futzo/logos/vertical/logo-06.png": {
    "type": "image/png",
    "etag": "\"1c0fb-omw4nMKL0zWzO0+6Cxvq2TTnKlo\"",
    "mtime": "2024-07-21T03:18:16.546Z",
    "size": 114939,
    "path": "../public/futzo/logos/vertical/logo-06.png"
  },
  "/futzo/logos/vertical/logo-07.png": {
    "type": "image/png",
    "etag": "\"208ee-p9sBTQP3xmMW1DXg0AftyIB4T5k\"",
    "mtime": "2024-07-21T03:18:16.554Z",
    "size": 133358,
    "path": "../public/futzo/logos/vertical/logo-07.png"
  },
  "/futzo/logos/vertical/logo-08.png": {
    "type": "image/png",
    "etag": "\"2097a-1xvvIuecwY76VQbRFhu4i4hysyI\"",
    "mtime": "2024-07-21T03:18:16.554Z",
    "size": 133498,
    "path": "../public/futzo/logos/vertical/logo-08.png"
  },
  "/futzo/logos/vertical/logo-09.png": {
    "type": "image/png",
    "etag": "\"1e49b-ZFH72BF9up6geihSqvPy/1GWEtM\"",
    "mtime": "2024-07-21T03:18:16.554Z",
    "size": 124059,
    "path": "../public/futzo/logos/vertical/logo-09.png"
  },
  "/futzo/logos/vertical/logo-10.png": {
    "type": "image/png",
    "etag": "\"20698-BaRsa5lFove5v9RONX8VJzVjOWw\"",
    "mtime": "2024-07-21T03:18:16.558Z",
    "size": 132760,
    "path": "../public/futzo/logos/vertical/logo-10.png"
  },
  "/_nuxt/builds/meta/fa51b0db-3c71-4455-8da4-e4529a507610.json": {
    "type": "application/json",
    "etag": "\"8b-3c5nyYlVaGA1u3XgylTpKszeSUg\"",
    "mtime": "2024-07-21T03:18:16.342Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/fa51b0db-3c71-4455-8da4-e4529a507610.json"
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

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises$1.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
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
    setResponseHeader(event, "Vary", "Accept-Encoding");
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

const _lazy_8Em2na = () => import('./routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_8Em2na, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_8Em2na, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
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
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
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
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

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
    }).catch((err) => {
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
  server.on("request", function(req, res) {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", function() {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", function(socket) {
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
  process.on("close", function() {
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
    }).then(finalHandler).catch((err) => {
      const errString = typeof err === "string" ? err : JSON.stringify(err);
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
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
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
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
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

export { $fetch as $, createRouter$1 as A, getRequestHeaders as B, splitCookiesString as C, appendResponseHeader as D, getRequestURL as E, FetchError as F, nodeServer as G, send as a, setResponseStatus as b, useNitroApp as c, setResponseHeaders as d, eventHandler as e, getQuery as f, getResponseStatus as g, createError$1 as h, getRouteRules as i, joinRelativeURL as j, getResponseStatusText as k, klona as l, getRequestHeader as m, defu as n, sanitizeStatusCode as o, parse as p, destr as q, isEqual as r, setResponseHeader as s, setCookie as t, useRuntimeConfig as u, getCookie as v, deleteCookie as w, createHooks as x, defuFn as y, toRouteMatcher as z };
//# sourceMappingURL=runtime.mjs.map
