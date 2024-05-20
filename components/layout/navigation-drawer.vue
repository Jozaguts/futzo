<template>
  <v-navigation-drawer
      permanent
      v-model="drawer"
      :rail="rail"
      color="background"
      elevation="0"
      :border="false"
      @click="rail = false"
      >
    <v-list-item
        nav
        ref="drawerRef"
    >
      <template #default>
        <Logo />
      </template>
      <template v-slot:append>
        <v-btn
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="rail = !rail"
        ></v-btn>
      </template>
      <template #prepend>
        <v-btn
            v-if="rail"
            icon="mdi-menu"
            variant="text"
            @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

     <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item  v-if="rail" value="futzo" class="pa-0" disabled>
        <template #default>
         <CirucularLogo />
        </template>
      </v-list-item>
      <v-list-item
          density="compact"
          v-for="link in adminLinks"
          :key="link.title"
          link
          :to="link.to"
          :disabled="link.disabled"
          class="my-1"
          :prepend-icon="link.icon"
          :title="link.title"
      />
      <LinkSeparator name="Liga"></LinkSeparator>
      <v-list-item
          density="compact"
          v-for="link in leagueLinks"
          :key="link.title"
          link
          :to="link.to"
          :disabled="link.disabled"
          class="my-1"
          :prepend-icon="link.icon"
          :title="link.title"
      >
      </v-list-item>
      <v-list-group value="teams">
        <template v-slot:activator="{ props }">
          <v-list-item
              v-bind="props"
              title="Equipos"
              prepend-icon="mdi-account-group"
          ></v-list-item>
        </template>
        <v-list-item
            variant="text"
            density="compact"
            v-for="link in teamLinks"
            :key="link.title"
            link
            :to="link.to"
            :disabled="link.disabled"
            :prepend-icon="link.icon"
            :title="link.title"
        >
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts" setup>
import { useResizeObserver } from '@vueuse/core'
import LinkSeparator from "~/components/layout/link-separator.vue";
import {useAuthStore, useGlobalStore} from "~/store";
import {storeToRefs} from "pinia";
import CirucularLogo from "~/components/CirucularLogo.vue";
const { drawer,drawerWidth, isMobile, appName, rail } = storeToRefs(useGlobalStore())
const drawerRef = ref('')
const authStore = useAuthStore()
const adminLinks = reactive([
  { icon: 'mdi-home', title: 'Home', to: '/', disabled: false},
  { icon: 'mdi-users', title: 'Roles y Permisos', to: '/roles-permisos', disabled: authStore?.role !== 'super administrador'},
])
const leagueLinks = reactive([
  { icon: 'mdi-trophy-variant', title: 'Torneos', to: '/torneos', disabled: false},
  { icon: 'mdi-calendar', title: 'Calendario', to: '/calendario', disabled: false},
])
const teamLinks = reactive([
  { icon: 'mdi-clipboard-list-outline', title: 'Ver Equipo', to: '/equipos', disabled: false},
  { icon: 'mdi-add', title: 'Inscribir Equipo', to: '/equipos/inscribir', disabled: false},
])

useResizeObserver(drawerRef, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  drawerWidth.value = width
})
</script>
<style scoped>
.v-list-item >>> .v-list-item__append:last-child{
  align-self: start; /* Tu estilo personalizado */
}
</style>
