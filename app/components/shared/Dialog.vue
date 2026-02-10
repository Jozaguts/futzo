<script setup lang="ts">
const dialog = defineModel<boolean>()
const emits = defineEmits(['leaving'])
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  minHeight: {
    type: String,
    default: 'auto',
  },
  iconName: {
    type: String,
    default: 'line-md:map-marker-loop',
  },
  persistent: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: '700px',
  },
})
</script>
<template>
  <v-dialog
      v-model="dialog"
      :max-width="width"
      :min-height="minHeight"
      :persistent="persistent"
      @after-leave="() => emits('leaving')"
      scrollable
  >
    <v-card
        :loading="loading"
        class="create-tournament-card futzo-rounded"
        :style="{ overflow: $vuetify.display.mobile ? '' : 'hidden' }"
    >
      <template #loader="{ isActive }"></template>
      <v-card-item>
        <template #prepend>
          <v-sheet
              border="primary thin"
              class="mx-auto d-flex justify-center align-center mr-2 rounded-lg"
              height="45"
              width="45"
          >
            <Icon :name="iconName"></Icon>
          </v-sheet>
        </template>
        <v-card-title>
          <span> {{ title }}</span>
        </v-card-title>
        <v-card-subtitle><span v-html="subtitle"></span></v-card-subtitle>
        <template #append>
          <Icon
            v-if="showClose"
            name="futzo-icon:x-dialog"
            @click="dialog = false"
            size="24"
            class="cursor-pointer"
          />
        </template>
      </v-card-item>
      <v-progress-linear
          v-if="loading"
          :active="loading"
          color="primary"
          height="4"
          indeterminate
      ></v-progress-linear>
      <v-divider v-else></v-divider>
      <v-card-text>
        <slot name="v-card-text"/>
      </v-card-text>
      <v-card-actions class="d-flex px-6 pb-6 justify-space-between">
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
