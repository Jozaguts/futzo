<script lang="ts" setup>
  import Avatar from '~/components/pages/configuration/avatar.vue'
  import PersonalDataCard from '~/components/pages/configuration/personal-data-card.vue'
  import Plans from '~/components/pages/configuration/plans/index.vue'
  import { useToast } from '~/composables/useToast'

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
  <v-sheet height="100%" color="white" class="pa-10 full-height configuration-v-sheet">
    <v-card variant="text">
      <v-card-item class="mb-12">
        <template #prepend>
          <Avatar />
        </template>
        <v-card-title class="card-title ml-2"> {{ user?.name }}</v-card-title>
        <v-card-subtitle class="card-subtitle ml-2">{{ user?.email }} </v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <v-tabs v-model="tab">
          <v-tab :value="1"> Datos personales</v-tab>
          <v-tab :value="2"> Contraseña</v-tab>
          <v-tab :value="3">Suscripción</v-tab>
        </v-tabs>
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
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
<style lang="sass">
  @use "~/assets/scss/pages/configuration"
</style>
