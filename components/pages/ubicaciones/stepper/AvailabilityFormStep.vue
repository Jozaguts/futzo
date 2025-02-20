<script lang="ts" setup>
import InputDay from "~/components/pages/ubicaciones/stepper/InputDay.vue";
import type {LocationAvailability} from "~/models/Location";
import {object, string} from "yup";
import * as yup from "yup";

const {defineField, errors, handleSubmit, resetForm, validate} = useForm<LocationAvailability>({
  validationSchema: toTypedSchema(
      object({
        name: string().required('Nombre del campo es requerido'),
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
const [name] = reactive(defineField('name'))
const [monday] = reactive(defineField('monday'))
const [tuesday] = reactive(defineField('tuesday'))
const [wednesday] = reactive(defineField('wednesday'))
const [thursday] = reactive(defineField('thursday'))
const [friday] = reactive(defineField('friday'))
const [saturday] = reactive(defineField('saturday'))
const [sunday] = reactive(defineField('sunday'))

const form = computed(() => {
  return {
    name: name.value,
    monday: monday.value,
    tuesday: tuesday.value,
    wednesday: wednesday.value,
    thursday: thursday.value,
    friday: friday.value,
    saturday: saturday.value,
    sunday: sunday.value,
  }
})
const props = defineProps({
  step: {
    type: Number,
    required: true
  },
})
defineExpose({
  validate,
  handleSubmit,
  form,
});
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-text-field v-model="name" variant="outlined" label="Nombre o Identificador del campo de juego*" :error-messages="errors.name"></v-text-field>
    </v-col>
  </v-row>
  <InputDay v-model:day="monday" label="Lunes"/>
  <InputDay v-model:day="tuesday" label="Martes"/>
  <InputDay v-model:day="wednesday" label="Miércoles"/>
  <InputDay v-model:day="thursday" label="Jueves"/>
  <InputDay v-model:day="friday" label="Viernes"/>
  <InputDay v-model:day="saturday" label="Sábado"/>
  <InputDay v-model:day="sunday" label="Domingo"/>
  <slot name="actions"></slot>
</template>
