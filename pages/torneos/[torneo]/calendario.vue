<script lang="ts" setup>
import AppBar from "~/components/layout/app-bar.vue";
import PageLayout from "~/components/shared/page-layout/index.vue";
import AppBarBtn from "~/components/pages/torneos/torneo/app-bar-btn.vue";
import NoCalendar from "~/components/pages/torneos/no-calendar.vue";
import CalendarDialog from "~/components/pages/torneos/calendario/dialog/index.vue";

const data = [
  {
    id: 4,
    jornada: "Jornada 4 de 39",
    matches: [
      {
        status: "done",
        local: {
          name: "Cruz azul",
          goals: 3,
          winner: true,
        },
        visitante: {
          name: "Tijuana",
          goals: 0,
          winner: false,
        },
        details: {
          label1: "Fin",
          label2: "Mie. 27/11",
        },
      },
      {
        status: "schedule",
        local: {
          name: "America",
          goals: 0,
          winner: false,
        },
        visitante: {
          name: "Toluca",
          goals: 5,
          winner: true,
        },
        details: {
          label1: "Mie. 27/11",
          label2: "7:00 PM",
        },
      },
      {
        status: "schedule",
        local: {
          name: "America",
          goals: 0,
          winner: false,
        },
        visitante: {
          name: "Toluca",
          goals: 5,
          winner: true,
        },
        details: {
          label1: "Mie. 27/11",
          label2: "7:00 PM",
        },
      },
      {
        status: "schedule",
        local: {
          name: "America",
          goals: 0,
          winner: false,
        },
        visitante: {
          name: "Toluca",
          goals: 5,
          winner: true,
        },
        details: {
          label1: "Mie. 27/11",
          label2: "7:00 PM",
        },
      },
      {
        status: "schedule",
        local: {
          name: "America",
          goals: 0,
          winner: false,
        },
        visitante: {
          name: "Toluca",
          goals: 5,
          winner: true,
        },
        details: {
          label1: "Mie. 27/11",
          label2: "7:00 PM",
        },
      },
    ],
  },
  {
    id: 5,
    jornada: "Jornada 14 de 39",
    matches: [
      {
        status: "done",
        local: {
          name: "barcelona",
          goals: 1,
          winner: false,
        },
        visitante: {
          name: "Atletico",
          goals: 1,
          winner: false,
        },
        details: {
          label1: "Fin",
          label2: "Mie. 27/11",
        },
      },
      {
        status: "done",
        local: {
          name: "Real madrid",
          goals: 1,
          winner: false,
        },
        visitante: {
          name: "Girona",
          goals: 2,
          winner: true,
        },
        details: {
          label1: "Fin",
          label2: "Mie. 27/11",
        },
      },
      {
        status: "done",
        local: {
          name: "Villareal",
          goals: 2,
          winner: true,
        },
        visitante: {
          name: "Leganes",
          goals: 1,
          winner: false,
        },
        details: {
          label1: "Fin",
          label2: "Mie. 27/11",
        },
      },
    ],
  },
];

