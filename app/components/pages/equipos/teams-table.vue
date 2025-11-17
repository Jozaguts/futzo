<script setup lang="ts">
  import getHeaders from '~/utils/headers-table'
  import { Icon } from '#components'
  import type { Team } from '~/models/Team'
  import { getTeamRegistrationQRCode, updateHomePreferences } from '~/http/api/team'
  import { useLeaguesStore } from '~/stores/useLeaguesStore'

  type LeagueLocationOption = {
    id: number
    name: string
  }

  const teamStore = useTeamStore()
  const { teams, pagination, search } = storeToRefs(teamStore)
  const headers = getHeaders('teams')

  const { getLeagueLocations } = useLeaguesStore()
  const { toast } = useToast()

  const leagueLocations = ref<LeagueLocationOption[]>([])
  const assignDialog = ref(false)
  const assignLoading = ref(false)
  const selectedTeam = ref<Team | null>(null)
  const homePreferenceForm = reactive({
    home_location_id: null as number | null,
    home_day_of_week: null as number | null,
    home_start_time: null as string | null,
  })

  const dayOptions = [
    { label: 'Domingo', value: 0 },
    { label: 'Lunes', value: 1 },
    { label: 'Martes', value: 2 },
    { label: 'Miércoles', value: 3 },
    { label: 'Jueves', value: 4 },
    { label: 'Viernes', value: 5 },
    { label: 'Sábado', value: 6 },
  ]

  const isLocationSelected = computed(() => homePreferenceForm.home_location_id !== null)
  const isSaveDisabled = computed(() => {
    if (assignLoading.value) {
      return true
    }
    if (!isLocationSelected.value) {
      return false
    }
    return homePreferenceForm.home_day_of_week === null || !homePreferenceForm.home_start_time
  })

  const homeStartTimeProxy = computed({
    get: () => {
      if (!homePreferenceForm.home_start_time) {
        return null
      }
      const [hours, minutes] = homePreferenceForm.home_start_time.split(':')
      if (hours === undefined || minutes === undefined) {
        return null
      }
      const date = new Date()
      date.setHours(Number(hours), Number(minutes), 0, 0)
      return date
    },
    set: (val: any) => {
      if (!val) {
        homePreferenceForm.home_start_time = null
        return
      }
      if (val instanceof Date) {
        const hours = String(val.getHours()).padStart(2, '0')
        const minutes = String(val.getMinutes()).padStart(2, '0')
        homePreferenceForm.home_start_time = `${hours}:${minutes}`
        return
      }
      if (typeof val === 'object' && val !== null && 'hours' in val && 'minutes' in val) {
        const hours = String((val as { hours: number }).hours).padStart(2, '0')
        const minutes = String((val as { minutes: number }).minutes).padStart(2, '0')
        homePreferenceForm.home_start_time = `${hours}:${minutes}`
        return
      }
      if (typeof val === 'string') {
        const [hours, minutes] = val.split(':')
        if (hours !== undefined && minutes !== undefined) {
          homePreferenceForm.home_start_time = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
        }
      }
    },
  })

  const qr = ref({
    image: '',
    isLoading: false,
    hasError: false,
    showQrCode: false,
  })

  const ensureLeagueLocations = async () => {
    if (leagueLocations.value.length > 0) {
      return
    }
    try {
      const data = await getLeagueLocations()
      leagueLocations.value = (data ?? []).map((location: any) => ({
        id: location.id,
        name: location.name,
      }))
    } catch (error) {
      toast({
        type: 'error',
        msg: 'Error al cargar sedes',
        description: 'No pudimos obtener la lista de sedes. Intenta nuevamente.',
      })
    }
  }

  onMounted(async () => {
    await ensureLeagueLocations()
  })

  watch(assignDialog, (value) => {
    if (!value) {
      resetHomePreferencesForm()
    }
  })

  const resetHomePreferencesForm = () => {
    selectedTeam.value = null
    homePreferenceForm.home_location_id = null
    homePreferenceForm.home_day_of_week = null
    homePreferenceForm.home_start_time = null
  }

  const openAssignModal = async (team: Team) => {
    await ensureLeagueLocations()
    selectedTeam.value = team
    homePreferenceForm.home_location_id = team.home_preferences?.location_id ?? null
    homePreferenceForm.home_day_of_week = team.home_preferences?.day_of_week ?? null
    homePreferenceForm.home_start_time = team.home_preferences?.start_time ?? null
    assignDialog.value = true
  }

  const closeAssignModal = () => {
    assignDialog.value = false
  }

  const saveHomePreferences = async () => {
    if (!selectedTeam.value) {
      return
    }
    if (isSaveDisabled.value) {
      toast({
        type: 'warning',
        msg: 'Información incompleta',
        description: 'Selecciona el día y el horario preferido antes de guardar.',
      })
      return
    }
    assignLoading.value = true
    try {
      const payload = {
        home_location_id: homePreferenceForm.home_location_id,
        home_day_of_week: isLocationSelected.value ? homePreferenceForm.home_day_of_week : null,
        home_start_time: homePreferenceForm.home_start_time,
      }
      await updateHomePreferences(selectedTeam.value.id, payload)
      await teamStore.getTeams()
      toast({
        type: 'success',
        msg: 'Sede actualizada',
        description: 'Guardamos las preferencias de localía del equipo.',
      })
      assignDialog.value = false
    } catch (error: any) {
      toast({
        type: 'error',
        msg: 'Error al guardar',
        description: error?.data?.message ?? 'No pudimos guardar las preferencias. Intenta nuevamente.',
      })
    } finally {
      assignLoading.value = false
    }
  }

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
      useRouter().push({ name: 'equipos-equipo', params: { equipo: team.slug } })
    }
  }
</script>
<template>
  <Table
    v-if="teams?.length"
    :headers="headers"
    :items="teams"
    itemKey="name"
    :search.sync="search"
    v-model:pagination="pagination"
    :paginate="teamStore.getTeams"
    :items-per-page="$vuetify.display.mobile ? 1 : 10"
    @open-assign-modal="openAssignModal"
  >
    <template #name="item">
      <div class="d-flex align-center">
        <v-btn variant="text" @click="() => clickHandler(item as Team)" v-tooltip:top="item?.name">
          <template #prepend v-if="item?.image">
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
  <v-dialog v-model="assignDialog" max-width="480">
    <v-card class="futzo-rounded">
      <v-card-title class="text-h6">Preferencias de localía</v-card-title>
      <v-card-text>
        <v-select
          v-model="homePreferenceForm.home_location_id"
          :items="leagueLocations"
          item-title="name"
          item-value="id"
          density="compact"
          variant="outlined"
          label="Sede"
          placeholder="Selecciona una sede"
          clearable
        />
        <v-select
          v-model="homePreferenceForm.home_day_of_week"
          :items="dayOptions"
          item-title="label"
          item-value="value"
          density="compact"
          variant="outlined"
          label="Día preferido"
          placeholder="Selecciona un día"
          class="mt-4"
          clearable
        />
        <div class="mt-4">
          <v-time-picker v-model="homeStartTimeProxy" format="24hr" hide-title></v-time-picker>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="closeAssignModal">Cancelar</v-btn>
        <v-btn color="primary" :loading="assignLoading" :disabled="isSaveDisabled" @click="saveHomePreferences">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
