import Notification from '@/components/notifications/index.vue';
import type { ToastOptions } from '@/interfaces';
const colors = {
  success: {
    color: '#4CA30D',
    background: '#F3FEE7',
  },
  warning: {
    color: '#DC6803',
    background: '#FFF8E6',
  },
  error: {
    color: '#F04438',
    background: '#FFEDEE',
  },
  info: {
    color: '#155EEF',
    background: '#EFF4FF',
  },
};

export const useToast = () => {
  const { $toast } = useNuxtApp();
  const toast = ({ type, msg, description, action, duration = 5000 }: ToastOptions) => {
    useGlobalStore().toastDuration = duration;
    return $toast.custom(markRaw(Notification), {
      componentProps: {
        msg,
        description,
        closeIcon: `futzo-icon:${type}-close-alert`,
        typeIcon: `futzo-icon:${type}-alert`,
        color: colors[type].color,
        backgroundColor: colors[type].background,
        type,
        action,
      },
    });
  };
  return { toast };
};
