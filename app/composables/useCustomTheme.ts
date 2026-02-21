import type { StorageLike } from '@vueuse/core';

export function useCustomTheme() {
  const { $vuetify } = useNuxtApp();
  const colorStorage: StorageLike = {
    getItem: (key: string) => {
      if (typeof window === 'undefined' || typeof window.localStorage?.getItem !== 'function') {
        return null;
      }

      return window.localStorage.getItem(key);
    },
    setItem: (key: string, value: string) => {
      if (typeof window === 'undefined' || typeof window.localStorage?.setItem !== 'function') {
        return;
      }

      window.localStorage.setItem(key, value);
    },
    removeItem: (key: string) => {
      if (typeof window === 'undefined' || typeof window.localStorage?.removeItem !== 'function') {
        return;
      }

      window.localStorage.removeItem(key);
    },
  };

  const isDark = useDark({
    valueDark: 'dark',
    valueLight: 'light',
    initialValue: 'light',
    storage: colorStorage,
    onChanged: (dark: boolean) => {
      $vuetify.theme.change(dark ? 'dark' : 'light');
    },
  });

  const toggle = useToggle(isDark);

  return { isDark, toggle };
}
