import {defineStore, skipHydrate} from 'pinia';
import type {Formation, FormSteps, HomePreferences, Team, TeamStoreRequest} from '~/models/Team';
import type {IPagination} from '~/interfaces';
import * as teamAPI from '~/http/api/team';
import prepareForm, {parseBlobResponse} from '~/utils/prepareFormData';
import type {Initialize, LastGames, NextGames, TeamFormation} from '~/models/Game';
import type {TeamLineupAvailablePlayers} from '~/models/Player';
import {sortFormation} from '~/utils/sort-formation';
import {useToast} from '~/composables/useToast';
import type {TourStep} from '#nuxt-tour/props';
import {useTourController} from '~/composables/useTourController';

export const useTeamStore = defineStore('teamStore', () => {
  const { registerTourRef, startTour, resetTour, recalculateTour } = useTourController();
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
  const tourSteps = ref<TourStep[]>([
    {
      title: 'Crea un equipo',
      subText: 'Solo necesitas el nombre y el torneo. El resto es opcional para organizar mejor tu liga.',
      slot: 'equipos',
      target: '.teams-primary-btn',
      onNext: () =>{
        dialog.value = true
      }
    },
    {
      title: 'Nombre del equipo',
      subText: 'Identifica al equipo dentro del torneo. Ejemplo: “Equipo de Verano”.',
      slot: 'equipos',
      target: '#equipos-team-name',
    },
    {
      title: 'Torneo',
      subText: 'Selecciona el torneo en el que participa. La categoría se asigna automáticamente.',
      slot: 'equipos',
      target: '#equipos-team-tournament',
    },
    {
      title: 'Categoría',
      subText: 'Se define automáticamente con base en el torneo seleccionado.',
      slot: 'equipos',
      target: '#equipos-team-category',
    },
    {
      title: 'Imagen del equipo',
      subText: 'Opcional. Ayuda a identificarlo en tablas y vistas.',
      slot: 'equipos',
      target: '#equipos-team-image',
    },
    {
      title: 'Sede, día y horario',
      subText: 'Opcional. Si eliges sede, puedes fijar día y hora para evitar conflictos.',
      slot: 'equipos',
      target: '#equipos-team-location',
    },
    {
      title: 'Colores del equipo',
      subText: 'Opcional. Se usan para identificar equipos y armonizar las tablas.',
      slot: 'equipos',
      target: '#equipos-team-colors',
      onNext: () =>{
        steps.value.current = 'createDt'
      }
    },
    {
      title: 'Director técnico',
      subText: 'Puedes crear el DT ahora o hacerlo más adelante.',
      slot: 'equipos',
      target: '#equipos-dt-name',
    },
    {
      title: 'Datos del DT',
      subText: 'Agrega imagen, correo y teléfono si aplica.',
      slot: 'equipos',
      target: '#equipos-dt-email',
      onNext: () =>{
        steps.value.current = 'createOwner'
      }
    },
    {
      title: 'Presidente o dueño',
      subText: 'Este usuario administra el equipo y recibe los accesos principales.',
      slot: 'equipos',
      target: '#equipos-owner-name',
    },
    {
      title: 'Datos del dueño',
      subText: 'Opcional. Puedes agregar imagen, correo y teléfono.',
      slot: 'equipos',
      target: '#equipos-owner-email',
      onNext: () =>{
        dialog.value = false
        steps.value.current = 'createTeam'
      }
    },
    {
      title: 'Listo',
      subText: 'El equipo fue creado. Ahora puedes registrar jugadores o continuar con el torneo.',
      slot: 'equipos',
      target: 'body',
    },
  ]);
  const formatTime = (value?: string | null): string | null => {
    if (!value) {
      return null;
    }
    const [hours, minutes] = value.split(':');
    if (hours === undefined || minutes === undefined) {
      return null;
    }
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  const showTeamHandler = async (slug: string) => {
    if (slug) {
      await useTeamStore()
        .getTeam(slug)
        .then((data) => {
          const { president, coach, ...team } = data as Team;
          teamId.value = data?.id as number;
          isEdition.value = true;
          const homePreferences: Partial<HomePreferences> = team.home_preferences ?? {};
          teamStoreRequest.value = {
            team: {
              id: team.id,
              name: team.name,
              tournament_id: team.tournament.id,
              category_id: team.category.id,
              home_location_id: homePreferences.location_id ?? null,
              home_day_of_week: homePreferences.day_of_week ?? null,
              home_start_time: formatTime(homePreferences.start_time ?? null),
              colors: team?.colors,
              description: team?.description,
              image: team?.image,
            },
            president: { ...president, image: president?.image },
            coach: { ...coach, image: coach?.image },
          };
          dialog.value = true;
        });
    }
  };
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
  const noTeams = computed(() => teams.value?.length === 0);
  return {
    registerTourRef,
    startTour,
    resetTour,
    recalculateTour,
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
    tourSteps: skipHydrate(tourSteps),
    importTeamsHandler,
    noTeams,
    $storeReset,
    createTeam,
    getTeams,
    getTeam,
    updateTeam,
    list,
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
    showTeamHandler,
  };
});
