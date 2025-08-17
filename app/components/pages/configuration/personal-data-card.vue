<script setup lang="ts">
  import { VPhoneInput } from 'v-phone-input'
  import type { UpdateUserForm, User } from '~/models/user'

  const { fields, resetForm, handleSubmit } = useSchemas('edit-user')
  const user = computed(() => useAuthStore().user as User)
  onMounted(() => {
    resetForm({
      values: {
        name: user.value.name,
        phone: user.value.phone,
        email: user.value.email,
      },
    })
  })
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
  <v-card class="secondary-card" variant="text">
    <v-card-item class="secondary-card-item">
      <v-card-text class="secondary-card__title">Edita tus datos personales</v-card-text>
      <v-card-subtitle class="secondary-card__subtitle">
        Estos son tus datos personales, puedes editarlos debajo.</v-card-subtitle
      >
    </v-card-item>
    <v-card-text>
      <v-form class="user-data-configuration-form" @submit.prevent="submit">
        <v-row class="row-border-bottom" no-gutters>
          <v-col cols="3">
            <p class="label-form">Nombre completo</p>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="fields.name.fieldValue"
              variant="plain"
              class="user-data-configuration-form__input"
            ></v-text-field>
            <small class="text-error">{{ fields.name.fieldPropsValue['error-messages'][0] }}</small>
          </v-col>
        </v-row>
        <v-row class="row-border-bottom" no-gutters>
          <v-col cols="3">
            <p class="label-form">Teléfono</p>
          </v-col>
          <v-col cols="4">
            <client-only>
              <VPhoneInput
                variant="plain"
                :singleLine="true"
                v-model="fields.phone.fieldValue"
                class="user-data-configuration-form__input"
                :invalidMessage="
                  ({ label, example }) => {
                    return `${label} debe ser un numero valido (${example}).`
                  }
                "
              >
              </VPhoneInput>
              <small class="text-error">{{ fields.phone.fieldPropsValue['error-messages'][0] }}</small>
            </client-only>
          </v-col>
        </v-row>
        <v-row class="row-border-bottom" no-gutters>
          <v-col cols="3">
            <p class="label-form">Correo electrónico</p>
          </v-col>
          <v-col cols="4">
            <v-text-field
              type="email"
              v-model="fields.email.fieldValue"
              variant="plain"
              class="user-data-configuration-form__input"
            ></v-text-field>
            <small class="text-error">{{ fields.email.fieldPropsValue['error-messages'][0] }}</small>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="4" offset="3">
            <div class="d-flex justify-end align-center pt-4">
              <v-btn type="submit" class="user-data-configuration-form__button" color="primary" dark>
                Guardar cambios
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
