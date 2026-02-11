<script lang="ts" setup>
import {useResizeObserver} from '@vueuse/core'
import {Icon} from '#components'
import ContactForm from '~/components/shared/ContactForm.vue'
import TicketList from '~/components/shared/TicketList.vue'

const globalStore =  useGlobalStore()
  const { startTour, resetTour, recalculateTour } = useTourHub()
  const { drawer, drawerWidth, isMobile, rail, openMessageSupportBox } = storeToRefs(globalStore)
  const drawerRef = ref()
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)
  const tab = ref(user?.value?.opened_tickets_count ? 'history' : 'contact-support')
  const desktopRail = ref(false)

  const links = reactive([
    { icon: 'futzo-icon:home', title: 'Dashboard', to: '/dashboard', class: 'mr-2 drawer-icon filled' },
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
    {
      icon: 'futzo-icon:location',
      title: 'Ubicaciones',
      to: '/ubicaciones',
      class: 'mr-2 drawer-icon',
    },
  ])
  const { logout } = useSanctumAuth()
  useResizeObserver(drawerRef, (entries) => {
    const entry = entries[0]
    drawerWidth.value = entry?.contentRect?.width as number
  })
  watch(isMobile, (value) => {
    if (value) {
      desktopRail.value = rail.value
      rail.value = false
      drawer.value = false
      return
    }
    drawer.value = true
    rail.value = desktopRail.value
  }, { immediate: true })
  const logOut = async () => {
    try {
      await logout()
      useTournamentStore().$reset()
      useLocationStore().$reset()
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }
  const showTutorialHandler = () => {
    resetTour()
    recalculateTour()
    startTour()
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
    style="min-height: 100vh; z-index: 2400;"
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
          <v-btn
            v-if="!isMobile"
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="rail = !rail"
          ></v-btn>
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
      <div class="content-container" v-auto-animate>
        <v-list density="compact" nav height="auto">
          <v-list-item
            density="compact"
            v-for="link in links"
            :key="link.title"
            link
            :id="`${link.title}-tour`"
            :to="link.to"
            :title="link.title"
            :prepend-icon="() => h(Icon, { name: link.icon, class: link.class, mode: 'svg' })"
          >
          </v-list-item>
        </v-list>
      </div>
    </template>
    <template #append>
      <div>
        <v-list density="compact" nav v-auto-animate>
          <v-list-item class="nav-section-title" density="compact">
            <div class="title-text">Admin</div>
          </v-list-item>
          <v-menu v-model="openMessageSupportBox" :close-on-content-click="false" location="end top" offset="0, 12">
            <template #activator="{ props }">
              <v-list-item
                nav
                density="compact"
                key="support"
                title="Contacto y soporte"
                :prepend-icon="() => h(Icon, { name:'material-symbols-light:support-agent-outline-sharp', class:'text-primary' })"
                v-bind="props"
              >
              </v-list-item>
            </template>
            <v-card
              max-width="400px"
              min-width="100%"
              min-height="100%"
              class="futzo-rounded"
              variant="outlined"
              density="compact"
            >
              <v-card-item>
                <v-tabs color="primary" v-model="tab">
                  <v-tab value="contact-support" :disabled="!!user?.opened_tickets_count"> Contacto y soporte </v-tab>
                  <v-tab value="history"> Historial </v-tab>
                </v-tabs>
              </v-card-item>
              <v-card-text>
                <v-tabs-window v-model="tab">
                  <v-tabs-window-item value="contact-support" height="100%">
                    <ContactForm @submitted="openMessageSupportBox = false" />
                  </v-tabs-window-item>
                  <v-tabs-window-item value="history" height="100%">
                    <TicketList />
                  </v-tabs-window-item>
                </v-tabs-window>
              </v-card-text>
            </v-card>
          </v-menu>
          <v-list-item
              nav
              density="compact"
              key="tutorial"
              title="Tutorial"
              prepend-icon="mdi-school"
              @click.stop="showTutorialHandler"
          >
          </v-list-item>
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
  .drawer-header .v-list-item__content {
    display: flex;
    align-items: center;
  }
  .drawer-brand {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .drawer-brand__text {
    font-weight: 700;
    font-size: 16px;
    color: #101828;
    letter-spacing: 0.2px;
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
