<script lang="ts" setup>
import type {PlayerStoreRequest} from '~/models/Player'
import {number, object, string} from 'yup'
import {VMaskInput} from 'vuetify/labs/VMaskInput'
import {vuetifyConfig} from '~/utils/constants'

const { playerStoreRequest, steps } = storeToRefs(usePlayerStore())
const isMinor = computed(() => Boolean(playerStoreRequest.value.basic?.is_minor))

type ContactForm = PlayerStoreRequest['contact'] & {
  guardian_name?: string | null
  guardian_email?: string | null
  guardian_phone?: string | null
  guardian_relationship?: string | null
}

const { defineField, meta, values } = useForm<ContactForm>({
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
      guardian_name: string().nullable(),
      guardian_email: string().email().nullable(),
      guardian_phone: string().nullable(),
      guardian_relationship: string().nullable(),
    })
  ),
  initialValues: {
    ...playerStoreRequest.value.contact,
    guardian_name: playerStoreRequest.value.guardian?.name,
    guardian_email: playerStoreRequest.value.guardian?.email,
    guardian_phone: playerStoreRequest.value.guardian?.phone,
    guardian_relationship: playerStoreRequest.value.guardian?.relationship,
  },
})
const [email, email_props] = defineField('email', vuetifyConfig)
const [phone, phone_props] = defineField('phone', vuetifyConfig)
const [notes, notes_props] = defineField('notes', vuetifyConfig)
const [iso_code, iso_code_props] = defineField('iso_code', vuetifyConfig)
const [guardian_name, guardian_name_props] = defineField('guardian_name', vuetifyConfig)
const [guardian_email, guardian_email_props] = defineField('guardian_email', vuetifyConfig)
const [guardian_phone, guardian_phone_props] = defineField('guardian_phone', vuetifyConfig)
const [guardian_relationship, guardian_relationship_props] = defineField('guardian_relationship', vuetifyConfig)

onMounted(() => {
  steps.value.steps[steps.value.current].disable = false
})
watch(
  () => meta.value.valid,
  (isValid) => {
    steps.value.steps[steps.value.current].disable = !isValid
  },
  { immediate: true }
)
watch(
  values,
  () => {
    playerStoreRequest.value.contact = {
      email: values.email,
      phone: values.phone,
      notes: values.notes,
      iso_code: values.iso_code,
    }
    playerStoreRequest.value.guardian = {
      name: values.guardian_name ?? undefined,
      email: values.guardian_email ?? undefined,
      phone: values.guardian_phone ?? undefined,
      relationship: values.guardian_relationship ?? undefined,
    }
  },
  { deep: true, immediate: true }
)
</script>
<template>
  <v-container class="pt-0" id="player-step-3">
    <BaseInput
      id="jugadores-email"
      v-model="email"
      :props="email_props"
      type="email"
      label="Correo electrónico"
      placeholder="p.ej. sagit@futzo.io"
    />
    <BaseInput id="jugadores-phone" label="Teléfono" sublabel="Opcional">
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
    <BaseInput id="jugadores-notes" label="Notas adicionales" sublabel="Opcional">
      <template #input>
        <v-textarea
          v-model="notes"
          v-bind="notes_props"
          placeholder="Añade notas adicionales si es necesario..."
        ></v-textarea>
      </template>
    </BaseInput>
    <v-divider v-if="isMinor" class="my-4" />
    <div v-if="isMinor">
      <p class="text-subtitle-2 mb-3">Datos del tutor</p>
      <BaseInput v-model="guardian_name" :props="guardian_name_props" label="Nombre del tutor" sublabel="Opcional" />
      <BaseInput
        v-model="guardian_email"
        :props="guardian_email_props"
        label="Correo del tutor"
        sublabel="Opcional"
      />
      <BaseInput
        v-model="guardian_phone"
        :props="guardian_phone_props"
        label="Teléfono del tutor"
        sublabel="Opcional"
      />
      <BaseInput
        v-model="guardian_relationship"
        :props="guardian_relationship_props"
        label="Parentesco"
        sublabel="Opcional"
      />
    </div>
  </v-container>
</template>
