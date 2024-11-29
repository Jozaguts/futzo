<script lang="ts" setup>
defineProps({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  iconName: {
    type: String,
    default: () => "futzo-icon:football",
  },
});
const emits = defineEmits(["close-dialog"]);
</script>
<template>
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
    <template #title
      ><span class="">{{ title }}</span></template
    >
    <template #subtitle><span v-html="subtitle"></span></template>
    <template #append>
      <Icon name="futzo-icon:x-dialog" @click="() => emits('close-dialog')" />
    </template>
  </v-card-item>
  <v-divider></v-divider>
</template>
