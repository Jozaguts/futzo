import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', () => {
  const { mobile } = useVDisplay();

  const isMobile = computed(() => mobile.value);
  const isLoading = ref(true);
  const appName = ref(useNuxtApp().$config.public.appName);
  const rail = ref(false);
  const drawerWidth = ref<number>(0);
  const showFooter = ref(true);

  const drawer = ref(true);

  return {
    isLoading,
    drawer,
    appName,
    isMobile,
    rail,
    drawerWidth,
    showFooter,
  };
});
