<script lang="ts" setup>
interface Props {
  text: string;
  icon?: string;
  variant:
      | "text"
      | "flat"
      | "elevated"
      | "tonal"
      | "outlined"
      | "plain"
      | undefined;
  showIcon?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  text: "prop name not set",
  icon: "futzo-icon:plus",
  variant: "elevated",
  showIcon: true,
  disabled: false,
  loading: false,
});
const emits = defineEmits(["click"]);
</script>
<template>
  <v-btn
      :variant="props.variant"
      class="app-bar-cat-btn"
      size="large"
      :loading="props.loading"
      :disabled="props.disabled"
      @click="emits('click')"
  >
    <template #prepend>
      <Icon v-if="props.showIcon" :name="props.icon"/>
    </template>
    {{ text }}
  </v-btn>
</template>
<style scoped>
.app-bar-cat-btn {
  max-height: 42px;
  border-radius: 8px;
  border: 1px solid #7f56d9;
  background: #9155fd;
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
  color: #fff !important;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
</style>
