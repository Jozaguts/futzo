<script lang="ts" setup>
  import StatsTableContainer from '~/components/pages/equipos/live-games.vue'
  import CreateTournamentDialog from '~/components/pages/torneos/dialog/index.vue'
  import DisciplinePanel from '~/components/pages/torneos/discipline/DisciplinePanel.vue'
  import PageLayout from '~/components/shared/PageLayout.vue'
  import StatsTable from '~/components/pages/torneos/stats-tables/index.vue'
  import Vue3EasyDataTable from 'vue3-easy-data-table'
  import 'vue3-easy-data-table/dist/style.css'
  import { publicTournamentStandingsHeaders } from '~/utils/publicTournamentStandingsHeaders'
  import { Icon } from '#components'
  import { last5Handler } from '~/utils/headers-table'
  import { getTournamentRegistrationQRCode } from '~/http/api/tournament'
  import { useToast } from '#imports'

  const { standings, tournamentId, tournament } = storeToRefs(useTournamentStore())
  const { start, finish } = useLoadingIndicator()
  const loading = ref(false)
  const route = useRoute()
  const tab = ref('resumen')
  const share = ref({
    image: '',
    isLoading: false,
    hasError: false,
    showQr: false,
  })

  const tournamentName = computed(() => tournament.value?.name ?? '')
  const tournamentMeta = computed(() => {
    const format = tournament.value?.format_label || tournament.value?.format?.name
    const type = tournament.value?.football_type_label || tournament.value?.football_type?.name
    const location = tournament.value?.location?.name
    return [format, type, location].filter((value) => Boolean(value)).join(' · ')
  })
  const statusLabel = computed(() => {
    switch (tournament.value?.status) {
      case 'creado':
        return { text: 'Próximo', color: 'warning' }
      case 'en curso':
        return { text: 'Activo', color: 'success' }
      case 'completado':
        return { text: 'Finalizado', color: 'grey-lighten-1' }
      case 'cancelado':
        return { text: 'Cancelado', color: 'error' }
      default:
        return { text: '-', color: 'grey-lighten-1' }
    }
  })

  const gamesProgressLabel = computed(() => {
    if (tournament.value?.games_progress?.label) {
      return tournament.value.games_progress.label
    }
    return tournament.value?.progress?.label ?? '0/0'
  })
  const gamesProgressPercent = computed(() => {
    if (typeof tournament.value?.games_progress?.percent === 'number') {
      return tournament.value.games_progress.percent
    }
    return tournament.value?.progress?.percent ?? 0
  })
  const progressStart = computed(() => tournament.value?.start_date_to_string ?? '')
  const progressEnd = computed(() => tournament.value?.end_date_to_string ?? '')
  const currentTournamentId = computed(() => tournament.value?.id ?? tournamentId.value ?? null)

  onMounted(() => {
    if (tournamentId.value) {
      loading.value = true
      useTournamentStore()
        .getStandings()
        .finally(() => {
          loading.value = false
        })
      return
    }
    loading.value = true
    useTournamentStore()
      .getTournamentBySlug(route?.params?.torneo as string)
      .then(() => {
        useTournamentStore().getStandings()
      })
      .finally(() => {
        loading.value = false
      })
  })

  const { toast } = useToast()
  const copyRegisterLink = async () => {
    if (!tournament.value?.register_link) {
      toast({ type: 'warning', msg: 'No hay enlace de inscripción disponible' })
      return
    }
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(tournament.value.register_link)
      } else {
        const ta = document.createElement('textarea')
        ta.value = tournament.value.register_link
        ta.style.position = 'fixed'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      toast({ type: 'success', msg: 'Enlace copiado' })
    } catch {
      toast({ type: 'error', msg: 'No se pudo copiar el enlace' })
    }
  }

  const qrCodeHandler = async () => {
    start()
    if (!tournament.value?.id) {
      toast({ type: 'warning', msg: 'No se pudo obtener el ID del torneo' })
      return
    }
    share.value.hasError = false
    share.value.isLoading = true
    try {
      const data = await getTournamentRegistrationQRCode(tournament.value.id)
      share.value.image = data.image
      share.value.showQr = true
    } catch {
      share.value.hasError = true
      toast({ type: 'error', msg: 'No se pudo generar el QR' })
    } finally {
      share.value.isLoading = false
      finish()
    }
  }

  const downloadQR = () => {

   try {
     start({ force: true })
     if (!share.value.image) return
     const a = document.createElement('a')
     a.href = share.value.image
     a.download = 'futzo_qr.png'
     document.body.appendChild(a)
     a.click()
     a.remove()
   }catch (error) {} finally {finish()}
  }

  const goToCalendar = () => {
    const router = useRouter()
    router.push({
      name: 'torneos-torneo-calendario',
      params: { torneo: route.params.torneo },
    })
  }

  const goToPublic = () => {
    const router = useRouter()
    router.push({
      name: 'torneos-torneo-status',
      params: { torneo: route.params.torneo },
    })
  }
  const sections = [
    { value: 'resumen', label: 'Resumen', icon: 'mdi-account-outline' },
    { value: 'calendario', label: 'Calendario', icon: 'mdi-lock-outline' },
    { value: 'disciplina', label: 'Disciplina', icon: 'mdi-credit-card-outline' },
  ]
