<script setup lang="ts">
  import { useGlobalStore } from '#imports'

  const { doneStepsCound, state } = storeToRefs(useOnboardingStore())
  const { rail } = storeToRefs(useGlobalStore())
</script>

<template>
  <div class="nav-section-title">
    <div class="title-wrapper">
      <div class="title-text d-none d-md-block d-lg-block">Primeros pasos {{ doneStepsCound }}</div>
      <div class="title-text d-block d-md-none md-lg-none">
        <Icon name="streamline-sharp:steps-number" size="32" class="ml-2" v-if="rail"></Icon>
        <span v-else class="ml-4">Primeros pasos {{ doneStepsCound }}</span>
      </div>
    </div>
  </div>
  <div class="d-flex align-center">
    <v-banner :stacked="true" density="compact" class="pl-2 pt-0 pr-3">
      <v-banner-text class="banner-text" :style="{ 'max-width': rail ? '40px' : '100%' }">
        <v-list density="compact">
          <v-list-item
            v-if="!$vuetify.display.mobile"
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
          <v-list-item
            v-else
            class="text-primary border-sm rounded-lg text-left mb-1"
            :class="{
              'text-primary': task?.done,
              'text-disabled': !task?.done,
            }"
            v-for="task in state.steps"
            :key="task?.mobile_step"
          >
            <v-list-item-title v-if="rail">
              {{ task?.mobile_step }}
            </v-list-item-title>
            <v-list-item-title v-else>
              {{ task?.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-banner-text>
    </v-banner>
  </div>
</template>

<style scoped>
  .banner-text {
    padding: 0;
  }
</style>
