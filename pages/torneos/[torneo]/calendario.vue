<script lang="ts" setup>
import AppBar from "~/components/layout/AppBar.vue";
import PageLayout from "~/components/shared/PageLayout.vue";
import AppBarBtn from "~/components/pages/torneos/torneo/app-bar-btn.vue";
import NoCalendar from "~/components/pages/torneos/no-calendar.vue";
import {definePageMeta} from "#imports";
import {useTournamentStore} from "~/store";

definePageMeta({
  middleware: [
    function () {
      if (import.meta.server) return;
      const {tournamentId} = storeToRefs(useTournamentStore());
      if (!tournamentId.value) {
        useRouter().push({name: "torneos"});
      }
    },
  ],
});
const {schedulePagination, isLoadingSchedules, schedules} = storeToRefs(useTournamentStore());
onMounted(async () => {
  schedulePagination.value.currentPage = 1;
  await useTournamentStore().fetchSchedule();
})
const data = ref<any[]>([])

const load = async ({done}: { done: (status: 'ok' | 'empty' | 'error') => void }) => {
  if (schedulePagination.value.currentPage > schedulePagination.value.lastPage) {
    done('empty');
    return;
  }

  isLoadingSchedules.value = true;
  try {
    const client = useSanctumClient();
    const {tournamentId} = useTournamentStore();
    const response = await client(`/api/v1/admin/tournaments/${tournamentId}/schedule?page=${schedulePagination.value.currentPage}`);
    const newRounds = response.rounds ?? [];
    if (!schedules.value.rounds) {
      schedules.value.rounds = [];
    }
    schedules.value.rounds.push(...newRounds);
    data.value.push(...response.rounds);

    schedulePagination.value.currentPage += 1;
    schedulePagination.value.lastPage = response.pagination.total_rounds;

    done('ok');
  } catch (error) {
    console.error("Error cargando más jornadas:", error);
    done('error');
  } finally {
    isLoadingSchedules.value = false;
  }
};
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar>
        <template #buttons>
          <AppBarBtn/>
        </template>
      </AppBar>
    </template>
    <template #default>
      <NoCalendar/>
      <LazyPagesTorneosCalendarioDialog/>
      <v-sheet class="futzo-rounded fill-height pa-4">
        <v-infinite-scroll :items="data"
                           @load="load"
                           height="700">
          <template v-for="item in data" :key="item.id">
            <v-container>
              <v-row>
                <v-col cols="12" class="pa-0">
                  <div class="title-container">
                    <p class="title">Jornada: {{ item.round }} <span> {{ item.date }}</span></p>
                  </div>
                </v-col>
                <v-col
                    v-for="match in item.matches"
                    :key="match.id"
                    cols="12"
                    md="2"
                    lg="4"
                    class="match-container"
                >

                  <div class="match">
                    <div class="team home">
                      <v-avatar :image="match.home.image" size="24" class="image"/>
                      <span class="name"> {{ match.home.name }}</span>
                      <div class="result">{{ match.home.goals }}</div>
                    </div>
                    <div class="team away">
                      <v-avatar class="image" size="24" :image="match.away.image"/>
                      <span class="name"> {{ match.away.name }}</span>
                      <div class="result">{{ match.away.goals }}</div>
                      <Icon class="flag" name="futzo-icon:match-polygon"/>
                    </div>
                    <div class="details">
                      <p>{{ match.details.date }} <span>{{ match.details.time }}</span></p>
                      <p>{{ match.details?.location.name }}</p>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-infinite-scroll>
      </v-sheet>
    </template>
  </PageLayout>
</template>
<style lang="sass">
.match-container
  border: 1px solid #eaecf0

.title-container
  background: #eaecf0
  border: 1px solid #eaecf0
  border-radius: 2px

.title
  color: #111927
  font-size: 12px
  font-weight: 400
  padding: 8px

.match
  padding: 8px 0
  display: grid
  grid-template-areas: "home details" "away details"
  gap: 0
  grid-template-rows: 1fr 1fr
  grid-template-columns: 70% 30%
  place-items: center

  > .details
    grid-area: details
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    align-content: center
    font-size: 12px

  > .home
    grid-area: home

  > .away
    grid-area: away


  > .team
    font-size: 14px
    line-height: 32px
    display: flex
    width: 100%
    align-items: center
    position: relative

    > .image
      margin-right: 16px

    > .name
      font-size: 14px

    > .result
      margin-left: auto
      padding: 0 16px

    > .flag
      width: 9px
      height: 14px
      position: absolute
      right: 0
      margin-left: 8px
      background: #eaecf0
      clip-path: polygon(100% 0, 0 52%, 100% 100%)

.match:first-child > .team
  border-right: 1px solid #eaecf0
