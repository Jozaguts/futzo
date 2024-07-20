import { defineStore } from "pinia";
import type { UpdateUserForm, User } from "~/models/user";
import { toast } from "vuetify-sonner";
import { useSanctumUser } from "#imports";

export const useAuthStore = defineStore("authStore", () => {
  const user = useSanctumUser<User>();
  const role = computed(() => user.value?.roles[0]);
  const isSuperAdmin = computed(() => role.value === "super administrador");
  const avatar = computed(() => user.value?.avatar);
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
  const updateAvatar = async (avatar: File) => {
    const client = useSanctumClient();
    const formData = new FormData();
    formData.append("avatar", avatar);
    client(`api/v1/admin/profile/${user.value?.id}/avatar`, {
      method: "POST",
      body: formData,
    })
      .then(async () => {
        const { refreshIdentity } = useSanctumAuth();
        await refreshIdentity();
        toast.success("Avatar actualizado");
      })
      .catch((error) => {
        const message = error?.data?.message || "Error al actualizar el avatar";
        toast.error(message);
      });
  };

  return {
    role,
    isSuperAdmin,
    user,
    updateUser,
    avatar,
    updateAvatar,
  };
});
