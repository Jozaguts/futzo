<script setup lang="ts">
import HeaderCard from "~/components/shared/custom-dialog/header.vue";

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
      <template #loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="primary"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
      <HeaderCard
        @close-dialog="dialog = false"
        :title="title"
        :subtitle="subtitle"
      />
      <v-card-text>
        <slot name="v-card-text" />
      </v-card-text>
      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