</script>
<template>
  <PageLayout>
    <template #default>
      <div class="tournament-page border-top ">
        <div class="tournament-page__header">
          <div class="tournament-page__title">
            <div class="title-row d-flex flex-md-row flex-column align-start">
              <h1 class="text-body-2 text-md-h5">{{ tournamentName }}</h1>
              <v-chip size="small" :color="statusLabel.color" variant="tonal" >{{ statusLabel.text }}</v-chip>
            </div>
            <p class="tournament-meta">{{ tournamentMeta }}</p>
          </div>
          <div class="tournament-page__actions">
            <v-tooltip text="Copiar enlace de inscripción" location="bottom">
              <template #activator="{ props }">
                <v-btn icon variant="text" v-bind="props" @click="copyRegisterLink">
                  <Icon name="mdi-link" size="18" />
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip text="Generar QR" location="bottom">
              <template #activator="{ props }">
                <v-btn icon variant="text" v-bind="props" :disabled="share.isLoading" @click="qrCodeHandler">
                  <Icon name="mdi-qrcode" size="18" />
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip text="Vista pública" location="bottom">
              <template #activator="{ props }">
                <v-btn icon variant="text" v-bind="props" @click="goToPublic">
                  <Icon name="mdi-eye-outline" size="18" />
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip text="Calendario" location="bottom">
              <template #activator="{ props }">
                <v-btn icon variant="text" v-bind="props" @click="goToCalendar">
                  <Icon name="futzo-icon:calendar" size="18" />
                </v-btn>
              </template>
            </v-tooltip>
          </div>
        </div>

        <v-card class="d-flex pa-2 bg-blue-grey-lighten-5 rounded-md" variant="text" density="compact">
          <v-btn-group data-testid="tournament-sections" density="compact" class="w-100" variant="text">
            <v-btn
                v-for="section in sections"
                :key="section.value"
                class="flex-grow-1 flex-shrink-1"
                :class="tab === section.value ? 'bg-grey-lighten-5 text-black font-weight-bold' : 'bg-blue-grey-lighten-5'"
                @click="tab = section.value"
                density="compact"
                rounded="12"
            >
              {{ section.label }}
            </v-btn>
          </v-btn-group>

        </v-card>
            <div class="tournament-window">
              <TransitionFade group>
              <template v-if="tab==='resumen'">
                <div class="kpi-row">
                  <v-card class="kpi-card futzo-rounded" >
                    <div class="kpi-icon"><Icon name="lucide:users" size="18" /></div>
                    <div>
                      <p>Equipos</p>
                      <strong>{{ tournament?.teams_count ?? 0 }}</strong>
                    </div>
                  </v-card>
                  <v-card class="kpi-card futzo-rounded" >
                    <div class="kpi-icon"><Icon name="lucide:user-check" size="18" /></div>
                    <div>
                      <p>Jugadores</p>
                      <strong>{{ tournament?.players_count ?? 0 }}</strong>
                    </div>
                  </v-card>
                  <v-card class="kpi-card futzo-rounded" >
                    <div class="kpi-icon"><Icon name="lucide:swords" size="18" /></div>
                    <div>
                      <p>Partidos</p>
                      <strong>{{ gamesProgressLabel }}</strong>
                    </div>
                  </v-card>
                  <v-card class="kpi-card futzo-rounded" >
                    <div class="kpi-icon"><Icon name="lucide:map-pin" size="18" /></div>
                    <div>
                      <p>Sede</p>
                      <strong>{{ tournament?.location?.name || '-' }}</strong>
                    </div>
                  </v-card>
                </div>

                <v-card class="tournament-progress-card futzo-rounded" >
                  <div class="progress-header">
                    <p>Progreso</p>
                    <span>{{ gamesProgressPercent }}%</span>
                  </div>
                  <v-progress-linear :model-value="gamesProgressPercent" height="6" rounded color="primary" />
                  <div class="progress-footer">
                    <span>{{ progressStart }}</span>
                    <span>{{ progressEnd }}</span>
                  </div>
                </v-card>

                <div class="tournament-content">
                  <div class="tournament-standings">
                    <v-card class="futzo-rounded" height="100%">
                      <v-card-title>Tabla de posiciones</v-card-title>
                      <v-card-text>
                        <client-only>
                          <Vue3EasyDataTable
                              v-if="standings?.length"
                              header-text-direction="center"
                              class="futzo-rounded"
                              body-text-direction="center"
                              :headers="publicTournamentStandingsHeaders"
                              :items="standings"
                              hide-footer
                              :rows-per-page="standings?.length"
                              alternating
                          >
                            <template #item-team.name="values">
                              <div class="d-flex">
                                <span class="mr-2">{{ values.rank }}</span>
                                <span class="d-inline-block text-truncate" style="max-width: 100px">
                              {{ values.team.name }}
                            </span>
                              </div>
                            </template>
                            <template #item-last_5="item">
                          <span v-for="color in last5Handler(item.last_5)" :key="item.id" class="text-lowercase">
                            <v-tooltip :text="color?.label" location="bottom">
                              <template v-slot:activator="{ props }">
                                <Icon
                                    v-bind="props"
                                    :name="color?.icon"
                                    :class="`text-${color?.color}`"
                                    :size="16"
                                    class="cursor-pointer"
                                />
                              </template>
                            </v-tooltip>
                          </span>
                            </template>
                          </Vue3EasyDataTable>
                          <v-skeleton-loader v-else-if="loading" type="table" class="mb-6" />
                          <v-empty-state
                              v-else
                              title="Tabla de posiciones no disponible"
                              text="La tabla aún no está lista. Vuelve más tarde."
                              image="/junior-soccer.svg"
                          />
                        </client-only>
                      </v-card-text>
                    </v-card>
                  </div>
                  <div class="tournament-stats">
                    <StatsTableContainer title="Líderes de estadísticas">
                      <template #content>
                        <StatsTable />
                      </template>
                    </StatsTableContainer>
                  </div>
                </div>
              </template>

              <template v-else-if="tab==='calendario'" >
                <v-card class="futzo-rounded pa-6">
                  <p class="text-body-2 text-medium-emphasis">Abre el calendario para editar o revisar jornadas.</p>
                  <v-btn class="mt-4" color="primary" @click="goToCalendar">Ir a calendario</v-btn>
                </v-card>
              </template>

              <template v-else-if="tab === 'disciplina'">
                <DisciplinePanel :tournament-id="currentTournamentId" />
              </template>
              </TransitionFade>
            </div>
        <CreateTournamentDialog />
      </div>
    </template>
  </PageLayout>

  <v-dialog v-model="share.showQr" max-width="500">
    <v-card>
      <v-card-title>Compartir torneo</v-card-title>
      <v-card-text>
        <v-alert v-if="share.hasError" type="warning" variant="tonal" class="mb-4">
          No se pudo generar el código QR.
        </v-alert>
        <v-img v-if="share.image" :src="share.image" :aspect-ratio="1" cover></v-img>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="share.showQr = false">Cerrar</v-btn>
        <v-btn color="primary"  :disabled="!share.image" @click="downloadQR">Descargar QR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style lang="sass" scoped>
  .tournament-page
    display: flex
    flex-direction: column
    gap: 16px

  .tournament-page__header
    display: flex
    justify-content: space-between
    align-items: flex-start
    gap: 16px

  .tournament-page__title h1
    font-size: 22px
    font-weight: 700
    margin: 0

  .title-row
    display: flex
    align-items: center
    gap: 12px

  .tournament-meta
    margin: 4px 0 0
    color: #667085
    font-size: 13px

  .tournament-page__actions
    display: flex
    align-items: center
    gap: 4px

  .tournament-page__breadcrumbs
    margin-top: -4px

  .tournament-tabs
    background: #fff

  .tournament-window
    margin-top: 12px

  .kpi-row
    display: grid
    grid-template-columns: repeat(4, minmax(0, 1fr))
    gap: 12px
    margin-bottom: 16px

  .kpi-card
    display: flex
    align-items: center
    gap: 12px
    padding: 12px

  .kpi-card p
    margin: 0
    color: #667085
    font-size: 12px

  .kpi-card strong
    font-size: 16px

  .kpi-icon
    width: 36px
    height: 36px
    border-radius: 10px
    display: grid
    place-items: center
    background: rgba(var(--v-theme-primary), 0.12)
    color: rgb(var(--v-theme-primary))

  .tournament-progress-card
    padding: 16px
    margin-bottom: 16px

  .progress-header
    display: flex
    justify-content: space-between
    align-items: center
    font-size: 13px
    color: #475467
    margin-bottom: 8px

  .progress-footer
    display: flex
    justify-content: space-between
    font-size: 12px
    color: #667085
    margin-top: 6px

  .tournament-content
    display: grid
    grid-template-columns: 1fr
    gap: 16px

  .tournament-stats
    min-height: 520px

  .tournament-standings
    min-height: 520px

  @media (min-width: 900px)
    .tournament-content
      grid-template-columns: 70% 30%
      align-items: stretch

  @media (max-width: 900px)
    .kpi-row
      grid-template-columns: repeat(2, minmax(0, 1fr))
</style>
