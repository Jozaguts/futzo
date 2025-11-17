<script lang="ts" setup>
  import Avatar from '~/components/pages/configuration/avatar.vue'
  import PersonalDataCard from '~/components/pages/configuration/personal-data-card.vue'
  import Plans from '~/components/pages/configuration/plans/index.vue'
  import { useToast } from '~/composables/useToast'
  import StripeElementsDrawer from '~/components/pages/configuration/plans/StripeElementsDrawer.vue'
  import AppBar from '~/components/layout/AppBar.vue'
  const user = computed(() => useAuthStore().user)

  const tab = ref(!user?.value?.is_operational ? 3 : 1)
  definePageMeta({
    middleware: ['sanctum:auth'],
  })
  onMounted(async () => {
    if (useRoute().query.payment == 'success') {
      tab.value = 3
      useToast().toast({
        type: 'success',
        msg: '🎉',
        description: '¡Listo! Tu suscripción al plan ProPlay está activa.',
      })
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
        <v-row>
          <v-col cols="12">
            <v-tabs
              :fixed-tabs="$vuetify.display.mobile"
              v-model="tab"
              slider-transition="fade"
              slider-transition-duration="900"
            >
              <v-tab :value="1"> Datos personales</v-tab>
              <v-tab :value="2"> Contraseña</v-tab>
              <v-tab :value="3">Suscripción</v-tab>
            </v-tabs>
          </v-col>
          <v-col>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item :value="1" :key="1">
                <personal-data-card />
              </v-tabs-window-item>
              <v-tabs-window-item :value="2" :key="2">
                <lazy-pages-configuration-password-data-card />
              </v-tabs-window-item>
              <v-tabs-window-item :value="3" :key="3">
                <Plans />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </PageLayout>
</template>
<style lang="sass">
  @use "~/assets/scss/pages/configuration"
</style>
