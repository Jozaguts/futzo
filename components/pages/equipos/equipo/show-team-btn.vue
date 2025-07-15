<script lang="ts" setup>
  import type { TeamResponse } from '~/models/Team'
  import { useTeamStore } from '~/store'

  const route = useRoute()
  const { teamId, isEdition, dialog, teamStoreRequest } =
    storeToRefs(useTeamStore())
  const loading = ref(false)
  const showTeamHandler = () => {
    loading.value = true
    const slug = route.params.equipo as string
    console.log({ slug })
    if (slug) {
      useTeamStore()
        .getTeam(slug)
        .then((data: TeamResponse) => {
          const { president, coach, ...team } = data
          teamId.value = data.id
          isEdition.value = true
          teamStoreRequest.value = {
            team: {
              id: team.id,
              name: team.name,
              tournament_id: team.tournament.id,
              category_id: team.category.id,
              address: team?.address,
              colors: team?.colors,
              description: team?.description,
              email: team?.email,
              image: team?.image,
              phone: team?.phone,
            },
            president: { ...president, image: president?.image },
            coach: { ...coach, image: coach?.image },
          }
          dialog.value = true
        })
        .finally(() => (loading.value = false))
    }
  }
</script>
<template>
  <PrimaryBtn
    :loading="loading"
    variant="elevated"
    icon="mdi:edit"
    text="Editar equipo"
    @click="showTeamHandler"
  />
</template>
