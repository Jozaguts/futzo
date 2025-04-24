<script lang="ts" setup>
import {useTournamentStore} from "~/store";
import Score from './score.vue'

const {schedulePagination, isLoadingSchedules, schedules, tournamentId} = storeToRefs(useTournamentStore());
const load = async ({done}: { done: (status: 'ok' | 'empty' | 'error') => void }) => {
  if (schedulePagination.value.currentPage > schedulePagination.value.lastPage) {
    done('empty');
    return;
  }

  isLoadingSchedules.value = true;
  try {
    const client = useSanctumClient();
    const response = await client(`/api/v1/admin/tournaments/${tournamentId.value}/schedule?page=${schedulePagination.value.currentPage + 1}`);
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


onBeforeMount(async () => {
  schedulePagination.value.currentPage = 1;
})
onBeforeUnmount(async () => {
  schedulePagination.value.currentPage = 1;
})
const updateMatch = (action: 'up' | 'down', matchId: number, type: 'home' | 'away', roundId: number) => {
  console.log({action, matchId, type, roundId})
  schedules.value.rounds.forEach((round) => {
    if (roundId === round.round) {
      round.matches.forEach((match) => {
        if (match.id === matchId) {
          console.log(match)
          if (action === 'up') {

            match[type].goals += 1
          } else {
            if (match[type].goals > 0) {
              match[type].goals -= 1
            }
          }
        }
      });
    }
  });
}
const client = useSanctumClient();
const {data} = await useAsyncData(
    'schedule',
    () => client(`/api/v1/admin/tournaments/${tournamentId.value}/schedule?page=${schedulePagination.value.currentPage}`)
)
schedules.value = data.value
const editRound = (roundId: number, type: 'save' | 'edit') => {
  const round = schedules.value.rounds.find((round) => round.round === roundId);
  if (round && type === 'edit') {
    round.isEditable = !round.isEditable;
  } else if (round && type === 'save') {
    const matches = round?.matches.map((match) => {
      return {
        id: match.id,
        home: {
          id: match.home.id,
          goals: match.home.goals,
        },
        away: {
          id: match.away.id,
          goals: match.away.goals,
        }
      }
    })
    const client = useSanctumClient();
    client(`/api/v1/admin/tournaments/${tournamentId.value}/rounds/${roundId}`, {
      method: 'POST',
      body: {
        matches,
      },
    }).then((response) => {
      console.log(response)
      round.isEditable = !round.isEditable;
    }).catch((error) => {
      console.error(error)
    })
    // client.post(`/api/v1/admin/tournaments/${tournamentId.value}/schedule/${roundId}`, {matches}).then((response) => {
    //   console.log(response)
    //   round.isEditable = !round.isEditable;
    // }).catch((error) => {
    //   console.error(error)
    // })
  }
}
</script>
<template>
  <v-row v-if="schedules.rounds.length">
    <v-col cols="12">
      <div class="tournament-details">
        <div class="detail">
          <p class="text-body-1">Torneo: <span> {{ schedules.tournament.name }}</span></p>
        </div>
        <div class="detail">
          <p class="text-body-1">Categoría: <span>{{ schedules.tournament.category.name }}</span></p>
        </div>
        <div class="detail">
          <p class="text-body-1">Fecha de inicio: <span>{{ schedules.tournament.start_date_to_string }}</span></p></div>
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
                    <p class="title">Jornada: {{ item.round }} <span class="title">Fecha: {{ item.date }}</span></p>
                    <div class="d-flex align-center">
                      <v-btn min-width="180" class="mr-1" variant="outlined" color="primary" density="compact" @click="editRound(item.round,item.isEditable ?'save': 'edit')"
                             v-auto-animate>
                        <span v-if="item.isEditable">Guardar</span>
                        <span v-else>Editar</span>
                      </v-btn>

                    </div>
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
                      <span
                          class=" name d-inline-block text-truncate"
                          style="max-width: 150px;"
                      > {{ match.home.name }}</span>
                      <Score
                          :matchId="match.id"
                          :roundId="item.round"
                          :is-editable="item.isEditable"
                          @update:match="updateMatch"
                          type="home"
                          :value="match.home.goals"
                      />
                    </div>
                    <div class="team away">
                      <v-avatar class="image" size="24" :image="match.away.image"/>

                      <span class=" name d-inline-block text-truncate"
                            style="max-width: 150px;"> {{ match.away.name }}</span>
                      <Score :matchId="match.id"
                             :value="match.away.goals"
                             :roundId="item.round"
                             :is-editable="item.isEditable"
                             @update:match="updateMatch"
                             type="away"
                      />
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
@use '~/assets/scss/pages/schedule.sass'
</style>
