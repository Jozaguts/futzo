<script lang="ts" setup>
import {useAuthStore} from "~/store";
const routeName = computed(()=>  useRoute().name)
const leagueName = computed(() => useAuthStore().user?.league?.name)
const breadcrumbs = computed(()=>{
  switch (routeName.value) {
    case 'index':
      return [
        {
          title: 'Dashboard',
          to: '/'
        }
      ]
    case 'liga':
      return [
        leagueName.value,
      ]
    case 'liga-torneo':
      return [
        {
          title: leagueName.value,
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
          title: routeName.value,
          to: useRoute().path
        }
      ]
  }
})
</script>
<template>
  <v-breadcrumbs :items="breadcrumbs" :disabled="false">
    <template v-slot:title="{ item, index }">
      <span class="text-breadcrumbs" :class="index > 0 ? 'text-primary' : '' ">{{ item.title }}</span>
    </template>
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
</template>
<style lang="sass">
.v-breadcrumbs-item--disabled
  opacity: 1
.text-breadcrumbs
  color: var(--Component-colors-Utility-Gray-utility-gray-800, #182230)
  font-size: 20px
  font-style: normal
  line-height: 30px
  font-weight: 500
.text-breadcrumbs.text-primary
  font-weight: 700
</style>