<script setup lang="ts">
import NoTournamentsSvg from "~/components/pages/liga/NoTournamentsSvg.vue";
import CreateTournamentDialog from "~/components/pages/torneos/Dialog.vue";
import {storeToRefs} from "pinia";
import {useTournamentStore} from "~/store";
import {useTheme} from "vuetify";
const surfaceColor = useTheme().current.value.colors.surface
const onSurface = useTheme().current.value.colors['on-surface']
const tab = ref('1')
const headers =  [
  { title: 'Nombre del torneo', value: 'name', sortable: true },
  { title: 'Categoría', value: 'category.name', sortable: true },
  { title: 'Formato', value: 'format.name', sortable: true},
  { title: 'Inicio', value: 'start_date', sortable: true },
  { title: 'Fin', value: 'end_date', sortable: true },
  { title: '# de equipos', value: 'teams', sortable: true, align: 'center'},
  { title: '# de partidos', value: 'matches', sortable: true,align: 'center' },
  { title: '# de jugadores', value: 'players', sortable: true, align: 'center' },
  { title: 'Status', value: 'status', sortable: true, align: 'center' },
  { title: '', value: 'actions', sortable: false,  },
]
const {dialog, tournaments} = storeToRefs(useTournamentStore());

onMounted(() => {
  useTournamentStore()
      .loadTournaments()
})
const theAreTournaments = computed(() => tournaments.value.length > 0)
</script>
<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <v-col>
        <v-card
            v-if="!theAreTournaments"
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
            <CreateTournamentDialog />
            <v-btn
                color="primary"
                variant="elevated"
                class="mt-4 text-body-1"
                @click="dialog = !dialog"
            >
              Crear torneo
            </v-btn>
          </v-card-item>
  </v-card>
        <v-card height="100%"  variant="text">
          <v-card-title>
            <v-tabs>
              <v-tab value="1" class="text-uppercase" base-color="secondary">Todos los torneos</v-tab>
              <v-tab value="2" class="text-uppercase"  base-color="secondary">Próximos torneos</v-tab>
              <v-tab value="3" class="text-uppercase"  base-color="secondary">torneos jugados</v-tab>
            </v-tabs>
          </v-card-title>
          <v-card-text class="fill-height">
            <v-data-table
                class=" border-sm  rounded-lg fill-height "
                style="max-height: 90%; border-color: #EAECF0 !important;"
                :headers="headers"
                :items="tournaments"
                item-key="name"
                items-per-page="10"
                show-select
            >
              <template v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }">
                <v-checkbox-btn
                    :indeterminate="someSelected && !allSelected"
                    :model-value="allSelected"
                    color="primary"
                    @update:model-value="selectAll(!allSelected)"
                >
                </v-checkbox-btn>
              </template>
              <template v-slot:item.data-table-select="{ internalItem, isSelected, toggleSelect}">
                <v-checkbox-btn
                    :model-value="isSelected(internalItem)"
                    color="primary"
                    @update:model-value="toggleSelect(internalItem)"
                ></v-checkbox-btn>
              </template>
              <template v-slot:item.status="{ item }">
                <v-chip :color="item.status === 'active' ? 'success' : ''" border="lg" class="text-capitalize">
                  {{ item.status }}
                </v-chip>
              </template>
              <template #item.actions="{item}">
                <v-btn @click="useRouter().push({
                name: 'liga-torneo',
                params: { torneo: item.slug }
              })">Ver Torneo</v-btn>
              </template>
              <template #bottom="props">
              <v-divider />
              <div class="w-100 d-flex justify-space-between align-center px-4 pb-4 mt-4">
                <v-btn
                       elevation="0"
                       variant="text"
                       color="black"
                       rounded="md"
                       border="thin secondary"
                >
                  <template #prepend>
                    <nuxt-icon name="arrow-left" filled></nuxt-icon>
                  </template>
                  Anterior
                </v-btn>
                <v-chip class="bg-surface" color="black" rounded="sm" >{{props.page}}</v-chip>
                <v-btn
                       elevation="0"
                       variant="text"
                       color="black"
                       rounded="md"
                       border="thin secondary"
                >
                  <template #append>
                    <nuxt-icon name="arrow-right" filled></nuxt-icon>
                  </template>
                  Siguiente
                </v-btn>
              </div>
              </template>
            </v-data-table>

          </v-card-text>
        </v-card>
      </v-col>
      </v-row>
  </v-container>
</template>
<style>

tbody{
  background: white;
}
thead {
  background: v-bind(surfaceColor);
}

tbody > tr:nth-child(even)
{
  background: v-bind(surfaceColor);
}
</style>
<!--<v-sheet v-else class="ma-4 bg-red fill-height">-->
<!--<v-tabs>-->
<!--  <v-tab value="1" class="text-uppercase">Todos los torneos</v-tab>-->
<!--  <v-tab value="2" class="text-uppercase">Próximos torneos</v-tab>-->
<!--  <v-tab value="3" class="text-uppercase">torneos jugados</v-tab>-->
<!--</v-tabs>-->
<!--<v-data-table-->
<!--    height="100%"-->
<!--    :headers="headers"-->
<!--    :items="tournaments"-->
<!--    item-key="name"-->
<!--    item-selectable="item-selectable"-->
<!--    items-per-page="10"-->
<!--    show-select-->
<!--&gt;-->
<!--  <template v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }">-->
<!--    <v-checkbox-btn-->
<!--        :indeterminate="someSelected && !allSelected"-->
<!--        :model-value="allSelected"-->
<!--        color="primary"-->
<!--        @update:model-value="selectAll(!allSelected)"-->
<!--    ></v-checkbox-btn>-->
<!--  </template>-->
<!--  <template v-slot:item.data-table-select="{ internalItem, isSelected, toggleSelect}">-->
<!--    <v-checkbox-btn-->
<!--        :model-value="isSelected(internalItem)"-->
<!--        color="primary"-->
<!--        @update:model-value="toggleSelect(internalItem)"-->
<!--    ></v-checkbox-btn>-->
<!--  </template>-->
<!--  <template v-slot:item.status="{ item }">-->
<!--    <v-chip :color="item.status === 'active' ? 'success' : ''" border="lg" class="text-capitalize">-->
<!--      {{ item.status }}-->
<!--    </v-chip>-->
<!--  </template>-->
<!--  <template #item.actions="{item}">-->
<!--    <v-btn @click="useRouter().push({-->
<!--                name: 'liga-torneo',-->
<!--                params: { torneo: item.slug }-->
<!--              })">Ver Torneo</v-btn>-->
<!--  </template>-->
<!--</v-data-table>-->
<!--</v-sheet>-->