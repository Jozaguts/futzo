<script setup lang="ts">
  import DragDropImage from '~/components/pages/torneos/drag-drop-image.vue'
  import { mixed, number, object, string } from 'yup'
  import { vuetifyConfig } from '~/utils/constants'
  import { storeToRefs, useTeamStore } from '#imports'
  const teamStore = useTeamStore()
  const { teamStoreRequest, isEdition, steps } = storeToRefs(teamStore)
  // @ts-ignore
  const { defineField, meta, values, errors } = useForm<TeamStoreRequest['president']>({
    validationSchema: toTypedSchema(
      object({
        id: number().nullable(),
        name: string().test('no-leading-space', 'No se permite espacio en blanco al inicio', (value) => {
          return !(value && value.startsWith(' '))
        }),
        phone: string()
          .transform((value) => (value === '' ? null : value))
          .nullable()
          .notRequired()
          .matches(/^(\+52)?(\d{10})$/, 'Número de teléfono no es válido'),
        email: string().email().nullable(),
        image: mixed()
          .nullable()
          .test('File is required', 'Solo imágenes .jgp, png, svg ', (value: any) => {
            if (!value) return true
            return value?.type?.includes('image/') || typeof value === 'string'
          }),
        iso_code: number()
          .when('phone', {
            is: (value: string) => {
              return !!value
            },
            then: (schema: any) => {
              return schema.required('Campo requerido')
            },
            otherwise: (schema: any) => {
              return schema.nullable()
            },
          })
          .lessThan(999, 'numero de lada invalido'),
      })
    ),
    initialValues: {
      name: teamStoreRequest.value?.president?.name,
      email: teamStoreRequest.value?.president?.email,
      image: teamStoreRequest.value?.president?.image,
      phone: teamStoreRequest.value?.president?.phone
        ? teamStoreRequest.value.president?.phone?.replace(/\s+/g, '').slice(-10)
        : null,
      iso_code: teamStoreRequest.value?.president?.phone
        ? teamStoreRequest.value?.president?.phone?.replace(/\s+/g, '').slice(0, -10).replace('+', '')
        : null,
    },
  })
  const [name, name_props] = defineField('name', vuetifyConfig)
  const [image, image_props] = defineField('image', vuetifyConfig)
  const [email, email_props] = defineField('email', vuetifyConfig)
  const [phone, phone_props] = defineField('phone', vuetifyConfig)
  const [iso_code, iso_code_props] = defineField('iso_code', vuetifyConfig)
  onMounted(() => {
    steps.value.steps[steps.value.current].disable = false
    if (isEdition.value) {
      steps.value.steps.createOwner.next_label = 'Editar Equipo'
    }
    if (teamStoreRequest.value?.president) {
      if (teamStoreRequest.value.president.image) {
        // dragDropImageRef.value?.loadImage()
      }
    }
  })
  watch(
    meta,
    () => {
      if (meta.value.valid && meta.value.touched) {
        let { name, email, image, iso_code, phone } = values
        phone = iso_code && phone ? `+${iso_code}${phone}` : ''
        teamStoreRequest.value.president = {
          name,
          email,
          image,
          phone,
        }
        steps.value.steps[steps.value.current].disable = false
      } else if (!meta.value.valid && meta.value.touched) {
        steps.value.steps[steps.value.current].disable = !meta.value.valid
      }
    },
    { deep: true }
  )
</script>
<template>
  <pre>
    {{ errors }}
  </pre>
  <v-container class="container" style="min-height: 480px">
    <BaseInput
      v-model="name"
      :props="name_props"
      sublabel="Opcional"
      label="Nombre del dueño/delegado"
      placeholder="p.ej. Luis Veloz"
    />
    <BaseInput label="Imagen del usuario" sublabel="Opcional">
      <template #input>
        <DragDropImage v-model="image" :error-messages="image_props" />
      </template>
    </BaseInput>
    <BaseInput
      label="Correo electrónico"
      sublabel="Opcional"
      v-model="email"
      :props="email_props"
      placeholder="p.ej. luis@futzo.io"
      :disabled="isEdition"
      type="email"
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
  </v-container>
</template>
