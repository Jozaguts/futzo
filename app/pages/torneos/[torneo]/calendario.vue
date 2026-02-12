<script lang="ts" setup>
  import type { User } from '~/models/User'

  definePageMeta({
    middleware: ['check-tournament'],
  })

  const route = useRoute()
  const user = useSanctumUser<User>()
  const isLogged = computed(() => Boolean(user.value?.email || user.value?.phone))

  const target = computed(() => {
    if (!isLogged.value) {
      return {
        name: 'torneos-torneo-status',
        params: { torneo: route.params.torneo },
      }
    }

    return {
      name: 'torneos-torneo',
      params: { torneo: route.params.torneo },
      query: { tab: 'calendario' },
    }
  })

  await navigateTo(target.value, { replace: true })
</script>

<template>
  <div></div>
</template>
