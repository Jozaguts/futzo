<script setup lang="ts">
  type VErrorProps = {
    'error-messages': string[]
  }
  const model = defineModel()
  const { placeholder, label, sublabel, props } = defineProps<{
    placeholder?: string
    label?: string
    sublabel?: string
    props?: VErrorProps
  }>()
</script>

<template>
  <v-row>
    <v-col cols="12" lg="4" md="4">
      <slot name="label">
        <span class="d-block text-body-1"> {{ label }} </span>
        <small v-if="sublabel">{{ sublabel }}</small>
      </slot>
    </v-col>
    <v-col cols="12" lg="8" md="8">
      <slot name="input">
        <v-text-field
          :placeholder="placeholder"
          outlined
          v-model="model"
          density="compact"
          v-bind="props"
        ></v-text-field>
      </slot>
    </v-col>
  </v-row>
</template>
