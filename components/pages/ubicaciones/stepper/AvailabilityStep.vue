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
              start: yup.string(),
              end: yup.string(),
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
  <v-container class="pa-0">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <v-switch label="Lunes"></v-switch>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <div class="d-flex justify-space-between">
          <VueDatePicker v-model="monday.start" time-picker :is24="false">
            <template #dp-input="{ value }">
              <v-text-field :value="value" density="compact" variant="outlined" rounded="lg" :single-line="true" style="max-height: 44px; padding-inline: 0;">
                <template #prepend-inner
                ><span class="text-medium-emphasis mr-5">Desde</span></template
                >
              </v-text-field>
            </template>
          </VueDatePicker>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <v-switch label="Lunes"></v-switch>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <div class="d-flex justify-space-between">
          <VueDatePicker v-model="monday.start" time-picker/>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <v-switch label="Lunes"></v-switch>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <div class="d-flex justify-space-between">
          <VueDatePicker v-model="monday.start" time-picker/>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <v-switch label="Lunes"></v-switch>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <div class="d-flex justify-space-between">
          <VueDatePicker v-model="monday.start" time-picker/>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <v-switch label="Lunes"></v-switch>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <div class="d-flex justify-space-between">
          <VueDatePicker v-model="monday.start" time-picker/>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <v-switch label="Lunes"></v-switch>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <div class="d-flex justify-space-between">
          <VueDatePicker v-model="monday.start" time-picker/>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <v-switch label="Lunes"></v-switch>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <div class="d-flex justify-space-between">
          <VueDatePicker v-model="monday.start" time-picker/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

