<template>
  <v-navigation-drawer
      :permanent="!isMobile"
      v-model="drawer"
      floating
      color="background"
      elevation="0"
      :border="false"
      app>
      <template #prepend>
       <v-container>
         <v-row >
           <v-col cols="12" class="d-flex align-center">
             <v-img max-width="40" width="100%" height="40" src="/logo.png"></v-img>
              <h1 class="text-h5 ml-1">{{appName}}</h1>
           </v-col>
           <v-col cols="12">
              <v-list color="white" nav>
                <v-list-item density="compact" v-for="link in adminLinks" :key="link.title" link :to="link.to" :disabled="link.disabled" class="my-1">
                  <template #prepend>
                    <v-icon>{{link.icon}}</v-icon>
                  </template>
                  <v-list-item-title>
                    {{link.title}}
                  </v-list-item-title>
                </v-list-item>
                <LinkSeparator name="Equipos"></LinkSeparator>
                <v-list-item density="compact" v-for="link in teamsLinks" :key="link.title" link :to="link.to" :disabled="link.disabled" class="my-1">
                  <template #prepend>
                    <v-icon>{{link.icon}}</v-icon>
                  </template>
                  <v-list-item-title>
                    {{link.title}}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
           </v-col>
         </v-row>
       </v-container>
      </template>
  </v-navigation-drawer>
</template>
<script lang="ts" setup>
import LinkSeparator from "~/components/layout/link-separator.vue";
import {useAuthStore, useGlobalStore} from "~/store";
import {storeToRefs} from "pinia";
const { drawer, isMobile,appName } = storeToRefs(useGlobalStore())
const authStore = useAuthStore()
const adminLinks = reactive([
  { icon: 'mdi-home', title: 'Home', to: '/', disabled: false},
  { icon: 'mdi-users', title: 'Roles y Permisos', to: '/roles-permisos', disabled: authStore?.role !== 'super administrador'},
])
const teamsLinks = reactive([
  { icon: 'mdi-trophy-variant', title: 'Torneos', to: '/torneos', disabled: false},
  { icon: 'mdi-players', title: 'Roles y Permisos', to: '/roles-permisos', disabled: false},
])

</script>
