<script lang="ts" setup>
definePageMeta({
  layout: 'blank',
  bodyAttrs: {
    class: 'd-none'
  },
  sanctum: {
    guestOnly: true,
  }
});
const email = useRoute().query.email ?? ''
const VALIDATE_EMAIL  = 1;
const EMAIL_VALIDATED = 2;
const CREATE_LEAGUE = 3;
const LEAGUE_CREATED = 4
const status = ref( {
  title: 'Revisa tu correo',
  subtitle: `Te enviamos un correo de verificación al <br> correo <strong>${email}.</strong>`,
  action: 'Verificar correo',
  status: 200,
  verified: false,
  step: 1,
})
const client = useSanctumClient();
import {useGlobalStore} from "~/store";
const code = ref('')
const leagueName = ref('')
const verifyEmail = () =>{
  client(`/verify-email`,{
    method: 'POST',
    body: {
      code: code.value,
      email: email,
    }
  })
    .then((response) => {
      status.value.title = 'Correo verificado'
      status.value.subtitle = 'Gracias por confirmar tu correo, ahora puedes </br> iniciar sesión con tu correo y contraseña.'
      status.value.action = 'Continuar'
      status.value.verified = true
      status.value.step = EMAIL_VALIDATED
      useGlobalStore().showSuccessNotification({message: response?.message ?? 'Correo verificado'})
      code.value = ''
    })
    .catch((error) => {
      useGlobalStore().showErrorNotification({message: error?.data?.message ?? 'Ha ocurrido un error'})
    })
}
useGlobalStore().showFooter = false
const disabled = computed(() => {
  if (status.value.verified){
    return false
  }
  if (code.value.length !== 4){
    return true
  }
})
const initLeague = () => {
  useSanctumClient()( `/api/v1/admin/leagues`,{
    credentials: 'include',
    method: 'POST',
    body: {
      name: leagueName.value
    }
  })
      .then((response) =>{
        status.value.title = 'Tu liga ha sido creada'
        status.value.subtitle = 'Ya puedes empezar a planificar tu liga.'
        status.value.action = 'Empezar'
        status.value.verified = true
        status.value.step = LEAGUE_CREATED
        useGlobalStore().showSuccessNotification({message: response?.message ?? 'Liga creada'})
        leagueName.value = ''
        const {refreshIdentity,  isAuthenticated} = useSanctumAuth()
        refreshIdentity().catch(error => console.error(error))
            .then(() => {
              if (isAuthenticated.value) {
                console.log('user authenticated')
              }else {
                console.log('user not authenticated')
              }
            })

      }).catch(error => console.error(error))
    .catch((error) => {
      useGlobalStore().showErrorNotification({message: error?.data?.message ?? 'Ha ocurrido un error'})
    })
}
const submitHandler = () => {
  if (status.value.verified && status.value.step === EMAIL_VALIDATED ){
    status.value.step = CREATE_LEAGUE
    status.value.title = 'Vamos a crear tu primer liga'
    status.value.subtitle = ''
    status.value.action = 'Crear liga'
  }
  else if(status.value.verified && status.value.step === CREATE_LEAGUE){
    initLeague()
  }
  else if(status.value.verified && status.value.step === LEAGUE_CREATED){
    useRouter().push('/liga')
  }
  else {
    verifyEmail()
  }
}
</script>
<template>
  <v-container fluid class=" py-0 bg-surface main-container">
    <v-row>
      <v-col cols="12" >
        <Logo max-width="200" class="mx-auto"></Logo>
      </v-col>
    </v-row>
    <v-row   class="row-custom-class">
      <v-col cols="12" class="d-flex justify-center align-center">
        <v-card
            color="background"
            width="100%"
            max-width="540"
            max-height="550"
        >
          <div class="d-flex justify-center align-center mt-8">
            <v-sheet
                width="56"
                height="56"
                color="background"
                border="thin"
                rounded="sm"
                elevation="0"
                class="d-flex align-center justify-center"

            >
              <nuxt-icon v-if="!status.verified" name="inbox-02" filled class="mx-auto envelop-icon"></nuxt-icon>
              <nuxt-icon v-if="status.verified && status.step === EMAIL_VALIDATED" name="check-circle" filled class="mx-auto check-circle"></nuxt-icon>
              <nuxt-icon v-if="status.verified && status.step === CREATE_LEAGUE" name="trophy-01" filled class="mx-auto trophy-01"></nuxt-icon>
              <nuxt-icon v-if="status.verified && status.step === LEAGUE_CREATED" name="league-created" filled class="mx-auto league-created"></nuxt-icon>

            </v-sheet>

          </div>
          <v-card-item class="d-flex justify-center align-center">
            <v-card-title class="text-center">
             {{status.title}}
            </v-card-title>
            <v-card-subtitle class="text-center" v-html="status.subtitle" />
          </v-card-item>
          <v-card-text class="my-5">
            <div class="w-75 mx-auto my-5">
              <v-otp-input
                  v-if="!status.verified"
                  v-model="code"
                  placeholder="0"
                  length="4"
              ></v-otp-input>
              <v-text-field
                  v-if="status.verified && status.step === CREATE_LEAGUE"
                  v-model="leagueName"
                  label="Nombre de la liga"
                  placeholder="Escribe el nombre de tu liga"
              ></v-text-field>
              <v-btn class="my-5" rounded="lg" :disabled="disabled" size="large" block  @click="submitHandler">{{status.action}}</v-btn>
              <div
                  v-if="[VALIDATE_EMAIL].includes(status.step)"
                  class="d-flex justify-center align-center my-5"
              >
                <p class="text-body-1" >¿No recibiste el correo?</p> <v-btn variant="text">Reenviar</v-btn>
              </div>
              <div
                  v-if="[VALIDATE_EMAIL].includes(status.step)"
                  class="d-flex justify-center align-center my-5 cursor-pointer"
                  @click="$router.push('/login')"
              >
                <nuxt-icon name="arrow-left" filled class="arrow-left mx-1"></nuxt-icon>  <p class="text-body-1 font-weight-bold" >Regresar a registrarme</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
.main-container {
  height: 100vh;
  overflow: hidden;
}
.nuxt-icon.envelop-icon svg{
  width: 1.8rem;
  height: 1.8rem;
}
.nuxt-icon.check-circle svg{
  width: 1.8rem;
  height: 1.8rem;
}
.nuxt-icon.arrow-left svg{
  width: 20px;
  height: 20px;
}
.nuxt-icon.trophy-01 svg{
  width: 2rem;
  height: 2rem;
}
.nuxt-icon.league-created svg{
  width: 4rem;
  height: 4rem;
}
.row-custom-class{
 position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}
</style>