</style>
<!--// const data = [-->
<!--//   {-->
<!--//     id: 4,-->
<!--//     jornada: "Jornada 4 de 39",-->
<!--//     matches: [-->
<!--//       {-->
<!--//         status: "done",-->
<!--//         local: {-->
<!--//           name: "Cruz azul",-->
<!--//           goals: 3,-->
<!--//           winner: true,-->
<!--//         },-->
<!--//         visitante: {-->
<!--//           name: "Tijuana",-->
<!--//           goals: 0,-->
<!--//           winner: false,-->
<!--//         },-->
<!--//         details: {-->
<!--//           label1: "Fin",-->
<!--//           label2: "Mie. 27/11",-->
<!--//         },-->
<!--//       },-->
<!--//       {-->
<!--//         status: "schedule",-->
<!--//         local: {-->
<!--//           name: "America",-->
<!--//           goals: 0,-->
<!--//           winner: false,-->
<!--//         },-->
<!--//         visitante: {-->
<!--//           name: "Toluca",-->
<!--//           goals: 5,-->
<!--//           winner: true,-->
<!--//         },-->
<!--//         details: {-->
<!--//           label1: "Mie. 27/11",-->
<!--//           label2: "7:00 PM",-->
<!--//         },-->
<!--//       },-->
<!--//       {-->
<!--//         status: "schedule",-->
<!--//         local: {-->
<!--//           name: "America",-->
<!--//           goals: 0,-->
<!--//           winner: false,-->
<!--//         },-->
<!--//         visitante: {-->
<!--//           name: "Toluca",-->
<!--//           goals: 5,-->
<!--//           winner: true,-->
<!--//         },-->
<!--//         details: {-->
<!--//           label1: "Mie. 27/11",-->
<!--//           label2: "7:00 PM",-->
<!--//         },-->
<!--//       },-->
<!--//       {-->
<!--//         status: "schedule",-->
<!--//         local: {-->
<!--//           name: "America",-->
<!--//           goals: 0,-->
<!--//           winner: false,-->
<!--//         },-->
<!--//         visitante: {-->
<!--//           name: "Toluca",-->
<!--//           goals: 5,-->
<!--//           winner: true,-->
<!--//         },-->
<!--//         details: {-->
<!--//           label1: "Mie. 27/11",-->
<!--//           label2: "7:00 PM",-->
<!--//         },-->
<!--//       },-->
<!--//       {-->
<!--//         status: "schedule",-->
<!--//         local: {-->
<!--//           name: "America",-->
<!--//           goals: 0,-->
<!--//           winner: false,-->
<!--//         },-->
<!--//         visitante: {-->
<!--//           name: "Toluca",-->
<!--//           goals: 5,-->
<!--//           winner: true,-->
<!--//         },-->
<!--//         details: {-->
<!--//           label1: "Mie. 27/11",-->
<!--//           label2: "7:00 PM",-->
<!--//         },-->
<!--//       },-->
<!--//     ],-->
<!--//   },-->
<!--//   {-->
<!--//     id: 5,-->
<!--//     jornada: "Jornada 14 de 39",-->
<!--//     matches: [-->
<!--//       {-->
<!--//         status: "done",-->
<!--//         local: {-->
<!--//           name: "barcelona",-->
<!--//           goals: 1,-->
<!--//           winner: false,-->
<!--//         },-->
<!--//         visitante: {-->
<!--//           name: "Atletico",-->
<!--//           goals: 1,-->
<!--//           winner: false,-->
<!--//         },-->
<!--//         details: {-->
<!--//           label1: "Fin",-->
<!--//           label2: "Mie. 27/11",-->
<!--//         },-->
<!--//       },-->
<!--//       {-->
<!--//         status: "done",-->
<!--//         local: {-->
<!--//           name: "Real madrid",-->
<!--//           goals: 1,-->
<!--//           winner: false,-->
<!--//         },-->
<!--//         visitante: {-->
<!--//           name: "Girona",-->
<!--//           goals: 2,-->
<!--//           winner: true,-->
<!--//         },-->
<!--//         details: {-->
<!--//           label1: "Fin",-->
<!--//           label2: "Mie. 27/11",-->
<!--//         },-->
<!--//       },-->
<!--//       {-->
<!--//         status: "done",-->
<!--//         local: {-->
<!--//           name: "Villareal",-->
<!--//           goals: 2,-->
<!--//           winner: true,-->
<!--//         },-->
<!--//         visitante: {-->
<!--//           name: "Leganes",-->
<!--//           goals: 1,-->
<!--//           winner: false,-->
<!--//         },-->
<!--//         details: {-->
<!--//           label1: "Fin",-->
<!--//           label2: "Mie. 27/11",-->
<!--//         },-->
<!--//       },-->
<!--//     ],-->
<!--//   },-->
<!--// ];-->
