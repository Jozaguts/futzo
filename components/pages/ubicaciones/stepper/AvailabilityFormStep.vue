<script lang="ts" setup>
import InputDay from "~/components/pages/ubicaciones/stepper/InputDay.vue";
import type {LocationAvailability} from "~/models/Location";
import {object, string, number, boolean} from "yup";
import * as yup from "yup";
import type {PropType} from 'vue'
import {useLocationStore} from "~/store";

const props = defineProps({
  step: {
    type: Number,
    required: true
  },
  initForm: {
    type: Object as PropType<LocationAvailability>,
  }
})
const {defineField, errors, handleSubmit, validate} = useForm<LocationAvailability>({
  validationSchema: toTypedSchema(
      object({
        id: number().default(props.step),
        name: string().required('Nombre del campo es requerido'),
        isCompleted: boolean().required('Necesitas marcarlo como completado para continuar'),
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
const {locationStoreRequest} = storeToRefs(useLocationStore())
const [id] = reactive(defineField('id'))
const [name] = reactive(defineField('name'))
const [monday] = reactive(defineField('monday'))
const [tuesday] = reactive(defineField('tuesday'))
const [wednesday] = reactive(defineField('wednesday'))
const [thursday] = reactive(defineField('thursday'))
const [friday] = reactive(defineField('friday'))
const [saturday] = reactive(defineField('saturday'))
const [sunday] = reactive(defineField('sunday'))
const [isCompleted] = reactive(defineField('isCompleted'))
const form = computed(() => {
  return {
    id: id.value,
    name: name.value,
    isCompleted: isCompleted.value,
    monday: monday.value,
    tuesday: tuesday.value,
    wednesday: wednesday.value,
    thursday: thursday.value,
    friday: friday.value,
    saturday: saturday.value,
    sunday: sunday.value,
  }
})
const emits = defineEmits(['step-completed'])

defineExpose({
  validate,
  handleSubmit,
  form,
});
const isCompletedHandler = () => {
  isCompleted.value = !isCompleted.value
  emits('step-completed', 'next', props.step)
}
watch(form, (value) => {
  locationStoreRequest.value.availability = locationStoreRequest.value.availability.map((item) => {
    if (item.id === value.id) {
      return value
    }
    return item
  })
})
onMounted(() => {
  id.value = props.step
  if (props.initForm) {
    name.value = props.initForm.name
    isCompleted.value = props.initForm.isCompleted
    monday.value = props.initForm.monday
    tuesday.value = props.initForm.tuesday
    wednesday.value = props.initForm.wednesday
    thursday.value = props.initForm.thursday
    friday.value = props.initForm.friday
    saturday.value = props.initForm.saturday
    sunday.value = props.initForm.sunday
  }
})
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
  <v-row>
    <v-col>
      <v-checkbox :value="isCompleted" @click="isCompletedHandler" :error-messages="errors.isCompleted">
        <template v-slot:label>
          <div>
            Marcar como completado
          </div>
        </template>
      </v-checkbox>
    </v-col>
  </v-row>
  <!--  <slot name="actions"></slot>-->
</template>
