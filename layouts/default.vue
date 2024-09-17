<template>
  <NuxtLoadingIndicator color="#9155FD" :height="6" />
  <div>
    <v-layout>
      <v-app app>
        <ClientOnly>
          <VSonner position="top-right" />
        </ClientOnly>
        <ClientOnly>
          <Navigation> </Navigation>
          <v-main v-show="show" class="v-main" app>
            <slot></slot>
          </v-main>
          <v-footer
            color="white"
            app
            class="d-flex justify-start align-center"
            height="64px"
          >
            <span class="caption ml-4">© 2021 Futzo</span>
          </v-footer>
        </ClientOnly>
      </v-app>
    </v-layout>
  </div>
</template>

<script setup lang="ts">
import Navigation from "~/components/layout/navigation-drawer.vue";
import { VSonner } from "vuetify-sonner";
import { useGlobalStore } from "~/store";
import { storeToRefs } from "pinia";

const show = ref(false);
const { rail } = storeToRefs(useGlobalStore());
onMounted(() => {
  show.value = true;
});
const paddingLeft = computed(() => {
  return rail.value ? "56px" : "256px";
});
const isNotConfigurationPage = computed(() => {
  return useRoute().name !== "configuracion";
});
</script>
<style>
.v-main {
  padding-left: v-bind(paddingLeft);
  padding-bottom: 64px;
}
@media (min-width: 920px) {
  .v-main {
    padding-left: v-bind(paddingLeft);
  }
}
</style>
