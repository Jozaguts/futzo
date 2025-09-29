<script lang="ts" setup>
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
    <div class="footer d-lg-none d-md-none">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
