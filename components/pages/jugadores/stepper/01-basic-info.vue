<script lang="ts" setup>
import DragDropImage from "~/components/pages/torneos/drag-drop-image.vue";
import useSchemas from "~/composables/useSchemas";
import "@vuepic/vue-datepicker/dist/main.css";
import { usePlayerStore, useTeamStore } from "~/store";
import { useCategoryStore } from "~/store/useCategoryStore";
import { dragDropImageRef } from "~/composables/useImage";

const { isEdition, playerStoreRequest } = storeToRefs(usePlayerStore());
const { teams } = storeToRefs(useTeamStore());
const { categories } = storeToRefs(useCategoryStore());
const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
  isEdition.value ? "edit-player-basic-info" : "create-player-basic-info",
  { nationality: "Mexicana" },
);
const updateCategory = (teamId: number) => {
  const team = teams.value?.find((team) => team.id === teamId);
  if (team) {
    fields.category_id.fieldValue = team.category.id;
  }
};
onMounted(() => {
  useTeamStore().list();
  if (playerStoreRequest.value?.basic) {
    setValues({ ...playerStoreRequest.value.basic });
    if (playerStoreRequest.value.basic.image) {
      dragDropImageRef.value?.loadImage();
    }
  }
});
onUnmounted(() => {
  resetForm();
});

defineExpose({
  validate,
  handleSubmit,
});
</script>
<template>
  <v-container class="pt-0">
    <BaseInput
      label="Nombre(s) del jugador*"
      placeholder="p.ej. Cristiano"
      v-model="fields.name"
    ></BaseInput>
    <BaseInput
      placeholder="p.ej. Ronaldo"
      label="Apellido(s) del jugador*"
      v-model="fields.last_name"
    />
    <BaseInput label="Fecha de nacimiento*">
      <template #input>
        <BaseCalendarInput
          v-model:start_date="fields.birthdate.fieldValue"
          :multiCalendar="false"
        />
      </template>
    </BaseInput>
    <BaseInput
      v-model="fields.nationality"
      label="Nacionalidad*"
      placeholder="p.ej. Mexicana"
    ></BaseInput>
    <BaseInput label="Imagen del jugador">
      <template #input>
        <DragDropImage v-model="fields.image.fieldValue" />
        <span
          class="text-error text-caption"
          :class="
            fields.image.fieldPropsValue['error-messages'][0] ? 'ml-2' : ''
          "
          >{{ fields.image.fieldPropsValue["error-messages"][0] ?? "" }}</span
        >
      </template>
    </BaseInput>
    <BaseInput label="Equipo">
      <template #input>
        <v-autocomplete
          item-value="id"
          item-title="name"
          v-model="fields.team_id.fieldValue"
          density="compact"
          v-bind="fields.team_id.fieldPropsValue"
          :items="teams"
          @update:model-value="updateCategory"
        />
      </template>
    </BaseInput>
    <BaseInput label="Categoría">
      <template #input>
        <v-select
          item-value="id"
          item-title="name"
          v-model="fields.category_id.fieldValue"
          density="compact"
          disabled
          v-bind="fields.category_id.fieldPropsValue"
          :items="categories"
        />
      </template>
    </BaseInput>
  </v-container>
</template>
<style lang="sass">
@use "assets/scss/pages/players.sass"
@use "assets/css/vue-datepicker-custom"
</style>
