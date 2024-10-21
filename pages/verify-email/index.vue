<script lang="ts" setup>
import OtpCard from "~/components/pages/verify-email/cards/otp-card.vue";
import VerifiedCard from "~/components/pages/verify-email/cards/verified-card.vue";
import { useGlobalStore } from "~/store";

definePageMeta({
  layout: "blank",
  bodyAttrs: {
    class: "d-none",
  },
  // tiene que ser excluido para que el middleware 01-verify-email funcione
  sanctum: {
    excluded: true,
  },
});

const email = useRoute().query.email ?? "";
const currentComponent = ref("OtpCard");
let setTimeoutId: any = null;
const verifyEmail = (code) => {
  const client = useSanctumClient();
  client(`/verify-email`, {
    method: "POST",
    body: {
      code: code,
      email: email,
    },
  })
    .then((response) => {
      useGlobalStore().showSuccessNotification({
        message: response?.message ?? "Correo verificado",
      });
      currentComponent.value = "VerifiedCard";
    })
    .catch((error) => {
      const errorMessage = error?.data?.message ?? "Ha ocurrido un error";
      if (error.response.status === 401) {
        useGlobalStore().showErrorNotification({
          message: errorMessage + "redirigiendo...",
        });
        setTimeoutId = setTimeout(() => {
          useRouter().push({ name: "login", params: { email: email } });
        }, 3000);
      } else {
        useGlobalStore().showErrorNotification({ message: errorMessage });
      }
    });
};
onUnmounted(() => {
  if (setTimeoutId) {
    clearTimeout(setTimeoutId);
  }
});
const components = {
  OtpCard,
  VerifiedCard,
};
const eventHandler = (event: { action: string; code?: string }) => {
  if (event.action === "verify-email") {
    verifyEmail(event?.code);
  }
  if (event.action === "email-verified") {
    useRouter().push({ name: "login", params: { email: email } });
  }
};
</script>
<template>
  <div class="verify-email-main-container">
    <Logo width="200" class="mx-auto"></Logo>
    <div class="verify-email-container">
      <component
        :is="components[currentComponent]"
        @event="eventHandler"
      ></component>
    </div>
  </div>
</template>
<style lang="scss">
@use "~/assets/scss/components/cards.scss";
@use "~/assets/scss/pages/verify-email.scss";
</style>
