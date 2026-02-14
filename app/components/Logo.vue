<script lang="ts" setup>
const hydrated = ref(true)

  export interface Props {
    maxWidth?: string | number
    class?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    maxWidth: '100%',
    class: '',
  })
  const goToHome = () => {
    if (useRoute().name !== 'dashboard') {
      useRouter().push({ name: 'dashboard' })
    }
  }
  onMounted(() => {
    hydrated.value = false
  })
</script>
<template>
  <VSkeletonLoader v-if="hydrated" :max-width="props.maxWidth" type="avatar, heading" />
  <NuxtImg
      src="/futzo/logos/horizontal/bar-logo-12.png"
      format="webp"
      loading="lazy"
      fetch-priority="low"
      width="120"
      height="50"
      sizes="200px sm:120px md:120px"
      @click="goToHome"
      class="cursor-pointer"
      :class="props?.class"
  />
</template>
