<script setup lang="ts">
  const { doneStepsCound, state } = storeToRefs(useOnboardingStore())
</script>

<template>
  <div class="nav-section-title">
    <div class="title-wrapper">
      <div class="title-text">Primeros pasos {{ doneStepsCound }}</div>
    </div>
  </div>
  <div class="d-flex align-center">
    <v-banner :stacked="true" density="compact" class="pl-2 pt-0 pr-3">
      <v-banner-text class="pa-0">
        <v-list density="compact">
          <v-list-item
            class="text-primary border-sm rounded-lg my-2 pa-2 text-left"
            :class="{
              'text-primary': task?.done,
              'text-disabled': !task?.done,
            }"
            v-for="task in state.steps"
            :key="task?.title"
          >
            <v-list-item-title>
              {{ task?.title }}
            </v-list-item-title>
            <template #append><v-icon v-if="task.done">mdi-check</v-icon> </template>
          </v-list-item>
        </v-list>
      </v-banner-text>
    </v-banner>
  </div>
</template>

<style scoped></style>
