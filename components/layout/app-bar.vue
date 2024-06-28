<script lang="ts" setup>
const breadcrumbs = computed(()=>{
  return [
    useRoute().name === 'index' ? ' home' :   useRoute().name
  ]
})
const buttonActions = computed(() => {
  switch(useRoute().name){
    case 'index':
      return false
    case 'liga':
      return {
        title: 'Crear torneo',
        icon: 'mdi-plus',
        action: () => {
          console.log('Crear torneo')
        }
      }
    default:
          return{
            title: 'Crear',
            icon: 'mdi-plus',
            action: () => {
              console.log('Crear')
            }
          }
  }

})
import {useGlobalStore} from "~/store";
import {storeToRefs} from "pinia";
import { useTheme } from 'vuetify'
import type {User} from "~/interfaces";
const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)
const { logout} = useSanctumAuth();
const toggleTheme =  () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}
const logoutHandler = async () => {

  await logout()
      .finally(() => {
        useRouter().push({name: 'login'})
      })

}

const { drawer,isMobile, appName, rail} = storeToRefs(useGlobalStore())
const user = useSanctumUser<User>()
const avatar = computed(() => `https://ui-avatars.com/api/?name=${user.value?.name}`)
const role = computed(() => user.value?.roles[0])
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
         @click="buttonActions.action"
         class="mr-2 mr-lg-12 mr-md-12"
     >
       <template #prepend>
          <v-icon>{{buttonActions?.icon}}</v-icon>
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