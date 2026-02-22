<script lang="ts" setup>
import {Icon} from '#components'
import InitialsAvatar from '~/components/shared/InitialsAvatar.vue'
import Table from '~/components/shared/Table.vue'
import type {Header} from '~/interfaces'
import type {Tournament, TournamentShareAction} from '~/models/tournament'
import {getTournamentRegistrationQRCode, getTournamentScheduleQRCode} from '~/http/api/tournament'

const router = useRouter()
const tournamentStore = useTournamentStore()
const { noTournaments, tournaments, tournamentId, tournament, loading } = storeToRefs(tournamentStore)
const { toast } = useToast()
const runtimeConfig = useRuntimeConfig()
const publicBaseUrl = computed(() => runtimeConfig.public.baseUrl || useRequestURL().origin)

const headers = computed<Header[]>(() => [
  { title: 'Torneo', value: 'name' },
  { title: 'Formato', value: 'format_label' },
  { title: 'Tipo', value: 'football_type_label' },
  { title: 'Equipos', value: 'teams_count' },
  { title: 'Jugadores', value: 'players_count' },
  { title: 'Progreso', value: 'progress' },
  { title: 'Estado', value: 'status' },
  { title: '', value: 'actions' },
])

const tableItems = computed(() =>
  tournaments.value.map((item) => ({
    ...item,
    format_label: item.format_label ?? item.format?.name ?? '-',
    football_type_label: item.football_type_label ?? item.football_type?.name ?? '-',
    teams_count: item.teams_count ?? item.teams?.length ?? 0,
    players_count: item.players_count ?? item.players ?? 0,
  }))
)

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

const handleShowTournament = (selectedTournament: Tournament) => {
  tournamentId.value = selectedTournament.id as number
  tournament.value = selectedTournament
  void router.push({
    name: 'torneos-torneo',
    params: { torneo: selectedTournament.slug },
  })
}

const scheduleHandler = (selectedTournament: Tournament) => {
  tournamentId.value = selectedTournament.id as number
  tournament.value = selectedTournament
  void router.push({
    name: 'torneos-torneo',
    params: { torneo: selectedTournament.slug },
    query: { tab: 'calendario' },
  })
}

const share = ref({
  title: '',
  image: '',
  isLoading: false,
  hasError: false,
  showDialog: false,
})

const resolvePublicStatusUrl = (selectedTournament: Tournament) => {
  if (!selectedTournament?.slug) {
    return ''
  }
  return `${publicBaseUrl.value}/torneos/${selectedTournament.slug}/status`
}

const copyTextToClipboard = async (text: string) => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text)
    return
  }
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}

const copyRegistrationLink = async (selectedTournament: Tournament) => {
  if (!selectedTournament?.register_link) {
    toast({ type: 'warning', msg: 'No hay enlace de inscripción disponible' })
    return
  }
  try {
    await copyTextToClipboard(selectedTournament.register_link)
    toast({ type: 'success', msg: 'Enlace de inscripción copiado' })
  } catch {
    toast({ type: 'error', msg: 'No se pudo copiar el enlace de inscripción' })
  }
}

const copyPublicStatusLink = async (selectedTournament: Tournament) => {
  const publicUrl = resolvePublicStatusUrl(selectedTournament)
  if (!publicUrl) {
    toast({ type: 'warning', msg: 'No se pudo generar el enlace público' })
    return
  }
  try {
    await copyTextToClipboard(publicUrl)
    toast({ type: 'success', msg: 'Enlace público copiado' })
  } catch {
    toast({ type: 'error', msg: 'No se pudo copiar el enlace público' })
  }
}

const openRegistrationQr = async (selectedTournament: Tournament) => {
  if (!selectedTournament?.id) {
    toast({ type: 'warning', msg: 'No se pudo obtener el ID del torneo' })
    return
  }
  const { start, finish } = useLoadingIndicator()
  start({ force: true })
  try {
    share.value.hasError = false
    share.value.image = ''
    share.value.isLoading = true
    const data = await getTournamentRegistrationQRCode(selectedTournament.id as number)
    if (data?.image) {
      share.value.image = data.image
      share.value.title = 'QR de inscripción'
      share.value.showDialog = true
      return
    }
    throw new Error('QR no disponible')
  } catch {
    share.value.hasError = true
    toast({ type: 'error', msg: 'No se pudo generar el QR de inscripción' })
  } finally {
    share.value.isLoading = false
    finish()
  }
}

