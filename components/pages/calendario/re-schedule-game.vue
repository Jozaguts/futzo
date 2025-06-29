<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'
import type {Match, Field} from '~/models/Schedule'
import {useScheduleStore, useTournamentStore} from "~/store";

const {tournamentId} = storeToRefs(useTournamentStore())
const props = defineProps<{
  matchId: number | null
  fieldId: number | null
  date: string | null
}>()
const match = ref<Match>()
const loading = ref(true)
const show = defineModel('show', {default: false})
const form = ref({
  field_id: props.fieldId,
  match_id: props.matchId,
  date: new Date(props.date || '').toLocaleDateString(), // game.details.raw_date
  day: null,
  selected_time: null,
})
const options = ref([])
const fields = ref<Field[]>([] as Field[])
const {getMatch} = useScheduleStore()
const getMatchDetails = async (value: Date) => {
  if (!value) return
  form.value.date = value.toLocaleDateString()
  await fetchMatch()
}
const saveChanges = () => {
  const client = useSanctumClient()
  client(`/api/v1/admin/games/${props.matchId}/reschedule`, {
    method: 'PUT',
    body: {
      date: form.value.date,
      field_id: form.value.field_id,
      selected_time: form.value.selected_time,
      day: form.value.day,
    }
  }).then(async () => {
    useScheduleStore().schedulePagination.currentPage = 1
    await useScheduleStore().getTournamentSchedules()
    useToast().toast('success', 'Partido reprogramado correctamente', 'El partido se ha reprogramado con éxito')
    show.value = false
  }).catch((error) => {
    useToast().toast('error', 'Error al reprogramar partido', 'Hubo un error al intentar reprogramar el partido. Por favor, intente nuevamente más tarde.')
  })
}
const onLeaving = () => {
  show.value = false
  options.value = []
  form.value.date = new Date(match.details.raw_date).toLocaleDateString()
  form.value.field_id = match.details.field.id
  form.value.selected_time = match.details.raw_date
}
const fetchMatch = async () => {
  if (!props.matchId) return;
  loading.value = true;
  try {
    match.value = await getMatch(form.value.match_id as number, form.value.field_id as number, form.value.date as string);
    if (match.value?.options?.length > 0) {
      options.value = match.value.options[0]
      console.log(options.value)
      form.value.day = options.value.available_intervals.day
    }
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}
const fetchFields = async () => {
  fields.value = await useTournamentStore().tournamentFields(
      tournamentId.value as number
  )
}
watch(() => show.value, async (isOpen) => {
  if (isOpen) {
    form.value.field_id = props.fieldId
    form.value.date = new Date(props.date || '').toLocaleDateString()
    form.value.match_id = props.matchId
    await fetchFields()
    await fetchMatch()
  } else {
    form.value.field_id = null
    form.value.date = null
    form.value.selected_time = null
    form.value.match_id = null
  }
})
watch(() => [form.value.field_id, form.value.date], ([newFieldId, newDate]) => {
  if (newFieldId && newDate && show.value) {
    getMatchDetails(new Date(newDate))
  }
})
</script>
<template>
  <Dialog
      title="Reprogramar partido"
      subtitle="Modificá la fecha, hora o campo de juego para este partido. <br />
    Los cambios se aplicarán manteniendo la jornada original."
      :model-value="show"
      @leaving="onLeaving"
      icon-name="uil:schedule"
      min-height="910"
      max-height="910"
  >

    <template #v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <label class="text-subtitle-2">Programado:</label>
            <p class="font-weight-bold">
              {{ match?.details?.date }}
              {{ match?.details?.raw_time }}
            </p>
          </v-col>
          <v-col cols="12">
            <div class="d-flex align-center">
              <v-card
                  class="flex-grow-1"
                  variant="text"
                  border="lg"
                  rounded="lg"
                  width="50%"
              >
                <v-card-text>
                  <div class="team flex-grow-1 team_local d-flex flex-column align-center">
                    <v-avatar
                        :image="match?.home?.image"
                        size="24"
                        class="image"
                    />
                    <span class="team team_home mx-2">{{ match?.home?.name }}</span>
                  </div>
                </v-card-text>
              </v-card>
              <div class="d-flex flex-column align-center  justify-center">
                <p>vs</p>
              </div>
              <v-card
                  class="flex-grow-1 futzo-rounded"
                  variant="text"
                  border="lg"
                  rounded="lg"
                  width="50%"
              >
                <v-card-text>
                  <div class="team team_away d-flex flex-column align-center">
                    <v-avatar
                        :image="match?.away?.image"
                        size="24"
                        class="image"
                    />
                    <span class="team team_home mx-2">
                                {{ match?.away?.name }}
                              </span>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="6">
            <label class="text-subtitle-2">Fecha</label>
            <BaseCalendarInput
                v-model:start_date="form.date"
                :multiCalendar="false"
                :minDate="match?.start_date"
                :max-date="match?.end_date"
            />

          </v-col>
          <v-col cols="12" md="6" lg="6">
            <label class="text-subtitle-2">Campo</label>
            <v-select
                v-model="form.field_id"
                :items="fields"
                item-title="name"
                item-value="id"
                label="Selecciona un campo"
                clearable
                @update:model-value="getMatchDetails"
            />
          </v-col>
          <v-col cols="12" md="8" lg="8" v-if="options?.available_intervals?.hours?.length">
            <label class="text-subtitle-2">Horas disponibles</label>
            <v-chip-group v-model="form.selected_time" column>
              <v-chip base-color="primary" filter v-for="hour in options?.available_intervals?.hours" :value="hour" :key="hour.start">
                {{ hour.start }} - {{ hour.end }}
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col cosl="12" v-else>
            <v-empty-state
                size="120"
                headline="No hay horas disponibles"
                title="No hay horas disponibles para la fecha seleccionada"
                text="Por favor, selecciona otra fecha o campo."
                image="/futzo/logos/circular/logo-22.png"
            ></v-empty-state>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #actions>
      <v-btn class="ml-auto mr-4" variant="elevated" @click="saveChanges">
        Reprogramar
      </v-btn>
    </template>
  </Dialog>
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 4px;
}
</style>
