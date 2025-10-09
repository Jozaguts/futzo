<script lang="ts" setup>
  const loading = ref(false)
  const showTeamHandler = () => {
    loading.value = true
    const slug = useRoute().params?.equipo as string
    useTeamStore()
      .showTeamHandler(slug)
      .finally(() => (loading.value = false))
  }
</script>
<template>
  <PrimaryBtn :loading="loading" variant="elevated" icon="mdi:edit" text="Editar equipo" @click="showTeamHandler" />
</template>
