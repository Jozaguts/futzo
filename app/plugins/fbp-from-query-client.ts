// plugins/fbp-from-query.client.ts (en futzo.io)
export default defineNuxtPlugin(() => {
  if (process.server) return;

  const readCookie = (n: string) =>
    document.cookie
      .split('; ')
      .find((r) => r.startsWith(n + '='))
      ?.split('=')[1] || '';
  const writeCookie = (n: string, v: string, days = 90) => {
    const d = new Date();
    d.setTime(d.getTime() + days * 864e5);
    document.cookie = `${n}=${v}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
  };

  const qs = new URLSearchParams(location.search);
  const fbpParam = qs.get('fbp');
  const fbpCookie = readCookie('_fbp');

  // Si no hay _fbp en este dominio y viene por query, créalo.
  if (!fbpCookie && fbpParam) writeCookie('_fbp', fbpParam);
});
