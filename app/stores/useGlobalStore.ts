import { defineStore } from 'pinia';
import { useDisplay } from 'vuetify/framework';

export const useGlobalStore = defineStore('global', () => {
  const { mobile } = useDisplay();

  const isMobile = computed(() => mobile.value);
  const isLoading = ref(true);
  const appName = ref(useNuxtApp().$config.public.appName);
  const rail = ref(false);
  const drawerWidth = ref<number>(0);
  const showFooter = ref(true);
  const toastDuration = ref(5000);
  const toastId = ref();

  const drawer = ref(true);

  return {
    isLoading,
    drawer,
    appName,
    isMobile,
    rail,
    drawerWidth,
    showFooter,
    toastDuration,
    toastId,
  };
});
