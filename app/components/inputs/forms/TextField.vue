<script setup lang="ts">
type InputProps = {
  fieldValue: string;
  fieldPropsValue: { "error-messages": [] };
};
const model = defineModel<InputProps>({
  default: {
    fieldValue: "",
    fieldPropsValue: { "error-messages": [] },
  },
});
defineProps({
  placeholder: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <v-text-field
    :placeholder="placeholder"
    outlined
    v-model="model.fieldValue"
    density="compact"
    :error-messages="model.fieldPropsValue['error-messages']"
  ></v-text-field>
</template>
