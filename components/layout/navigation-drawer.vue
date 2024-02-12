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
           <v-col cols="12">
              <h1 class="text-h5">
                {{appName}}
              </h1>
           </v-col>
           <v-divider></v-divider>
           <v-col cols="12">
              <v-list  color="white">
                <v-list-item link to="/">
                  <template #prepend>
                    <v-icon>mdi-home</v-icon>
                  </template>
                  <v-list-item-title>
                    Home
                  </v-list-item-title>
                </v-list-item>
                <v-list-item link to="/configuracion">
                  <template #prepend>
                    <v-icon>mdi-settings</v-icon>
                  </template>
                  <v-list-item-title>
                    Configuracion
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
import {useGlobalStore} from "~/store";
import {storeToRefs} from "pinia";
const { drawer, isMobile,appName } = storeToRefs(useGlobalStore())
</script>