const openPublicStatusQr = async (selectedTournament: Tournament) => {
  if (!selectedTournament?.id) {
    toast({ type: 'warning', msg: 'No se pudo obtener el ID del torneo' })
    return
  }
  const { start, finish } = useLoadingIndicator()
  start({ force: true })
  try {
    share.value.hasError = false
    share.value.image = ''
    share.value.isLoading = true
    const data = await getTournamentScheduleQRCode(selectedTournament.id as number, 'tournament_status')
    if (data?.image) {
      share.value.image = data.image
      share.value.title = 'QR de página pública'
      share.value.showDialog = true
      return
    }
    throw new Error('QR no disponible')
  } catch {
    share.value.hasError = true
    toast({ type: 'error', msg: 'No se pudo generar el QR de página pública' })
  } finally {
    share.value.isLoading = false
    finish()
  }
}

const shareActionHandler = async (action: TournamentShareAction, selectedTournament: Tournament) => {
  switch (action) {
    case 'registration_link':
      await copyRegistrationLink(selectedTournament)
      return
    case 'registration_qr':
      await openRegistrationQr(selectedTournament)
      return
    case 'public_link':
      await copyPublicStatusLink(selectedTournament)
      return
    case 'public_qr':
      await openPublicStatusQr(selectedTournament)
  }
}

const downloadQR = () => {
  if (!share.value.image) {
    toast({ type: 'warning', msg: 'No hay una imagen QR para descargar' })
    return
  }
  const { start, finish } = useLoadingIndicator()
  try {
    start({ force: true })
    const a = document.createElement('a')
    a.href = share.value.image
    a.download = 'futzo_qr.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  } catch {
    toast({ type: 'error', msg: 'No se pudo descargar el QR' })
  } finally {
    finish()
  }
}
</script>

<template>
  <div v-if="!noTournaments || loading" class="tournament-table" data-testid="tournament-table">
    <Table
      v-if="tableItems.length"
      :headers="headers"
      :items="tableItems"
      item-key="name"
      :show-footer="false"
      show-complete
      :status-handler="statusHandler"
      class="tournament-table__grid"
    >
      <template #name="item">
        <div class="d-flex align-center">
          <v-btn
            class="tournament-name-btn"
            variant="text"
            @click="handleShowTournament(item as Tournament)"
            v-tooltip:top="item?.name"
          >
            <template #prepend>
              <InitialsAvatar
                :image="item?.image"
                :name="item?.name"
                density="compact"
                class="d-none d-md-block d-lg-block"
              />
            </template>
            <span class="d-inline-block text-truncate mx-4" style="max-width: 120px">{{ item?.name }}</span>
          </v-btn>
        </div>
      </template>

      <template #actions="{ item }">
        <div class="tournament-actions">
          <TournamentShareMenu
            icon-only
            test-id="tournament-row-share"
            :loading="share.isLoading"
            @select="(action) => shareActionHandler(action, item as Tournament)"
          />
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
    </Table>

    <v-skeleton-loader
      v-else-if="loading"
      type="table"
      class="mb-6 tournament-table__skeleton"
      data-testid="tournament-table-skeleton"
    />
  </div>

  <v-dialog v-model="share.showDialog" max-width="500">
    <v-card class="futzo-rounded">
      <v-card-title>{{ share.title || 'Compartir torneo' }}</v-card-title>
      <v-card-text class="text-center">
        <v-alert v-if="share.hasError" type="warning" variant="tonal" class="mb-4">No se pudo generar el código QR.</v-alert>
        <v-img v-if="share.image" :src="share.image" :aspect-ratio="1" cover></v-img>
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
  width: 100%;
}

.tournament-table__grid {
  height: 100%;
  min-height: 0;
}

.tournament-name-btn {
  text-transform: none;
  letter-spacing: normal;
  color: var(--futzo-on-surface);
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

.tournament-table__skeleton {
  height: 100%;
  min-height: 260px;
}
</style>
