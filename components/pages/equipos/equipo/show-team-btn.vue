<script lang="ts" setup>
import type {TeamResponse} from "~/models/Team";
import {useTeamStore} from "~/store";

const route = useRoute();
const {
  teams,
  teamId,
  isEdition,
  dialog,
  teamStoreRequest,
} = storeToRefs(useTeamStore());
const showTeamHandler = () => {
  const _team = teams.value?.find((t) => t.slug === route.params.equipo as string);

  const {president, coach, ...team} = _team;
  teamId.value = _team.id;
  isEdition.value = true;

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
    president: {...president, image: president?.image},
    coach: {...coach, image: coach?.image},
  };
  dialog.value = true;
};
</script>
<template>
  <PrimaryBtn
      variant="elevated"
      icon="futzo-icon:calendar-white"
      text="Editar equipo"
      @click="showTeamHandler"
  />
</template>
