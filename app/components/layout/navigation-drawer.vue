<script lang="ts" setup>
  import { useResizeObserver } from '@vueuse/core'

  const { drawer, drawerWidth, isMobile, rail } = storeToRefs(useGlobalStore())
  const drawerRef = ref()
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)
  const disabled = ref(false)
  useLocationStore().$subscribe((mutation, state) => {
    disabled.value = state.locations?.length === 0
  })
  const links = reactive([
    { icon: 'futzo-icon:home', title: 'Dashboard', to: '/', disabled: false, class: 'mr-2 drawer-icon filled' },
    {
      icon: 'futzo-icon:location',
      title: 'Ubicaciones',
      to: '/ubicaciones',
      disabled: false,
      class: 'mr-2 drawer-icon',
    },
    {
      icon: 'futzo-icon:trophy',
      title: 'Torneos',
      to: '/torneos',
      disabled: disabled.value,
      class: 'mr-2 drawer-icon filled',
    },
    {
      icon: 'futzo-icon:shirt-sharp',
      title: 'Equipos',
      to: '/equipos',
      disabled: disabled.value,
      class: 'mr-2 drawer-icon filled',
    },
    {
      icon: 'futzo-icon:players',
      title: 'Jugadores',
      to: '/jugadores',
      disabled: disabled.value,
      class: 'mr-2 drawer-icon filled',
    },
  ])
  const { logout } = useSanctumAuth()
  useResizeObserver(drawerRef, (entries) => {
    const entry = entries[0]
    const { width } = entry.contentRect
    drawerWidth.value = width
  })
  watchEffect(() => {
    rail.value = isMobile.value
  })
  const logOut = async () => {
    try {
      await logout()
      useTournamentStore().$reset()
      useLocationStore().$reset()
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }
  const { mobile } = useDisplay()
</script>

<template>
  <v-navigation-drawer
    :permanent="!mobile"
    :mobile="false"
    v-model="drawer"
    :rail="rail"
    rail-width="56"
    @click="rail = false"
    app
  >
    <v-list-item nav ref="drawerRef">
      <Logo />
      <template #prepend>
        <v-btn v-if="rail" variant="text" icon="mdi-menu" @click.stop="rail = !rail"></v-btn>
      </template>
      <template #append>
        <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item>

    <v-list density="compact" nav>
      <v-list-item
        density="compact"
        v-for="link in links"
        :key="link.title"
        link
        :to="link.to"
        :disabled="disabled && link.title !== 'Dashboard' && link.title !== 'Ubicaciones'"
        :title="link.title"
      >
        <template #prepend="{ isActive }">
          <Icon :name="link.icon" :class="link.class" mode="svg" />
        </template>
      </v-list-item>
      <div class="ma-2 mt-md-16 mt-lg-16 mt-4" v-auto-animate="{ duration: 100 }" v-if="!rail">
        <p v-if="disabled" class="text-caption font-weight-bold">Crea tu primera ubicación</p>
        <p v-if="disabled" class="text-caption font-weight-bold">
          Comienza registrando una sede y su campo/s desde el módulo “Ubicaciones”.
        </p>
      </div>
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
              <Icon name="futzo-icon:settings-01" class="mr-2" />
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
            <template #subtitle> {{ user?.email }}</template>
            <template v-slot:append>
              <v-btn @click="logOut" variant="text" size="24">
                <template #prepend>
                  <Icon name="futzo-icon:logout" />
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
              <Icon name="futzo-icon:settings-01" class="mr-2" />
            </template>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-btn @click="logOut" variant="text">
          <template #prepend>
            <Icon name="futzo-icon:logout" class="mr-2" />
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
