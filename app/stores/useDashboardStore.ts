import {defineStore, skipHydrate} from 'pinia';
import type {IStatStage, ITeamStats} from '~/interfaces';
import type {NextGames} from '~/models/Game';
import type {TourStep} from "#nuxt-tour/props";
import {useTourController} from '~/composables/useTourController';
import { dashboardStatsSchema } from '~/schemas/dashboard/stats.schema';
import { nextGamesSchema } from '~/schemas/dashboard/next-games.schema';
import { activitySchema } from '~/schemas/dashboard/activity.schema';
import { validateResponse } from '~/utils/validateResponse';

// @ts-ignore
export const useDashboardStore = defineStore('dashboardStore', () => {
  const range = ref<IStatStage>('lastMonth');

  const teamStats = ref<ITeamStats>({
    activeTournaments: {
      total: 0,
      current: 0,
      dailyData: [],
      label: 'vs último mes',
    },
    matchesThisWeek: {
      total: 0,
      current: 0,
      dailyData: [],
      label: 'vs último mes',
    },
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
  const activity = ref<any[]>([]);
  const { registerTourRef, startTour, resetTour, recalculateTour } = useTourController();
  const tourSteps = ref<TourStep[]>([
      {
      title: "Crea tu torneo",
      subText: "Al crear un torneo, Futzo genera un <span class='font-weight-bold mb-2'>link </span> y un <span class='font-weight-bold mb-2'>código QR</span> para que los equipos se registren automáticamente y puedas generar el calendario.",
      slot: "dashboard",
      target: '#Torneos-tour',
    },
    {
      title: "Registra tus equipos",
      subText: "Puedes registrarlos manualmente o compartir el acceso del torneo (link o QR) para que los equipos se inscriban solos, sin trabajo extra.",
      slot: "dashboard",
      target: '#Equipos-tour',
    },
    {
      title: "Registra a tus jugadores",
      subText: "Puedes agregarlos <b>uno por uno </b>o compartir el acceso del equipo para que los jugadores se registren automáticamente y generar <b>estadísticas de goles, tarjetas y rendimiento</b>.",
      slot: "dashboard",
      target: '#Jugadores-tour',
    },
    {
      title: "Configura las ubicaciones",
      subText: "Las ubicaciones son opcionales, pero te permiten un <b>mejor control y automatización</b> del rol de juegos, horarios y sedes.",
      slot: "dashboard",
      target: '#Ubicaciones-tour',
    },
  ])

  function byRange() {
    const client = useSanctumClient();
    client<unknown>(`/api/v1/admin/dashboard/stats?range=${range.value}`).then((response) => {
      const parsed = validateResponse(response, dashboardStatsSchema, {
        context: 'Dashboard: estadísticas',
      });
      if (!parsed) return;
      teamStats.value.activeTournaments = parsed.activeTournaments;
      teamStats.value.matchesThisWeek = parsed.matchesThisWeek;
      teamStats.value.registeredTeams = parsed.registeredTeams;
      teamStats.value.activePlayers = parsed.activePlayers;
      teamStats.value.completedGames = parsed.completedGames;
    });
  }

  function getNextGames() {
    const client = useSanctumClient();
    client<unknown>('/api/v1/admin/dashboard/next-games').then((response) => {
      const parsed = validateResponse(response, nextGamesSchema, {
        context: 'Dashboard: próximos partidos',
      });
      nextGames.value = parsed?.data ?? [];
    });
  }

  function getActivity() {
    const client = useSanctumClient();
    client<unknown>('/api/v1/admin/dashboard/activity').then((response) => {
      const parsed = validateResponse(response, activitySchema, {
        context: 'Dashboard: actividad reciente',
      });
      activity.value = parsed?.data ?? [];
    });
  }

  return {
    teamStats,
    range,
    nextGames,
    activity,
    tourSteps: skipHydrate(tourSteps),
    registerTourRef,
    startTour,
    resetTour,
    recalculateTour,
    byRange,
    getNextGames,
    getActivity,
  };
});
