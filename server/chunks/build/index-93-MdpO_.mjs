import { getCurrentScope, onScopeDispose, unref } from 'vue';

function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const noop = () => {
};
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer2) => {
    clearTimeout(timer2);
    lastRejector();
    lastRejector = noop;
  };
  const filter = (invoke2) => {
    const duration = toValue(ms);
    const maxDuration = toValue(options.maxWait);
    if (timer)
      _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = null;
      }
      return Promise.resolve(invoke2());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer);
          maxTimer = null;
          resolve(invoke2());
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer);
        maxTimer = null;
        resolve(invoke2());
      }, duration);
    });
  };
  return filter;
}
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(
    debounceFilter(ms, options),
    fn
  );
}

export { tryOnScopeDispose as a, toValue as t, useDebounceFn as u };
//# sourceMappingURL=index-93-MdpO_.mjs.map
