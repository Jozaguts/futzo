<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {useScheduleStore} from "~/store/useScheduleStore";

const {schedules,daysToPlaySelected,daysToPlayCustomSelected} =storeToRefs(useScheduleStore())
const daysOfTheWeek = [
  {name: 'Lunes', value: 'lunes'},
  {name: 'Martes', value: 'martes'},
  {name: 'Miércoles', value: 'miércoles'},
  {name: 'Jueves', value: 'jueves'},
  {name: 'Viernes', value: 'viernes'},
  {name: 'Sábado', value: 'sábado'},
  {name: 'Domingo', value: 'domingo'}
]
defineProps<{
  show: boolean,
  cols: number
}>()
watch(() => daysToPlayCustomSelected.value, (newValue) => {
  daysToPlaySelected.value =   {days: newValue, key: 'other', text: 'Otro'} as any
})
</script>
<template>
  <v-col cols="12" :md="cols" :lg="cols">
    <v-select
        multiple
        :items="daysOfTheWeek"
        v-if="show"
        v-model="daysToPlayCustomSelected"
        item-title="name"
        clearable
        label="Selecciona los dias de juego"
        center-affix
        direction="horizontal"
    >
      <template v-slot:selection="{ item, index }">
        <v-chip v-if="index <2">
          <span>{{ item.title }}</span>
        </v-chip>
        <span
            v-if="index === 2"
            class="text-grey text-caption align-self-center"
        >
        (+{{ daysToPlayCustomSelected.length - 2 }} otros)
      </span>
      </template>
    </v-select>
  </v-col>

</template>