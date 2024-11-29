<script lang="ts" setup>
import { useTeamStore } from "~/store";

const store = useTeamStore();
const { teamStoreRequest } = storeToRefs(store);

interface Colors {
  home: {
    primary: string;
    secondary: string;
  };
  away: {
    primary: string;
    secondary: string;
  };
}

const colors = ref<Colors>({
  home: {
    primary: "#fff",
    secondary: "#fff",
  },
  away: {
    primary: "#fff",
    secondary: "#fff",
  },
});
const colorsModel = defineModel();
watch(
  colors,
  (value) => {
    colorsModel.value = value;
  },
  { deep: true },
);
defineProps({
  errors: {
    type: Object,
    default: () => ({
      "error-messages": [],
    }),
  },
});
onMounted(() => {
  if (teamStoreRequest.value?.team?.colors) {
    colors.value = teamStoreRequest.value.team.colors;
  }
});
</script>
<template>
  <v-row no-gutters>
    <v-col cols="6">
      <div class="color-pickers-container">
        <div class="color-pickers-container__label">
          <span class="text-body-2">Local</span>
        </div>
        <div class="color-picker-items-container">
          <ColorPicker v-model:color="colors.home.primary" />
          <ColorPicker v-model:color="colors.home.secondary" />
        </div>
        <div>
          <small class="text-error text-caption">{{
            errors["error-messages"][0]
          }}</small>
        </div>
      </div>
    </v-col>
    <v-col cols="6">
      <div class="color-pickers-container">
        <div class="color-pickers-container__label">
          <span class="text-body-2">Visitante</span>
        </div>
        <div class="color-picker-items-container">
          <ColorPicker v-model:color="colors.away.primary" />
          <ColorPicker v-model:color="colors.away.secondary" />
        </div>
        <div>
          <small class="text-error text-caption">{{
            errors["error-messages"][0]
          }}</small>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
