import { useSanctumClient } from '#imports';
import type { ScheduleRoundDetails, ScheduleStoreRequest } from '~/models/Schedule';

export const fetchRoundByStatus = async (tournamentId: number, filter: string, page: number) => {
  const client = useSanctumClient();
  type Filters = { filterBy?: string; page: number };
  let query: Filters = {} as Filters;
  if (filter) {
    query.filterBy = filter;
  }
  if (page) {
    query.page = page;
  }
  try {
    let url = `/api/v1/admin/tournaments/${tournamentId}/schedule`;
    const data = await client(url, {
      query,
    });
    return data ?? [];
  } catch (error) {
    console.error('Error fetching rounds by status:', error);
    return [];
  }
};
export const generateSchedule = async (tournamentId: number, data: ScheduleStoreRequest) => {
  const client = useSanctumClient();
  if (data.elimination_phase.group_phase) {
    const group_phase = { ...data.elimination_phase.group_phase };
    delete data.elimination_phase.group_phase;
    data = {
      ...data,
      group_phase,
    };
  }
  return await client(`/api/v1/admin/tournaments/${tournamentId}/schedule`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getScheduleRoundDetails = async (tournamentId: number, round: number) => {
  const client = useSanctumClient();
  return await client<ScheduleRoundDetails>(`/api/v1/admin/tournaments/${tournamentId}/schedule/rounds/${round}`);
};
