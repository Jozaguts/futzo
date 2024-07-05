<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {useGlobalStore, useTournamentStore} from "~/store";

const {isMobile} = storeToRefs(useGlobalStore())
const currentRouteName = computed(() =>  useRoute().name)

const buttonActions = computed<{icon: string, title: string} | boolean>(() => {
  switch(currentRouteName.value){
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
const handleActions = () => {
  switch (currentRouteName.value) {
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