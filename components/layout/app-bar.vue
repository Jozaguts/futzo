<script lang="ts" setup>
import {useAuthStore, useGlobalStore, useTournamentStore} from "~/store";
import {storeToRefs} from "pinia";
import { useTheme } from 'vuetify'
import type {User} from "~/interfaces";
const breadcrumbs = computed(()=>{
  console.log( useRoute().path)
 switch (useRoute().name) {
   case 'index':
      return [
        {
          title: 'Dashboard',
          to: '/'
        }
      ]
   case 'liga':
      return [
        useAuthStore().user?.league?.name,
      ]
   case 'liga-torneo':
      return [
        {
          title: useAuthStore().user?.league?.name,
          to: '/liga'
        },
        {
          title: useRoute().path.split('/')[2],
          to: useRoute().path
        }
      ]
   case 'calendario':
      return ['Calendario']
   case 'equipos':
      return ['Equipos']
   case 'equipos-inscribir':
      return [
        {
          title: 'Equipos',
          to: '/equipos'
        },
          'Inscribir'
      ]
   default:
      return [
        {
          title: 'home',
          to: '/'
        },
        {
          title: 'liga',
          to: '/liga'
        },
        {
          title: useRoute().name,
          to: useRoute().path
        }
      ]
  }
})

const currentRouteName = useRoute().name
const buttonActions = computed<{icon: string, title: string} | boolean>(() => {
  switch(currentRouteName){
    case 'index':
      return false
    case 'liga':
      return {
        title: 'Crear torneo',
        icon: 'mdi-plus',
      }
    default:
      return {
        title: 'Crear',
        icon: 'mdi-plus',
      }
  }

})
const theme = useTheme()
const {isMobile} = storeToRefs(useGlobalStore())
const user = useSanctumUser<User>()
const handleActions = () => {
  switch (currentRouteName) {
    case 'liga':
      const {dialog} = storeToRefs(useTournamentStore())
      dialog.value = true
      break
    case 'theme':
      break
  }
}
</script>
<template>
  <v-app-bar color="white"  :border="false" elevation="0" height="85" app>
    <template #title>
      <v-breadcrumbs :items="breadcrumbs" :disabled="false">
        <template v-slot:title="{ item }">
          <span class="text-capitalize text-black text-h4">{{ item.title }}</span>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </template>
    <template #append>
     <v-btn
         variant="elevated"
         :density="isMobile ? 'default' : 'comfortable'"
         :size="isMobile ? 'small' : 'large' "
         @click="handleActions"
         class="mr-2 mr-lg-12 mr-md-12"
         v-if="buttonActions"
     >
       <template #prepend>
          <v-icon>{{buttonActions.icon}}</v-icon>
         <span class="text-body-2">{{buttonActions?.title}}</span>
       </template>
     </v-btn>
    </template>
  </v-app-bar>
</template>
<style lang="sass">
.v-breadcrumbs-item--disabled
  opacity: 1
</style>