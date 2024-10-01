<script lang="ts" setup>
import useSchemas from "~/composables/useSchemas";
import "@vuepic/vue-datepicker/dist/main.css";
import { usePlayerStore, useTeamStore } from "~/store";

const { isEdition, playerStoreRequest } = storeToRefs(usePlayerStore());
const { teams } = storeToRefs(useTeamStore());
const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
  isEdition.value ? "edit-player-basic-info" : "create-player-basic-info",
);

defineExpose({
  validate,
  handleSubmit,
});
</script>
<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Posición*</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-select
          :items="[]"
          placeholder="p.ej. Ronaldo"
          outlined
          v-model="fields.last_name.fieldValue"
          v-bind="fields.last_name.fieldPropsValue"
          density="compact"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Jersey/Camiseta*</span>
      </v-col>
      <v-col cols="12" lg="8" md="8" classs="position-relative">
        <v-text-field type="number"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Altura</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
          placeholder="p.ej. 180"
          outlined
          type="number"
          v-model="fields.nationality.fieldValue"
          v-bind="fields.nationality.fieldPropsValue"
          density="compact"
          append-inner-icon="kg"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Peso </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field type="number" append-inner-icon="cms"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Pierna dominante</span>
      </v-col>
      <v-col cols="12" lg="8" md="8"></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1">Notas medicas</span>
      </v-col>
      <v-col cols="12" lg="8" md="8"></v-col>
    </v-row>
  </v-container>
</template>
<style>
@import "assets/scss/pages/players.sass";
</style>
