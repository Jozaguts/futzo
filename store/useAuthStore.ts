import { defineStore } from "pinia";
import type {
  UpdateUserForm,
  UpdateUserPasswordForm,
  User,
} from "~/models/user";
import { toast } from "vuetify-sonner";

export const useAuthStore = defineStore("authStore", () => {
  const user = useSanctumUser<User>();
  const role = computed(() => user.value?.roles[0]);
  const isSuperAdmin = computed(() => role.value === "super administrador");
  const image = computed(() => user.value?.image);
  const updateUser = (updateUserForm: UpdateUserForm) => {
    const client = useSanctumClient();
    client(`api/v1/admin/profile/${updateUserForm.id}`, {
      method: "PUT",
      body: updateUserForm,
    }).then(async () => {
      const { refreshIdentity } = useSanctumAuth();
      await refreshIdentity();
      toast.success("Perfil actualizado");
    });
  };
  const updatePassword = (updateUserPasswordForm: UpdateUserPasswordForm) => {
    const client = useSanctumClient();

    client(`api/v1/admin/profile/${updateUserPasswordForm.id}/password`, {
      method: "PUT",
      body: {
        ...updateUserPasswordForm,
      },
    })
      .then(() => {
        toast.success("Contraseña actualizada");
      })
      .catch((error) => {
        const message =
          error?.data?.message || "Error al actualizar la contraseña";
        toast.error(message);
      });
  };
  const updateImage = async (image: File) => {
    const client = useSanctumClient();
    const formData = new FormData();
    formData.append("image", image);
    client(`api/v1/admin/profile/${user.value?.id}/image`, {
      method: "POST",
      body: formData,
    })
      .then(async () => {
        const { refreshIdentity } = useSanctumAuth();
        await refreshIdentity();
        toast.success("image actualizada");
      })
      .catch((error) => {
        const message = error?.data?.message || "Error al actualizar la imagen";
        toast.error(message);
      });
  };

  return {
    role,
    isSuperAdmin,
    user,
    updateUser,
    image,
    updateImage,
    updatePassword,
  };
});
