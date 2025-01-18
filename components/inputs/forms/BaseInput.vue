<script setup lang="ts">
type InputProps = {
  fieldValue: string;
  fieldPropsValue: { "error-messages": [] };
};
const model = defineModel<InputProps>({
  default: {
    fieldValue: "",
    fieldPropsValue: {"error-messages": []},
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
  <v-row>
    <v-col cols="12" lg="4" md="4">
      <slot name="label">
        <span class="text-body-1"> {{ label }} </span>
      </slot>
    </v-col>
    <v-col cols="12" lg="8" md="8">
      <slot name="input">
        <v-text-field
            :placeholder="placeholder"
            outlined
            v-model="model.fieldValue"
            density="compact"
            :error-messages="model.fieldPropsValue['error-messages']"
        ></v-text-field>
      </slot>
    </v-col>
  </v-row>
</template>