const load = ({ side, done }) => {
  setTimeout(() => {
    if (side === "start") {
      const newItems = Array.from({ length: 10 }, (_, i) => ({
        id: data[0].id - (10 - i), // Generar IDs decrecientes desde el primero
        jornada: `Jornada ${data[0].id - (10 - i)} de 39`, // Ajustar la jornada
        matches: data[0].matches.map((match) => ({
          ...match, // Copiar los datos del partido
          status: "schedule", // Cambiar el estado a "schedule" para diferenciar los nuevos
          details: {
            label1: "Próx.",
            label2: "Mie. 27/11", // Ajustar detalles si es necesario
          },
        })),
      })).filter((item) => item.id >= 0); // Filtrar solo IDs válidos
      data.unshift(...newItems); // Agregar al inicio del arreglo
      done("empty");
    } else if (side === "end") {
      const newItems = Array.from({ length: 10 }, (_, i) => ({
        id: data.at(-1).id + i + 1, // Generar IDs incrementales desde el último
        jornada: `Jornada ${data.at(-1).id + i + 1} de 39`, // Ajustar la jornada
        matches: data.at(-1).matches.map((match) => ({
          ...match, // Copiar los datos del partido
          status: "schedule", // Cambiar el estado a "schedule" para diferenciar los nuevos
          details: {
            label1: "Próx.",
            label2: "Mie. 27/11", // Ajustar detalles si es necesario
          },
        })),
      }));

      data.push(...newItems); // Agregar al final del arreglo
      done("ok");
    }
  }, 1000);
};
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar>
        <template #buttons>
          <AppBarBtn />
        </template>
      </AppBar>
    </template>
    <template #default>
      <NoCalendar />
      <CalendarDialog />
      <!--        side="both"-->
      <!--      <v-sheet class="futzo-rounded fill-height pa-4">-->
      <!--        <v-infinite-scroll :items="data" @load="load" height="700">-->
      <!--          <template v-for="item in data" :key="item.id">-->
      <!--            <v-container>-->
      <!--              <v-row>-->
      <!--                <v-col cols="12" class="pa-0">-->
      <!--                  <div class="title-container">-->
      <!--                    <p class="title">{{ item.jornada }}</p>-->
      <!--                  </div>-->
      <!--                </v-col>-->
      <!--                <v-col-->
      <!--                  v-for="match in item.matches"-->
      <!--                  :key="match.local.name"-->
      <!--                  cols="12"-->
      <!--                  md="2"-->
      <!--                  lg="4"-->
      <!--                  class="match-container"-->
      <!--                >-->
      <!--                  <div class="match">-->
      <!--                    <div class="team home">-->
      <!--                      <v-avatar-->
      <!--                        :image="-->
      <!--                          'https://ui-avatars.com/api/?name=' + match.local.name-->
      <!--                        "-->
      <!--                        size="24"-->
      <!--                        class="image"-->
      <!--                      ></v-avatar>-->
      <!--                      <span class="name"> {{ match.local.name }}</span>-->
      <!--                      <div class="result">{{ match.local.goals }}</div>-->
      <!--                    </div>-->
      <!--                    <div class="team away">-->
      <!--                      <v-avatar-->
      <!--                        class="image"-->
      <!--                        size="24"-->
      <!--                        :image="-->
      <!--                          'https://ui-avatars.com/api/?name=' +-->
      <!--                          match.visitante.name-->
      <!--                        "-->
      <!--                      ></v-avatar>-->
      <!--                      <span class="name"> {{ match.visitante.name }}</span>-->
      <!--                      <div class="result">{{ match.visitante.goals }}</div>-->
      <!--                      <Icon class="flag" name="futzo-icon:match-polygon" />-->
      <!--                    </div>-->
      <!--                    <div class="details">-->
      <!--                      <p>{{ match.details.label1 }}</p>-->
      <!--                      <p>{{ match.details.label2 }}</p>-->
      <!--                    </div>-->
      <!--                  </div>-->
      <!--                </v-col>-->
      <!--              </v-row>-->
      <!--            </v-container>-->
      <!--          </template>-->
      <!--        </v-infinite-scroll>-->
      <!--      </v-sheet>-->
    </template>
  </PageLayout>
</template>
<style lang="sass">


.match-container
    border: 1px solid #eaecf0

.title-container
    background: #eaecf0
    border: 1px solid #eaecf0
    border-radius: 2px

.title
    color: #111927
    font-size: 12px
    font-weight: 400
    padding: 8px

.match
    padding: 8px 0
    display: grid
    grid-template-areas: "home details" "away details"
    gap: 0
    grid-template-rows: 1fr 1fr
    grid-template-columns: 70% 30%
    place-items: center

    > .details
        grid-area: details
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        align-content: center
        font-size: 12px

    > .home
        grid-area: home

    > .away
        grid-area: away


    > .team
        font-size: 14px
        line-height: 32px
        display: flex
        width: 100%
        align-items: center
        position: relative

        > .image
            margin-right: 16px

        > .name
            font-size: 14px

        > .result
            margin-left: auto
            padding: 0 16px

        > .flag
            width: 9px
            height: 14px
            position: absolute
            right: 0
            margin-left: 8px
            background: #eaecf0
            clip-path: polygon(100% 0, 0 52%, 100% 100%)

.match:first-child > .team
    border-right: 1px solid #eaecf0
</style>
