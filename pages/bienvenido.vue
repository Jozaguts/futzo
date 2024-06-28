<script lang="ts" setup>
import {useGlobalStore} from "~/store";
import CreateLeague from '~/components/pages/bienvenido/cards/create-league.vue'
import CreatedLeague from '~/components/pages/bienvenido/cards/created-league.vue'
const globalStore = useGlobalStore()
definePageMeta({
  layout: false,
  bodyAttrs: {
    class: 'd-none'
  }
});
const currentComponent = ref('CreateLeague')
const initLeague = (name) => {
  useSanctumClient()( `/api/v1/admin/leagues`,{
    credentials: 'include',
    method: 'POST',
    body: {
      name
    }
  })
    .then((response) =>{
      globalStore.showSuccessNotification({message:response?.message ?? 'Liga creada' })
      currentComponent.value = 'CreatedLeague'
    }).catch(error => console.error(error))
    .catch((error) => {
      useGlobalStore().showErrorNotification({message: error?.data?.message ?? 'Ha ocurrido un error'})
    })
    .finally(() => {
    })
}
const components = {
  CreateLeague,
  CreatedLeague
}
const eventHandler = (event: {action: string, params: {leagueName: string}}) => {
  if (event.action === 'create-league'){
    initLeague(event.params.leagueName)
  }
  if (event.action === 'league-created'){
    const {refreshIdentity,  isAuthenticated} = useSanctumAuth()
    refreshIdentity().catch(error => console.error(error))
        .then(() => {
          if (isAuthenticated.value) {
            useRouter().push({name: 'index'})
          }
        })

  }
}
</script>

<template>
 <div class="welcome-main-container">
   <div class="welcome-logo-container" >
     <Logo max-width="165" />
   </div>
   <div class="welcome-email-container">
     <component :is="components[currentComponent]" @event="eventHandler"></component>
   </div>
 </div>
</template>
<style lang="scss">
@import '~/assets/scss/pages/welcome.scss';
</style>