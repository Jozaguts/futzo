<script setup lang="ts">
  import getHeaders from '~/utils/headers-table'
  import { Icon } from '#components'
  import type { Team } from '~/models/Team'
  import { getTeamRegistrationQRCode } from '~/http/api/team'
  const { teams, pagination, search } = storeToRefs(useTeamStore())
  const headers = getHeaders('teams')
  const qr = ref({
    image: '',
    isLoading: false,
    hasError: false,
    showQrCode: false,
  })
  const qrCodeHandler = async (team: Team) => {
    try {
      qr.value.hasError = false
      qr.value.isLoading = true
      const data = await getTeamRegistrationQRCode(team.id as number)
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
  const clickHandler = (team: Team) => {
    if (team.slug) {
      useRouter().push({ name: 'equipos-equipo', params: { slug: team.slug } })
    }
  }
</script>
<template>
  <Table
    v-if="teams?.length"
    :headers="headers"
    :show-index="true"
    :items="teams"
    itemKey="name"
    :search.sync="search"
    v-model:pagination="pagination"
    :paginate="useTeamStore().getTeams"
    :item-per-page="15"
  >
    <template #name="item">
      <div class="d-flex align-center">
        <v-btn variant="text" @click="() => clickHandler(item as Team)">
          <template #prepend>
            <v-avatar :image="item?.image" density="compact" />
          </template>
          <span class="d-inline-block text-truncate mx-4" style="max-width: 100px"> {{ item?.name }}</span>
        </v-btn>
      </div>
    </template>
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
            <v-list-item @click="() => $router.push(`/equipos/${item?.slug}`)">
              <template #prepend>
                <Icon name="fluent:people-team-20-regular" size="24"></Icon>
              </template>
              <v-list-item-title class="ml-1">Ver Equipo</v-list-item-title>
            </v-list-item>
            <v-list-subheader>Compartir</v-list-subheader>
            <CopyLink :item="item" />
            <v-list-item @click="qrCodeHandler(item as Team)" v-auto-animate>
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
