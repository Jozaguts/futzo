<script lang="ts" setup>
  const { styles } = defineProps({
    styles: {
      type: String,
      default: 'main',
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
    <div :class="styles">
      <slot name="default" />
      <div v-if="$vuetify.display.mobile">
        <div class="position-fixed" style="min-width: 50px; min-height: 50px; z-index: 2000; bottom: 6rem; right: 2rem">
          <slot name="fab" />
        </div>
      </div>
    </div>
    <slot name="tour"></slot>
    <client-only>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </client-only>
  </div>
</template>
