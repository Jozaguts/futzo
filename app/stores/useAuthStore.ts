import { defineStore } from 'pinia';
import type { ResetPasswordState, UpdateUserForm, UpdateUserPasswordForm, User } from '~/models/User';
import { useToast } from '~/composables/useToast';

export const useAuthStore = defineStore(
  'authStore',
  () => {
    const { toast } = useToast();
    const user = useSanctumUser<User>();
    const role = computed(() => user.value?.roles[0]);
    const isSuperAdmin = computed(() => role.value === 'super administrador');
    const image = computed(() => user.value?.image);
    const resendingVerificationCode = ref(false);
    const forgotPasswordState = ref<ResetPasswordState>({
      step: 'reset-password',
      username: '',
      areaCode: '+52',
      isPhone: false,
      isFetching: false,
      code: '',
      token: '',
    });
    const errorMessage = ref<string>('');
    const resetForgotPasswordState = () => {
      forgotPasswordState.value = {
        step: 'reset-password',
        username: '',
        areaCode: '+52',
        isPhone: false,
        isFetching: false,
        code: '',
        token: '',
      };
    };
    const updateUser = (updateUserForm: UpdateUserForm) => {
      const client = useSanctumClient();
      client(`api/v1/admin/profile/${updateUserForm.id}`, {
        method: 'PUT',
        body: updateUserForm,
      }).then(async () => {
        const { refreshIdentity } = useSanctumAuth();
        await refreshIdentity();
        toast({
          type: 'success',
          msg: 'Perfil Actualizado',
          description: 'Tu perfil se ha actualizado exitosamente.',
        });
      });
    };
    const updatePassword = (updateUserPasswordForm: UpdateUserPasswordForm) => {
      const client = useSanctumClient();

      client(`api/v1/admin/profile/${updateUserPasswordForm.id}/password`, {
        method: 'PUT',
        body: {
          ...updateUserPasswordForm,
        },
      })
        .then(() => {
          toast({
            type: 'success',
            msg: 'Contraseña actualizada',
            description: 'Tu contraseña se ha actualizado exitosamente.',
          });
        })
        .catch((error) => {
          const message =
            error?.data?.message ||
            'No se pudo actualizar la contraseña. Verifica tu información e inténtalo de nuevo.';
          toast({ type: 'error', msg: 'Error al Actualizar Contraseña', description: message });
        });
    };
    const updateImage = async (image: File) => {
      const client = useSanctumClient();
      const formData = new FormData();
      formData.append('image', image);
      client(`api/v1/admin/profile/${user.value?.id}/image`, {
        method: 'POST',
        body: formData,
      })
        .then(async () => {
          const { refreshIdentity } = useSanctumAuth();
          await refreshIdentity();
          toast({
            type: 'success',
            msg: 'Imagen actualizada',
            description: 'Tu imagen se ha actualizado exitosamente.',
          });
        })
        .catch((error) => {
          const message =
            error?.data?.message || 'No se pudo actualizar tu imagen. Verifica tu información e inténtalo de nuevo.';
          toast({ type: 'error', msg: 'Error al actualizar tu imagen', description: message });
        });
    };
    const reSendCode = async (param: string, type: string) => {
      resendingVerificationCode.value = true;
      const client = useSanctumClient();
      client(`api/v1/verify-code/resend?${type}=${param}`)
        .then(() => {
          useToast().toast({
            type: 'success',
            msg: 'Código reenviado',
            description: 'Tu código de verificación ha sido reenviado exitosamente.',
          });
        })
        .catch((error) => {
          toast({
            type: 'error',
            msg: 'Error al reenviar el código',
            description:
              error?.data?.message ??
              'Ha ocurrido un error al intentar reenviar tu código de verificación. Por favor, intenta nuevamente más tarde.',
          });
        })
        .finally(() => (resendingVerificationCode.value = false));
    };
    const isOperational = computed(() => !!user?.value?.is_operational);

    return {
      role,
      isSuperAdmin,
      user,
      image,
      forgotPasswordState,
      resendingVerificationCode,
      errorMessage,
      isOperational,
      updateUser,
      updateImage,
      updatePassword,
      reSendCode,
      resetForgotPasswordState,
    };
  },
  {
    persist: {
      pick: ['user', 'role', 'isSuperAdmin', 'image', 'errorMessage'],
    },
  }
);
