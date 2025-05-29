<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'
import type {Match, Field} from '~/models/Schedule'

const props = defineProps({
  fields: {
    type: Array as PropType<Field[]>,
    default: () => [],
  },
  match: {
    type: Object as PropType<Match>,
    required: true,
  }
})
const show = defineModel('show', {default: false})
const form = ref({
  date: new Date(props.match.details.raw_date).toLocaleDateString(),
  field_id: props.match.details.field.id,
  details: {day: null},
  selected_time: props.match.details.raw_date,
})
const options = ref()
const changeDateHandler = async () => {
  const date = new Date(form.value.date).toLocaleDateString()
  const client = useSanctumClient()
  const data = await client(`/api/v1/admin/games/${props.match.id}?date=${date}&field_id=${form.value.field_id}`)
  options.value = data.options.length ? data.options[0] : []
  console.log(options.value)
  form.value.details.day = options.value?.available_intervals?.day
}
const saveChanges = () => {
  const client = useSanctumClient()
  client(`/api/v1/admin/games/${props.match.id}/reschedule`, {
    method: 'PUT',
    body: {
      date: form.value.date,
      field_id: form.value.field_id,
      selected_time: form.value.selected_time,
      day: form.value.details.day,
    }
  }).then(() => {
    show.value = false
    useToast().toast('success', 'Partido reprogramado correctamente', 'El partido se ha reprogramado con éxito')
    show.value = false
  }).catch((error) => {
    useToast().toast('error', 'Error al reprogramar partido', 'Hubo un error al intentar reprogramar el partido. Por favor, intente nuevamente más tarde.')
  })
}
</script>
<template>
  <Dialog
      title="Reprogramar partido"
      subtitle="Modificá la fecha, hora o campo de juego para este partido. <br />
    Los cambios se aplicarán manteniendo la jornada original."
      :model-value="show"
      @leaving="show = false"
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
              {{ props.match.details.date }}
              {{ props.match.details.raw_time }}
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
                  <div
                      class="team flex-grow-1 team_local d-flex flex-column align-center"
                  >
                    <v-avatar
                        :image="props.match?.home?.image"
                        size="24"
                        class="image"
                    />
                    <span class="team team_home mx-2">
                      {{ props.match?.home?.name }}
                    </span>
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
                        :image="props.match?.away?.image"
                        size="24"
                        class="image"
                    />
                    <span class="team team_home mx-2">
                      {{ props.match?.away?.name }}
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
                :minDate="props.match.start_date"
                :max-date="props.match.end_date"
                @start_date_updated="changeDateHandler"

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
                @update:model-value="changeDateHandler"
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
        Actualizar horario
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
