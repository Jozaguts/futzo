<script setup lang="ts">
defineProps<{
  msg?: string;
  description?: string;
  closeIcon: string;
  typeIcon: string;
  color: string;
  backgroundColor: string;
  styles?: object;
}>();
</script>

<template>
  <div class="headless">
    <Icon :name="typeIcon" size="38" class="icon"></Icon>
    <p class="headlessTitle">{{ msg }}</p>
    <button class="headlessClose" @click="$emit('closeToast')">
      <Icon :name="closeIcon" size="38"></Icon>
    </button>
    <p class="headlessDescription">
      {{ description }}
    </p>
  </div>
</template>

<style>
:root {
  --gray4: #f8f8f8;
  --descriptionColor: #4d5761;
  --titleColor: #111927;
}

.headless {
  padding: 16px;
  width: 400px;
  box-sizing: border-box;
  background: v-bind(backgroundColor);
  border: 1px solid var(--gray4);
  position: relative;
  border-left-width: 7px;
  border-left-color: v-bind(color);
  border-radius: 12px;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 40px auto 40px;
  grid-template-rows: auto;
  gap: 8px;
  grid-template-areas:
    "icon title close-icon"
    ". content content";
  align-items: center;
}

.icon {
  grid-area: icon;
}

.headlessDescription {
  margin: 0;
  color: var(--descriptionColor);
  font-size: 14px;
  line-height: 1;
  grid-area: content;
  max-width: 80%;
}

.headlessTitle {
  font-size: 14px;
  color: var(--titleColor);
  font-weight: 500;
  line-height: 1;
  grid-area: title;
}

.headlessClose {
  cursor: pointer;
  height: 38px;
  width: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--descriptionColor);
  padding: 0;
  background: transparent;
  border: none;
  transition: color 200ms;
  grid-area: close-icon;
}

.headlessClose:hover {
  color: var(--titleColor);
}
</style>
