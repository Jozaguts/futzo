import { defineStore } from "pinia";
import type { IStatStage, ITeamStats } from "~/interfaces";

export const useDashboardStore = defineStore("dashboardStore", () => {
  const range = ref<IStatStage>("lastMonth");

  const teamStats = ref<ITeamStats>({
    registeredTeams: { total: 0, percentage: 0 },
    activePlayers: { total: 0, percentage: 0 },
    completedGames: { total: 0, percentage: 0 },
  });

  function byRange() {
    const client = useSanctumClient();
    client(`/api/v1/admin/dashboard/stats?range=${range.value}`).then(
      (response) => {
        teamStats.value.registeredTeams = response.data.teams;
        teamStats.value.activePlayers = response.data.active;
        teamStats.value.completedGames = response.data.completed;
      },
    );
  }

  return {
    teamStats,
    range,
    byRange,
  };
});
