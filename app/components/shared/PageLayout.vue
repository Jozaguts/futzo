<script lang="ts" setup>
  const props = defineProps({
    styles: {
      type: String,
      default: 'mt-10',
    },
  })
  const { rail, isMobile } = storeToRefs(useGlobalStore())
  onMounted(() => {
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
    <client-only>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </client-only>
  </div>
</template>
