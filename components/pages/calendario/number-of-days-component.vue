<script lang="ts" setup>
defineProps<{
  name: string,
  value: number,
  size: number,
}>()
</script>
<template>
  <v-sheet  class="grid-container" color="transparent" width="130" height="130" border rounded variant="text">
        <h3  class="text-body-1 grid-container__title"> {{name}}</h3>
        <span class="text-h3 grid-container__value mb-1">{{value}}</span>
        <v-btn class="grid-container__plus-btn" :width="size" :height="size" size="small" small><v-icon>mdi-plus</v-icon></v-btn>
        <v-btn class="grid-container__minus-btn" :width="size" :height="size" size="small" small ><v-icon>mdi-minus</v-icon></v-btn>
  </v-sheet>
</template>
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.6fr 1.2fr 1.2fr;
  height: 100%;
  justify-items: center;

  grid-template-areas:
    "title title"
    "value plus"
    "value minus";
}
.grid-container__title { grid-area: title; }
.grid-container__value { grid-area: value; justify-self: center; align-self: center; }
.grid-container__plus-btn { grid-area: plus; }
.grid-container__minus-btn { grid-area: minus; }
</style>