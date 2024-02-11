<template>
  <v-navigation-drawer
      :permanent="!isMobile"
      v-model="drawer"
      floating
      color="background"
      elevation="0"
      :border="false"
      app >
      <template #prepend>
       <v-container>
         <v-row>
           <v-col>
              <h1 class="text-h5">
                {{appName}}
              </h1>
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