<script lang="ts" setup>
  import { useGlobalStore } from '~/store'

  const props = defineProps({
    styles: {
      type: String,
      default: 'mt-10',
    },
  })
  onMounted(() => {
    const { rail, isMobile } = storeToRefs(useGlobalStore())
    if (isMobile.value) {
      rail.value = true
    }
  })
</script>
<template>
  <div class="futzo-page-container">
    <div class="header">
      <slot name="app-bar" />
    </div>
    <div class="main">
      <slot name="default" />
    </div>
  </div>
</template>
<style>
  @media (max-width: 600px) {
    .main {
      padding-top: 0 !important;
      position: relative;
    }
  }

  .futzo-page-container {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0 1.8fr;
    grid-auto-columns: 1fr;
    gap: 0 0;
    grid-auto-flow: row;
    grid-template-areas:
      'header header'
      'main main';
  }

  .header {
    grid-area: header;
    box-sizing: border-box;
  }

  .main {
    grid-area: main;
    box-sizing: border-box;
    padding: 40px;
  }
</style>
