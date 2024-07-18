import { defineStore } from "pinia";
import type { UpdateUserForm, User } from "~/models/user";
import { toast } from "vuetify-sonner";
import { useSanctumUser } from "#imports";

export const useAuthStore = defineStore("authStore", () => {
  const user = useSanctumUser<User>();
  const role = computed(() => user.value?.roles[0]);
  const isSuperAdmin = computed(() => role.value === "super administrador");
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

  return {
    role,
    isSuperAdmin,
    user,
    updateUser,
  };
});
