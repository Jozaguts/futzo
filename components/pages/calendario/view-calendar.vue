<script lang="ts" setup>
const schedule = ref([
  {
    date: '2021-10-10',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 1',
        visitor: 'Equipo 2',
      },
      {
        time: '11:00',
        local: 'Equipo 3',
        visitor: 'Equipo 4',
      },
    ],
  },
  {
    date: '2021-10-11',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
    ],
  },

  {
    date: '2021-10-10',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 1',
        visitor: 'Equipo 2',
      },
      {
        time: '11:00',
        local: 'Equipo 3',
        visitor: 'Equipo 4',
      },
    ],
  },
  {
    date: '2021-10-11',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
    ],
  },

  {
    date: '2021-10-10',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 1',
        visitor: 'Equipo 2',
      },
      {
        time: '11:00',
        local: 'Equipo 3',
        visitor: 'Equipo 4',
      },
    ],
  },
  {
    date: '2021-10-11',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
    ],
  },

  {
    date: '2021-10-10',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 1',
        visitor: 'Equipo 2',
      },
      {
        time: '11:00',
        local: 'Equipo 3',
        visitor: 'Equipo 4',
      },
    ],
  },
  {
    date: '2021-10-11',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
    ],
  },

  {
    date: '2021-10-10',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 1',
        visitor: 'Equipo 2',
      },
      {
        time: '11:00',
        local: 'Equipo 3',
        visitor: 'Equipo 4',
      },
    ],
  },
  {
    date: '2021-10-11',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
    ],
  },

  {
    date: '2021-10-10',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 1',
        visitor: 'Equipo 2',
      },
      {
        time: '11:00',
        local: 'Equipo 3',
        visitor: 'Equipo 4',
      },
    ],
  },
  {
    date: '2021-10-11',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
    ],
  },

  {
    date: '2021-10-10',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 1',
        visitor: 'Equipo 2',
      },
      {
        time: '11:00',
        local: 'Equipo 3',
        visitor: 'Equipo 4',
      },
    ],
  },
  {
    date: '2021-10-11',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
    ],
  },

  {
    date: '2021-10-10',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 1',
        visitor: 'Equipo 2',
      },
      {
        time: '11:00',
        local: 'Equipo 3',
        visitor: 'Equipo 4',
      },
    ],
  },
  {
    date: '2021-10-11',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
    ],
  },

  {
    date: '2021-10-10',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 1',
        visitor: 'Equipo 2',
      },
      {
        time: '11:00',
        local: 'Equipo 3',
        visitor: 'Equipo 4',
      },
    ],
  },
  {
    date: '2021-10-11',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
    ],
  },

  {
    date: '2021-10-10',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 1',
        visitor: 'Equipo 2',
      },
      {
        time: '11:00',
        local: 'Equipo 3',
        visitor: 'Equipo 4',
      },
    ],
  },
  {
    date: '2021-10-11',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
    ],
  },

  {
    date: '2021-10-10',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 1',
        visitor: 'Equipo 2',
      },
      {
        time: '11:00',
        local: 'Equipo 3',
        visitor: 'Equipo 4',
      },
    ],
  },
  {
    date: '2021-10-11',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
    ],
  },

  {
    date: '2021-10-10',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 1',
        visitor: 'Equipo 2',
      },
      {
        time: '11:00',
        local: 'Equipo 3',
        visitor: 'Equipo 4',
      },
    ],
  },
  {
    date: '2021-10-11',
    matches: [
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
      {
        time: '10:00',
        local: 'Equipo 5',
        visitor: 'Equipo 6',
      },
      {
        time: '11:00',
        local: 'Equipo 7',
        visitor: 'Equipo 8',
      },
    ],
  },
])
const jornadas = [
  {
    id: 1,
    number: 1,
    title: 'Vie 10 - Dom 12',
  },
  {
    id: 2,
    number: 2,
    title: 'Vie 17 - Dom 19',
  },
  {
    id: 3,
    number: 3,
    title: 'Vie 24 - Dom 26',
  },
  {
    id: 4,
    number: 4,
    title: 'Vie 31 - Dom 2',
  }
];
const selectedJornada = ref(0)
const itemProps = (item) => {
  return {
    title: item.number,
    subtitle: item.title
  }
}
</script>
<template>
  <v-sheet>
    <v-container fluid>
      <v-row>
        <v-col cols="2">
          <v-container fluid>
            <v-row>
              <v-col cols="4 text-center">
                <v-btn size="small" icon="mdi-download"></v-btn>
              </v-col>
              <v-col cols="4 text-center">
              <v-btn size="small" icon="mdi-printer"></v-btn>
              </v-col>
              <v-col cols="4 text-center">
              <v-btn size="small" icon="mdi-share-variant"></v-btn>
              </v-col>

            </v-row>
          </v-container>
          <v-select
              label="Jornada"
              :item-props="itemProps"
              item-value="id"
              variant="filled"
              :items="jornadas"
          >
          </v-select>
        </v-col>
        <v-col cols="10" >
          <v-container >
            <v-row >
              <v-col> <h1 class="text-subtitle-1 ">Jornada 8 -  Clausura 2024 - Liga MX</h1></v-col>
            </v-row>
            <v-row>
              <v-col cols="12"><h2 class="text-h5"> Vienes 10 de Octubre</h2></v-col>
              <v-col cols="12" class="d-grid">
              <v-card class="mb-2" width="fit-content" max-width="400" variant="outlined">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2 ">Cruz azul</p>
                        <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Cruz Azul" class="order-2"></v-img>
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2 ">Pachuca</p>
                        <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Pachuca" class="order-1"></v-img>
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2" width="fit-content" max-width="400" variant="outlined">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2 ">Cruz azul</p>
                        <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Cruz Azul" class="order-2"></v-img>
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2 ">Pachuca</p>
                        <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Pachuca" class="order-1"></v-img>
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2" width="fit-content" max-width="400" variant="outlined">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2 ">Cruz azul</p>
                        <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Cruz Azul" class="order-2"></v-img>
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2 ">Pachuca</p>
                        <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Pachuca" class="order-1"></v-img>
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2" width="fit-content" max-width="400" variant="outlined">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2 ">Cruz azul</p>
                        <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Cruz Azul" class="order-2"></v-img>
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2 ">Pachuca</p>
                        <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Pachuca" class="order-1"></v-img>
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2" width="fit-content" max-width="400" variant="outlined">
                <v-card-text>
                  <div class="schedule-container">
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center order-1">
                        <p class="order-1 flex-0-1 text-truncate mr-2 ">Cruz azul</p>
                        <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Cruz Azul" class="order-2"></v-img>
                      </div>
                      <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                        <v-icon>mdi-soccer</v-icon>
                        <span class="text-caption order-2">VS</span>
                        <span class="text-caption order-3">19:00</span>
                      </p>
                      <div class="d-flex justify-center align-center order-3">
                        <p class="order-2 flex-0-1 text-truncate ml-2 ">Pachuca</p>
                        <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Pachuca" class="order-1"></v-img>
                      </div>
                    </div>
                    <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            </v-row>
            <v-row>
              <v-col cols="12"><h2 class="text-h5"> Vienes 10 de Octubre</h2></v-col>
              <v-col cols="12" class="d-grid">
                <v-card class="mb-2" width="fit-content" max-width="400" variant="outlined">
                  <v-card-text>
                    <div class="schedule-container">
                      <div class="d-flex">
                        <div class="d-flex justify-center align-center order-1">
                          <p class="order-1 flex-0-1 text-truncate mr-2 ">Cruz azul</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Cruz Azul" class="order-2"></v-img>
                        </div>
                        <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                          <v-icon>mdi-soccer</v-icon>
                          <span class="text-caption order-2">VS</span>
                          <span class="text-caption order-3">19:00</span>
                        </p>
                        <div class="d-flex justify-center align-center order-3">
                          <p class="order-2 flex-0-1 text-truncate ml-2 ">Pachuca</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Pachuca" class="order-1"></v-img>
                        </div>
                      </div>
                      <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                    </div>
                  </v-card-text>
                </v-card>
                <v-card class="mb-2" width="fit-content" max-width="400" variant="outlined">
                  <v-card-text>
                    <div class="schedule-container">
                      <div class="d-flex">
                        <div class="d-flex justify-center align-center order-1">
                          <p class="order-1 flex-0-1 text-truncate mr-2 ">Cruz azul</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Cruz Azul" class="order-2"></v-img>
                        </div>
                        <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                          <v-icon>mdi-soccer</v-icon>
                          <span class="text-caption order-2">VS</span>
                          <span class="text-caption order-3">19:00</span>
                        </p>
                        <div class="d-flex justify-center align-center order-3">
                          <p class="order-2 flex-0-1 text-truncate ml-2 ">Pachuca</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Pachuca" class="order-1"></v-img>
                        </div>
                      </div>
                      <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                    </div>
                  </v-card-text>
                </v-card>
                <v-card class="mb-2" width="fit-content" max-width="400" variant="outlined">
                  <v-card-text>
                    <div class="schedule-container">
                      <div class="d-flex">
                        <div class="d-flex justify-center align-center order-1">
                          <p class="order-1 flex-0-1 text-truncate mr-2 ">Cruz azul</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Cruz Azul" class="order-2"></v-img>
                        </div>
                        <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                          <v-icon>mdi-soccer</v-icon>
                          <span class="text-caption order-2">VS</span>
                          <span class="text-caption order-3">19:00</span>
                        </p>
                        <div class="d-flex justify-center align-center order-3">
                          <p class="order-2 flex-0-1 text-truncate ml-2 ">Pachuca</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Pachuca" class="order-1"></v-img>
                        </div>
                      </div>
                      <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                    </div>
                  </v-card-text>
                </v-card>
                <v-card class="mb-2" width="fit-content" max-width="400" variant="outlined">
                  <v-card-text>
                    <div class="schedule-container">
                      <div class="d-flex">
                        <div class="d-flex justify-center align-center order-1">
                          <p class="order-1 flex-0-1 text-truncate mr-2 ">Cruz azul</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Cruz Azul" class="order-2"></v-img>
                        </div>
                        <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                          <v-icon>mdi-soccer</v-icon>
                          <span class="text-caption order-2">VS</span>
                          <span class="text-caption order-3">19:00</span>
                        </p>
                        <div class="d-flex justify-center align-center order-3">
                          <p class="order-2 flex-0-1 text-truncate ml-2 ">Pachuca</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Pachuca" class="order-1"></v-img>
                        </div>
                      </div>
                      <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                    </div>
                  </v-card-text>
                </v-card>

                <v-card class="mb-2" width="fit-content" max-width="400" variant="outlined">
                  <v-card-text>
                    <div class="schedule-container">
                      <div class="d-flex">
                        <div class="d-flex justify-center align-center order-1">
                          <p class="order-1 flex-0-1 text-truncate mr-2 ">Cruz azul</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Cruz Azul" class="order-2"></v-img>
                        </div>
                        <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                          <v-icon>mdi-soccer</v-icon>
                          <span class="text-caption order-2">VS</span>
                          <span class="text-caption order-3">19:00</span>
                        </p>
                        <div class="d-flex justify-center align-center order-3">
                          <p class="order-2 flex-0-1 text-truncate ml-2 ">Pachuca</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Pachuca" class="order-1"></v-img>
                        </div>
                      </div>
                      <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                    </div>
                  </v-card-text>
                </v-card>
                <v-card class="mb-2" width="fit-content" max-width="400" variant="outlined">
                  <v-card-text>
                    <div class="schedule-container">
                      <div class="d-flex">
                        <div class="d-flex justify-center align-center order-1">
                          <p class="order-1 flex-0-1 text-truncate mr-2 ">Cruz azul</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Cruz Azul" class="order-2"></v-img>
                        </div>
                        <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                          <v-icon>mdi-soccer</v-icon>
                          <span class="text-caption order-2">VS</span>
                          <span class="text-caption order-3">19:00</span>
                        </p>
                        <div class="d-flex justify-center align-center order-3">
                          <p class="order-2 flex-0-1 text-truncate ml-2 ">Pachuca</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Pachuca" class="order-1"></v-img>
                        </div>
                      </div>
                      <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                    </div>
                  </v-card-text>
                </v-card>
                <v-card class="mb-2" width="fit-content" max-width="400" variant="outlined">
                  <v-card-text>
                    <div class="schedule-container">
                      <div class="d-flex">
                        <div class="d-flex justify-center align-center order-1">
                          <p class="order-1 flex-0-1 text-truncate mr-2 ">Cruz azul</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Cruz Azul" class="order-2"></v-img>
                        </div>
                        <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                          <v-icon>mdi-soccer</v-icon>
                          <span class="text-caption order-2">VS</span>
                          <span class="text-caption order-3">19:00</span>
                        </p>
                        <div class="d-flex justify-center align-center order-3">
                          <p class="order-2 flex-0-1 text-truncate ml-2 ">Pachuca</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Pachuca" class="order-1"></v-img>
                        </div>
                      </div>
                      <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                    </div>
                  </v-card-text>
                </v-card>
                <v-card class="mb-2" width="fit-content" max-width="400" variant="outlined">
                  <v-card-text>
                    <div class="schedule-container">
                      <div class="d-flex">
                        <div class="d-flex justify-center align-center order-1">
                          <p class="order-1 flex-0-1 text-truncate mr-2 ">Cruz azul</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Cruz Azul" class="order-2"></v-img>
                        </div>
                        <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                          <v-icon>mdi-soccer</v-icon>
                          <span class="text-caption order-2">VS</span>
                          <span class="text-caption order-3">19:00</span>
                        </p>
                        <div class="d-flex justify-center align-center order-3">
                          <p class="order-2 flex-0-1 text-truncate ml-2 ">Pachuca</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Pachuca" class="order-1"></v-img>
                        </div>
                      </div>
                      <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                    </div>
                  </v-card-text>
                </v-card>

                <v-card class="mb-2" width="fit-content" max-width="400" variant="outlined">
                  <v-card-text>
                    <div class="schedule-container">
                      <div class="d-flex">
                        <div class="d-flex justify-center align-center order-1">
                          <p class="order-1 flex-0-1 text-truncate mr-2 ">Cruz azul</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Cruz Azul" class="order-2"></v-img>
                        </div>
                        <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                          <v-icon>mdi-soccer</v-icon>
                          <span class="text-caption order-2">VS</span>
                          <span class="text-caption order-3">19:00</span>
                        </p>
                        <div class="d-flex justify-center align-center order-3">
                          <p class="order-2 flex-0-1 text-truncate ml-2 ">Pachuca</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Pachuca" class="order-1"></v-img>
                        </div>
                      </div>
                      <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                    </div>
                  </v-card-text>
                </v-card>
                <v-card class="mb-2" width="fit-content" max-width="400" variant="outlined">
                  <v-card-text>
                    <div class="schedule-container">
                      <div class="d-flex">
                        <div class="d-flex justify-center align-center order-1">
                          <p class="order-1 flex-0-1 text-truncate mr-2 ">Cruz azul</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Cruz Azul" class="order-2"></v-img>
                        </div>
                        <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                          <v-icon>mdi-soccer</v-icon>
                          <span class="text-caption order-2">VS</span>
                          <span class="text-caption order-3">19:00</span>
                        </p>
                        <div class="d-flex justify-center align-center order-3">
                          <p class="order-2 flex-0-1 text-truncate ml-2 ">Pachuca</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Pachuca" class="order-1"></v-img>
                        </div>
                      </div>
                      <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                    </div>
                  </v-card-text>
                </v-card>
                <v-card class="mb-2" width="fit-content" max-width="400" variant="outlined">
                  <v-card-text>
                    <div class="schedule-container">
                      <div class="d-flex">
                        <div class="d-flex justify-center align-center order-1">
                          <p class="order-1 flex-0-1 text-truncate mr-2 ">Cruz azul</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Cruz Azul" class="order-2"></v-img>
                        </div>
                        <p class="order-2 mx-2 d-flex justify-center align-center flex-column">
                          <v-icon>mdi-soccer</v-icon>
                          <span class="text-caption order-2">VS</span>
                          <span class="text-caption order-3">19:00</span>
                        </p>
                        <div class="d-flex justify-center align-center order-3">
                          <p class="order-2 flex-0-1 text-truncate ml-2 ">Pachuca</p>
                          <v-img width="30" height="30" rounded  src="https://ui-avatars.com/api/?name=Pachuca" class="order-1"></v-img>
                        </div>
                      </div>
                      <small class="text-caption text-truncate d">Campo hermanos suarez</small>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

  </v-sheet>
</template>
<style>
.d-grid{
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: column;
  gap: .5rem;
}
.schedule-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: fit-content;
  position: relative;
  text-align: center;
}
</style>