<script lang="ts" setup>
import InfoHeaderSection from "~/components/pages/calendario/game-report/info-header-section.vue";

type Props = {
  nombre?: string
  label?: string
}
defineProps<Props>()
const players = [
  {Jugador: '10 - Juan Pérez', minutos: 90, goles: 0, tarjetas: [], sustitucion: []},
  {Jugador: '11 - Carlos Gómez', minutos: 90, goles: 0, tarjetas: [], sustitucion: []},
  {Jugador: '05 - Luis Fernández', minutos: 90, goles: 0, tarjetas: [], sustitucion: []},
  {Jugador: '12 - Miguel Torres', minutos: 90, goles: 0, tarjetas: [], sustitucion: []},
  {Jugador: '08 - Andrés Martínez', minutos: 90, goles: 0, tarjetas: [], sustitucion: []},
  {Jugador: '01 - José Rodríguez', minutos: 90, goles: 0, tarjetas: [], sustitucion: []},
  {Jugador: '03 - David Sánchez', minutos: 90, goles: 0, tarjetas: [], sustitucion: []},
  {Jugador: '23 - Javier López', minutos: 90, goles: 0, tarjetas: [], sustitucion: []},
]

const minWidth = computed(() => {
  return useDisplay().value ? '230' : '130'
})
const alert = (message: string) => {
  console.log(message)
}
</script>
<template>
  <v-data-table
      :mobile="$vuetify.display.mobile"
      hide-default-footer
      height="420px"
      fixed-header
      density="compact"
      :items="players"
  >

    <template #item.minutos="{item}">
      <v-number-input max-width="100" min-width="100" :min="0" :model-value="item.minutos" control-variant="stacked" density="compact"></v-number-input>
    </template>
    <template #item.goles="{item}">
      <v-number-input max-width="100" min-width="100" :min="0" :model-value="item.goles" control-variant="stacked" density="compact"></v-number-input>
    </template>
    <template #item.tarjetas>
      <v-select :items="[{text: 'Amarilla', value: 'yellow'}, {text: 'Roja por doble Amarilla', value: 'doble-card'}, {text: 'Roja directa', value: 'red'}]"
                variant="outlined"
                density="compact"
                :max-width="minWidth"
                :min-width="minWidth"
                item-value="value"
                item-title="text"
                clearable
                single-line

      >
        <template v-slot:item="{ props: itemProps, item }">
          <v-list-item v-bind="itemProps">
            <template #title="{title}">
              <div v-if="title ==='Amarilla'">
                <Icon name="mdi:cards" class="bg-yellow-lighten-1" size="16"></Icon>
              </div>
              <div v-else-if="title === 'Roja por doble Amarilla'">
                <Icon name="mdi:cards" class="bg-yellow-lighten-1" size="16"></Icon>
                <Icon name="mdi:cards" class="bg-yellow-lighten-1" size="16"></Icon>
              </div>
              <div v-else-if="title === 'Roja directa'">
                <Icon name="mdi:cards" class="bg-red-lighten-1" size="16"></Icon>
              </div>
            </template>
            <template #subtitle>
              {{ itemProps.title }}
            </template>
          </v-list-item>
        </template>
        <template #selection="{item}">
          <div v-if="item.value ==='yellow'">
            <Icon name="mdi:cards" class="bg-yellow-lighten-1" size="16"></Icon>
          </div>
          <div v-else-if="item.value === 'doble-card'">
            <Icon name="mdi:cards" class="bg-yellow-lighten-1" size="16"></Icon>
            <Icon name="mdi:cards" class="bg-yellow-lighten-1" size="16"></Icon>
          </div>
          <div v-else-if="item.value === 'red'">
            <Icon name="mdi:cards" class="bg-red-lighten-1" size="16"></Icon>
          </div>
        </template>
      </v-select>
    </template>
    <template #item.sustitucion="{item}">
      <v-select
          placeholder="seleccione a un jugador"
          variant="outlined"
          density="compact"
          single-line
          :max-width="minWidth"
          :min-width="minWidth"
          :items="players"
          item-value="Jugador"
          item-title="Jugador"
          @update:modelValue="() => alert('test')"
      >

      </v-select>
    </template>
  </v-data-table>
</template>