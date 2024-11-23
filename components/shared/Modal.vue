<!--todo eliminar-->
<template>
  <VDialog
    :width="width"
    v-model="isActive"
    :scrollable="true"
    :persistent="persistent"
  >
    <VCard>
      <template #title>
        <h4 class="text-capitalize py-2">{{ title }}</h4>
      </template>
      <VCardText style="height: 430px">
        <slot name="content" />
      </VCardText>
      <VCardActions>
        <slot name="actions" />
      </VCardActions>
    </VCard>
  </VDialog>
</template>
<script lang="ts" setup>
const isActive = ref(false);
const props = defineProps({
  persistent: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 700,
  },
  title: String,
});
const toggle = () => (isActive.value = !isActive.value);
defineExpose({
  toggle,
});
</script>
