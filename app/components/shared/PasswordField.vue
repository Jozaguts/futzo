<script setup lang="ts">
  const states = reactive({
    showPassword: false,
    showNewPassword: false,
    showNewPasswordConfirmation: false,
  })
  const modelValue = defineModel<string>('modelValue')
</script>

<template>
  <v-text-field
    :type="states.showPassword ? 'text' : 'password'"
    v-model="modelValue"
    variant="plain"
    class="user-data-configuration-form__input"
  >
    <template #append>
      <v-icon v-if="states.showPassword" @click="states.showPassword = !states.showPassword" class="icon-password">
        mdi-eye-off-outline</v-icon
      >
      <v-icon v-else @click="states.showPassword = !states.showPassword" class="icon-password">mdi-eye-outline</v-icon>
    </template>
  </v-text-field>
</template>
