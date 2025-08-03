export const getGamePlayers = async (gameId: number) => {
  const client = useSanctumClient();
  try {
    const data = await client(`/api/v1/admin/games/${gameId}/teams/players`);
    return data ?? [];
  } catch (error) {
    console.error('Error fetching game players:', error);
    return [];
  }
};
export const getGame = async (game_id: number, date: string, field_id: number) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/games/${game_id}/details`, {
    query: { date, field_id },
  });
};

export const initializeGameReport = async (gameId: number) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/games/${gameId}/report/initialize`);
};
export const getHeadAndSubsGamePlayers = async (gameId: number) => {
  const client = useSanctumClient();
  return await client(`api/v1/admin/games/${gameId}/players`);
};

export const saveSubstitutionHandler = async (gameId: number, body: any) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/games/${gameId}/substitutions`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
export const removeSubstitution = async (gameId: number, substitutionId: number) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/games/${gameId}/substitutions/${substitutionId}`, {
    method: 'DELETE',
  });
};
export const saveCardsHandler = async (gameId: number, body: any) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/games/${gameId}/cards`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
export const removeCardEvent = async (gameId: number, gameEventId: number) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/games/${gameId}/game-event/${gameEventId}/card`, {
    method: 'DELETE',
  });
};
export const saveGoalsHandler = async (gameId: number, body: any) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/games/${gameId}/goals`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
export const removeGoalEvent = async (gameId: number, gameEventId: number) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/games/${gameId}/game-event/${gameEventId}/goal`, {
    method: 'DELETE',
  });
};

export const getGameEvents = async (gameId: number) => {
  const client = useSanctumClient();
  try {
    return await client(`/api/v1/admin/games/${gameId}/events`);
  } catch (error) {
    console.error('Error fetching game events:', error);
    return [];
  }
};
