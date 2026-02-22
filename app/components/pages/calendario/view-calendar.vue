<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import InitialsAvatar from '~/components/shared/InitialsAvatar.vue'
  const SELECT_LEAGUE_AND_TOURNAMENT = 'Seleccione una liga y un torneo'
  const NO_SCHEDULES = 'No se ha generado un calendario para este torneo'
  const { scheduleParams } = storeToRefs(useScheduleStore())
  const { schedules } = storeToRefs(useScheduleStore())
  const alertMessage = computed(() => {
    if (!scheduleParams.value.leagueId || !scheduleParams.value.tournamentId) return SELECT_LEAGUE_AND_TOURNAMENT
    if (scheduleParams.value.leagueId && scheduleParams.value.tournamentId && schedules.value?.length === 0)
      return NO_SCHEDULES
    return ''
  })
  const selectedSchedule = ref(null)
</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col v-if="selectedSchedule" cols="10">
        <!--      <v-col  cols="10" >-->
        <v-container>
          <v-row>
            <v-col> <h1 class="text-subtitle-1">Jornada 8 - Clausura 2024 - Liga MX</h1></v-col>
          </v-row>
          <v-row>
            <v-col cols="12"><h2 class="text-h5">Vienes 10 de Octubre</h2></v-col>
            <v-col cols="12" class="d-grid">
              <v-card class="mb-2 border" width="fit-content" max-width="400" border variant="text" elevation="20">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2">Cruz azul</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-2" />
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2">Pachuca</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-1" />
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2 border" width="fit-content" max-width="400" border variant="text" elevation="20">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2">Cruz azul</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-2" />
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2">Pachuca</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-1" />
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2 border" width="fit-content" max-width="400" border variant="text" elevation="20">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2">Cruz azul</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-2" />
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2">Pachuca</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-1" />
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2 border" width="fit-content" max-width="400" border variant="text" elevation="20">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2">Cruz azul</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-2" />
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2">Pachuca</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-1" />
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2 border" width="fit-content" max-width="400" border variant="text" elevation="20">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2">Cruz azul</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-2" />
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2">Pachuca</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-1" />
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12"><h2 class="text-h5">Vienes 10 de Octubre</h2></v-col>
            <v-col cols="12" class="d-grid">
              <v-card class="mb-2 border" width="fit-content" max-width="400" border variant="text" elevation="20">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2">Cruz azul</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-2" />
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2">Pachuca</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-1" />
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2 border" width="fit-content" max-width="400" border variant="text" elevation="20">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2">Cruz azul</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-2" />
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2">Pachuca</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-1" />
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2 border" width="fit-content" max-width="400" border variant="text" elevation="20">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2">Cruz azul</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-2" />
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2">Pachuca</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-1" />
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2 border" width="fit-content" max-width="400" border variant="text" elevation="20">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2">Cruz azul</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-2" />
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2">Pachuca</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-1" />
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>

              <v-card class="mb-2 border" width="fit-content" max-width="400" border variant="text" elevation="20">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2">Cruz azul</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-2" />
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2">Pachuca</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-1" />
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2 border" width="fit-content" max-width="400" border variant="text" elevation="20">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2">Cruz azul</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-2" />
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2">Pachuca</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-1" />
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2 border" width="fit-content" max-width="400" border variant="text" elevation="20">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2">Cruz azul</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-2" />
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2">Pachuca</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-1" />
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2 border" width="fit-content" max-width="400" border variant="text" elevation="20">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2">Cruz azul</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-2" />
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2">Pachuca</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-1" />
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>

              <v-card class="mb-2 border" width="fit-content" max-width="400" border variant="text" elevation="20">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2">Cruz azul</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-2" />
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2">Pachuca</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-1" />
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2 border" width="fit-content" max-width="400" border variant="text" elevation="20">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2">Cruz azul</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-2" />
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2">Pachuca</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-1" />
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2 border" width="fit-content" max-width="400" border variant="text" elevation="20">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2">Cruz azul</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-2" />
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2">Pachuca</p>
                        <InitialsAvatar width="30" height="30" rounded="lg" :image="null" name="Equipo" class="order-1" />
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col v-else cols="12">
        <v-alert border="left" colored-border elevation="2" icon="mdi-info" type="info">
          {{ alertMessage }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
  .d-grid {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-auto-flow: column;
    gap: 0.5rem;
  }
  .schedule-container {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    width: fit-content;
    position: relative;
    text-align: center;
  }
</style>
