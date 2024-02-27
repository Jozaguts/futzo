<script setup lang="ts">

let headers = [
  { title: 'Club', align: 'start', key: 'name' },
  { title: 'PJ', align: 'start', key: 'pg' },
  { title: 'G', align: 'start', key: 'g' },
  { title: 'E', align: 'start', key: 'e' },
  { title: 'P', align: 'start', key: 'p' },
  { title: 'GF', align: 'start', key: 'gf' },
  { title: 'GC', align: 'start', key: 'gc' },
  { title: 'DG', align: 'start', key: 'dg' },
  { title: 'Pts', align: 'start', key: 'pts' },
  { title: 'Últimos 5', align: 'center', key: 'last_5' },
]
const teams =  [
  {
    name: 'Real Madrid',
    pj: 5,
    g: 5,
    e: 0,
    p: 0,
    gf: 15,
    gc: 5,
    dg: 10,
    pts: 15,
    last_5: 'G G G G G'
  },
  {
    name: 'Barcelona',
    pj: 5,
    g: 4,
    e: 0,
    p: 1,
    gf: 10,
    gc: 5,
    dg: 5,
    pts: 12,
    last_5: 'G G G P G'
  },
  {
    name: 'Atletico de Madrid',
    pj: 5,
    g: 3,
    e: 1,
    p: 1,
    gf: 10,
    gc: 5,
    dg: 5,
    pts: 10,
    last_5: 'G G E P G'
  },
  {
    name: 'Sevilla',
    pj: 5,
    g: 2,
    e: 2,
    p: 1,
    gf: 10,
    gc: 5,
    dg: 5,
    pts: 8,
    last_5: 'G E E P G'
  },
  {
    name: 'Villareal',
    pj: 5,
    g: 2,
    e: 2,
    p: 1,
    gf: 10,
    gc: 5,
    dg: 5,
    pts: 8,
    last_5: 'G E E P G'
  },
  {
    name: 'Real Sociedad',
    pj: 5,
    g: 2,
    e: 2,
    p: 1,
    gf: 10,
    gc: 5,
    dg: 5,
    pts: 8,
    last_5: 'G E E P G'
  },
  {
    name: 'Real Betis',
    pj: 5,
    g: 2,
    e: 2,
    p: 1,
    gf: 10,
    gc: 5,
    dg: 5,
    pts: 8,
    last_5: 'G E E P G'
  },
  {
    name: 'Celta de Vigo',
    pj: 5,
    g: 2,
    e: 2,
    p: 1,
    gf: 10,
    gc: 5,
    dg: 5,
    pts: 8,
    last_5: 'G E E P G'
  },
  {
    name: 'Granada',
    pj: 5,
    g: 2,
    e: 2,
    p: 1,
    gf: 10,
    gc: 5,
    dg: 5,
    pts: 8,
    last_5: 'G E E P G'
  },
  {
    name: 'Athletic de Bilbao',
    pj: 5,
    g: 2,
    e: 2,
    p: 1,
    gf: 10,
    gc: 5,
    dg: 5,
    pts: 8,
    last_5: 'G E E P G'
  },
  {
    name: 'Levante',
    pj: 5,
    g: 2,
    e: 2,
    p: 1,
    gf: 10,
    gc: 5,
    dg: 5,
    pts: 8,
    last_5: 'G E E P G'
  },
  {
    name: 'Valencia',
    pj: 5,
    g: 2,
    e: 2,
    p: 1,
    gf: 10,
    gc: 5,
    dg: 5,
    pts: 8,
    last_5: 'G E E P G'
  },
  {
    name: 'Getafe',
    pj: 5,
    g: 2,
    e: 2,
    p: 1,
    gf: 10,
    gc: 5,
    dg: 5,
    pts: 8,
    last_5: 'G E E P G'
  },
  {
    name: 'Alaves',
    pj: 5,
    g: 2,
    e: 2,
    p: 1,
    gf: 10,
    gc: 5,
    dg: 5,
    pts: 8,
    last_5: 'G E E P G'
  }
]
const teamComputed = computed(() => {
  return teams.map((team) => {
    return {
      ...team,
    }
  })
})
const getIconName = (result: string) => {
  switch (result) {
    case 'G':
      return {icon: 'mdi-check', color: 'white', size: 'small', class: 'rounded border-0 bg-green '}
    case 'E':
      return {icon: 'mdi-minus', color: 'white', size: 'small', class: 'rounded border-0 bg-grey'}
    case 'P':
      return {icon: 'mdi-close', color: 'white', size: 'small', class: 'rounded border-0 bg-red'}
  }
}
</script>
<template>
  <v-card height="100%">
    <v-card-item>
      <v-card-title>
        Tabla de posiciones
      </v-card-title>
    </v-card-item>
    <v-card-text>
      <v-data-table-virtual
          :headers="headers"
          :items="teams"
          height="100%"
          item-value="name"
          show-expand
      >
        <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
          <tr>
            <template v-for="column in columns" :key="column.key">
              <td>
                <span class="cursor-pointer" @click="() => toggleSort(column)" :class="column.key === 'last_5' ? 'text-center d-block' : '' ">{{ column.title }}</span>
                <template v-if="isSorted(column)">
                 <div>
                   <v-icon :icon="getSortIcon(column)"></v-icon>
                 </div>
                </template>
              </td>
            </template>
          </tr>
        </template>
        <template #item="{item}">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.pj }}</td>
            <td>{{ item.g }}</td>
            <td>{{ item.e }}</td>
            <td>{{ item.p }}</td>
            <td>{{ item.gf }}</td>
            <td>{{ item.gc }}</td>
            <td>{{ item.dg }}</td>
            <td>{{ item.pts }}</td>
            <td class="d-flex justify-center align-center">
              <template v-for="(result, index) in item.last_5" :key="index">
                <v-icon v-bind="{...getIconName(result)}"></v-icon>
              </template>
            </td>
          </tr>

        </template>
        <template #bottom>
        <footer class="d-flex pt-3">
          <div class="d-flex flex-column mr-3">
            <p>Clasificación</p>
            <p class="text-caption mt-1 text-capitalize"><v-icon tag="span" color="white" class="rounded  bg-primary mr-1">mdi-plain</v-icon> Gano</p>
            <p class="text-caption mt-1 text-capitalize"><v-icon tag="span" color="white" class="rounded  bg-info mr-1">mdi-plain</v-icon> Gano</p>
          </div>
          <div class="d-flex flex-column">
            <p class="text-capitalize">último 5 partidos</p>
            <p class="text-caption mt-1 text-capitalize"><v-icon tag="span" color="white" class="rounded  bg-green mr-1">mdi-check</v-icon> Gano</p>
            <p class="text-caption mt-1 text-capitalize"><v-icon tag="span" color="white" class="rounded  bg-grey mr-1">mdi-minus</v-icon> Gano</p>
            <p class="text-caption mt-1 text-capitalize"><v-icon tag="span" color="white" class="rounded  bg-red mr-1">mdi-close</v-icon> perdio</p>
          </div>
        </footer>
        </template>
      </v-data-table-virtual>
    </v-card-text>
  </v-card>
</template>
<style>
/* Estilo para todos los navegadores */
.v-table__wrapper::-webkit-scrollbar {
  width: 3px;
}

/* Track */
.v-table__wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.v-table__wrapper::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.v-table__wrapper::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>