<script lang="ts" setup>
  import type { Tournament } from '~/models/tournament'
  import { useRouter } from '#app'
  import { getTournamentRegistrationQRCode } from '~/http/api/tournament'
  import { Icon } from '#components'
  import { useDisplay } from 'vuetify'

  const tournamentStore = useTournamentStore()
  const { noTournaments, tournaments, tournamentId, tournament, pagination, search } = storeToRefs(tournamentStore)
  const { mobile } = useDisplay()
  const headers = computed(() => [
    { title: 'Torneo', value: 'name', sortable: true },
    { title: 'Formato', value: 'format_label', sortable: false },
    { title: 'Tipo', value: 'football_type_label', sortable: false },
    { title: 'Equipos', value: 'teams_count', sortable: false, align: 'center' },
    { title: 'Jugadores', value: 'players_count', sortable: false, align: 'center' },
    { title: 'Progreso', value: 'progress', sortable: false, align: 'center' },
    { title: 'Estado', value: 'status', sortable: false, align: 'center' },
    { title: '', value: 'actions', sortable: false, align: 'center' },
  ])
  const syncPaginationPerPage = (isMobile: boolean) => {
    const nextPerPage = isMobile ? 1 : 10
    if (pagination.value.per_page === nextPerPage) {
      return false
    }
    pagination.value.per_page = nextPerPage
    pagination.value.current_page = 1
    return true
  }
  syncPaginationPerPage(mobile.value)
  watch(mobile, (isMobile) => {
    const changed = syncPaginationPerPage(isMobile)
    if (changed) {
      tournamentStore.loadTournaments()
    }
  })
  const handleShowTournament = (_tournament: Tournament) => {
    tournamentId.value = _tournament.id as number
    tournament.value = _tournament
    useRouter().push({
      name: 'torneos-torneo',
      params: { torneo: _tournament.slug },
    })
  }
  onMounted(() => (pagination.value.current_page = 1))
  const scheduleHandler = (model: Tournament) => {
    tournamentId.value = model.id as number
    tournament.value = model
    useRouter().push({
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
  const qrCodeHandler = async (tournament: Tournament) => {
    try {
      qr.value.hasError = false
      qr.value.isLoading = true
      const data = await getTournamentRegistrationQRCode(tournament.id as number)
      if (data.image) {
        qr.value.image = data.image
        qr.value.showQrCode = true
      }
    } catch (error) {
      qr.value.hasError = true
    } finally {
      qr.value.isLoading = false
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
</script>
<template>
  <Table
    v-if="!noTournaments"
    :headers="headers"
    :items="tournaments"
    itemKey="name"
    :search.sync="search"
    v-model:pagination="pagination"
    :paginate="tournamentStore.loadTournaments"
    :items-per-page="mobile ? 1 : 10"
    :status-handler="statusHandler"
  >
    <template #name="item">
      <div class="d-flex align-center">
        <v-btn variant="text" @click="() => $router.push(`torneos/${item.slug}`)" v-tooltip:top="item?.name">
          <template #prepend v-if="item?.image">
            <v-avatar :image="item?.image" density="compact" />
          </template>
          <span class="d-inline-block text-truncate mx-4" style="max-width: 100px"> {{ item?.name }}</span>
        </v-btn>
      </div>
    </template>
    <template #actions="{ item }">
      <div class="tournament-actions">
        <v-tooltip text="Copiar enlace de inscripción" location="top">
          <template #activator="{ props }">
            <CopyLink :item="item" icon-only v-bind="props" />
          </template>
        </v-tooltip>
        <v-tooltip text="Generar QR" location="top">
          <template #activator="{ props }">
            <v-btn icon variant="text" v-bind="props" @click="qrCodeHandler(item as Tournament)">
              <Icon name="mdi-qrcode" size="20" />
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Ver torneo" location="top">
          <template #activator="{ props }">
            <v-btn icon variant="text" v-bind="props" @click="handleShowTournament(item as Tournament)">
              <Icon name="mdi-trophy" size="20" />
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Ver calendario" location="top">
          <template #activator="{ props }">
            <v-btn icon variant="text" v-bind="props" @click="scheduleHandler(item as Tournament)">
              <Icon name="futzo-icon:calendar" size="20" />
            </v-btn>
          </template>
        </v-tooltip>
      </div>
    </template>
  </Table>
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
  .tournament-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
</style>
