import { defineStore } from "pinia";
import { useDisplay } from "vuetify";
import { toast } from "vuetify-sonner";

export const useGlobalStore = defineStore("global", () => {
  const { mobile } = useDisplay();

  const isMobile = computed(() => mobile.value);
  const isLoading = ref(true);
  const appName = ref(useNuxtApp().$config.public.appName);
  const rail = ref(false);
  const drawerWidth = ref<number>(0);
  const showFooter = ref(true);

  const drawer = ref(true);
  const showSuccessNotification = (props: { message: string }) => {
    toast.success(props.message);
  };
  const showErrorNotification = (props: { message: string }) => {
    toast.error(props.message);
  };

  return {
    isLoading,
    drawer,
    appName,
    isMobile,
    rail,
    drawerWidth,
    showFooter,
    showSuccessNotification,
    showErrorNotification,
  };
});
