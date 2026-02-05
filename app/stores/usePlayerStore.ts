import {defineStore} from 'pinia';
import type { FormSteps, Player, PlayerStoreRequest, TeamLineupAvailablePlayers } from '~/models/Player';
import prepareForm, {parseBlobResponse} from '~/utils/prepareFormData';
import type {IPagination} from '~/interfaces';
import type {Team} from '~/models/Team';
import * as teamAPI from '~/http/api/team';
import * as playerAPI from '~/http/api/players';
import type {FormationPlayer} from '~/models/Game';
import {useToast} from '~/composables/useToast';
import type {TourStep} from '#nuxt-tour/props';
import {useTourController} from '~/composables/useTourController';
import {useCategoryStore, useSanctumClient, useTeamStore} from '#imports';

export const usePlayerStore = defineStore('playerStore', () => {
  const { toast } = useToast();
  const { registerTourRef, startTour, resetTour, recalculateTour } = useTourController();
  const INIT_STEPS: FormSteps = {
    current: 'basic-info',
    steps: {
      'basic-info': {
        number: 1,
        completed: false,
        label: 'Información básica',
        disable: true,
        back_step: 'close',
        next_step: 'details-info',
        back_label: 'Cancelar',
        next_label: 'Siguiente',
      },
      'details-info': {
        number: 2,
        completed: false,
        label: 'Detalles del jugador',
        disable: true,
        back_step: 'basic-info',
        next_step: 'contact-info',
        back_label: 'Anterior',
        next_label: 'Siguiente',
      },
      'contact-info': {
        number: 3,
        completed: false,
        label: 'Información de contacto',
        disable: true,
        back_step: 'details-info',
        next_step: 'save',
        back_label: 'Anterior',
        next_label: 'Crear jugador',
      },
    },
  };
  const players = ref<Player[]>([]);
  const dialog = ref<boolean>(false);
  const search = ref<string>('');
  const isEdition = ref<boolean>(false);
  const noPlayers = computed(() => players.value.length === 0);
  const playerStoreRequest = ref({} as PlayerStoreRequest);
  const playerId = ref<number>();
  const availableTeams = ref<Team[]>([]);
  const pagination = ref<IPagination>({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
    sort: 'asc',
  });
  const importModal = ref(false);
  const loading = ref(false);
  const isImporting = ref(false);
  const showAssignTeam = ref(false);
  const player = ref<Player>(null as unknown as Player);
  const steps = ref<FormSteps>(INIT_STEPS);
  const tourSteps = ref<TourStep[]>([
    {
      title: 'Registra a un jugador',
      subText: 'Solo necesitas sus datos básicos. El resto es opcional y puedes completarlo después.',
      slot: 'jugadores',
      target: '.players-primary-btn',
      onNext: () => {
        dialog.value = true;
        steps.value.current = 'basic-info';
      },
    },
    {
      title: 'Datos básicos (obligatorio)',
      subText:
        'Completa nombre, fecha de nacimiento y, si quieres, apellido, nacionalidad, imagen y equipo. La categoría se asigna automáticamente.',
      slot: 'jugadores',
      target: '#player-step-1',
      onNext: () => {
        steps.value.current = 'details-info';
      },
    },
    {
      title: 'Información deportiva (opcional)',
      subText:
        'Puedes añadir posición, número, altura, peso, pierna dominante y notas médicas. Esto enriquece estadísticas.',
      slot: 'jugadores',
      target: '#player-step-2',
      onNext: () => {
        steps.value.current = 'contact-info';
      },
    },
    {
      title: 'Contacto (opcional)',
      subText: 'Agrega correo, teléfono y notas adicionales para contacto o invitación.',
      slot: 'jugadores',
      target: '#player-step-3',
      onNext: () => {
        dialog.value = false;
      },
    },
    {
      title: 'Jugador registrado',
      subText: 'Ya puedes usar este jugador para estadísticas, goles y tarjetas.',
      slot: 'jugadores',
      target: 'body',
      onNext: () => {
        steps.value.current = 'basic-info';
      },
    },
  ]);

  type PlayerImportResponse = {
    imported_count: number;
    skipped_count: number;
    skipped: Array<{ name: string; last_name: string; reason: string }>;
    message?: string;
  };

  const getPlayer = async (id: string) => {
    try {
      const client = useSanctumClient();
      const response = await client<{ data: Player }>(`/api/v1/admin/players/${id}`);
      player.value = response.data;
    } catch (error: any) {
      console.error(error);
      toast({
        type: 'error',
        msg: 'Error al obtener el jugadores',
        description: error?.data?.message ?? 'No se pudo obtener la información del jugadores. Inténtalo de nuevo.',
      });
    } finally {
    }
  };
  const downloadTemplate = async () => {
    try {
      const client = useSanctumClient();
      loading.value = true;
      const blob = await client<Blob>('/api/v1/admin/players/template');
      parseBlobResponse(blob, 'plantilla de jugadores', 'excel');
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
  const updatePlayer = async (id: number, payload: Record<string, any>) => {
    if (!id || !Object.keys(payload).length) {
      return null;
    }
    try {
      const response = await playerAPI.updatePlayer(id, payload);
      player.value = response.data;
      toast({
        type: 'success',
        msg: 'Jugador actualizado',
        description: 'Los cambios se han guardado correctamente.',
      });
      return response.data;
    } catch (error: any) {
      console.error(error);
      toast({
        type: 'error',
        msg: 'No pudimos guardar los cambios',
        description: error?.data?.message ?? 'Inténtalo nuevamente en unos minutos.',
      });
      throw error;
    }
  };
  const createPlayer = async () => {
    const form = prepareForm(playerStoreRequest);
    const client = useSanctumClient();
    //@ts-ignore
    const isPreRegister = useRoute().name === 'equipos-equipo-jugadores-inscripcion';
    const url = isPreRegister
      ? `/api/v1/public/teams/${playerStoreRequest.value.basic.team_id}/pre-register-player`
      : '/api/v1/admin/players';
    await client(url, {
      method: 'POST',
      body: form,
    })
      .then(async () => {
        toast({
          type: 'success',
          msg: 'Jugador creado',
          description: 'El nuevo jugadores se ha agregado exitosamente.',
        });
        dialog.value = false;
        if (!isPreRegister) {
          await getPlayers();
        }
      })
      .catch((error) => {
        toast({
          type: 'error',
          msg: 'Error al crear al jugadores',
          description:
            error.data?.message ?? 'No se pudo crear al jugadores. Verifica tu información e inténtalo de nuevo.',
        });
      });
  };
  const getPlayers = async (search?: string) => {
    try {
      const client = useSanctumClient();
      let url = `/api/v1/admin/players?per_page=${pagination.value.per_page}&page=${pagination.value.current_page}&sort=${pagination.value.sort}`;
      if (search) {
        pagination.value.current_page = 1;
        url += '&search=' + search;
      }
      const response = await client<{ data: Player[]; meta: IPagination }>(url);
      pagination.value = { ...pagination.value, ...response.meta };
      players.value = response?.data;
    } catch (error) {
      console.log(error);
    }
  };
  const importPlayersHandler = async (file: File, teamId: number) => {
    isImporting.value = true;
    const client = useSanctumClient();
    const formData = new FormData();
    formData.append('team_id', teamId.toString());
    formData.append('file', file);
    await client<PlayerImportResponse>('/api/v1/admin/players/import', {
      method: 'POST',
      body: formData,
    })
      .then(async (response) => {
        const imported = response?.imported_count ?? 0;
        const skipped = response?.skipped_count ?? 0;
        toast({
          type: 'success',
          msg: 'Jugadores importados',
          description: `Importados: ${imported}. Omitidos: ${skipped}.`,
        });
        importModal.value = false;
        await getPlayers();
      })
      .catch((error) => {
        console.error(error.data?.errors);
        toast({
          type: 'error',
          msg: 'Error importar',
          description:
            error.data?.message ?? 'No se pudo importar el documento. Verifica su información e inténtalo de nuevo.',
        });
      })
      .finally(() => (isImporting.value = false));
  };

  const releasePlayer = async (playerId: number) => {
    try {
      await playerAPI.releasePlayer(playerId);
      toast({
        type: 'success',
        msg: 'Jugador liberado',
        description: 'El jugador fue liberado correctamente.',
      });
    } catch (error: any) {
      toast({
        type: 'error',
        msg: 'No se pudo liberar',
        description: error?.data?.message ?? 'Inténtalo nuevamente.',
      });
      throw error;
    }
  };

  const uploadVerification = async (playerId: number, document: File, photo: File) => {
    try {
      await playerAPI.uploadPlayerVerification(playerId, document, photo);
      toast({
        type: 'success',
        msg: 'Documentos cargados',
        description: 'La verificación fue enviada correctamente.',
      });
    } catch (error: any) {
      toast({
        type: 'error',
        msg: 'Error al cargar documentos',
        description: error?.data?.message ?? 'Inténtalo nuevamente.',
      });
      throw error;
    }
  };

  const approveVerification = async (playerId: number) => {
    try {
      await playerAPI.approvePlayerVerification(playerId);
      toast({
        type: 'success',
        msg: 'Jugador validado',
        description: 'La verificación fue aprobada.',
      });
    } catch (error: any) {
      toast({
        type: 'error',
        msg: 'No se pudo aprobar',
        description: error?.data?.message ?? 'Inténtalo nuevamente.',
      });
      throw error;
    }
  };

  const rejectVerification = async (playerId: number, notes: string) => {
    try {
      await playerAPI.rejectPlayerVerification(playerId, notes);
      toast({
        type: 'success',
        msg: 'Verificación rechazada',
        description: 'Se rechazó la verificación del jugador.',
      });
    } catch (error: any) {
      toast({
        type: 'error',
        msg: 'No se pudo rechazar',
        description: error?.data?.message ?? 'Inténtalo nuevamente.',
      });
      throw error;
    }
  };
  const getDefaultLineupAvailableTeamPlayers = async (team: Team) => {
    return await teamAPI.getDefaultLineupAvailableTeemPlayers(team);
  };
  const updateDefaultLineup = async (
    player: TeamLineupAvailablePlayers,
    currentPlayer: FormationPlayer,
    field_location: number
  ) => {
    await teamAPI.updateDefaultLineup(player, currentPlayer, field_location);
  };
  const addDefaultLineupPlayer = async (player: TeamLineupAvailablePlayers, field_location: number) => {
    await teamAPI.addDefaultLineupPlayer(player, field_location);
  };
  const updateLineup = async (
    player: TeamLineupAvailablePlayers,
    currentPlayer: FormationPlayer,
    field_location: number
  ) => {
    await teamAPI.updateLineup(player, currentPlayer, field_location);
  };
  const addLineupPlayer = async (
    player: TeamLineupAvailablePlayers,
    currentPlayer: FormationPlayer,
    field_location: number,
    game_id: number
  ) => {
    await teamAPI.addLineupPlayer(player, currentPlayer, field_location, game_id);
  };
  const searchPlayer = async (search: string) => {
    players.value = await playerAPI.search(search);
  };
  const $storeReset = () => {
    steps.value = INIT_STEPS;
    playerStoreRequest.value = {} as PlayerStoreRequest;
    isEdition.value = false;
  };
  const initPlayerForm = async () => {
    await Promise.all([useTeamStore().list(), useCategoryStore().fetchCategories()]);
  };
  return {
    registerTourRef,
    startTour,
    resetTour,
    recalculateTour,
    players,
    dialog,
    search,
    noPlayers,
    isEdition,
    steps,
    playerStoreRequest,
    playerId,
    pagination,
    importModal,
    availableTeams,
    isImporting,
    showAssignTeam,
    player,
    tourSteps,
    $storeReset,
    updatePlayer,
    createPlayer,
    getPlayers,
    importPlayersHandler,
    downloadTemplate,
    getPlayer,
    getDefaultLineupAvailableTeamPlayers,
    updateDefaultLineup,
    addDefaultLineupPlayer,
    updateLineup,
    addLineupPlayer,
    searchPlayer,
    initPlayerForm,
    releasePlayer,
    uploadVerification,
    approveVerification,
    rejectVerification,
  };
});
