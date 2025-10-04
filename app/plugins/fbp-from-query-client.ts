// plugins/fbp-from-query.client.ts (en futzo.io)
export default defineNuxtPlugin(() => {
  if (process.server) return;

  const readCookie = (name: string) =>
    document.cookie
      .split('; ')
      .find((raw) => raw.startsWith(name + '='))
      ?.split('=')[1] || '';

  const writeCookie = (name: string, value: string, days = 730) => {
    if (!value) return;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  };

  const readLocal = (key: string) => {
    try {
      return window.localStorage.getItem(key) || '';
    } catch {
      return '';
    }
  };

  const writeLocal = (key: string, value: string) => {
    if (!value) return;
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // ignore storage quota errors
    }
  };

  const persist = () => {
    const qs = new URLSearchParams(location.search);

    const fbclid = qs.get('fbclid') || '';
    if (fbclid) writeLocal('fbclid', fbclid);

    const queryFbp = qs.get('fbp') || '';
    const cookieFbp = readCookie('_fbp');
    const fbp = cookieFbp || queryFbp || readLocal('_fbp') || '';
    if (fbp) {
      writeCookie('_fbp', fbp);
      writeLocal('_fbp', fbp);
    }

    const queryFbc = qs.get('fbc') || '';
    const cookieFbc = readCookie('_fbc');
    let fbc = cookieFbc || queryFbc || readLocal('_fbc') || '';
    if (!fbc && fbclid) {
      fbc = `fb.1.${Math.floor(Date.now() / 1000)}.${fbclid}`;
    }
    if (fbc) {
      writeCookie('_fbc', fbc);
      writeLocal('_fbc', fbc);
    }

    const eventId = qs.get('event_id') || '';
    if (eventId) {
      writeLocal('capi:event_id', eventId);
    }

    const testEventCode = qs.get('capi_test') || '';
    if (testEventCode) {
      writeLocal('META_TEST_EVENT_CODE', testEventCode);
    }

    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
    const storedUtm = (() => {
      const raw = readLocal('capi:utm');
      if (!raw) return {} as Record<string, string>;
      try {
        return JSON.parse(raw) as Record<string, string>;
      } catch {
        return {} as Record<string, string>;
      }
    })();

    let utmUpdated = false;
    utmKeys.forEach((key) => {
      const value = qs.get(key);
      if (value) {
        storedUtm[key] = value;
        utmUpdated = true;
      }
    });
    if (utmUpdated) {
      writeLocal('capi:utm', JSON.stringify(storedUtm));
    }
  };

  persist();
});
