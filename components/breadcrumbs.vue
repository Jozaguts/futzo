<script lang="ts" setup>
import { useAuthStore } from "~/store";

const routeName = computed(() => useRoute().name);
const leagueName = computed(() => useAuthStore().user?.league?.name);
const breadcrumbs = computed(() => {
  switch (routeName.value) {
    case "index":
      return [
        {
          title: "Dashboard",
          to: "/",
        },
      ];
    case "torneos":
      return [leagueName.value];
    case "torneos-torneo":
      return [
        {
          title: leagueName.value,
          to: "/torneos",
        },
        {
          title: useRoute().path.split("/")[2],
          to: useRoute().path,
        },
      ];
    case "calendario":
      return ["Calendario"];
    case "equipos":
      return ["Equipos"];
    case "jugadores":
      return ["Jugadores"];
    case "mvp":
      return ["MVP"];
    case "roles-permisos":
      return ["Roles y Permisos"];
    case "configuracion":
      return ["Configuración"];
    case "equipos-inscribir":
      return [
        {
          title: "Equipos",
          to: "/equipos",
        },
        "Inscribir",
      ];
    default:
      return [
        {
          title: "home",
          to: "/",
        },
        {
          title: "torneos",
          to: "/torneos",
        },
        {
          title: routeName.value,
          to: useRoute().path,
        },
      ];
  }
});
</script>
<template>
  <v-breadcrumbs :items="breadcrumbs" :disabled="false">
    <template v-slot:title="{ item, index }">
      <span class="text-breadcrumbs" :class="index > 0 ? 'text-primary' : ''">{{
        item.title
      }}</span>
    </template>
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
</template>
<style lang="sass">
.v-breadcrumbs-item--disabled
  opacity: 1
.text-breadcrumbs
  color: #182230
  font-style: normal
  font-weight: 500
  letter-spacing: -0.72px
  font-size: 20px
  line-height: 30px
.text-breadcrumbs.text-primary
  font-weight: 700
</style>
