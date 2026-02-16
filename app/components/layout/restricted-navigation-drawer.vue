<script lang="ts" setup>
import { useResizeObserver } from '@vueuse/core'
import { Icon } from '#components'
import { h } from 'vue'

const globalStore = useGlobalStore()
const { drawer, drawerWidth, isMobile, rail } = storeToRefs(globalStore)
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { logout } = useSanctumAuth()
const { isPlayerRole, isTeamScopedRole, resolveTeamHomePath, resolvePlayerHomePath } = useRoleAccess()

const drawerRef = ref()
const desktopRail = ref(false)
const teamHomePath = ref('/equipos')
const playerHomePath = ref('/jugadores')

useResizeObserver(drawerRef, (entries) => {
  const entry = entries[0]
  drawerWidth.value = entry?.contentRect?.width as number
})

watch(
  isMobile,
  (value) => {
    if (value) {
      desktopRail.value = rail.value
      rail.value = false
      drawer.value = false
      return
    }
    drawer.value = true
    rail.value = desktopRail.value
  },
  { immediate: true }
)

onMounted(async () => {
  if (isTeamScopedRole.value) {
    teamHomePath.value = await resolveTeamHomePath()
  }
  if (isPlayerRole.value) {
    playerHomePath.value = await resolvePlayerHomePath()
  }
})

const links = computed(() => {
  if (isPlayerRole.value) {
    return [{ icon: 'lucide:user', title: 'Mi perfil', to: playerHomePath.value }]
  }
  if (isTeamScopedRole.value) {
    return [
      { icon: 'lucide:shirt', title: 'Mi equipo', to: teamHomePath.value },
      { icon: 'lucide:users', title: 'Jugadores', to: '/jugadores' },
    ]
  }
  return []
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
</script>

<template>
  <v-navigation-drawer
    :permanent="!isMobile"
    :temporary="isMobile"
    v-model="drawer"
    :rail="!isMobile && rail"
    :scrim="isMobile"
    :app="!isMobile"
    @click.stop="!isMobile && (rail = false)"
    rail-width="56"
    style="min-height: 100vh; z-index: 2400"
  >
    <template #prepend>
      <v-list-item nav ref="drawerRef">
        <div class="drawer-brand">
          <Logo />
        </div>
        <template #prepend>
          <v-btn v-if="!isMobile && rail" variant="text" icon="mdi-menu" @click.stop="rail = !rail"></v-btn>
        </template>
        <template #append>
          <v-btn v-if="!isMobile" icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
          <v-btn
            v-else
            icon="mdi-close"
            variant="text"
            aria-label="Cerrar navegación"
            @click.stop="drawer = false"
          ></v-btn>
        </template>
      </v-list-item>
    </template>

    <template #default>
      <v-list density="compact" nav>
        <v-list-item
          v-for="link in links"
          :key="link.title"
          link
          :to="link.to"
          :title="link.title"
          :prepend-icon="() => h(Icon, { name: link.icon, class: 'mr-2 drawer-icon filled', mode: 'svg' })"
        />
      </v-list>
    </template>

    <template #append>
      <v-divider />
      <v-card :loading="!user?.name">
        <v-card-item class="logout-card-item">
          <template v-if="!rail" #prepend>
            <v-avatar>
              <v-img :src="user?.image"></v-img>
            </v-avatar>
          </template>
          <template v-if="!rail" #title>
            <small>{{ user?.name }}</small>
          </template>
          <template v-if="!rail" #subtitle>
            <span>{{ user?.email }}</span>
          </template>
          <template #append>
            <v-btn
              v-tooltip:end="'Cerrar sesión'"
              @click="logOut"
              variant="text"
              size="24"
              :prepend-icon="() => h(Icon, { name: 'futzo-icon:logout', size: 80 })"
            ></v-btn>
          </template>
        </v-card-item>
      </v-card>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.logout-card-item .v-card-item__append {
  padding-inline-start: 0 !important;
}
</style>
