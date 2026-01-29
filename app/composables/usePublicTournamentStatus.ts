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
      // TODO: GET /api/v1/public/tournaments/{slug}/details
      // Response: { header, standings, groupStanding, upcomingMatches, lastResults, stats }
      data.value = await getTournamentPublicDetails(slugValue);
    } catch (err) {
      error.value = 'No pudimos cargar el torneo.';
      data.value = null;
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
