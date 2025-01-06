<script lang="ts" setup>
import {useResizeObserver} from "@vueuse/core";
import {useAuthStore, useGlobalStore} from "~/store";
import {storeToRefs} from "pinia";

const {drawer, drawerWidth, isMobile, rail} = storeToRefs(useGlobalStore());
const drawerRef = ref();
const authStore = useAuthStore();
const {user, isSuperAdmin} = storeToRefs(authStore);

const links = reactive([
  {icon: "futzo-icon:home", title: "Dashboard", to: "/", disabled: false, class: 'mr-2 drawer-icon filled',},
  {
    icon: "futzo-icon:trophy",
    title: "Torneos",
    to: "/torneos",
    disabled: false,
    class: 'mr-2 drawer-icon filled',
  },
  {
    icon: "futzo-icon:shirt-sharp",
    title: "Equipos",
    to: "/equipos",
    disabled: false,
    class: 'mr-2 drawer-icon filled',
  },
  {
    icon: "futzo-icon:players",
    title: "Jugadores",
    to: "/jugadores",
    disabled: false,
    class: 'mr-2 drawer-icon filled',
  },
  {
    icon: "futzo-icon:location",
    title: "Ubicaciones",
    to: "/ubicaciones",
    disabled: false,
    class: 'mr-2 drawer-icon',
  },
]);
const {logout} = useSanctumAuth();
useResizeObserver(drawerRef, (entries) => {
  const entry = entries[0];
  const {width} = entry.contentRect;
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
      <Logo/>
      <template #prepend>
        <v-btn
            v-if="rail"
            variant="text"
            icon="mdi-menu"
            @click.stop="rail = !rail"
        ></v-btn>
      </template>
      <template #append>
        <v-btn
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-list density="compact" nav>
      <v-list-item
          density="compact"
          v-for="link in links"
          :key="link.title"
          link
          :to="link.to"
          :disabled="link.disabled"
          :title="link.title"
      >
        <template #prepend="{isActive}">
          <Icon :name="link.icon" :class="link.class" mode="svg"/>
        </template>
      </v-list-item>
    </v-list>

    <template #append>
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
              <Icon name="futzo-icon:settings-01" class="mr-2"/>
            </template>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-card :loading="!user?.name">
          <v-card-item>
            <template #prepend>
              <v-avatar>
                <v-img :src="user?.image"></v-img>
              </v-avatar>
            </template>
            <template #title>
              <small> {{ user?.name }}</small>
            </template>
            <template #subtitle> {{ user?.email }}ss</template>
            <template v-slot:append>
              <v-btn @click="logout" variant="text" size="24">
                <template #prepend>
                  <Icon name="futzo-icon:logout"/>
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
              <Icon name="futzo-icon:settings-01" class="mr-2"/>
            </template>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-btn @click="logout" variant="text">
          <template #prepend>
            <Icon name="futzo-icon:logout" class="mr-2"/>
          </template>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<style>
.v-list-item--active .v-list-item__prepend svg.drawer-icon g path {
  stroke: white !important;
}

.v-list-item--active .v-list-item__prepend svg.drawer-icon.filled g path,
.v-list-item--active .v-list-item__prepend svg.drawer-icon.filled g g path {
  fill: white !important;
}
</style>
