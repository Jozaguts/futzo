<script lang="ts" setup>
import NoTeamsSvg from "~/components/pages/equipos/noTeamsSvg.vue";
import CreateTeamDialog from "~/components/pages/equipos/CreateTeamDialog/index.vue";
import { useTeamStore } from "~/store/useTeamStore";

const teamStore = useTeamStore();
const { teams } = storeToRefs(teamStore);
const noTeams = computed(() => teams.value.length === 0);
const toggleDialog = () => {
  teamStore.dialog = !teamStore.dialog;
};
onMounted(() => {
  teamStore.getTeams();
});
</script>
<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <v-col>
        <v-card
          v-if="noTeams"
          rounded
          elevation="2"
          height="100%"
          class="mx-0 mx-md-8 mx-lg-8 d-flex justify-center align-center text-center"
        >
          <v-card-item>
            <v-card-title> No hay equipos aún</v-card-title>
            <v-card-text>
              <NoTeamsSvg />
            </v-card-text>
            <v-card-title class="text-body-2">
              Crea un torneo para verlo aquí.
            </v-card-title>
            <v-btn
              color="primary"
              variant="elevated"
              class="mt-4 text-body-1"
              @click="toggleDialog"
            >
              Crear Equipo
            </v-btn>
          </v-card-item>
        </v-card>
        <!-- form component-->
        <CreateTeamDialog />
      </v-col>
    </v-row>
  </v-container>
</template>
