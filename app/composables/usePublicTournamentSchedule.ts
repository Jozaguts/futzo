import type { Round, TournamentSchedule } from '~/models/Schedule';
import { getTournamentPublicSchedule } from '~/http/api/tournament';

const PAGE_SIZE = 1;

export const usePublicTournamentSchedule = (slug: string | Ref<string>) => {
  const rounds = ref<Round[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const page = ref(1);
  const hasMore = ref(true);

  const reset = () => {
    rounds.value = [];
    page.value = 1;
    hasMore.value = true;
    error.value = null;
  };

  const fetchSchedulePage = async (slugValue: string, targetPage: number): Promise<TournamentSchedule> => {
    const { rounds } = await getTournamentPublicSchedule(slugValue, targetPage);
    return { rounds };
  };

  const loadMore = async ({ done }: { done: (status: 'ok' | 'empty' | 'error') => void }) => {
    if (loading.value) {
      return;
    }
    if (!hasMore.value) {
      done('empty');
      return;
    }

    loading.value = true;
    try {
      const slugValue = unref(slug);
      if (!slugValue) {
        throw new Error('Slug vacío');
      }
      const response = await fetchSchedulePage(slugValue, page.value);
      if (!response.rounds.length) {
        hasMore.value = false;
        done('empty');
        return;
      }
      rounds.value = [...rounds.value, ...response.rounds];
      page.value += 1;
      done('ok');
    } catch (err) {
      error.value = 'No pudimos cargar el calendario.';
      done('error');
    } finally {
      loading.value = false;
    }
  };

  return {
    rounds,
    loading,
    error,
    loadMore,
    reset,
  };
};
