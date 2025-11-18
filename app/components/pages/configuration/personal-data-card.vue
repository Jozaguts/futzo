<script setup lang="ts">
  import { mixed, object, string, number } from 'yup'
  import type { UpdateUserForm, User } from '~/models/User'
  import { vuetifyConfig } from '~/utils/constants'

  const user = computed(() => useAuthStore().user as User)
  const { defineField, meta, values, handleSubmit, resetForm } = useForm<
    Pick<User, 'email' | 'phone' | 'name'> & { iso_code: number }
  >({
    validationSchema: toTypedSchema(
      object({
        id: number().nullable(),
        name: string()
          .test('no-leading-space', 'No se permite espacio en blanco al inicio', (value) => {
            return !(value && value.startsWith(' '))
          })
          .required('Campo requerido'),
        phone: string()
          .transform((value) => (value === '' ? null : value))
          .nullable()
          .notRequired()
          .matches(/^(\+52)?(\d{10})$/, 'Número de teléfono no es válido'),
        email: string().email().nullable(),
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
      name: user.value?.name,
      email: user.value?.email,
      phone: user.value?.phone ? user.value?.phone?.replace(/\s+/g, '').slice(-10) : '',
      iso_code:
        user.value?.phone.length <= 10
          ? 52
          : (user.value?.phone?.replace(/\s+/g, '').slice(0, -10).replace('+', '') as unknown as number),
    },
  })
  const [name, name_props] = defineField('name', vuetifyConfig)
  const [email, email_props] = defineField('email', vuetifyConfig)
  const [phone, phone_props] = defineField('phone', vuetifyConfig)
  const [iso_code, iso_code_props] = defineField('iso_code', vuetifyConfig)
  const submit = handleSubmit((values) => {
    const updateUserForm: UpdateUserForm = {
      id: user.value.id,
      name: values.name,
      phone: values.phone,
      email: values.email,
    }
    useAuthStore().updateUser(updateUserForm)
  })
</script>
<template>
  <v-card class="secondary-card futzo-rounded pa-lg-8 pa-md-8 pa-4" max-width="600">
    <v-card-item class="secondary-card-item">
      <v-card-text class="secondary-card__title">Datos personales</v-card-text>
      <v-card-subtitle class="secondary-card__subtitle">Revisa y actualiza tu información. </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-form class="user-data-configuration-form" @submit.prevent="submit">
        <BaseInput v-model="name" :props="name_props" label="Nombre completo"> </BaseInput>
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
                active
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
        <BaseInput
          v-model="email"
          variant="outlined"
          :props="email_props"
          label="Correo electrónico"
          type="email"
        ></BaseInput>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" variant="elevated" color="primary" block> Guardar cambios </v-btn>
    </v-card-actions>
  </v-card>
</template>
