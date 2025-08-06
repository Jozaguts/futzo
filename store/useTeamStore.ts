import { defineStore } from 'pinia';
import type { Formation, FormSteps, Team, TeamResponse, TeamStoreRequest } from '~/models/Team';
import type { IPagination } from '~/interfaces';
import * as teamAPI from '~/http/api/team';
import prepareForm from '~/utils/prepareFormData';
import type { TeamFormation, NextGames, Initialize } from '~/models/Game';
import type { TeamLineupAvailablePlayers } from '~/models/Player';
import { sortFormation } from '~/utils/sort-formation';

export const useTeamStore = defineStore('teamStore', () => {
  const { toast } = useToast();
  const dialog = ref(false);
  const teams = ref<TeamResponse[]>();
  const team = ref<Team>();
  const teamId = ref(0);
  const search = ref('');
  const importModal = ref(false);
  const pagination = ref<IPagination>({
    currentPage: 1,
    perPage: 10,
    lastPage: 1,
    total: 0,
    sort: 'asc',
  });
  const teamStoreRequest = ref<Partial<TeamStoreRequest>>({} as TeamStoreRequest);
  const client = useSanctumClient();
  const steps = ref<FormSteps>({
    current: 'createTeam',
    steps: [
      {
        step: 'createTeam',
        completed: false,
        label: 'Crea un equipo',
      },
      {
        step: 'createDt',
        completed: false,
        label: 'Crea el DT',
      },
      {
        step: 'createOwner',
        completed: false,
        label: 'Crea el presidente',
      },
    ],
  });
  const isEdition = ref(false);
  const loading = ref(false);
  const homeTeam = ref<Team>({} as Team);
  const awayTeam = ref<Team>({} as Team);
  const homeFormation = ref<TeamFormation>({} as TeamFormation);
  const awayFormation = ref<TeamFormation>({} as TeamFormation);
  const nextGames = ref<NextGames>({} as NextGames);
  const lastGames = ref<NextGames>({} as NextGames);
  const formations = ref<Formation[]>([] as Formation[]);
  const homePlayers = ref<TeamLineupAvailablePlayers[]>([] as TeamLineupAvailablePlayers[]);
  const awayPlayers = ref<TeamLineupAvailablePlayers[]>([] as TeamLineupAvailablePlayers[]);
  const downloadTemplate = async () => {
    loading.value = true;
    await client('/api/v1/admin/teams/template', {
      method: 'GET',
      // responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'template.xlsx');
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        toast(
          'error',
          'Error al descargar la plantilla',
          error.data?.message ?? 'No se pudo descargar la plantilla. Inténtalo de nuevo.'
        );
      })
      .finally(() => {
        loading.value = false;
      });
  };

  async function importTeamsHandler(file: File, tournamentId: number) {
    const formData = new FormData();
    formData.append('tournament_id', tournamentId.toString());
    formData.append('file', file);

    await client('/api/v1/admin/teams/import', {
      method: 'POST',
      body: formData,
    })
      .then(async () => {
        toast('success', 'Equipos Importados', 'Los equipos se han importado exitosamente.');
        importModal.value = false;
        await getTeams();
      })
      .catch((error) => {
        toast(
          'error',
          'Error al importar equipos',
          error.data?.message ?? 'No se pudieron importar los equipos. Verifica tu archivo e inténtalo de nuevo.'
        );
      });
  }

  const createTeam = async () => {
    let form = prepareForm(teamStoreRequest);

    await client('/api/v1/admin/teams', {
      method: 'POST',
      body: form,
    })
      .then(async () => {
        await getTeams();
        toast('success', 'Equipo Creado', 'El nuevo equipo se ha creado exitosamente.');

        dialog.value = false;
      })
      .catch((error) => {
        toast(
          'error',
          'Error al crear el equipo',
          error.data?.message ?? 'No se pudo crear el equipo. Verifica tu información e inténtalo de nuevo.'
        );
      });
  };
  const updateTeam = async (teamId: number) => {
    let form = prepareForm(teamStoreRequest);
    await client(`/api/v1/admin/teams/${teamId}`, {
      method: 'PUT',
      body: form,
    })
      .then(async () => {
        await getTeams();
        toast('success', 'Equipo actualizado', 'El equipo se ha actualizado exitosamente');
        dialog.value = false;
      })
      .catch((error) => {
        toast(
          'error',
          'Error al actualizar el equipo',
          error.data?.message ?? 'No se pudo actualizar el equipo. Verifica tu información e inténtalo de nuevo.'
        );
      });
  };
  const getTeams = async () => {
    try {
      await client(
        `/api/v1/admin/teams?per_page=${pagination.value.perPage}&page=${pagination.value.currentPage}&sort=${pagination.value.sort}`
      ).then(({ data, pagination: _pagination }) => {
        teams.value = data || [];
        pagination.value = { ...pagination.value, ..._pagination };
      });
    } catch (error) {
      console.log(error);
    }
  };
  const searchTeams = (value: string = '') => {
    const client = useSanctumClient();
    client(`/api/v1/admin/teams/search?value=${value}`).then(({ data, pagination: _pagination }) => {
      teams.value = data || [];
      pagination.value = { ...pagination.value, ..._pagination };
    });
  };
  const list = async () => {
    try {
      teams.value = await client('/api/v1/admin/teams/list');
    } catch (error) {
      console.log(error);
    }
  };
  const getTeam = async (term: number | string) => {
    try {
      return await teamAPI.getTeamBy(term);
    } catch (error) {
      console.log(error);
    }
  };

  const getNextGames = async (teamId: number) => {
    try {
      nextGames.value = await teamAPI.nextGames(teamId);
    } catch (error) {
      console.log(error);
    }
  };
  const getLastGames = async (teamId: number, limit = 3, order = 'desc') => {
    try {
      lastGames.value = await teamAPI.lastGames(teamId, limit, order);
    } catch (error) {
      console.log(error);
    }
  };
  const getFormations = async () => {
    if (formations.value.length > 0) return;
    formations.value = await teamAPI.getFormations();
  };
  const updateDefaultFormationType = async (team_id: number, formation_id: number) => {
    return await teamAPI.updateDefaultFormationType(team_id, formation_id);
  };
  const updateGameTeamFormationType = async (team_id: number, game_id: number, formation_id: number) => {
    return await teamAPI.updateGameTeamFormationType(team_id, game_id, formation_id);
  };

  const initReportHandler = (initialize: Initialize) => {
    homeTeam.value = initialize.home.team as unknown as Team;
    awayTeam.value = initialize.away.team as unknown as Team;
    homePlayers.value = initialize.home.players as TeamLineupAvailablePlayers[];
    awayPlayers.value = initialize.away.players as TeamLineupAvailablePlayers[];
    delete initialize.home.team;
    delete initialize.away.team;
    delete initialize.home.players;
    delete initialize.away.players;
    homeFormation.value = sortFormation(initialize.home);
    awayFormation.value = sortFormation(initialize.away);
    return initialize;
  };

  return {
    teams,
    team,
    formations,
    dialog,
    steps,
    isEdition,
    teamStoreRequest,
    teamId,
    pagination,
    search,
    importModal,
    loading,
    homeTeam,
    awayTeam,
    homeFormation,
    awayFormation,
    nextGames,
    homePlayers,
    awayPlayers,
    lastGames,
    createTeam,
    getTeams,
    getTeam,
    updateTeam,
    list,
    importTeamsHandler,
    downloadTemplate,
    searchTeams,
    getNextGames,
    getFormations,
    updateDefaultFormationType,
    updateGameTeamFormationType,
    initReportHandler,
    getLastGames,
  };
});
