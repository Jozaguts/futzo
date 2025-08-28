<script setup lang="ts">
  import { POST_CHECKOUT_LOGIN_SUCCESS_STATUS_CODE } from '~/utils/constants'
  import { useToast } from '~/composables/useToast'
  const { toast } = useToast()
  const leagueName = ref('')
  const { user } = useSanctumAuth()
  const isHydrated = ref(true)

  onMounted(async () => {
    if (user.value?.has_league) {
      await useRouter().push({ name: 'index' })
      return
    }
    if (Number(useRoute().query.success as string) === POST_CHECKOUT_LOGIN_SUCCESS_STATUS_CODE) {
      isHydrated.value = false
      return
    }

    isHydrated.value = true

    await nextTick()
    useGlobalStore().toastId = toast({
      type: 'error',
      msg: 'Tu enlace ha caducado.',
      description: 'Inicia sesión para comenzar a crear tu liga.',
      action: 'login',
      duration: 1000 * 60,
    })
  })
</script>
<template>
  <div
    v-if="isHydrated"
    style="
      max-height: 400px;
      max-width: 540px;
      width: 100%;
      height: 100%;
      padding: 40px;
      border-radius: 24px;
      background-color: white;
    "
  >
    <v-skeleton-loader width="56" height="56" type="avatar" style="margin: 0 auto" />
    <v-skeleton-loader width="100%" type="heading" style="margin: 0 auto 40px auto" />
    <v-skeleton-loader width="200px" type="text" />
    <v-skeleton-loader width="100%" type="heading" style="margin: 0 auto" />
    <v-skeleton-loader type="button" style="margin: 0 auto" />
  </div>
  <v-card v-else class="welcome-card">
    <v-card-item class="d-flex align-center justify-center pt-0">
      <v-card-title class="d-flex justify-center">
        <div class="icon-container">
          <Icon name="futzo-icon:trophy-01"></Icon>
          <!--          <Icon else name="futzo-icon:league-created"></nuxt-icon>-->
        </div>
      </v-card-title>
      <v-card-title class="welcome-card__subtitle">
        <span> Nombra tu liga para empezar</span>
        <!--        <p class="welcome-card__subtitle__">Ya puedes empezar a planificar tu liga.</p>-->
      </v-card-title>
    </v-card-item>
    <v-card-text class="w-100 d-flex flex-column align-center">
      <v-form
        class="w-100"
        @submit.prevent="$emit('event', { action: 'create-league', params: { leagueName } })"
        fast-fail
      >
        <label for="league"> Nombra tu liga </label>
        <v-text-field
          :rules="[
            (value) => {
              if (value.length > 5) return true
              return 'El nombre debe tener al menos 6 caracteres.'
            },
          ]"
          v-model="leagueName"
          variant="outlined"
          placeholder="P. ej. Liga Vallarta"
          width="100%"
          class="create-league-input mt-1 fz-auth-form__input"
          density="compact"
        >
        </v-text-field>
        <v-btn
          class="ml-auto mb-2 create-league-btn"
          color="primary"
          variant="elevated"
          size="x-large"
          density="compact"
          block
          type="submit"
          :disabled="leagueName.length < 5"
        >
          Crear liga
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
