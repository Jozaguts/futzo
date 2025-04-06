<script lang="ts" setup>
import InputDay from "~/components/pages/ubicaciones/stepper/InputDay.vue"
import {object, string, number, boolean} from "yup"
import type {PropType} from 'vue'
import {useLocationStore} from "~/store"
import type {LocationAvailability} from "~/models/Location"
import {useForm} from "vee-validate"
import {toTypedSchema} from "@vee-validate/yup"

const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
  initForm: {
    type: Object as PropType<LocationAvailability>,
  },
})
const emits = defineEmits(["step-completed"])
const {locationStoreRequest} = storeToRefs(useLocationStore())
const createDaySchema = () =>
    object({
      enabled: boolean().default(false),
      start: object({
        hours: string().default("09"),
        minutes: string().default("00"),
      }),
      end: object({
        hours: string().default("23"),
        minutes: string().default("00"),
      })
    })
const schema = object({
  id: number().default(props.step),
  name: string().required("Nombre del campo es requerido"),
  isCompleted: boolean().required("Debes marcar como completado"),
  monday: createDaySchema(),
  tuesday: createDaySchema(),
  wednesday: createDaySchema(),
  thursday: createDaySchema(),
  friday: createDaySchema(),
  saturday: createDaySchema(),
  sunday: createDaySchema(),
})
const {values, errors, handleSubmit, validate, setFieldValue} = useForm<LocationAvailability>({
  validationSchema: toTypedSchema(schema),
  initialValues: props.initForm ?? {id: props.step},
})
const isCompletedHandler = () => {
  setFieldValue('isCompleted', !values.isCompleted)
  emits("step-completed", "next", props.step)
}
watch(values, (val) => {
  locationStoreRequest.value.availability = locationStoreRequest.value.availability.map((item) =>
      item.id === val.id ? val : item
  )
}, {deep: true})
defineExpose({
  validate,
  handleSubmit,
  form: values,
})
</script>
<template>
  <v-row>

    <v-col cols="12">
      <v-text-field v-model="values.name" variant="outlined" label="Nombre o Identificador del campo de juego*" :error-messages="errors?.name"></v-text-field>
    </v-col>
  </v-row>
  <InputDay
      :day="values.monday"
      id="monday"
      label="Lunes"
      :onUpdateDay="(val) => setFieldValue('monday', val)"
  />
  <InputDay :day="values.tuesday"
            label="Martes"
            id="tuesday"
            :onUpdateDay="(val) => setFieldValue('tuesday', val)"
  />
  <InputDay :day="values.wednesday"
            label="Miércoles"
            id="wednesday"
            :onUpdateDay="(val) => setFieldValue('wednesday', val)"
  />
  <InputDay :day="values.thursday"
            label="Jueves"
            id="wednesday"
            :onUpdateDay="(val) => setFieldValue('thursday', val)"
  />
  <InputDay :day="values.friday"
            label="Viernes"
            id="wednesday"
            :onUpdateDay="(val) => setFieldValue('friday', val)"
  />
  <InputDay :day="values.saturday"
            label="Sábado"
            id=""
            :onUpdateDay="(val) => setFieldValue('saturday', val)"
  />
  <InputDay :day="values.sunday"
            label="Domingo"
            id="wednesday"
            :onUpdateDay="(val) => setFieldValue('sunday', val)"
  />
  <v-row>
    <v-col>
      <v-checkbox :model-value="values.isCompleted" @change="isCompletedHandler">
        <template #label>
          <div>Marcar como completado</div>
        </template>
      </v-checkbox>
    </v-col>
  </v-row>
  <!--  <slot name="actions"></slot>-->
</template>
