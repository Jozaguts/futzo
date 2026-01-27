<script setup lang="ts">
  import type { ScheduleRoundDetails } from '~/models/Schedule'

  const scheduleDialog = defineModel('scheduleDialog')

  const { isFetching, data } = defineProps<{
    data: ScheduleRoundDetails
    isFetching: boolean
  }>()
  const leaveHandler = () => {}
</script>

<template>
  <Dialog
    minHeight="90vh"
    :title="`Modificar Jornada #${data?.round}`"
    subtitle=" Esta acción eliminará todos los partidos existentes y creará nuevos partidos."
    :loading="isFetching"
    v-model="scheduleDialog"
    @leaving="leaveHandler"
  >
    <template #v-card-text>
      <v-container>
        <v-row>
          <v-col class="d-flex justify-space-between align-items-center" cols="12">
            <p class="text-body-1">Status: {{ data?.status }}</p>
            <div class="d-flex justify-center align-items-center">
              <Icon name="mdi-calendar-outline" size="24" class="mx-2" />
              <p class="text-body-1">{{ data?.date }}</p>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col> </v-col>
        </v-row>
      </v-container>
      <pre>{{ data }}</pre>
    </template>
    <template #actions> actions </template>
  </Dialog>
</template>

<style scoped></style>
