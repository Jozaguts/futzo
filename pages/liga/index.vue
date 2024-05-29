<script setup lang="ts">
import NoTournamentsSvg from "~/components/pages/liga/NoTournamentsSvg.vue";

definePageMeta({
  middleware: ['sanctum:auth'],
});
const tab = ref('one')
const headers =  [
  { title: 'Pyramid', value: 'name' },
  { title: 'Location', value: 'location' },
  { title: 'Construction Date', value: 'constructionDate' },
  {
    title: 'Dimensions',
    align: 'center',
    children: [
      { title: 'Height (m)', value: 'height' },
      { title: 'Base (m)', value: 'base' },
      { title: 'Volume (m³)', value: 'volume' },
    ],
  },
]
</script>
<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <v-col>
        <v-card
            color="background"
            rounded
            elevation="2"
            class="fill-height mx-0 mx-md-8 mx-lg-8 d-flex justify-center align-center text-center"
        >
          <v-card-item>
            <v-card-title>
              No hay torneos aún
            </v-card-title>
            <v-card-text>
              <NoTournamentsSvg />
            </v-card-text>
            <v-card-title class="text-body-2">
              Crea un torneo para verlo aquí.
            </v-card-title>
            <v-btn
                color="primary"
                variant="elevated"
                class="mt-4 text-body-1"
            >
              Crear torneo
            </v-btn>
          </v-card-item>


    <!--          <v-tabs-->
    <!--              v-model="tab"-->
    <!--          >-->
    <!--            <v-tab value="one">Item One</v-tab>-->
    <!--            <v-tab value="two">Item Two</v-tab>-->
    <!--            <v-tab value="three">Item Three</v-tab>-->
    <!--          </v-tabs>-->

    <!--          <v-card-text>-->
    <!--            <v-tabs-window v-model="tab">-->
    <!--              <v-tabs-window-item value="one">-->
    <!--                <v-data-table-->

    <!--                    hide-default-footer-->
    <!--                    :headers="headers"-->
    <!--                    :items="items"-->
    <!--                    item-key="name"-->
    <!--                    items-per-page="5"-->
    <!--                ></v-data-table>-->
    <!--              </v-tabs-window-item>-->

    <!--              <v-tabs-window-item value="two">-->
    <!--                Two-->
    <!--              </v-tabs-window-item>-->

    <!--              <v-tabs-window-item value="three">-->
    <!--                Three-->
    <!--              </v-tabs-window-item>-->
    <!--            </v-tabs-window>-->
    <!--          </v-card-text>-->
  </v-card>
      </v-col>
      </v-row>
  </v-container>
</template>
