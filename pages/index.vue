<script setup lang="ts">
import { useDashboardStore, useGlobalStore } from "~/store";
import PageLayout from "~/components/shared/page-layout/index.vue";
import AppBar from "~/components/layout/app-bar.vue";
import AppBarBtn from "~/components/pages/dashboard/app-bar-btn.vue";
import StatsCard from "~/components/pages/dashboard/stats-card.vue";
import LastTeamsTable from "~/components/pages/dashboard/last-teams.vue";
import DashboardNextGames from "~/components/pages/dashboard/dashboard-next-games.vue";

const { range } = storeToRefs(useDashboardStore());

watchEffect(() => {
  const route = useRoute();
  const router = useRouter();
  const globalStore = useGlobalStore();
  if (route.query?.code === "USER_NOT_VERIFIED") {
    globalStore.showErrorNotification({
      message: "Correo electrónico no ha sido verificado",
    });
    router.replace("/");
  }
});
onMounted(() => {
  useDashboardStore().byRange();
});
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
      <v-container fluid class="pa-0 mx-0">
        <v-row>
          <v-col>
            <StatsCard
              title="jugadores totales"
              :values="{ total: 2420, percentage: 40 }"
            ></StatsCard>
          </v-col>
          <v-col>
            <StatsCard
              title="jugadores activos"
              :values="{ total: 1210, percentage: -10 }"
            ></StatsCard>
          </v-col>
          <v-col>
            <StatsCard
              title="juegos finalizados"
              :values="{ total: 316, percentage: 20 }"
            ></StatsCard>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h2 class="dashboard subtitle">Últimos equipos inscritos</h2>
          </v-col>
          <v-col cols="12">
            <LastTeamsTable />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="dashboard subtitle-container">
              <h2 class="dashboard subtitle">Próximos juegos</h2>
              <v-btn variant="text" to="/torneos">ver todos</v-btn>
            </div>
            <dashboard-next-games />
            <dashboard-next-games />
            <dashboard-next-games />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </PageLayout>
</template>
<style lang="scss">
@use "~/assets/scss/pages/dashboard.scss";
</style>
