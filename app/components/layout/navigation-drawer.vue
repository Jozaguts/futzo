<script lang="ts" setup>
  import { type ResizeObserverEntry, useResizeObserver } from '@vueuse/core'
  import { useDisplay } from 'vuetify/framework'
  import { Icon } from '#components'
  import OnboardingSteps from '~/components/layout/OnboardingSteps.vue'
  import { useOnboardingStore } from '~/stores/useOnboardingStore'
  const { drawer, drawerWidth, isMobile, rail } = storeToRefs(useGlobalStore())
  const onboarding = useOnboardingStore()
  const drawerRef = ref()
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)
  const onClick = (to: string, e: MouseEvent) => {
    if (onboarding.isDisabled(to)) {
      e.preventDefault()
      useToast().toast({ type: 'warning', msg: 'Completa los pasos previos para acceder.' })
    }
  }
  const links = reactive([
    { icon: 'futzo-icon:home', title: 'Dashboard', to: '/', class: 'mr-2 drawer-icon filled' },
    {
      icon: 'futzo-icon:location',
      title: 'Ubicaciones',
      to: '/ubicaciones',
      class: 'mr-2 drawer-icon',
    },
    {
      icon: 'futzo-icon:trophy',
      title: 'Torneos',
      to: '/torneos',
      class: 'mr-2 drawer-icon filled',
    },
    {
      icon: 'futzo-icon:shirt-sharp',
      title: 'Equipos',
      to: '/equipos',
      class: 'mr-2 drawer-icon filled',
    },
    {
      icon: 'futzo-icon:players',
      title: 'Jugadores',
      to: '/jugadores',
      class: 'mr-2 drawer-icon filled',
    },
  ])
  const { logout } = useSanctumAuth()
  useResizeObserver(drawerRef, (entries: ReadonlyArray<ResizeObserverEntry>) => {
    const entry = entries[0]
    drawerWidth.value = entry?.contentRect?.width as number
  })
  watchEffect(() => {
    rail.value = isMobile.value
  })
  const logOut = async () => {
    try {
      await logout()
      useTournamentStore().$reset()
      useLocationStore().$reset()
      useOnboardingStore().$reset()
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }
  const { mobile } = useDisplay()
  watch(
    () => user.value?.is_operational,
    async (ok) => {
      if (ok) await onboarding.loadSafe()
    },
    { immediate: true }
  )
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
    <template #prepend>
      <v-list-item nav ref="drawerRef">
        <Logo />
        <template #prepend>
          <v-btn v-if="rail" variant="text" icon="mdi-menu" @click.stop="rail = !rail"></v-btn>
        </template>
        <template #append>
          <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>
    </template>
    <template #default>
      <div class="content-container" v-auto-animate>
        <v-list density="compact" nav height="auto">
          <v-list-item
            density="compact"
            v-for="link in links"
            :key="link.title"
            link
            :to="onboarding.isDisabled(link.to) ? null : link.to"
            :disabled="onboarding.isDisabled(link.to) && link.title !== 'Dashboard' && link.title !== 'Ubicaciones'"
            :title="link.title"
            @click="(e) => onClick(link.to, e)"
            :prepend-icon="() => h(Icon, { name: link.icon, class: link.class, mode: 'svg' })"
          >
          </v-list-item>
        </v-list>
        <OnboardingSteps v-if="!onboarding.state.all_done" />
      </div>
    </template>
    <template #append>
      <div>
        <v-list density="compact" nav>
          <v-list-item
            nav
            density="compact"
            key="configuration"
            link
            to="/configuracion"
            :disabled="false"
            title="Configuración"
            :prepend-icon="() => h(Icon, { name: 'futzo-icon:settings-01', class: 'mr-2 config-icon', mode: 'svg' })"
          >
          </v-list-item>
        </v-list>
        <v-divider />
        <v-card :loading="!user?.name">
          <v-card-item class="logout-card-item">
            <template v-if="!rail" #prepend>
              <v-avatar>
                <v-img :src="user?.image"></v-img>
              </v-avatar>
            </template>
            <template v-if="!rail" #title>
              <small> {{ user?.name }}</small>
            </template>
            <template v-if="!rail" #subtitle>
              <span>
                {{ user?.email }}
              </span>
            </template>
            <template v-slot:append>
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
      </div>
    </template>
  </v-navigation-drawer>
</template>
<style>
  .logout-card-item .v-card-item__append {
    padding-inline-start: 0 !important;
  }
  .v-list-item--active .config-icon path {
    stroke: white;
  }
  .nav-section-title .title-text:after {
    border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    content: '';
  }
  .nav-section-title .title-text:after {
    flex: 1 1 auto;
  }
  .title-text:before {
    flex: 0 1 0.8125rem;
    margin-inline-start: -1.4375rem;
  }
  .nav-section-title .title-text:before,
  .nav-section-title .title-text:after {
    border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    content: '';
  }
  .title-text {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    column-gap: 0.625rem;
    font-size: 0.8125rem;
    line-height: 1.125rem;
    text-transform: uppercase;
  }
  .nav-section-title:not(:first-child) {
    margin-block-start: 0;
    margin-inline: 0 1rem;
    padding-block: 0.4375rem;
    padding-inline: 1.4375rem 1rem;
    white-space: nowrap;
  }
  .nav-section-title {
    margin-block-start: 0.5rem;
    block-size: 2rem;
    font-size: 0.8125rem;
    line-height: 1.125rem;
    letter-spacing: 0.4px;
    color: rgba(var(--v-theme-on-surface), var(--v-disabled-opacity));
  }
  .content-container {
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    height: 100%;
    max-width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .v-list-item--active .v-list-item__prepend svg.drawer-icon g path {
    stroke: white !important;
  }

  .v-list-item--active .v-list-item__prepend svg.drawer-icon.filled g path,
  .v-list-item--active .v-list-item__prepend svg.drawer-icon.filled g g path {
    fill: white !important;
  }
</style>
