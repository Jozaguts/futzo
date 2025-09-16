import { defineStore } from 'pinia';
import type { Formation, FormSteps, Team, TeamStoreRequest } from '~/models/Team';
import type { IPagination } from '~/interfaces';
import * as teamAPI from '~/http/api/team';
import prepareForm, { parseBlobResponse } from '~/utils/prepareFormData';
import type { TeamFormation, NextGames, Initialize, LastGames } from '~/models/Game';
import type { TeamLineupAvailablePlayers } from '~/models/Player';
import { sortFormation } from '~/utils/sort-formation';
import { useToast } from '~/composables/useToast';

export const useTeamStore = defineStore('teamStore', () => {
  const INIT_STEPS: FormSteps = {
    current: 'createTeam',
    steps: {
      createTeam: {
        number: 1,
        completed: false,
        label: 'Crea un equipo',
        disable: true,
        back_step: 'close',
        next_step: 'createDt',
        back_label: 'Cancelar',
        next_label: 'Siguiente',
      },
      createDt: {
        number: 2,
        completed: false,
        label: 'Crea el DT',
        disable: true,
        back_step: 'createTeam',
        next_step: 'createOwner',
        back_label: 'Anterior',
        next_label: 'Siguiente',
      },
      createOwner: {
        number: 3,
        completed: false,
        label: 'Crea el presidente',
        disable: true,
        back_step: 'createDt',
        next_step: 'save',
        back_label: 'Anterior',
        next_label: 'Crear equipo',
      },
    },
  };
  const { toast } = useToast();
  const dialog = ref(false);
  const teams = ref<Team[]>([] as Team[]);
  const team = ref<Team>({} as Team);
  const teamId = ref(0);
  const search = ref('');
  const importModal = ref(false);
  const pagination = ref<IPagination>({
    current_page: 1,
    per_page: 15,
    last_page: 1,
    total: 0,
    sort: 'asc',
  });
  const teamStoreRequest = ref<Partial<TeamStoreRequest>>({} as TeamStoreRequest);
  const client = useSanctumClient();
  const steps = ref<FormSteps>(INIT_STEPS);
  const isEdition = ref(false);
  const loading = ref(false);
  const homeTeam = ref<Team>({} as Team);
  const awayTeam = ref<Team>({} as Team);
  const homeFormation = ref<TeamFormation>({} as TeamFormation);
  const awayFormation = ref<TeamFormation>({} as TeamFormation);
  const nextGames = ref<NextGames>({} as NextGames);
  const lastGames = ref<LastGames[]>([] as LastGames[]);
  const formations = ref<Formation[]>([] as Formation[]);
  const homePlayers = ref<TeamLineupAvailablePlayers[]>([] as TeamLineupAvailablePlayers[]);
  const awayPlayers = ref<TeamLineupAvailablePlayers[]>([] as TeamLineupAvailablePlayers[]);
  const downloadTemplate = async () => {
    try {
      loading.value = true;
      const blob = await client<Blob>('/api/v1/admin/teams/template');
      parseBlobResponse(blob, 'plantilla de equipos', 'excel');
    } catch (error) {
      toast({
        type: 'error',
        msg: 'Error al descargar la plantilla',
        description: 'No se pudo descargar la plantilla. Inténtalo de nuevo.',
      });
    } finally {
      loading.value = false;
    }
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
        toast({
          type: 'success',
          msg: 'Equipos Importados',
          description: 'Los equipos se han importado exitosamente.',
        });
        importModal.value = false;
        await getTeams();
      })
      .catch((error) => {
        toast({
          type: 'error',
          msg: 'Error al importar equipos',
          description:
            error.data?.message ?? 'No se pudieron importar los equipos. Verifica tu archivo e inténtalo de nuevo.',
        });
      });
  }

  const createTeam = async () => {
    let form = prepareForm(teamStoreRequest);
    //@ts-ignore
    const isPreRegister = useRoute().name == 'torneos-torneo-equipos-inscripcion';
    const url = isPreRegister
      ? `/api/v1/public/tournaments/${teamStoreRequest.value.team?.tournament_id}/pre-register-team`
      : '/api/v1/admin/teams';
    await client(url, {
      method: 'POST',
      body: form,
    })
      .then(async () => {
        if (!isPreRegister) {
          await getTeams();
        }
        toast({ type: 'success', msg: 'Equipo Creado', description: 'El nuevo equipo se ha creado exitosamente.' });
        dialog.value = false;
      })
      .catch((error) => {
        toast({
          type: 'error',
          msg: 'Error al crear el equipo',
          description:
            error.data?.message ?? 'No se pudo crear el equipo. Verifica tu información e inténtalo de nuevo.',
        });
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
        toast({ type: 'success', msg: 'Equipo actualizado', description: 'El equipo se ha actualizado exitosamente' });
        dialog.value = false;
      })
      .catch((error) => {
        toast({
          type: 'error',
          msg: 'Error al actualizar el equipo',
          description:
            error.data?.message ?? 'No se pudo actualizar el equipo. Verifica tu información e inténtalo de nuevo.',
        });
      });
  };
  const getTeams = async () => {
    const response = await teamAPI.getTeams(pagination.value);
    teams.value = response.data;
    pagination.value = { ...pagination.value, ...response.meta };
  };
  const searchTeams = async (value: string = '') => {
    const response = await teamAPI.searchTeams(value);
    teams.value = response.data || [];
    pagination.value = { ...pagination.value, ...response.meta };
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
  const initPreRegister = async (slug: string) => {
    const { categories } = storeToRefs(useCategoryStore());
    const { playerStoreRequest } = storeToRefs(usePlayerStore());
    const { positions } = storeToRefs(usePositionsStore());
    await teamAPI.initPreRegister(slug).then((data) => {
      team.value = data.team as Team;
      categories.value = data.categories;
      teams.value = [data.team as Team];
      playerStoreRequest.value.basic = {
        team_id: data.team.id as number,
        category_id: data.team?.categories[0]?.id,
      };
      positions.value = data.positions;
    });
  };
  const initTeamForm = async () => {
    await Promise.all([useTournamentStore().fetchTournamentsByLeagueId(), useCategoryStore().fetchCategories()]);
  };
  const $storeReset = () => {
    steps.value = INIT_STEPS;
    steps.value.current = 'createTeam';
    teamStoreRequest.value = {} as TeamStoreRequest;
    isEdition.value = false;
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
    $storeReset,
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
    initPreRegister,
    initTeamForm,
  };
});
