<script lang="ts" setup>
import type {Header} from 'vue3-easy-data-table'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import type {Tournament} from '~/models/tournament'
import {useRouter} from '#app'
import {getTournamentRegistrationQRCode} from '~/http/api/tournament'
import {Icon} from '#components'
import 'vue3-easy-data-table/dist/style.css'

const router = useRouter()
  const tournamentStore = useTournamentStore()
  const { noTournaments, tournaments, tournamentId, tournament, loading } = storeToRefs(tournamentStore)

  const headers = computed<Header[]>(() => [
    { text: 'Torneo', value: 'name', fixed: true, width: 120 },
    { text: 'Formato', value: 'format_label' },
    { text: 'Tipo', value: 'football_type_label' },
    { text: 'Equipos', value: 'teams_count' },
    { text: 'Jugadores', value: 'players_count' },
    { text: 'Progreso', value: 'progress' },
    { text: 'Estado', value: 'status' },
    { text: '', value: 'actions', width: 190 },
  ])

  const tableItems = computed(() =>
    tournaments.value.map((item) => ({
      ...item,
      format_text: item.format_label ?? item.format?.name ?? '-',
      football_type_text: item.football_type_label ?? item.football_type?.name ?? '-',
      teams_total: item.teams_count ?? item.teams?.length ?? 0,
      players_total: item.players_count ?? item.players ?? 0,
    }))
  )

  const resolveTournamentProgress = (item: Tournament) => {
    if (item.games_progress && typeof item.games_progress === 'object') {
      return {
        percent: Number(item.games_progress.percent ?? 0),
        label: item.games_progress.label ?? '0/0',
      }
    }
    return {
      percent: Number(item.progress?.percent ?? 0),
      label: item.progress?.label ?? '0/0',
    }
  }

  const statusHandler = (status?: string | null) => {
    switch (status) {
      case 'creado':
        return { label: 'Próximo', color: 'warning' }
      case 'en curso':
        return { label: 'Activo', color: 'success' }
      case 'completado':
        return { label: 'Finalizado', color: 'grey-lighten-1' }
      case 'cancelado':
        return { label: 'Cancelado', color: 'error' }
      default:
        return { label: '-', color: 'grey-lighten-1' }
    }
  }

  const handleShowTournament = (_tournament: Tournament) => {
    tournamentId.value = _tournament.id as number
    tournament.value = _tournament
    void router.push({
      name: 'torneos-torneo',
      params: { torneo: _tournament.slug },
    })
  }

  const scheduleHandler = (model: Tournament) => {
    tournamentId.value = model.id as number
    tournament.value = model
    void router.push({
      name: 'torneos-torneo-calendario',
      params: { torneo: model.slug },
    })
  }

  const qr = ref({
    image: '',
    isLoading: false,
    hasError: false,
    showQrCode: false,
  })

  const qrCodeHandler = async (selectedTournament: Tournament) => {
    const { start, finish } = useLoadingIndicator()
    start({ force: true })
    try {
      qr.value.hasError = false
      qr.value.isLoading = true
      const data = await getTournamentRegistrationQRCode(selectedTournament.id as number)
      if (data.image) {
        qr.value.image = data.image
        qr.value.showQrCode = true
      }
    } catch {
      qr.value.hasError = true
    } finally {
      qr.value.isLoading = false
      finish()
    }
  }

  const downloadQR = () => {
    const a = document.createElement('a')
    a.href = qr.value.image
    a.download = 'futzo_qr.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
</script>

<template>
  <div v-if="!noTournaments || loading" class="tournament-table" data-testid="tournament-table">
    <client-only>
      <Vue3EasyDataTable
        v-if="tableItems.length"
        header-text-direction="center"
        body-text-direction="center"
        class="futzo-rounded tournament-table__grid"
        :headers="headers"
        :items="tableItems"
        :rows-per-page="tableItems.length"
        :table-min-height="0"
        fixed-header
        border-cell
        alternating
      >
        <template #item-name="item">
          <div class="d-flex align-center">
            <v-btn
              class="tournament-name-btn"
              variant="text"
              @click="handleShowTournament(item as Tournament)"
              v-tooltip:top="item?.name"
            >
              <template #prepend v-if="item?.image" >
                <v-avatar :image="item?.image" density="compact" class="d-none d-md-block d-lg-block" />
              </template>
              <span class="d-inline-block text-truncate mx-4" style="max-width: 120px">{{ item?.name }}</span>
            </v-btn>
          </div>
        </template>

        <template #item-format_label="item">
          <span>{{ item.format_text }}</span>
        </template>

        <template #item-football_type_label="item">
          <span>{{ item.football_type_text }}</span>
        </template>

        <template #item-teams_count="item">
          <span>{{ item.teams_total }}</span>
        </template>

        <template #item-players_count="item">
          <span>{{ item.players_total }}</span>
        </template>

        <template #item-progress="item">
          <div class="tournament-progress">
            <v-progress-linear
              :model-value="resolveTournamentProgress(item as Tournament).percent"
              height="6"
              rounded
              color="primary"
              class="tournament-progress__bar"
            />
            <span class="tournament-progress__label">
              {{ resolveTournamentProgress(item as Tournament).label }}
            </span>
          </div>
        </template>

        <template #item-status="item">
          <v-chip :color="statusHandler(item?.status).color" variant="tonal" size="small" class="text-capitalize">
            {{ statusHandler(item?.status).label }}
          </v-chip>
        </template>

        <template #item-actions="item">
          <div class="tournament-actions">
            <v-tooltip text="Copiar enlace de inscripción" location="top">
              <template #activator="{ props }">
                <CopyLink :item="item" icon-only v-bind="props" />
              </template>
            </v-tooltip>
            <v-tooltip text="Generar QR" location="top">
              <template #activator="{ props }">
                <v-btn icon variant="text" v-bind="props" @click="qrCodeHandler(item as Tournament)">
                  <Icon name="lucide:qr-code" size="20" />
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip text="Ver torneo" location="top">
              <template #activator="{ props }">
                <v-btn icon variant="text" v-bind="props" @click="handleShowTournament(item as Tournament)">
                  <Icon name="lucide:trophy" size="20" />
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip text="Ver calendario" location="top">
              <template #activator="{ props }">
                <v-btn icon variant="text" v-bind="props" @click="scheduleHandler(item as Tournament)">
                  <Icon name="lucide:calendar-days" size="20" />
                </v-btn>
              </template>
            </v-tooltip>
          </div>
        </template>
      </Vue3EasyDataTable>

      <v-skeleton-loader
        v-else-if="loading"
        type="table"
        class="mb-6 tournament-table__skeleton"
        data-testid="tournament-table-skeleton"
      />
    </client-only>
  </div>

  <v-dialog v-model="qr.showQrCode" max-width="500">
    <v-card class="futzo-rounded">
      <v-card-text class="text-center">
        <v-img :src="qr.image" :aspect-ratio="1" cover></v-img>
      </v-card-text>
      <v-card-actions>
        <v-btn width="200" variant="outlined" @click="downloadQR">Descargar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
  .tournament-table {
    height: 100%;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  .tournament-table :deep(.vue3-easy-data-table) {
    height: 100%;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  .tournament-table :deep(.vue3-easy-data-table__main) {
    flex: 1 1 auto;
    min-height: 0;
  }

  .tournament-table__grid {
    --easy-table-border: 1px solid #eaecf0;
    --easy-table-row-border: 1px solid #f2f4f7;
    --easy-table-header-height: 40px;
    --easy-table-header-font-size: 12px;
    --easy-table-header-font-color: #667085;
    --easy-table-header-background-color: #f9fafb;
    --easy-table-header-item-padding: 0 14px;
    --easy-table-body-row-height: 56px;
    --easy-table-body-row-font-size: 13px;
    --easy-table-body-row-font-color: #344054;
    --easy-table-body-row-background-color: #ffffff;
    --easy-table-body-even-row-background-color: #fcfcfd;
    --easy-table-body-row-hover-background-color: #f9fafb;
    --easy-table-body-item-padding: 0 14px;
    --easy-table-scrollbar-track-color: #ffffff;
    --easy-table-scrollbar-thumb-color: #d0d5dd;
  }

  .tournament-name-btn {
    text-transform: none;
    letter-spacing: normal;
    color: #101828;
    font-weight: 600;
  }

  .tournament-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  .tournament-actions :deep(.v-btn) {
    width: 30px;
    height: 30px;
    min-width: 30px;
  }

  .tournament-progress {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .tournament-progress__bar {
    width: 80px;
  }

  .tournament-progress__label {
    font-size: 12px;
    color: #667085;
  }

  .tournament-table__skeleton {
    height: 100%;
    min-height: 260px;
  }
</style>
