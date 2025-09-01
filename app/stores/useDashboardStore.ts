import { defineStore } from 'pinia';
import type { IStatStage, ITeamStats, Stats } from '~/interfaces';
import type { NextGames } from '~/models/Game';

export const useDashboardStore = defineStore('dashboardStore', () => {
  const range = ref<IStatStage>('lastMonth');

  const teamStats = ref<ITeamStats>({
    registeredTeams: {
      total: 0,
      current: 0,
      dailyData: [],
      label: 'vs último mes',
    },
    activePlayers: {
      total: 0,
      current: 0,
      dailyData: [],
      label: 'vs último mes',
    },
    completedGames: {
      total: 0,
      current: 0,
      dailyData: [],
      label: 'vs último mes',
    },
  });
  const nextGames = ref(<NextGames['data']>[]);

  function byRange() {
    const client = useSanctumClient();
    client<Stats>(`/api/v1/admin/dashboard/stats?range=${range.value}`).then((response) => {
      teamStats.value.registeredTeams = response.registeredTeams;
      teamStats.value.activePlayers = response.activePlayers;
      teamStats.value.completedGames = response.completedGames;
    });
  }

  function getNextGames() {
    const client = useSanctumClient();
    client<NextGames>('/api/v1/admin/dashboard/next-games').then((response) => {
      nextGames.value = response.data;
    });
  }

  return {
    teamStats,
    range,
    nextGames,
    byRange,
    getNextGames,
  };
});
