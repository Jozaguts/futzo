<script setup lang="ts">
import {number, object, string} from 'yup'
import {VMaskInput} from 'vuetify/labs/VMaskInput'
import type {UpdateUserForm, User} from '~/models/User'
import {vuetifyConfig} from '~/utils/constants'

const user = computed(() => useAuthStore().user as User)
  const { defineField, handleSubmit, errors, meta } = useForm<
    Pick<User, 'email' | 'phone' | 'name' | 'contact_method'> & { iso_code: number }
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
        contact_method: string(),
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
      contact_method: user.value?.contact_method ?? 'email',
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
  const [contact_method, contact_method_props] = defineField('contact_method', vuetifyConfig)
  const submit = handleSubmit((values) => {
    const updateUserForm: UpdateUserForm = {
      id: user.value.id,
      name: values.name,
      phone: values.phone,
      email: values.email,
      contact_method: values.contact_method,
    }
    useAuthStore().updateUser(updateUserForm)
  })
</script>
<template>
  <v-card class="secondary-card pa-lg-8 pa-md-8 pa-4"  variant="text">
    <v-card-item class="secondary-card-item">
      <v-card-text class="secondary-card__title">Datos personales</v-card-text>
      <v-card-subtitle class="secondary-card__subtitle">Revisa y actualiza tu información. </v-card-subtitle>
    </v-card-item>
    <v-card-text style="max-width: 600px;">
      <v-form class="user-data-configuration-form">
        <BaseInput v-model="name" :props="name_props" label="Nombre completo" variant="solo-filled" :rounded="16" />
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
                variant="solo-filled"
                :rounded="16"
              ></v-number-input>
              <v-mask-input
                  variant="solo-filled"
                  :rounded="16"
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
          variant="solo-filled"
          :rounded="16"
          :props="email_props"
          label="Correo electrónico"
          type="email"
        ></BaseInput>
        <BaseInput label="Método de contacto">
          <template #input>
            <v-select
              v-model="contact_method"
              :item-props="(item) => ({ title: item.title, subtitle: item.subtitle })"
              :items="[
                { value: 'email', title: 'Correo electrónico', subtitle: '' },
                { value: 'phone', title: 'Teléfono', subtitle: 'SMS/WhatsApp' },
              ]"
              item-value="value"
              item-title="tile"
              variant="solo-filled"
              :rounded="16"
              density="compact"
              iyrm
              placeholder="Selecciona un método de contacto"
              v-bind="contact_method_props"
            ></v-select>
          </template>
        </BaseInput>
      </v-form>
    </v-card-text>
    <v-card-actions style="max-width: 600px;">
      <v-btn @click="submit" type="button" variant="elevated" color="primary" block> Guardar cambios </v-btn>
    </v-card-actions>
  </v-card>
</template>
