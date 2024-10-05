<script lang="ts" setup>
import { usePlayerStore } from "~/store";
import useSchemas from "~/composables/useSchemas";
import { VPhoneInput } from "v-phone-input";

const { isEdition } = storeToRefs(usePlayerStore());
const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
  isEdition.value ? "edit-player-contact-info" : "create-player-contact-info",
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
        <v-text-field
          v-model="fields.email.fieldValue"
          v-bind="fields.email.fieldPropsValue"
          placeholder="p.ej."
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Teléfono*</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <client-only>
          <VPhoneInput
            variant="plain"
            :singleLine="true"
            v-model="fields.phone.fieldValue"
            class="phone-input"
            :disabled="isEdition"
            display-format="international"
            example="52 1 55 1234 5678"
            validate-on="blur lazy"
            :invalidMessage="
              ({ label, example }) => {
                return `${label} debe ser un numero valido (${example}).`;
              }
            "
          >
          </VPhoneInput>
          <small class="text-error">{{
            fields.phone.fieldPropsValue["error-messages"][0]
          }}</small>
        </client-only>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Dirección*</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-textarea
          placeholder="Anade notas adicionales si es necesario..."
          v-model="fields.notes.fieldValue"
          v-bind="fields.notes.fieldPropsValue"
        >
        </v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>
