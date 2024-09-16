<script lang="ts" setup>
interface Props {
  text: string;
  icon: string;
}

const props = withDefaults(defineProps<Props>(), {
  text: "prop name not set",
  icon: "plus",
});
const emits = defineEmits(["click"]);
</script>
<template>
  <v-btn class="app-bar-cat-btn" size="large" @click="emits('click')">
    <template #prepend>
      <nuxt-icon :name="icon" filled />
    </template>
    {{ text }}
  </v-btn>
</template>
<style>
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
