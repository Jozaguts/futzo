import Notification from "@/components/notifications/index.vue";

const colors = {
  success: {
    color: "#4CA30D",
    background: "#F3FEE7",
  },
  warning: {
    color: "#DC6803",
    background: "#FFF8E6",
  },
  error: {
    color: "#F04438",
    background: "#FFEDEE",
  },
  info: {
    color: "#155EEF",
    background: "#EFF4FF",
  },
};
type toastTypes = "success" | "warning" | "error" | "info";
export const useToast = () => {
  const { $toast } = useNuxtApp();
  const toast = (type: toastTypes, msg: string) => {
    return $toast.custom(markRaw(Notification), {
      componentProps: {
        msg,
        closeIcon: `futzo-icon:${type}-close-alert`,
        typeIcon: `futzo-icon:${type}-alert`,
        color: colors[type].color,
        backgroundColor: colors[type].background,
        type,
      },
    });
  };
  return { toast };
};
