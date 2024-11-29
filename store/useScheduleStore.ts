import { defineStore } from "pinia";
import type { Schedule } from "~/models/Schedule";

export const useScheduleStore = defineStore("scheduleStore", () => {
  const schedules = ref<Schedule[]>([]);
  const scheduleParams = ref<{ leagueId: number; tournamentId: number }>();
  const daysToPlay = ref([
    {
      days: [
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado",
        "domingo",
      ],
      key: "all-days",
      text: "Toda la semana",
    },
    {
      days: ["viernes", "sábado", "domingo"],
      key: "weekend-days",
      text: "Viernes | Sábado | Domingo",
    },
    { days: ["sábado", "domingo"], key: "weekend", text: "Sábado | Domingo" },
    { days: ["domingo"], key: "sunday", text: "Domingo" },
    { days: [], key: "other", text: "Otro" },
  ]);
  const daysToPlaySelected = ref();
  const daysToPlayCustomSelected = ref();

  const fetchSchedules = async () => {
    const client = useSanctumClient();
    schedules.value = await client("/api/v1/admin/schedules");
  };
  const generateSchedule = async (params: {
    leagueId: number;
    tournamentId: number;
  }) => {
    const client = useSanctumClient();
    await client("/api/v1/admin/schedules", {
      method: "POST",
      body: JSON.stringify(params),
    });
  };
  return {
    schedules,
    daysToPlay,
    scheduleParams,
    daysToPlayCustomSelected,
    daysToPlaySelected,
    fetchSchedules,
    generateSchedule,
  };
});
