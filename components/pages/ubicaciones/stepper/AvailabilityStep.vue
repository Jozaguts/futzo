<script lang="ts" setup>
import type {LocationAvailability} from "~/models/Location";
import * as yup from "yup";
import {object} from "yup";
import InputDay from "~/components/pages/ubicaciones/stepper/InputDay.vue";


const {defineField, errors, handleSubmit, resetForm, validate} = useForm<LocationAvailability>({
  validationSchema: toTypedSchema(
      object({
        monday: object()
            .shape({
              enabled: yup.boolean().default(false),
              start: object().shape({
                hours: yup.string().default('09'),
                minutes: yup.string().default('00'),
              }),
              end: object().shape({
                hours: yup.string().default('23'),
                minutes: yup.string().default('00'),
              }),
            }),
        tuesday: object()
            .shape({
              enabled: yup.boolean().default(false),
              start: object().shape({
                hours: yup.string().default('09'),
                minutes: yup.string().default('00'),
              }),
              end: object().shape({
                hours: yup.string().default('23'),
                minutes: yup.string().default('00'),
              }),
            }),
        wednesday: object()
            .shape({
              enabled: yup.boolean().default(false),
              start: object().shape({
                hours: yup.string().default('09'),
                minutes: yup.string().default('00'),
              }),
              end: object().shape({
                hours: yup.string().default('23'),
                minutes: yup.string().default('00'),
              }),
            }),
        thursday: object()
            .shape({
              enabled: yup.boolean().default(false),
              start: object().shape({
                hours: yup.string().default('09'),
                minutes: yup.string().default('00'),
              }),
              end: object().shape({
                hours: yup.string().default('23'),
                minutes: yup.string().default('00'),
              }),
            }),
        friday: object()
            .shape({
              enabled: yup.boolean().default(true),
              start: object().shape({
                hours: yup.string().default('09'),
                minutes: yup.string().default('00'),
              }),
              end: object().shape({
                hours: yup.string().default('23'),
                minutes: yup.string().default('00'),
              }),
            }),
        saturday: object()
            .shape({
              enabled: yup.boolean().default(true),
              start: object().shape({
                hours: yup.string().default('09'),
                minutes: yup.string().default('00'),
              }),
              end: object().shape({
                hours: yup.string().default('23'),
                minutes: yup.string().default('00'),
              }),
            }),
        sunday: object()
            .shape({
              enabled: yup.boolean().default(true),
              start: object().shape({
                hours: yup.string().default('09'),
                minutes: yup.string().default('00'),
              }),
              end: object().shape({
                hours: yup.string().default('23'),
                minutes: yup.string().default('00'),
              }),
            }),
      })
  ),
})
const [monday] = reactive(defineField('monday'))
const [tuesday] = reactive(defineField('tuesday'))
const [wednesday] = reactive(defineField('wednesday'))
const [thursday] = reactive(defineField('thursday'))
const [friday] = reactive(defineField('friday'))
const [saturday] = reactive(defineField('saturday'))
const [sunday] = reactive(defineField('sunday'))
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
    <InputDay v-model:day="monday" label="Lunes"/>
    <InputDay v-model:day="tuesday" label="Martes"/>
    <InputDay v-model:day="wednesday" label="Miércoles"/>
    <InputDay v-model:day="thursday" label="Jueves"/>
    <InputDay v-model:day="friday" label="Viernes"/>
    <InputDay v-model:day="saturday" label="Sábado"/>
    <InputDay v-model:day="sunday" label="Domingo"/>
  </v-container>
</template>
<style lang="sass">
.custom-dp-location
  max-width: 190px

.dp__icon.dp__input_icons
  margin-top: 12px
</style>

