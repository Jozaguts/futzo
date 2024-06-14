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
  <v-app-bar color="background" density="prominent" :border="false" elevation="0" height="45" app>
    <v-container fluid class="py-0 my-auto">
      <v-row no-gutters>
        <v-col cols="6"  md="10" lg="10">
          <v-breadcrumbs :items="breadcrumbs" :disabled="false">
            <template v-slot:title="{ item }">
              <span class="text-capitalize text-black text-h4">{{ item.title }}</span>
            </template>
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>
        <v-col cols="6" md="2" lg="2" class="d-flex justify-center align-center" v-if="buttonActions">
         <v-btn variant="elevated" :density="isMobile ? 'default' : 'comfortable' " :size="isMobile ? 'default' : 'large' " @click="buttonActions.action">
           <template #prepend>
              <v-icon>{{buttonActions?.icon}}</v-icon>
             <span class="text-body-2">{{buttonActions?.title}}</span>
           </template>
         </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<style lang="sass">
.v-breadcrumbs-item--disabled
  opacity: 1
</style>