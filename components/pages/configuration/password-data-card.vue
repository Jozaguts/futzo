<script setup lang="ts">
import { useAuthStore } from "~/store";
import type { UpdateUserPasswordForm, User } from "~/models/user";

const { fields, handleSubmit } = useSchemas("edit-password");
const user = computed(() => useAuthStore().user as User);
const states = reactive({
  showPassword: false,
  showNewPassword: false,
  showNewPasswordConfirmation: false,
});

const submit = handleSubmit((values) => {
  const updateUserPasswordForm: UpdateUserPasswordForm = {
    id: user.value.id,
    password: values.password,
    new_password: values.new_password,
    new_password_confirmation: values.new_password_confirmation,
  };
  useAuthStore().updatePassword(updateUserPasswordForm);
});
</script>
<template>
  <v-card class="secondary-card" variant="text">
    <v-card-item class="secondary-card-item">
      <v-card-text class="secondary-card__title">Contraseña</v-card-text>
      <v-card-subtitle class="secondary-card__subtitle">
        Por favor ingresa tu contraseña actual para cambiar su
        contraseña.</v-card-subtitle
      >
    </v-card-item>
    <v-card-text>
      <v-form class="user-data-configuration-form" @submit.prevent="submit">
        <v-row class="row-border-bottom" no-gutters>
          <v-col cols="3">
            <p class="label-form">Contraseña actual</p>
          </v-col>
          <v-col cols="4">
            <v-text-field
              :type="states.showPassword ? 'text' : 'password'"
              v-model="fields.password.fieldValue"
              variant="plain"
              class="user-data-configuration-form__input"
            >
              <template #append>
                <v-icon
                  v-if="states.showPassword"
                  @click="states.showPassword = !states.showPassword"
                  class="icon-password"
                >
                  mdi-eye-off-outline</v-icon
                >
                <v-icon
                  v-else
                  @click="states.showPassword = !states.showPassword"
                  class="icon-password"
                  >mdi-eye-outline</v-icon
                >
              </template>
            </v-text-field>
            <small class="text-error">{{
              fields.password.fieldPropsValue["error-messages"][0]
            }}</small>
          </v-col>
        </v-row>
        <v-row class="row-border-bottom" no-gutters>
          <v-col cols="3">
            <p class="label-form">Nueva contraseña</p>
          </v-col>
          <v-col cols="4">
            <v-text-field
              :type="states.showNewPassword ? 'text' : 'password'"
              v-model="fields.new_password.fieldValue"
              variant="plain"
              class="user-data-configuration-form__input"
            >
              <template #append>
                <v-icon
                  v-if="states.showNewPassword"
                  @click="states.showNewPassword = !states.showNewPassword"
                  class="icon-password"
                  >mdi-eye-off-outline</v-icon
                >
                <v-icon
                  v-else
                  @click="states.showNewPassword = !states.showNewPassword"
                  class="icon-password"
                  >mdi-eye-outline</v-icon
                >
              </template>
            </v-text-field>
            <small class="text-error">{{
              fields.new_password.fieldPropsValue["error-messages"][0]
            }}</small>
          </v-col>
        </v-row>
        <v-row class="row-border-bottom" no-gutters>
          <v-col cols="3">
            <p class="label-form">Confirma tu nueva contraseña</p>
          </v-col>
          <v-col cols="4">
            <v-text-field
              :type="states.showNewPasswordConfirmation ? 'text' : 'password'"
              v-model="fields.new_password_confirmation.fieldValue"
              variant="plain"
              class="user-data-configuration-form__input"
            >
              <template #append>
                <v-icon
                  v-if="states.showNewPasswordConfirmation"
                  @click="
                    states.showNewPasswordConfirmation =
                      !states.showNewPasswordConfirmation
                  "
                  class="icon-password"
                  >mdi-eye-off-outline</v-icon
                >
                <v-icon
                  v-else
                  @click="
                    states.showNewPasswordConfirmation =
                      !states.showNewPasswordConfirmation
                  "
                  class="icon-password"
                  >mdi-eye-outline</v-icon
                >
              </template>
            </v-text-field>
            <small class="text-error">{{
              fields.new_password_confirmation.fieldPropsValue[
                "error-messages"
              ][0]
            }}</small>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="4" offset="3">
            <div class="d-flex justify-end align-center pt-4">
              <v-btn
                type="submit"
                class="user-data-configuration-form__button"
                color="primary"
                dark
              >
                Guardar cambios
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
