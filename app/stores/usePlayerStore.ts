import { defineStore } from 'pinia';
import type { FormSteps, Player, PlayerStoreRequest, TeamLineupAvailablePlayers } from '~/models/Player';
import prepareForm, { parseBlobResponse } from '~/utils/prepareFormData';
import type { IPagination } from '~/interfaces';
import type { Team } from '~/models/Team';
import * as teamAPI from '~/http/api/team';
import * as playerAPI from '~/http/api/players';
import type { FormationPlayer } from '~/models/Game';
import { useToast } from '~/composables/useToast';

export const usePlayerStore = defineStore('playerStore', () => {
  const { toast } = useToast();
  const players = ref<Player[]>([]);
  const dialog = ref<boolean>(false);
  const search = ref<string>('');
  const isEdition = ref<boolean>(false);
  const noPlayers = computed(() => players.value.length === 0);
  const playerStoreRequest = ref({} as PlayerStoreRequest);
  const playerId = ref<number>();
  const availableTeams = ref<Team[]>([]);
  const pagination = ref<IPagination>({
    currentPage: 1,
    perPage: 10,
    total: 0,
    lastPage: 1,
    sort: 'asc',
  });
  const importModal = ref(false);
  const loading = ref(false);
  const isImporting = ref(false);
  const showAssignTeam = ref(false);
  const player = ref<Player>(null as unknown as Player);
  const steps = ref<FormSteps>({
    current: 'basic-info',
    steps: [
      { step: 'basic-info', completed: false, label: 'Información básica' },
      { step: 'details-info', completed: false, label: 'Detalles del jugador' },
      {
        step: 'contact-info',
        completed: false,
        label: 'Información de contacto',
      },
    ],
  });

  const getPlayer = async (id: string) => {
    try {
      const client = useSanctumClient();
      const response = await client<Promise<{ data: Player }>>(`/api/v1/admin/players/${id}`);
      player.value = response.data;
    } catch (error) {
      console.error(error);
      toast(
        'error',
        'Error al obtener el jugadores',
        error?.data?.message ?? 'No se pudo obtener la información del jugadores. Inténtalo de nuevo.'
      );
    } finally {
    }
  };
  const downloadTemplate = async () => {
    try {
      const client = useSanctumClient();
      loading.value = true;
      const blob = await client<Promise<Blob>>('/api/v1/admin/players/template');
      parseBlobResponse(blob, 'plantilla de jugadores', 'excel');
    } catch (error) {
      toast('error', 'Error al descargar la plantilla', 'No se pudo descargar la plantilla. Inténtalo de nuevo.');
    } finally {
      loading.value = false;
    }
  };
  const updatePlayer = async (id: number) => {
    console.log(id);
  };
  const createPlayer = async () => {
    const form = prepareForm(playerStoreRequest);
    const client = useSanctumClient();
    const isPreRegister = useRoute().name === 'equipos-equipo-jugadores-inscripcion';
    const url = isPreRegister
      ? `/api/v1/public/teams/${playerStoreRequest.value.basic.team_id}/pre-register-player`
      : '/api/v1/admin/players';
    await client(url, {
      method: 'POST',
      body: form,
    })
      .then(async () => {
        toast('success', 'Jugador creado', 'El nuevo jugadores se ha agregado exitosamente.');
        dialog.value = false;
        if (!isPreRegister) {
          await getPlayers();
        }
      })
      .catch((error) => {
        console.log({ error });
        console.error(error.data?.errors);
        toast(
          'error',
          'Error al crear al jugadores',
          error.data?.message ?? 'No se pudo crear al jugadores. Verifica tu información e inténtalo de nuevo.'
        );
      });
  };
  const getPlayers = async (search?: string) => {
    try {
      const client = useSanctumClient();
      let url = `/api/v1/admin/players?per_page=${pagination.value.perPage}&page=${pagination.value.currentPage}&sort=${pagination.value.sort}`;
      if (search) {
        url += '&search=' + search;
      }
      await client(url).then(({ data, pagination: _pagination }) => {
        pagination.value = { ...pagination.value, ..._pagination };
        players.value = data;
      });
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
    await client('/api/v1/admin/players/import', {
      method: 'POST',
      body: formData,
    })
      .then(async () => {
        toast('success', 'Jugadores importados', 'Los jugadores han sido importados y registrados exitosamente.');
        importModal.value = false;
        await getPlayers();
      })
      .catch((error) => {
        console.error(error.data?.errors);
        toast(
          'error',
          'Error importar',
          error.data?.message ?? 'No se pudo importar el documento. Verifica su información e inténtalo de nuevo.'
        );
      })
      .finally(() => (isImporting.value = false));
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

  return {
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
  };
});
