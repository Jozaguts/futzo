<script lang="ts" setup>
import Avatar from '~/components/pages/configuration/avatar.vue'
import PersonalDataCard from '~/components/pages/configuration/personal-data-card.vue'
import Plans from '~/components/pages/configuration/plans/index.vue'
import PlayersSettingsCard from '~/components/pages/configuration/players-settings-card.vue'
import TournamentsSettingsCard from '~/components/pages/configuration/tournaments-settings-card.vue'
import {useToast} from '~/composables/useToast'
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
    { value: 5, label: 'Jugadores', icon: 'mdi-run' },
    // { value: 6, label: 'Equipos', icon: 'mdi-account-group-outline' },
    // { value: 7, label: 'Locaciones', icon: 'mdi-map-marker-outline' },
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
    <template #default>
      <v-container class="pa-0" fluid>
        <div class="configuration-page">
          <div class="configuration-page__header">
            <h2 class="configuration-page__title">Configuración</h2>
          </div>
          <v-divider class="configuration-page__divider" />
          <v-row class="configuration-layout">
            <v-col cols="12" md="3">
              <div class="configuration-sidebar">
                <v-card class="configuration-user-card futzo-rounded" variant="flat">
                  <div class="configuration-user">
                    <Avatar />
                    <div class="configuration-user__meta">
                      <div class="configuration-user__name">{{ user?.name }}</div>
                      <div class="configuration-user__email">{{ user?.email }}</div>
                    </div>
                  </div>
                </v-card>
                <v-card class="configuration-nav-card" variant="text">
                  <v-btn-toggle v-if="mobile" v-model="tab" mandatory class="configuration-nav-mobile__toggle" divided>
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
                  <v-list v-else class="configuration-nav bg-background" density="compact" nav>
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
                </v-card>
              </div>
            </v-col>
            <v-col cols="12" md="9" class="py-0 py-md-2 py-lg-2">
            <div class="configuration-container">
              <div class="configuration-content futzo-rounded">
                <TransitionFade group>
                  <personal-data-card v-if="tab === 1" :key="1"/>
                  <lazy-pages-configuration-password-data-card v-else-if="tab === 2"  :key="2" />
                  <Plans v-else-if="tab === 3"  :key="3" />
                  <TournamentsSettingsCard v-else-if="tab === 4" />
                  <PlayersSettingsCard v-else-if="tab === 5" />
<!--                  <TeamsSettingsCard v-else-if="tab === 6" />-->
<!--                  <LocationsSettingsCard v-else />-->
                </TransitionFade>
              </div>
            </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </template>
  </PageLayout>
</template>
<style lang="sass">
  @use "~/assets/scss/pages/configuration"
</style>
