<script setup lang="ts">
import { useTeamStore } from "~/store";
import type { TeamResponse } from "~/models/Team";
import getHeaders from "~/utils/headers-table";

const {
  teams,
  teamId,
  isEdition,
  pagination,
  dialog,
  teamStoreRequest,
  search,
} = storeToRefs(useTeamStore());

const headers = getHeaders("teams");
const setChipColor = (status: string) => {
  switch (status) {
    case "creado":
      return "warning";
    case "en curso":
      return "success";
    case "completado":
      return "primary";
    case "cancelado":
      return "error";
    default:
      return "warning";
  }
};
const showTeamHandler = (_team: TeamResponse) => {
  const { president, coach, ...team } = _team;
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
    president: { ...president, image: president?.avatar },
    coach: { ...coach, image: coach?.avatar },
  };
  dialog.value = true;
};
const paginationHandler = (page: number) => {
  pagination.value.to = page;
  useTeamStore().getTeams();
};
const noTeams = computed(() => teams.value?.length === 0);
</script>
<template>
  <v-card height="100%" variant="text" v-if="!noTeams" class="mt-5">
    <v-card-text class="fill-height">
      <v-data-table
        class="border-sm fill-height futzo-rounded teams-table"
        style="max-height: calc(100% - 2rem); border-color: #eaecf0 !important"
        :headers="headers"
        :items="teams"
        :search="search"
        item-key="name"
        items-per-page="10"
      >
        <template #[`item.index`]="{ item, index }">
          {{ index + 1 }}
        </template>
        <template #[`item.name`]="{ item, index }">
          <v-avatar :image="item.image"></v-avatar>
          {{ item.name }}
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="setChipColor(item.name)"
            border="lg"
            class="text-capitalize"
          >
            {{ item.name }}
          </v-chip>
        </template>
        <template #item.actions="{ item }">
          <v-btn size="small" rounded="md" @click="showTeamHandler(item)"
            >Ver Equipo
          </v-btn>
        </template>
        <template #bottom>
          <v-divider />
          <v-pagination
            class="position-relative"
            v-model="pagination.page"
            :length="pagination.total"
            @update:modelValue="paginationHandler"
          >
            <template #prev="props">
              <v-btn
                @click="props.onClick"
                :disabled="props.disabled"
                elevation="0"
                variant="text"
                color="black"
                rounded="md"
                border="thin secondary"
                class="__pre"
              >
                <template #prepend>
                  <nuxt-icon name="arrow-left" filled></nuxt-icon>
                </template>
                Anterior
              </v-btn>
            </template>
            <template #next="props">
              <v-btn
                @click="props.onClick"
                :disabled="props.disabled"
                elevation="0"
                variant="text"
                color="black"
                rounded="md"
                border="thin secondary"
                class="__next"
              >
                <template #append>
                  <nuxt-icon name="arrow-right" filled></nuxt-icon>
                </template>
                Siguiente
              </v-btn>
            </template>
          </v-pagination>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<style>
.__next {
  position: absolute;
  bottom: 50%;
  right: 1rem;
  transform: translate(0, 50%);
}

.__pre {
  position: absolute;
  bottom: 50%;
  left: 1rem;
  transform: translate(0, 50%);
}

thead > tr > th {
  border-bottom: 1px solid #eaecf0 !important;
}

tbody > tr.v-data-table__tr:nth-child(even) {
  background: #f9fafb !important;
  border: 1px solid #eaecf0 !important;
}

.v-data-table__tr:nth-child(even) td {
  border-top: 1px solid #eaecf0 !important;
  border-bottom: 1px solid #eaecf0 !important;
}
</style>
