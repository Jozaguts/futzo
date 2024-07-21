<script lang="ts" setup>
import { useResizeObserver } from "@vueuse/core";
import { useAuthStore, useGlobalStore } from "~/store";
import { storeToRefs } from "pinia";
import CircularLogo from "~/components/CircularLogo.vue";

const { drawer, drawerWidth, isMobile, appName, rail } =
  storeToRefs(useGlobalStore());
const drawerRef = ref();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const adminLinks = reactive([
  {
    icon: "mdi-users",
    title: "Roles y Permisos",
    to: "/roles-permisos",
    disabled: authStore?.role !== "super administrador",
  },
]);
const links = reactive([
  { icon: "home", title: "Dashboard", to: "/", disabled: false },
  { icon: "trophy", title: "Liga", to: "/liga", disabled: false },
  { icon: "calendar", title: "Calendario", to: "/calendario", disabled: false },
  {
    icon: "ion_shirt-sharp",
    title: "Equipos",
    to: "/equipos",
    disabled: false,
  },
  {
    icon: "players",
    title: "Jugadores",
    to: "/jugadores",
    disabled: false,
  },
  {
    icon: "ball",
    title: "MVP",
    to: "/mvp",
    disabled: false,
  },
]);
const { logout } = useSanctumAuth();
useResizeObserver(drawerRef, (entries) => {
  const entry = entries[0];
  const { width } = entry.contentRect;
  drawerWidth.value = width;
});
watchEffect(() => {
  rail.value = isMobile.value;
});
</script>

<template>
  <v-navigation-drawer
    permanent
    v-model="drawer"
    :rail="rail"
    rail-width="56"
    @click="rail = false"
    app
  >
    <v-list-item nav ref="drawerRef">
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
          variant="text"
          icon="mdi-menu"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>
    <v-list density="compact" nav>
      <v-list-item v-if="rail" value="futzo" class="pa-0" disabled>
        <template #default>
          <CircularLogo />
        </template>
      </v-list-item>
      <v-list-item
        density="compact"
        v-for="link in adminLinks"
        :key="link.title"
        link
        :to="link.to"
        :disabled="link.disabled"
        :prepend-icon="link.icon"
        :title="link.title"
      />
      <v-list-item
        density="compact"
        v-for="link in links"
        :key="link.title"
        link
        :to="link.to"
        :disabled="link.disabled"
        :title="link.title"
      >
        <template #prepend>
          <nuxt-icon :name="link.icon" class="mr-2 drawer-icon" />
        </template>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div v-if="!rail">
        <v-list density="compact" nav>
          <v-list-item
            density="compact"
            key="configuration"
            link
            to="/configuracion"
            :disabled="false"
            title="Configuración"
          >
            <template #prepend>
              <nuxt-icon name="settings-01" class="mr-2" filled />
            </template>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-card :loading="!user.name">
          <v-card-item>
            <template #prepend>
              <v-avatar>
                <v-img :src="user.avatar"></v-img>
              </v-avatar>
            </template>
            <template #title>
              <small> {{ user.name }}</small>
            </template>
            <template #subtitle>
              {{ user.email }}
            </template>
            <template v-slot:append>
              <v-btn @click="logout" variant="text" size="24">
                <template #prepend>
                  <nuxt-icon name="logout" filled></nuxt-icon>
                </template>
              </v-btn>
            </template>
          </v-card-item>
        </v-card>
      </div>
      <div v-else class="text-center">
        <v-list density="compact" nav>
          <v-list-item
            density="compact"
            key="configuration"
            link
            to="/configuracion"
            :disabled="false"
            title="Configuración"
          >
            <template #prepend>
              <nuxt-icon name="settings-01" class="mr-2" filled />
            </template>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-btn @click="logout" variant="text">
          <template #prepend>
            <nuxt-icon name="logout" class="mr-2" filled />
          </template>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
