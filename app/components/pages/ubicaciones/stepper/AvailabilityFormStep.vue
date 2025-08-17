<script lang="ts" setup>
  import InputDay from '~/components/pages/ubicaciones/stepper/InputDay.vue'
  import { object, string, number, boolean } from 'yup'
  import type { PropType } from 'vue'
  import type { Day, LocationAvailability } from '~/models/Location'
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/yup'
  import type { WeekDay } from '~/models/Schedule'

  const props = defineProps({
    step: {
      type: Number,
      required: true,
    },
    initForm: {
      type: Object as PropType<LocationAvailability>,
    },
  })
  const emits = defineEmits(['step-completed'])
  const { locationStoreRequest } = storeToRefs(useLocationStore())
  const createDaySchema = () =>
    object({
      enabled: boolean().default(false),
      start: object({
        hours: string().default('09'),
        minutes: string().default('00'),
      }),
      end: object({
        hours: string().default('23'),
        minutes: string().default('00'),
      }),
    })
  const schema = object({
    id: number().default(props.step),
    name: string().required('Nombre del campo es requerido'),
    isCompleted: boolean().required('Debes marcar como completado').default(false),
    monday: createDaySchema(),
    tuesday: createDaySchema(),
    wednesday: createDaySchema(),
    thursday: createDaySchema(),
    friday: createDaySchema(),
    saturday: createDaySchema(),
    sunday: createDaySchema(),
  })
  const { values, errors, handleSubmit, validate, setFieldValue, defineField, meta } = useForm<LocationAvailability>({
    validationSchema: toTypedSchema(schema),
    initialValues: props.initForm ?? { id: props.step },
  })
  const [name, nameAttr] = defineField('name')
  const isCompletedHandler = async () => {
    setFieldValue('isCompleted', !values.isCompleted)
    const validated = await validate()
    updateAvailability(values?.id, values)
    if (validated.valid && validated?.values?.isCompleted) {
      emits('step-completed', 'next', validated)
    }
  }
  const updateAvailability = (id: number, values: LocationAvailability) => {
    const index = locationStoreRequest.value.availability.findIndex((item) => item.id === id)
    if (index !== -1) {
      locationStoreRequest.value.availability[index] = values
    }
  }
  const updateDayHandler = (day: WeekDay, value: Day) => {
    setFieldValue(day, value)
  }
  onMounted(() => setFieldValue('isCompleted', false))
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="name"
        variant="outlined"
        label="Nombre o Identificador del campo de juego*"
        :error-messages="errors?.name"
      ></v-text-field>
    </v-col>
  </v-row>
  <InputDay :day="values.monday" id="monday" label="Lunes" :onUpdateDay="(val) => updateDayHandler('monday', val)" />
  <InputDay
    :day="values.tuesday"
    label="Martes"
    id="tuesday"
    :onUpdateDay="(val) => updateDayHandler('tuesday', val)"
  />
  <InputDay
    :day="values.wednesday"
    label="Miércoles"
    id="wednesday"
    :onUpdateDay="(val) => updateDayHandler('wednesday', val)"
  />
  <InputDay
    :day="values.thursday"
    label="Jueves"
    id="wednesday"
    :onUpdateDay="(val) => updateDayHandler('thursday', val)"
  />
  <InputDay
    :day="values.friday"
    label="Viernes"
    id="wednesday"
    :onUpdateDay="(val) => updateDayHandler('friday', val)"
  />
  <InputDay :day="values.saturday" label="Sábado" id="" :onUpdateDay="(val) => updateDayHandler('saturday', val)" />
  <InputDay
    :day="values.sunday"
    label="Domingo"
    id="wednesday"
    :onUpdateDay="(val) => updateDayHandler('sunday', val)"
  />
  <v-row>
    <v-col>
      <v-checkbox :model-value="values.isCompleted" :disabled="!meta.valid" @change="isCompletedHandler">
        <template #label>
          <div>Marcar como completado</div>
        </template>
      </v-checkbox>
    </v-col>
  </v-row>
</template>
