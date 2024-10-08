<script lang="ts" setup>
import { useTournamentStore } from "~/store";
import getHeaders from "~/utils/headers-table";
import type { Tournament } from "~/models/tournament";
import { useRouter } from "#app";
import { useDisplay, useTheme } from "vuetify";
import { MAIN_PADDING_BOTTOM, MAIN_PADDING_TOP } from "~/utils/constants";

const {
  noTournaments,
  tournaments,
  tournamentId,
  tournament,
  pagination,
  search,
} = storeToRefs(useTournamentStore());
const headers = getHeaders("tournaments");
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
const handleShowTournament = (_tournament: Tournament) => {
  tournamentId.value = _tournament.id as number;
  tournament.value = _tournament;
  useRouter().push({
    name: "torneos-torneo",
    params: { torneo: _tournament.slug as string },
  });
};
const backgroundColor = useTheme().current.value.colors.background;

const mainHeight = Math.abs(
  useDisplay().height.value - (MAIN_PADDING_TOP + MAIN_PADDING_BOTTOM),
);
const customHeight = computed(() => {
  if (useDisplay().height.value >= 800) {
    return "min-height: 710px";
  } else if (useDisplay().height.value < 700) {
    return "min-height: 400px";
  }
});
</script>
<template>
  <v-tabs class="mx-10 mb-4">
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
  <v-sheet class="custom-v-sheet position-relative mx-10" color="background">
    <v-data-table
      class="border-sm futzo-rounded"
      :headers="headers"
      :items="tournaments"
      :search="search"
      item-key="name"
      items-per-page="10"
      show-select
      height="100%"
      :style="customHeight"
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
          color="on-background"
          size="small"
          rounded="md"
          variant="outlined"
          class="mr-2 show-calendar-btn"
          @click="
            $router.push({
              name: 'torneos-torneo-calendario',
              params: { torneo: item.slug },
            })
          "
          >Ver calendario</v-btn
        >
        <v-btn size="small" rounded="md" @click="handleShowTournament(item)"
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
  </v-sheet>
</template>
<style>
.show-calendar-btn {
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
}
.custom-height {
  height: v-bind(mainHeight);
}
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
