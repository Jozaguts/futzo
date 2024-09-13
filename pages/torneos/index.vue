<script setup lang="ts">
import NoTournamentsSvg from "~/components/pages/liga/NoTournamentsSvg.vue";
import CreateTournamentDialog from "~/components/pages/torneos/Dialog.vue";
import { storeToRefs } from "pinia";
import { useTournamentStore } from "~/store";
import { useTheme } from "vuetify";
import { useRouter } from "#app";
import { computed, onMounted } from "#imports";
import type { Tournament } from "~/models/tournament";

const backgroundColor = useTheme().current.value.colors.background;
const headers = [
  { title: "Nombre del torneo", value: "name", sortable: true },
  { title: "Categoría", value: "category.name", sortable: true },
  { title: "Formato", value: "format.name", sortable: true },
  { title: "Inicio", value: "start_date", sortable: true },
  { title: "Fin", value: "end_date", sortable: true },
  { title: "# de equipos", value: "teams", sortable: true, align: "center" },
  { title: "# de partidos", value: "matches", sortable: true, align: "center" },
  {
    title: "# de jugadores",
    value: "players",
    sortable: true,
    align: "center",
  },
  { title: "Status", value: "status", sortable: true, align: "center" },
  { title: "", value: "actions", sortable: false },
];
const { dialog, tournaments, tournamentId, tournament, pagination } =
  storeToRefs(useTournamentStore());
onMounted(() => {
  useTournamentStore().loadTournaments();
});
const theAreTournaments = computed(() => tournaments.value.length > 0);
const handleShowTournament = (_tournament: Tournament) => {
  tournamentId.value = _tournament.id;
  tournament.value = _tournament;
  useRouter().push({
    name: "torneos-torneo",
    params: { torneo: _tournament.slug },
  });
};
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
</script>
<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <v-col>
        <v-card
          v-if="!tournaments.length"
          rounded
          elevation="2"
          height="100%"
          class="mx-0 mx-md-8 mx-lg-8 d-flex justify-center align-center text-center"
        >
          <v-card-item>
            <v-card-title> No hay torneos aún </v-card-title>
            <v-card-text>
              <NoTournamentsSvg />
            </v-card-text>
            <v-card-title class="text-body-2">
              Crea un torneo para verlo aquí.
            </v-card-title>

            <v-btn
              color="primary"
              variant="elevated"
              class="mt-4 text-body-1"
              @click="dialog = !dialog"
            >
              Crear torneo
            </v-btn>
          </v-card-item>
        </v-card>
        <v-card v-else height="100%" variant="text">
          <v-card-title class="mb-4">
            <v-tabs>
              <v-tab value="1" class="text-uppercase" base-color="secondary"
                >Todos los torneos</v-tab
              >
              <v-tab value="2" class="text-uppercase" base-color="secondary"
                >Próximos torneos</v-tab
              >
              <v-tab value="3" class="text-uppercase" base-color="secondary"
                >torneos jugados</v-tab
              >
            </v-tabs>
          </v-card-title>
          <v-card-text class="fill-height">
            <v-data-table
              class="border-sm fill-height futzo-rounded"
              style="max-height: 90%; border-color: #eaecf0 !important"
              :headers="headers"
              :items="tournaments"
              item-key="name"
              items-per-page="10"
              show-select
            >
              <template
                v-slot:header.data-table-select="{
                  allSelected,
                  selectAll,
                  someSelected,
                }"
              >
                <v-checkbox-btn
                  :indeterminate="someSelected && !allSelected"
                  :model-value="allSelected"
                  color="primary"
                  @update:model-value="selectAll(!allSelected)"
                >
                </v-checkbox-btn>
              </template>
              <template
                v-slot:item.data-table-select="{
                  internalItem,
                  isSelected,
                  toggleSelect,
                }"
              >
                <v-checkbox-btn
                  :model-value="isSelected(internalItem)"
                  color="primary"
                  @update:model-value="toggleSelect(internalItem)"
                ></v-checkbox-btn>
              </template>
              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="setChipColor(item.status)"
                  border="lg"
                  class="text-capitalize"
                >
                  {{ item.status }}
                </v-chip>
              </template>
              <template #item.actions="{ item }">
                <v-btn
                  size="small"
                  rounded="md"
                  @click="handleShowTournament(item)"
                  >Ver Torneo</v-btn
                >
              </template>
              <template #bottom="props">
                <v-divider />
                <v-pagination
                  class="custom-pagination"
                  v-model="pagination.page"
                  :length="pagination.total"
                  start="1"
                  @update:modelValue="useTournamentStore().loadTournaments"
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
        <CreateTournamentDialog />
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.custom-pagination > .v-pagination__list > .v-pagination__prev {
  position: absolute;
  left: 2rem;
}
.custom-pagination > .v-pagination__list > .v-pagination__next {
  position: absolute;
  right: 2rem;
}
thead {
  background: v-bind(backgroundColor);
}
tbody > tr.v-data-table__tr:nth-child(even) {
  background: v-bind(backgroundColor);
}
.v-table__wrapper {
  background: white !important;
}
</style>
