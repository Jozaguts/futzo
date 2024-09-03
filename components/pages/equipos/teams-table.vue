<script setup lang="ts">
import { useTeamStore } from "~/store";
import type { Team } from "~/models/Team";

const { teams, teamId, team, pagination } = storeToRefs(useTeamStore());
const search = ref("");
const headers = [
  { title: "#", value: "", sortable: true },
  { title: "Equipo", value: "name", sortable: true },
  { title: "Torneo", value: "tournament.name", sortable: true },
  { title: "Categoría", value: "category.name", sortable: true },
  { title: "Cancha", value: "field", sortable: true },
  { title: "Delegado/Presidente", value: "president.name", sortable: true },
  {
    title: "Teléfono",
    value: "president.phone",
    sortable: true,
    align: "center",
  },
  {
    title: "Correo",
    value: "president.email",
    sortable: true,
    align: "center",
  },
  {
    title: "Dirección",
    value: "address.structured_formatting.main_text",
    sortable: true,
    align: "center",
  },
  { title: "", value: "actions", sortable: false },
];
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
const showTeamHandler = (_team: Team) => {
  teamId.value = _team.id;
  team.value = _team;
  useRouter().push({
    name: "equipos-equipo",
    params: { equipo: _team.slug },
  });
};
</script>
<template>
  <v-card height="100%" variant="text">
    <v-card-title class="mb-4">
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>
    <v-card-text class="fill-height">
      <v-data-table
        class="border-sm fill-height futzo-rounded"
        style="max-height: 90%; border-color: #eaecf0 !important"
        :headers="headers"
        :items="teams"
        :search="search"
        item-key="name"
        items-per-page="10"
      >
        <template #[`item.name`]="{ item }">
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
          <v-btn
            size="small"
            disabled
            rounded="md"
            @click="showTeamHandler(item)"
            >Ver Equipo</v-btn
          >
        </template>
        <template #bottom="props">
          <v-divider />
          <v-pagination
            class="custom-pagination"
            v-model="pagination.page"
            :length="pagination.total"
            start="1"
            @update:modelValue="useTeamStore().getTeams()"
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
