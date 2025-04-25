<script lang="ts" setup>
const model = ref<string[]>(['todas']);
const changeHandler = (value) => {
  console.log(value)
}
</script>
<template>
  <v-select
      max-width="200"
      min-width="200"
      label="Jornadas"
      class="app-bar-secondary-btn mr-4"
      item-title="text"
      density="compact"
      item-value="value"
      v-model="model"
      variant="outlined"
      hide-selected
      clearable
      multiple
      @update:model-value="changeHandler"
      :items="[
          {value: 'todas', text: 'Todas' },
      { value: 'programado', text: 'Programadas' },
      { value: 'en_progreso', text: 'En progreso' },
      { value: 'completado', text: 'Completadas' },
      { value: 'aplazado', text: 'Aplazadas' },
      { value: 'cancelado', text: 'Canceladas' },
    ]"
  >
    <template v-slot:item="{ props: itemProps, item }">
      <v-list-item v-bind="itemProps"></v-list-item>
    </template>
    <template #selection="{item,index}">
      <span class="app-bar-secondary-btn__input_text ">
         <v-chip v-if="index < 1" :text="item.title"></v-chip>
        <span
            v-if="index === 1"
            class="text-grey text-caption align-self-center"
        >
        (+{{ model.length - 1 }} others)
      </span>
      </span>
    </template>
  </v-select>
</template>
<style></style>
