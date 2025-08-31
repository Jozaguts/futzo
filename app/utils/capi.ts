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
      return val;
    } catch {
      return fromCookie || '';
    }
  })();

  const rawFbc = cookieVal('_fbc') || '';

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
  const fbc = rawFbc || (fbclid ? `fb.1.${Math.floor(Date.now() / 1000)}.${fbclid}` : '');

  const event_id = (() => {
    // Prefer crypto.randomUUID if available in browser or runtime
    try {
      const anyCrypto: any = (isBrowser ? (window as any).crypto : (globalThis as any).crypto) || undefined;
      if (anyCrypto?.randomUUID) return anyCrypto.randomUUID();
    } catch {}
    // Fallback: timestamp + random suffix
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  })();

  return { fbp, fbc, fbclid, event_id } as {
    fbp: string;
    fbc: string;
    fbclid: string;
    event_id: string;
  };
}
