<script setup lang="ts">

const dialog = defineModel<boolean>();
const emits = defineEmits(["leaving"]);
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
  actions: {
    type: Object as PropType<{ primary: string; secondary: string }>,
  },
});
</script>
<template>
  <v-dialog
    v-model="dialog"
    max-width="690"
    @after-leave="emits('leaving')"
    scrollable
  >
    <v-card
      :loading="loading"
      class="create-tournament-card futzo-rounded"
      height="100%"
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
            <Icon name="line-md:map-marker-loop"></Icon>
          </v-sheet>
        </template>
        <v-card-title>
          <span> {{ title }}</span>
        </v-card-title>
        <v-card-subtitle><span v-html="subtitle"></span></v-card-subtitle>
        <template #append>
          <Icon name="futzo-icon:x-dialog" @click="dialog = false" />
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
        <slot name="v-card-text" />
      </v-card-text>
      <v-card-actions class="d-flex px-6 pb-6 justify-space-between">
        <slot name="actions">
          <v-btn
            width="50%"
            min-height="44"
            variant="outlined"
            color="secondary"
            density="comfortable"
            size="large"
            >{{ actions?.secondary }}
          </v-btn>
          <v-btn
            width="50%"
            min-height="44"
            variant="elevated"
            color="primary"
            density="comfortable"
            size="large"
            >{{ actions?.primary }}
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
