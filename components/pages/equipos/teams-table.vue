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
// const search = ref("");
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
  teamId.value = _team.id;
  isEdition.value = true;
  teamStoreRequest.value = {
    team: {
      id: _team.id,
      name: _team.name,
      category_id: _team.category.id,
      address: _team.address,
      colors: _team.colors,
      description: _team.description,
      email: _team.email,
      image: _team.image,
      phone: _team.phone,
      tournament_id: _team.tournament.id,
    },
    president: { ..._team.president, image: _team.president.avatar },
    coach: { ..._team.coach, image: _team.coach.avatar },
  };
  // const response = useTeamStore().getTeam(teamId.value);
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
        class="border-sm fill-height futzo-rounded"
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
            >Ver Equipo</v-btn
          >
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
                class="align-self-start"
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
                class="ml-auto"
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
.v-pagination__prev {
  position: absolute;
  bottom: 0;
  left: 0;
}
.v-pagination__next {
  position: absolute;
  bottom: 0;
  right: 0;
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
