export function capiContext() {
  // SSR-safe guards: if not in browser, return minimal context
  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

  const cookieVal = (n: string) => {
    if (!isBrowser) return '';
    return (
      document.cookie
        .split('; ')
        .find((r) => r.startsWith(n + '='))
        ?.split('=')[1] || ''
    );
  };

  // Prefer cookie -> URL param -> localStorage for fbp
  const fbp = (() => {
    if (!isBrowser) return '';
    const fromCookie = cookieVal('_fbp');
    try {
      const params = new URL(window.location.href).searchParams;
      const fromUrl = params.get('fbp') || '';
      const fromLs = localStorage.getItem('_fbp') || '';
      const val = fromCookie || fromUrl || fromLs || '';
      if (fromUrl && fromUrl !== fromLs) localStorage.setItem('_fbp', fromUrl);
      else if (!fromLs && fromCookie) localStorage.setItem('_fbp', fromCookie);
      return val;
    } catch {
      const fromLs = localStorage.getItem('_fbp') || '';
      return fromCookie || fromLs || '';
    }
  })();

  const rawFbc = (() => {
    if (!isBrowser) return '';
    const fromCookie = cookieVal('_fbc');
    const fromLs = localStorage.getItem('_fbc') || '';
    return fromCookie || fromLs || '';
  })();

  const fbclid = (() => {
    if (!isBrowser) return '';
    try {
      const params = new URL(window.location.href).searchParams;
      const fromUrl = params.get('fbclid') || '';
      const fromLs = localStorage.getItem('fbclid') || '';
      const val = fromUrl || fromLs || '';
      if (fromUrl && fromUrl !== fromLs) localStorage.setItem('fbclid', fromUrl);
      return val;
    } catch {
      return '';
    }
  })();

  // If there's no _fbc cookie but we have fbclid, construct fbc per Meta format
  const fbc = (() => {
    if (!isBrowser) return '';
    if (rawFbc) return rawFbc;
    if (fbclid) {
      const generated = `fb.1.${Math.floor(Date.now() / 1000)}.${fbclid}`;
      try {
        localStorage.setItem('_fbc', generated);
      } catch {}
      try {
        document.cookie = `_fbc=${generated}; path=/; SameSite=Lax`;
      } catch {}
      return generated;
    }
    return '';
  })();

  // Optional: test event code for Meta Test Events
  const test_event_code = (() => {
    if (!isBrowser) return '';
    try {
      const params = new URL(window.location.href).searchParams;
      const fromUrl = params.get('capi_test') || '';
      const fromLs = localStorage.getItem('META_TEST_EVENT_CODE') || '';
      const val = fromUrl || fromLs || '';
      if (fromUrl && fromUrl !== fromLs) localStorage.setItem('META_TEST_EVENT_CODE', fromUrl);
      return val;
    } catch {
      return '';
    }
  })();

  const event_id = (() => {
    if (!isBrowser) return '';
    const storageKey = 'capi:event_id';
    const getStored = () => {
      try {
        return window.localStorage.getItem(storageKey) || '';
      } catch {
        return '';
      }
    };

    try {
      const params = new URL(window.location.href).searchParams;
      const fromUrl = params.get('event_id') || '';
      const fromLs = getStored();
      const chosen = fromUrl || fromLs || '';
      if (fromUrl && fromUrl !== fromLs) window.localStorage.setItem(storageKey, fromUrl);
      if (chosen) {
        try {
          window.localStorage.removeItem(storageKey);
        } catch {}
        return chosen;
      }
    } catch {
      const stored = getStored();
      if (stored) {
        try {
          window.localStorage.removeItem(storageKey);
        } catch {}
        return stored;
      }
    }

    const generateFallback = () => {
      try {
        const anyCrypto: any = (window as any).crypto || (globalThis as any).crypto;
        if (anyCrypto?.randomUUID) return anyCrypto.randomUUID();
      } catch {}
      return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    };

    const fallback = generateFallback();
    try {
      window.localStorage.setItem(storageKey, fallback);
    } catch {}
    return fallback;
  })();

  return { fbp, fbc, fbclid, event_id, test_event_code } as {
    fbp: string;
    fbc: string;
    fbclid: string;
    event_id: string;
    test_event_code: string;
  };
}
