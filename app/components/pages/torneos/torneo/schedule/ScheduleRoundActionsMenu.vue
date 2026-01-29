<script setup lang="ts">
  import type { RoundStatus, ScheduleRoundStatus, Round } from '~/models/Schedule'

  const props = withDefaults(
    defineProps<{
      round: Round
      scheduleRoundStatus?: ScheduleRoundStatus[]
      isExporting?: boolean
      public?: boolean
    }>(),
    {
      isExporting: false,
      public: false,
      scheduleRoundStatus: () => [],
    }
  )

  const emit = defineEmits<{
    (event: 'export-round', payload: { type: 'excel' | 'img'; round: number }): void
    (event: 'edit-round', round: number): void
    (event: 'open-round-edit', round: number): void
    (event: 'status-change', payload: { status: RoundStatus; round: number }): void
  }>()

  const statusOptions = computed(() => props.scheduleRoundStatus.filter((status) => status.value !== props.round.status))
</script>

<template>
  <v-menu location="bottom" transition="slide-x-transition" :close-on-content-click="false">
    <template #activator="{ props: menuProps }">
      <v-btn icon="mdi-dots-vertical" variant="text" v-bind="menuProps" />
    </template>
    <v-list density="compact" nav>
      <v-list-subheader>Exportar</v-list-subheader>
      <v-list-item
        v-if="!public"
        @click="emit('export-round', { type: 'excel', round: round.round })"
      >
        <template #prepend>
          <Icon name="futzo-icon:file-type-excel" class="mr-2" />
        </template>
        <v-list-item-title>Excel</v-list-item-title>
      </v-list-item>
      <v-list-item @click="emit('export-round', { type: 'img', round: round.round })">
        <template #prepend>
          <Icon name="futzo-icon:file-type-img-primary" class="mr-2" />
        </template>
        <v-list-item-title>Imagen</v-list-item-title>
      </v-list-item>
      <v-progress-linear indeterminate v-show="isExporting" height="2" />

      <template v-if="!public">
        <v-list-subheader>Actualizar</v-list-subheader>
        <v-list-item @click="emit('edit-round', round.round)">
          <v-list-item-title>Resultados</v-list-item-title>
        </v-list-item>
        <v-list-item @click="emit('open-round-edit', round.round)">
          <v-list-item-title>Jornada</v-list-item-title>
        </v-list-item>
        <v-list-subheader>Marcar Jornada como</v-list-subheader>
        <v-list-item :active="true" :value="round.status" active-class="text-primary" :disabled="true">
          {{ round.status }}
        </v-list-item>
        <v-list-item
          v-for="(status, index) in statusOptions"
          :key="index"
          :value="status.value"
          active-class="text-primary"
          :disabled="round.status === 'completado'"
          @click="emit('status-change', { status: status.value, round: round.round })"
        >
          <v-list-item-title>{{ status.text }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>
