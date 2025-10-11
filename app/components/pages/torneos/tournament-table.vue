<script lang="ts" setup>
  import getHeaders from '~/utils/headers-table'
  import type { Tournament } from '~/models/tournament'
  import { useRouter } from '#app'
  import { getTournamentRegistrationQRCode } from '~/http/api/tournament'
  import { Icon } from '#components'

  const { noTournaments, tournaments, tournamentId, tournament, pagination, search } = storeToRefs(useTournamentStore())
  const headers = getHeaders('tournaments')
  const setChipColor = (status: string) => {
    switch (status) {
      case 'creado':
        return 'warning'
      case 'en curso':
        return 'success'
      case 'completado':
        return 'primary'
      case 'cancelado':
        return 'error'
      default:
        return 'warning'
    }
  }
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
      console.log(data)
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
</script>
<template>
  <Table
    v-if="!noTournaments"
    :headers="headers"
    :items="tournaments"
    itemKey="name"
    :search.sync="search"
    v-model:pagination="pagination"
    :status-handler="setChipColor"
    :paginate="useTournamentStore().loadTournaments"
    :show-link="true"
  >
    <template #actions="{ item }">
      <div class="d-flex flex-column my-2 align-center">
        <v-menu location="start" density="compact" :close-on-content-click="false">
          <template v-if="!$vuetify.display.mobile" v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
          </template>
          <template v-if="$vuetify.display.mobile" v-slot:activator="{ props }">
            <v-btn block density="compact" variant="outlined" v-bind="props">Menu</v-btn>
          </template>
          <v-list density="compact" nav class="futzo-rounded">
            <v-list-item @click="scheduleHandler(item as Tournament)">
              <template #prepend>
                <Icon name="futzo-icon:calendar" size="24"></Icon>
              </template>
              <v-list-item-title class="ml-1">Ver calendario</v-list-item-title>
            </v-list-item>
            <v-list-item @click="handleShowTournament(item as Tournament)">
              <template #prepend>
                <Icon name="mdi-trophy" size="24"></Icon>
              </template>
              <v-list-item-title class="ml-1">Ver Torneo</v-list-item-title>
            </v-list-item>
            <v-list-subheader>Compartir</v-list-subheader>
            <CopyLink :item="item" />
            <v-list-item @click="qrCodeHandler(item as Tournament)" v-auto-animate>
              <template #prepend>
                <Icon name="mdi-qrcode"></Icon>
              </template>
              <v-list-item-title class="ml-1"> QR </v-list-item-title>
              <template #append>
                <Icon v-show="qr.isLoading" name="line-md:downloading-loop" class="text-primary"></Icon>
              </template>
            </v-list-item>
          </v-list>
        </v-menu>
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
