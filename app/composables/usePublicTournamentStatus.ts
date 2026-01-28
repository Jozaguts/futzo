import { publicTournamentDummy } from '~/utils/publicTournamentDummy';
import type { PublicTournamentStatusData } from '~/models/PublicTournament';
import { getTournamentPublicDetails } from '~/http/api/tournament';

export const usePublicTournamentStatus = (slug: string | Ref<string>) => {
  const data = ref<PublicTournamentStatusData | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const load = async () => {
    loading.value = true;
    error.value = null;
    try {
      const slugValue = unref(slug);
      if (!slugValue) {
        throw new Error('Slug vacío');
      }
      data.value = await getTournamentPublicDetails(slugValue);

      // data.value = publicTournamentDummy;
      // TODO: GET /api/v1/public/tournaments/{slug}/schedule
      // Response: [{ round, date, matches: [{ id, homeTeam, homeShort, homeScore, awayTeam, awayShort, awayScore, time, venue, played }] }]
    } catch (err) {
      error.value = 'No pudimos cargar el torneo.';
      data.value = publicTournamentDummy;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    load,
  };
};
