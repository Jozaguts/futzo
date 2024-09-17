<script setup lang="ts">
import { useGlobalStore } from "~/store";
import PageLayout from "~/components/shared/page-layout/index.vue";
import AppBar from "~/components/layout/app-bar.vue";
import AppBarBtn from "~/components/pages/dashboard/app-bar-btn.vue";

watchEffect(() => {
  const route = useRoute();
  const router = useRouter();
  const globalStore = useGlobalStore();
  if (route.query?.code === "USER_NOT_VERIFIED") {
    globalStore.showErrorNotification({
      message: "Correo electrónico no ha sido verificado",
    });
    router.replace("/");
  }
});
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar>
        <template #buttons>
          <AppBarBtn />
        </template>
      </AppBar>
    </template>
  </PageLayout>
</template>
