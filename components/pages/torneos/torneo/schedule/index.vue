<script lang="ts" setup>
import {useTournamentStore} from "~/store";

definePageMeta({
  middleware: [
    'check-tournament'
  ],
});
const {schedulePagination, isLoadingSchedules, schedules, tournamentId} = storeToRefs(useTournamentStore());
const load = async ({done}: { done: (status: 'ok' | 'empty' | 'error') => void }) => {
  if (schedulePagination.value.currentPage > schedulePagination.value.lastPage) {
    done('empty');
    return;
  }

  isLoadingSchedules.value = true;
  try {
    const client = useSanctumClient();
    const response = await client(`/api/v1/admin/tournaments/${tournamentId.value}/schedule?page=${schedulePagination.value.currentPage}`);
    const newRounds = response.rounds ?? [];
    if (!schedules.value.rounds) {
      schedules.value.rounds = [];
    }
    schedules.value.tournament = response.tournament;
    schedules.value.rounds.push(...newRounds);
    // data.value.push(...response.rounds);
    // console.log(data.value)

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
const client = useSanctumClient();
const {data, pending, error} = await useAsyncData(
    'schedule',
    () => client(`/api/v1/admin/tournaments/${tournamentId.value}/schedule?page=${schedulePagination.value.currentPage}`)
)
schedules.value = data.value

onBeforeMount(async () => {
  schedulePagination.value.currentPage = 1;
})
onBeforeUnmount(async () => {
  schedulePagination.value.currentPage = 1;
})
</script>
<template>
  <v-row>
    <v-col cols="12">
      <div class="tournament-details">
        <div class="detail">
          <p class="text-body-1">Torneo: <span> {{ schedules.tournament.name }}</span></p>
        </div>
        <div class="detail">
          <p class="text-body-1">Categoría: <span>{{ schedules.tournament.category.name }}</span></p>
        </div>
        <div class="detail">
          <p class="text-body-1">Fecha de inicio: <span>{{ schedules.tournament.start_date }}</span></p></div>
      </div>
    </v-col>
    <v-col cols="12">
      <v-sheet class="futzo-rounded fill-height pa-4">
        <v-infinite-scroll :items="schedules.rounds"
                           @load="load"
                           height="700">
          <template v-for="item in schedules.rounds" :key="item.id">
            <v-container>
              <v-row>
                <v-col cols="12" class="pa-0">
                  <div class="title-container">
                    <p class="title">Jornada: {{ item.round }} </p>
                    <p class="title">Fecha: {{ item.date }}</p>
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
                      <p>{{ match.details?.field.name }}</p>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-infinite-scroll>
      </v-sheet>
    </v-col>
  </v-row>


</template>
<style lang="sass">
.tournament-details
  display: grid
  grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr)

  .detail
    p
      font-weight: bold

    span
      font-weight: 400

.match-container
  border: 1px solid #eaecf0

.title-container
  background: #eaecf0
  border: 1px solid #eaecf0
  border-radius: 2px
  display: flex
  justify-content: space-between
  align-items: center

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
