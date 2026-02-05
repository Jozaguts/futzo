<script setup lang="ts">
import type {UpdateUserPasswordForm, User} from '~/models/User'
import {object, ref as yupRef, string} from 'yup'
import {vuetifyConfig} from '~/utils/constants'
import PasswordField from '~/components/shared/PasswordField.vue'

const user = computed(() => useAuthStore().user as User)
  const states = reactive({
    showPassword: false,
    showNewPassword: false,
    showNewPasswordConfirmation: false,
  })
  const { defineField, meta, values, handleSubmit, resetForm } = useForm<{
    password: string
    new_password: string
    new_password_confirmation: string
  }>({
    validationSchema: toTypedSchema(
      object({
        password: string().required('Campo requerido'),
        new_password: string()
          .min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
          .required('Campo requerido'),
        new_password_confirmation: string()
          .oneOf([yupRef('new_password')], 'Las contraseñas no coinciden')
          .required('Campo requerido'),
      })
    ),
  })
  const [password, password_props] = defineField('password', vuetifyConfig)
  const [new_password, new_password_props] = defineField('new_password', vuetifyConfig)
  const [new_password_confirmation, new_password_confirmation_props] = defineField(
    'new_password_confirmation',
    vuetifyConfig
  )
  const submit = handleSubmit((values) => {
    const updateUserPasswordForm: UpdateUserPasswordForm = {
      id: user.value.id,
      password: values.password,
      new_password: values.new_password,
      new_password_confirmation: values.new_password_confirmation,
    }
    useAuthStore().updatePassword(updateUserPasswordForm)
  })
</script>
<template>
  <v-card class="secondary-card pa-lg-8 pa-md-8 pa-4" variant="text">
    <v-card-item class="secondary-card-item">
      <v-card-title class="secondary-card__title">Contraseña</v-card-title>
      <v-card-subtitle class="secondary-card__subtitle"> Ingresa tu contraseña actual para actualizarla.</v-card-subtitle>
    </v-card-item>
    <v-card-text style="max-width: 600px;">
      <v-form class="user-data-configuration-form" @submit.prevent="submit">
        <BaseInput label="Contraseña actual">
          <template #input>
            <PasswordField v-model="password"  variant="solo-filled" :rounded="16"/>
          </template>
        </BaseInput>
        <BaseInput label="Nueva contraseña">
          <template #input>
            <PasswordField v-model="new_password" variant="solo-filled" :rounded="16" />
          </template>
        </BaseInput>
        <BaseInput label="Confirma tu nueva contraseña">
          <template #input>
            <PasswordField v-model="new_password_confirmation"  variant="solo-filled" :rounded="16"/>
          </template>
        </BaseInput>
      </v-form>
    </v-card-text>
    <v-card-actions style="max-width: 600px;">
      <v-btn type="submit" variant="elevated" color="primary" block> Guardar cambios </v-btn>
    </v-card-actions>
  </v-card>
</template>
