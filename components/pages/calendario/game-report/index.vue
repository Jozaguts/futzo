<script lang="ts" setup>
import {useGameStore} from "~/store";
import HeaderSection from "~/components/pages/calendario/game-report/header-section.vue";

type Props = {
  gameId: number
}
const props = defineProps<Props>()
const show = defineModel('show', {default: false})
const {game} = storeToRefs(useGameStore())
const onLeaving = () => {
  show.value = false
  // Reset any necessary state or perform cleanup here
}

watch(() => props.gameId, async (newGameId) => {
  if (newGameId) {
    await useGameStore().fetchGame(newGameId)
  }
}, {immediate: true})
const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
  },
  {
    name: 'Eclair',
    calories: 262,
  },
  {
    name: 'Cupcake',
    calories: 305,
  },
  {
    name: 'Gingerbread',
    calories: 356,
  },
  {
    name: 'Jelly bean',
    calories: 375,
  },
  {
    name: 'Lollipop',
    calories: 392,
  },
  {
    name: 'Honeycomb',
    calories: 408,
  },
  {
    name: 'Donut',
    calories: 452,
  },
  {
    name: 'KitKat',
    calories: 518,
  },
]
</script>
<template>
  <Dialog
      title="Acta partido"
      subtitle="Registra los detalles del partido, incluyendo goles, tarjetas y otros eventos importantes."
      :model-value="show"
      @leaving="onLeaving"
      icon-name="uil:schedule"
      min-height="910"
      max-height="910"
  >
    <template #v-card-text>
      <v-container class="futzo-rounded">
        <HeaderSection :game="game"/>
        <v-row>
          <v-col cols="12" lg="6" md="6">
            <span class="text-subtitle-2">{{ game?.home?.name }}</span>
            <v-table
                height="300px"
                fixed-header
            >
              <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Calories
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in desserts"
                  :key="item.name"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
              </tr>
              </tbody>
            </v-table>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <span class="text-subtitle-2">{{ game?.away?.name }}</span>
            <v-table
                height="300px"
                fixed-header
            >
              <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Calories
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in desserts"
                  :key="item.name"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
              </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-container>
      <!--      <pre>-->
      <!--            {{ game }}-->
      <!--</pre>-->
    </template>
  </Dialog>
</template>