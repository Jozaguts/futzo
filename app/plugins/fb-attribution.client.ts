// plugins/fb-attribution.client.ts
export default defineNuxtPlugin(() => {
  if (import.meta.server) return;

  const STORAGE_KEYS = {
    fbclid: 'fbclid',
    fbp: '_fbp',
    fbc: '_fbc',
    utm: 'futzo:utm',
  } as const;

  const readCookie = (name: string) => {
    return (
      document.cookie
        .split('; ')
        .find((raw) => raw.startsWith(name + '='))
        ?.split('=')[1] || ''
    );
  };

  const writeCookie = (name: string, value: string) => {
    if (!value) return;
    document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * 730}; SameSite=Lax`;
  };

  const readLocal = (key: string) => {
    try {
      return window.localStorage.getItem(key) || '';
    } catch (e) {
      return '';
    }
  };

  const writeLocal = (key: string, value: string) => {
    if (!value) return;
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      // ignore storage quota issues
    }
  };

  const readLocalJson = <T>(key: string): T | null => {
    const raw = readLocal(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch (e) {
      return null;
    }
  };

  const persistAttribution = () => {
    const qs = new URLSearchParams(location.search);

    const queryFbclid = qs.get('fbclid') || '';
    const storedFbclid = readLocal(STORAGE_KEYS.fbclid);
    const fbclid = queryFbclid || storedFbclid;
    if (fbclid) {
      writeLocal(STORAGE_KEYS.fbclid, fbclid);
    }

    const cookieFbp = readCookie(STORAGE_KEYS.fbp);
    const queryFbp = qs.get('fbp') || '';
    const storedFbp = readLocal(STORAGE_KEYS.fbp);
    const fbp = cookieFbp || queryFbp || storedFbp;
    if (fbp) {
      writeCookie(STORAGE_KEYS.fbp, fbp);
      writeLocal(STORAGE_KEYS.fbp, fbp);
    }

    const cookieFbc = readCookie(STORAGE_KEYS.fbc);
    const queryFbc = qs.get('fbc') || '';
    const storedFbc = readLocal(STORAGE_KEYS.fbc);
    let fbc = cookieFbc || queryFbc || storedFbc;
    if (!fbc && fbclid) {
      // Generate a fallback _fbc using fbclid as Meta recommends
      fbc = `fb.1.${Math.floor(Date.now() / 1000)}.${fbclid}`;
    }
    if (fbc) {
      writeCookie(STORAGE_KEYS.fbc, fbc);
      writeLocal(STORAGE_KEYS.fbc, fbc);
    }

    const storedUtm = readLocalJson<Record<string, string>>(STORAGE_KEYS.utm) || {};
    const utm: Record<string, string> = { ...storedUtm };
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((key) => {
      const value = qs.get(key);
      if (value) {
        utm[key] = value;
      }
    });
    if (Object.keys(utm).length) {
      writeLocal(STORAGE_KEYS.utm, JSON.stringify(utm));
    }
  };

  const getAttribution = () => {
    const utm = readLocalJson<Record<string, string>>(STORAGE_KEYS.utm) || {};
    return {
      fbclid: readLocal(STORAGE_KEYS.fbclid),
      fbp: readLocal(STORAGE_KEYS.fbp) || readCookie(STORAGE_KEYS.fbp),
      fbc: readLocal(STORAGE_KEYS.fbc) || readCookie(STORAGE_KEYS.fbc),
      utm,
    };
  };

  const buildAppUrl = (baseUrl?: string, opts: { eventId?: string; extraParams?: Record<string, string> } = {}) => {
    if (!baseUrl) return baseUrl || '';

    let url: URL;
    try {
      url = new URL(baseUrl);
    } catch (e) {
      url = new URL(baseUrl, window.location.origin);
    }

    const attr = getAttribution();
    if (attr.fbclid && !url.searchParams.get('fbclid')) {
      url.searchParams.set('fbclid', attr.fbclid);
    }
    if (attr.fbp && !url.searchParams.get('fbp')) {
      url.searchParams.set('fbp', attr.fbp);
    }
    if (attr.fbc && !url.searchParams.get('fbc')) {
      url.searchParams.set('fbc', attr.fbc);
    }
    Object.entries(attr.utm).forEach(([key, value]) => {
      if (value && !url.searchParams.get(key)) {
        url.searchParams.set(key, value);
      }
    });
    if (opts.eventId) {
      url.searchParams.set('event_id', opts.eventId);
    }
    if (opts.extraParams) {
      Object.entries(opts.extraParams).forEach(([key, value]) => {
        if (value) {
          url.searchParams.set(key, value);
        }
      });
    }

    return url.toString();
  };

  persistAttribution();

  return {
    provide: {
      buildAppUrl,
      attribution: {
        get: getAttribution,
        refresh: persistAttribution,
      },
    },
  };
});
