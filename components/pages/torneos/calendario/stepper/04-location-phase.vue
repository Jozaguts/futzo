<script lang="ts" setup>
import {useTournamentStore} from "~/store";

const {tournamentId, scheduleStoreRequest} = storeToRefs(useTournamentStore())
const {fields, meta} = useSchemas('calendar-location-step', {
  tournament_id: tournamentId.value
})

const isValid = computed(() => {
  return meta.value.valid
})
defineExpose({
  isValid,
})
const locations = [
  {
    id: 1,
    name: 'Location 1',
  },
  {
    id: 2,
    name: 'Location 2',
  },
  {
    id: 3,
    name: 'Location 3',
  },
  {
    id: 4,
    name: 'Location 4',
  }
]
// const steps = computed(() => scheduleStoreRequest.value.general.locations)
const steps = computed(() => locations)
</script>
<template>
  <v-container>
    {{ scheduleStoreRequest.general.locations }}
    <v-row>
      <v-col>
        <v-stepper-vertical flat tile collapse-icon="mdi-check" complete-icon="mdi-check" alt-labels item-title="name" item-value="name" elevation="0"
                            :items="steps">
          <template #default="{step}">
            <v-stepper-vertical-item
                subtitle="Personal details"
                title="Step one"
                value="1"
            >
            </v-stepper-vertical-item>
          </template>
        </v-stepper-vertical>
      </v-col>
    </v-row>
  </v-container>
</template>
