<script lang="ts" setup>
  import AvailabilityFormStep from '~/components/pages/ubicaciones/stepper/AvailabilityFormStep.vue'
  import type { Field, LocationStoreRequest } from '~/models/Location'
  import { array, boolean, number, object, string } from 'yup'
  import { useFieldArray } from 'vee-validate'
  const currentStep = ref<number>(1)
  const { locationStoreRequest, formSteps } = storeToRefs(useLocationStore())
  const { handleSubmit, validate } = useForm<Pick<LocationStoreRequest, 'fields'>>({
    validationSchema: toTypedSchema(
      object().shape({
        fields: array()
          .of(
            object().shape({
              id: number(),
              name: string().required(),
              type: string().nullable(),
              field_count: number().nullable(),
              windows: object({
                mon: array(
                  object({
                    label: string(),
                    enabled: boolean(),
                    start: string(),
                    end: string(),
                  })
                ),
                tue: array(object({ label: string(), enabled: boolean(), start: string(), end: string() })),
                wed: array(object({ label: string(), enabled: boolean(), start: string(), end: string() })),
                thu: array(object({ label: string(), enabled: boolean(), start: string(), end: string() })),
                fri: array(object({ label: string(), enabled: boolean(), start: string(), end: string() })),
                sat: array(object({ label: string(), enabled: boolean(), start: string(), end: string() })),
                sun: array(object({ label: string(), enabled: boolean(), start: string(), end: string() })),
                all: array(object({ label: string(), enabled: boolean(), start: string(), end: string() })),
              }),
              completed: boolean().default(false),
            })
          )
          .strict(),
      })
    ),
    initialValues: { fields: locationStoreRequest.value.fields },
  })
  const { fields, update } = useFieldArray<Field>('fields')
  const test = handleSubmit((values) => {
    if (values?.fields) {
      locationStoreRequest.value.fields = values.fields
    }
  })
  const markAsCompletedHandler = (data: { completed: boolean; isLast: boolean; form: Field; idx: number }) => {
    if (!data.completed) {
      formSteps.value.steps.availability.disable = true
    }
    update(data.idx, data.form)
    validate().then((response) => {
      if (response.valid && !data.isLast) {
        currentStep.value++
      } else if (response.valid && data.isLast) {
        const everyScheduleFormIsCompleted = response?.values?.fields?.every((val: Field) => val.completed)
        formSteps.value.steps.availability.disable = !everyScheduleFormIsCompleted
      }
    })
  }
</script>
<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col>
        <v-stepper editable class="pa-0 ma-0 futzo-vertical-stepper" v-model="currentStep">
          <v-stepper-header>
            <v-stepper-item
              v-for="field in fields"
              :value="field.value.id"
              :key="field.key"
              complete-icon="mdi-check-circle"
            >
              <template #title>
                <span class="d-inline-block text-truncate" style="max-width: 200px"> {{ field.value.name }}</span>
              </template>
            </v-stepper-item>
          </v-stepper-header>
          <v-stepper-window>
            <v-stepper-window-item v-for="(field, idx) in fields" :value="field.value.id" :key="field.key">
              <div class="pa-1">
                <AvailabilityFormStep
                  :init-form="field.value"
                  @step-completed="(data) => markAsCompletedHandler({ ...data, idx })"
                  :is-last="field.isLast"
                  @update-field="
                    (newFieldFormValues) => {
                      update(idx, newFieldFormValues)
                      test()
                    }
                  "
                />
              </div>
            </v-stepper-window-item>
          </v-stepper-window>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>
