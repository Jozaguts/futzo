<script lang="ts" setup>
  import type { PlayerStoreRequest } from '~/models/Player'
  import { number, object, string } from 'yup'
  import { VMaskInput } from 'vuetify/labs/VMaskInput'
  import { vuetifyConfig } from '~/utils/constants'

  const { playerStoreRequest, steps } = storeToRefs(usePlayerStore())
  const { defineField, meta, values } = useForm<PlayerStoreRequest['contact']>({
    validationSchema: toTypedSchema(
      object({
        email: string().email(),
        phone: string()
          .transform((value) => (value === '' ? null : value))
          .nullable()
          .notRequired()
          .matches(/^(\+52)?(\d{10})$/, 'Número de teléfono no es válido'),
        notes: string().nullable(),
        iso_code: number().lessThan(999, 'numero de lada invalido'),
      })
    ),
    initialValues: playerStoreRequest.value.contact,
  })
  const [email, email_props] = defineField('email', vuetifyConfig)
  const [phone, phone_props] = defineField('phone', vuetifyConfig)
  const [notes, notes_props] = defineField('notes', vuetifyConfig)
  const [iso_code, iso_code_props] = defineField('iso_code', vuetifyConfig)
  onMounted(() => {
    steps.value.steps[steps.value.current].disable = false
  })
  watch(
    meta,
    () => {
      steps.value.steps[steps.value.current].disable = !meta.value.valid
      if (meta.value.valid && meta.value.touched) {
        playerStoreRequest.value.contact = { ...values }
      }
    },
    { deep: true }
  )
</script>
<template>
  <v-container class="pt-0">
    <BaseInput
      v-model="email"
      :props="email_props"
      type="email"
      label="Correo electrónico"
      placeholder="p.ej. sagit@futzo.io"
    />
    <BaseInput label="Teléfono" sublabel="Opcional">
      <template #input>
        <div class="d-flex">
          <v-number-input
            style="max-height: 40px"
            max-width="100"
            class="mr-2"
            v-bind="iso_code_props"
            placeholder="52"
            label="lada"
            single-line
            prefix="+"
            v-model="iso_code"
            density="compact"
            control-variant="hidden"
            variant="outlined"
          ></v-number-input>
          <v-mask-input
            variant="outlined"
            density="compact"
            v-model="phone"
            v-bind="phone_props"
            mask="phone"
            placeholder="(###) ### - ####"
          >
          </v-mask-input>
        </div>
      </template>
    </BaseInput>
    <BaseInput label="Notas adicionales" sublabel="Opcional">
      <template #input>
        <v-textarea
          v-model="notes"
          v-bind="notes_props"
          placeholder="Añade notas adicionales si es necesario..."
        ></v-textarea>
      </template>
    </BaseInput>
  </v-container>
</template>
