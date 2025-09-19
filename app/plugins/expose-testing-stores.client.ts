import { useScheduleStore } from '~/stores/useScheduleStore'
import { useTournamentStore } from '~/stores/useTournamentStore'

export default defineNuxtPlugin(() => {
  if (!import.meta.dev) {
    return
  }
  const scheduleStore = useScheduleStore()
  const tournamentStore = useTournamentStore()
  if (typeof window !== 'undefined') {
    ;(window as any).__TEST_STORES__ = {
      schedule: scheduleStore,
      tournament: tournamentStore,
    }
  }
})
