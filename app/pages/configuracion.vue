<script lang="ts" setup>
import Avatar from '~/components/pages/configuration/avatar.vue'
import PersonalDataCard from '~/components/pages/configuration/personal-data-card.vue'
import Plans from '~/components/pages/configuration/plans/index.vue'
import PlayersSettingsCard from '~/components/pages/configuration/players-settings-card.vue'
import TournamentsSettingsCard from '~/components/pages/configuration/tournaments-settings-card.vue'
import TeamsSettingsCard from '~/components/pages/configuration/teams-settings-card.vue'
import LocationsSettingsCard from '~/components/pages/configuration/locations-settings-card.vue'
import {useToast} from '~/composables/useToast'
import AppBar from '~/components/layout/AppBar.vue'
import {useDisplay} from 'vuetify'

const user = computed(() => useAuthStore().user)

  const tab = ref(!user?.value?.is_operational ? 3 : 1)
  const isSwitching = ref(false)
  let switchTimeout: ReturnType<typeof setTimeout> | null = null
  const { mobile } = useDisplay()
  const sections = [
    { value: 1, label: 'Datos personales', icon: 'mdi-account-outline' },
    { value: 2, label: 'Contraseña', icon: 'mdi-lock-outline' },
    { value: 3, label: 'Suscripción', icon: 'mdi-credit-card-outline' },
    { value: 4, label: 'Torneo', icon: 'mdi-trophy-outline' },
    { value: 5, label: 'Equipos', icon: 'mdi-account-group-outline' },
    { value: 6, label: 'Jugadores', icon: 'mdi-run' },
    { value: 7, label: 'Locaciones', icon: 'mdi-map-marker-outline' },
  ]
  const startSwitching = () => {
    isSwitching.value = true
    if (switchTimeout) {
      clearTimeout(switchTimeout)
    }
    switchTimeout = setTimeout(() => {
      isSwitching.value = false
    }, 250)
  }
  definePageMeta({
    middleware: ['sanctum:auth'],
  })
  onMounted(async () => {
    startSwitching()
    if (useRoute().query.payment == 'success') {
      tab.value = 3
      useToast().toast({
        type: 'success',
        msg: '🎉',
        description: '¡Listo! Tu suscripción al plan ProPlay está activa.',
      })
    }
  })
  watch(tab, () => {
    startSwitching()
  })
  onBeforeUnmount(() => {
    if (switchTimeout) {
      clearTimeout(switchTimeout)
    }
  })
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar :extended="false" :density="$vuetify.display.mobile ? 'prominent' : 'default'">
        <template #title>
          <div class="d-flex ml-4">
            <Avatar />
            <div class="d-flex flex-column">
              <v-card-title class="card-title ml-2"> {{ user?.name }}</v-card-title>
              <v-card-subtitle class="card-subtitle ml-2">{{ user?.email }} </v-card-subtitle>
            </div>
          </div>
        </template>
      </AppBar>
    </template>
    <template #default>
      <v-container class="pa-0" fluid>
        <v-row class="configuration-layout">
          <v-col cols="12" md="3">
            <v-sheet v-if="mobile" class="configuration-nav-mobile" rounded="lg">
              <v-btn-toggle v-model="tab" mandatory class="configuration-nav-mobile__toggle" divided>
                <v-btn
                  v-for="section in sections"
                  :key="section.value"
                  :value="section.value"
                  variant="text"
                  class="configuration-nav-mobile__btn"
                  :aria-label="section.label"
                >
                  <v-icon :icon="section.icon" />
                </v-btn>
              </v-btn-toggle>
            </v-sheet>
            <v-sheet v-else class="configuration-nav" rounded="lg">
              <v-list density="comfortable" nav>
                <v-list-item
                  v-for="section in sections"
                  :key="section.value"
                  class="configuration-nav__item"
                  :title="section.label"
                  :active="tab === section.value"
                  :prepend-icon="section.icon"
                  @click="tab = section.value"
                />
              </v-list>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="9" class="py-0 py-md-2 py-lg-2">
            <div class="configuration-container ">
              <transition-fade mode="out-in" :duration="200">
                <div :key="isSwitching ? 'skeleton' : tab" class="configuration-content futzo-rounded">
                  <v-skeleton-loader v-if="isSwitching" type="card, text, actions" class="configuration-skeleton" />
                  <template v-else>
                    <personal-data-card v-if="tab === 1" />
                    <lazy-pages-configuration-password-data-card v-else-if="tab === 2" />
                    <Plans v-else-if="tab === 3" />
                    <TournamentsSettingsCard v-else-if="tab === 4" />
                    <TeamsSettingsCard v-else-if="tab === 5" />
                    <PlayersSettingsCard v-else-if="tab === 6" />
                    <LocationsSettingsCard v-else />
                  </template>
                </div>
              </transition-fade>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </PageLayout>
</template>
<style lang="sass">
  @use "~/assets/scss/pages/configuration"
</style>
