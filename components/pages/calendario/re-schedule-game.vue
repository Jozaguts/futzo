<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type {Match, Field} from '~/models/Schedule'

defineProps({
  fields: Array as PropType<Field[]>,
})
const show = defineModel('show', {default: false})
const match = defineModel<Match>('match', {default: {} as Match})

const emit = defineEmits(['update:show', 'guardar'])
const cancel = () => {
  emit('update:show', false)
}
const saveChanges = () => {
  const form = {
    game_id: match.value.id,
    date: match.value.details.raw_date,
    time: match.value.details.time,
    field_id: match.value.details.field.id,
  }
}
const customPosition = (el: { top: number; left: number }) => ({
  top: 0,
  left: 0,
})
const changeDateHandler = async (date: Date) => {
  const client = useSanctumClient()
  match.value = await client(`/api/v1/admin/games/${match.value.id}?date=${date.toLocaleDateString()}`)
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
  >
    <template #v-card-text>
      <v-container>
        <v-row>
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
                        :image="match?.home?.image"
                        size="24"
                        class="image"
                    />
                    <span class="team team_home mx-2">
                      {{ match?.home?.name }}
                    </span>
                  </div>
                </v-card-text>
              </v-card>
              vs
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
          <v-col cols="12" md="6">
            <label class="text-subtitle-2">Fecha</label>
            <BaseCalendarInput
                v-model:start_date="match.details.raw_date"
                :multiCalendar="false"
                :minDate="match.start_date"
                @start_date_updated="changeDateHandler"
            />
          </v-col>

          <v-col cols="12" md="6" class="position-relative">
            <label class="text-subtitle-2">Hora</label>
            <VueDatePicker
                :time-picker="true"
                v-model="match.details.time"
                mode="time"
                :alt-position="customPosition"
            />
          </v-col>
          <v-col cols="12">
            <label class="text-subtitle-2">Campo (opcional)</label>
            <v-select
                v-model="match.details.field.id"
                :items="fields"
                item-title="name"
                item-value="id"
                label="Selecciona un campo"
                clearable
            />
          </v-col>

          <v-col cols="12">
            <label class="text-subtitle-2">Motivo del cambio (opcional)</label>
            <v-textarea rows="2"/>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #actions>
      <v-btn class="ml-auto mr-4" variant="flat" @click="saveChanges">
        Actualizar
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
