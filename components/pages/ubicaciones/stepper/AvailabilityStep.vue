<script lang="ts" setup>
import type {LocationAvailability} from "~/models/Location";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import * as yup from "yup";
import {object} from "yup";


const {defineField, errors, handleSubmit, resetForm, validate} = useForm<LocationAvailability>({
  validationSchema: toTypedSchema(
      object({
        monday: object()
            .shape({
              enabled: yup.boolean().default(true),
              start: object().shape({
                hours: yup.string().default('00'),
                minutes: yup.string().default('00'),
              }),
              end: object().shape({
                hours: yup.string().default('23'),
                minutes: yup.string().default('59'),
              }),
            })
            .nullable()
      })
  ),
})
const [monday] = reactive(defineField('monday'))
defineExpose({
  validate,
  handleSubmit,
});
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pt-0">
        <v-divider/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <v-switch v-model="monday.enabled" label="Lunes" class=" mt-1"></v-switch>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <div class="d-flex justify-space-between">
          <VueDatePicker v-model="monday.start" time-picker class="custom-dp-location">
            <template #dp-input="{ value }">
              <v-text-field :value="value"
                            density="compact"
                            variant="outlined"
                            rounded="lg"
                            :single-line="true"
                            class="custom-location-input">
                <template #prepend-inner
                ><span class="text-medium-emphasis mr-5">Desde</span></template
                >
              </v-text-field>
            </template>
          </VueDatePicker>
          <VueDatePicker class="custom-dp-location" v-model="monday.end" time-picker>
            <template #dp-input="{ value }">
              <v-text-field
                  class="custom-location-input"
                  :value="value" density="compact" variant="outlined" rounded="lg" :single-line="true">
                <template #prepend-inner
                ><span class="text-medium-emphasis mr-5">Hasta</span></template
                >
              </v-text-field>
            </template>
          </VueDatePicker>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="sass">
.custom-dp-location
  max-width: 190px

.dp__icon.dp__input_icons
  margin-top: 12px

.custom-location-input
  max-height: 44px
  padding-inline: 0

.custom-location-input > .v-input__control > .v-field > .v-field__field > input
  text-indent: 32px
  font-weight: 900
</style>

