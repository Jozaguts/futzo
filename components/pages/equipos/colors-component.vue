<script lang="ts" setup>
import ColorPicker from "~/components/shared/colorPicker.vue";

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

const colors = defineModel<Colors>("colors", {
  default: {
    home: {
      primary: "#fff",
      secondary: "#fff",
    },
    away: {
      primary: "#fff",
      secondary: "#fff",
    },
  },
});
defineProps({
  errors: {
    type: Object,
    default: () => ({
      "error-messages": [],
    }),
  },
});
const updateColorHandler = (
  color: string,
  isHomeColor: boolean,
  type: "primary" | "secondary",
) => {
  if (isHomeColor) {
    colors.value.home[type] = color;
  } else {
    colors.value.away[type] = color;
  }
};
</script>
<template>
  <v-row no-gutters>
    <v-col cols="6">
      <div class="color-pickers-container">
        <div class="color-pickers-container__label">
          <span class="text-body-2">Local</span>
        </div>
        <div class="color-picker-items-container">
          <div class="color-picker-items-container__item home primary">
            <ColorPicker
              @update-value="updateColorHandler($event, true, 'primary')"
            />
          </div>
          <div class="color-picker-items-container__item home secondary">
            <ColorPicker
              @update-value="updateColorHandler($event, true, 'secondary')"
            />
          </div>
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
          <div class="color-picker-items-container__item away primary">
            <ColorPicker
              @update-value="updateColorHandler($event, false, 'primary')"
            />
          </div>
          <div class="color-picker-items-container__item away secondary">
            <ColorPicker
              @update-value="updateColorHandler($event, false, 'secondary')"
            />
          </div>
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
<style lang="sass">
.color-picker-items-container__item.home.primary
  background: v-bind('colors.home.primary')

.color-picker-items-container__item.home.secondary
  background: v-bind('colors.home.secondary')

.color-picker-items-container__item.away.primary
  background: v-bind('colors.away.primary')

.color-picker-items-container__item.away.secondary
  background: v-bind('colors.away.secondary')
</style>
