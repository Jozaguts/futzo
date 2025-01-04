import {defineStore} from "pinia";
import type {UpdateUserForm, UpdateUserPasswordForm, User,} from "~/models/user";

export const useAuthStore = defineStore("authStore", () => {
    const {toast} = useToast();
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
            const {refreshIdentity} = useSanctumAuth();
            await refreshIdentity();
            toast(
                "success",
                "Perfil Actualizado",
                "Tu perfil se ha actualizado exitosamente.",
            );
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
                toast(
                    "success",
                    "Contraseña actualizada",
                    "Tu contraseña se ha actualizado exitosamente.",
                );
            })
            .catch((error) => {
                const message =
                    error?.data?.message ||
                    "No se pudo actualizar la contraseña. Verifica tu información e inténtalo de nuevo.";
                toast("error", "Error al Actualizar Contraseña", message);
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
                const {refreshIdentity} = useSanctumAuth();
                await refreshIdentity();
                toast(
                    "success",
                    "Imagen actualizada",
                    "Tu imagen se ha actualizado exitosamente.",
                );
            })
            .catch((error) => {
                const message =
                    error?.data?.message ||
                    "No se pudo actualizar tu imagen. Verifica tu información e inténtalo de nuevo.";
                toast("error", "Error al actualizar tu imagen", message);
            });
    };
    const reSendCode = (param: string, type: string) => {
        const client = useSanctumClient();
        client(`api/v1/verify-code/resend?${type}=${param}`)
            .then((response) => {
                useToast().toast(
                    "success",
                    "Código reenviado",
                    "Tu código de verificación ha sido reenviado exitosamente.",
                );
            })
            .catch((error) => {
                toast(
                    "error",
                    "Error al reenviar el código",
                    error?.data?.message ??
                    "Ha ocurrido un error al intentar reenviar tu código de verificación. Por favor, intenta nuevamente más tarde.",
                );
            });
    };

    return {
        role,
        isSuperAdmin,
        user,
        image,
        updateUser,
        updateImage,
        updatePassword,
        reSendCode,
    };
});
