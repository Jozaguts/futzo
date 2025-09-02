<script setup lang="ts">
const config = useRuntimeConfig()
const version = computed(() => config.public.appVersion || 'dev')
const env = process.env.NODE_ENV || 'production'
</script>

<template>
  <div class="version-badge" title="Version">
    <span>v{{ version }}</span>
  </div>
  
</template>

<style scoped>
.version-badge {
  position: fixed;
  right: 8px;
  bottom: 8px;
  padding: 4px 8px;
  font-size: 11px;
  color: #555;
  background: rgba(245, 245, 245, 0.8);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 6px;
  z-index: 9999;
  pointer-events: none; /* no interfiere con clics */
}
@media (prefers-color-scheme: dark) {
  .version-badge {
    color: #bbb;
    background: rgba(40, 40, 40, 0.6);
    border-color: rgba(255,255,255,0.06);
  }
}
</style>

