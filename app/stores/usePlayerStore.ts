import {defineStore, skipHydrate} from 'pinia';
import type {FormSteps, Player, PlayerStoreRequest, TeamLineupAvailablePlayers} from '~/models/Player';
import prepareForm, {parseBlobResponse} from '~/utils/prepareFormData';
import type {IPagination} from '~/interfaces';
import type {Team} from '~/models/Team';
import * as teamAPI from '~/http/api/team';
import * as playerAPI from '~/http/api/players';
import type {FormationPlayer} from '~/models/Game';
import {useToast} from '~/composables/useToast';
import type {TourStep} from '#nuxt-tour/props';
import {useTourController} from '~/composables/useTourController';
import {useCategoryStore, useSanctumClient, useTeamStore, useTournamentStore} from '#imports';
import {ga4Event} from '~/utils/ga4';

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
  const cloneSteps = () => JSON.parse(JSON.stringify(INIT_STEPS)) as FormSteps;
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
  const steps = ref<FormSteps>(cloneSteps());
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
    errors?: Record<string, string[]> | string[] | string;
    status?: string;
    player_import_batch_id?: number | string;
    batch_id?: number | string;
    id?: number | string;
    message?: string;
    data?: Record<string, any>;
  };

  type PlayerImportBatchStatus = 'queued' | 'processing' | 'completed' | 'completed_with_errors';

  type NormalizedPlayerImportResult = {
    batchId?: number | string;
    status?: string;
    importedCount: number;
    skippedCount: number;
    firstError?: string;
    message?: string;
  };

  const PLAYER_IMPORT_PROCESSING_STATUSES = new Set<PlayerImportBatchStatus>(['queued', 'processing']);
  const PLAYER_IMPORT_TERMINAL_STATUSES = new Set<PlayerImportBatchStatus>(['completed', 'completed_with_errors']);
  const PLAYER_IMPORT_POLL_INTERVAL_MS = 1500;
  const PLAYER_IMPORT_MAX_POLL_ATTEMPTS = 80;

  const toRecord = (value: unknown): Record<string, any> => {
    if (value && typeof value === 'object') {
      return value as Record<string, any>;
    }
    return {};
  };

  const pickFirstDefined = <T>(...values: Array<T | null | undefined>): T | undefined => {
    return values.find((value) => value !== undefined && value !== null) as T | undefined;
  };

  const parseImportCount = (value: unknown): number => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const extractErrorMessages = (value: unknown): string[] => {
    if (typeof value === 'string') {
      return [value];
    }
    if (Array.isArray(value)) {
      return value
        .map((item) => {
          if (typeof item === 'string') {
            return item;
          }
          if (item && typeof item === 'object') {
            const itemRecord = item as Record<string, any>;
            return (itemRecord.message ?? itemRecord.reason) as string | undefined;
          }
          return undefined;
        })
        .filter((item): item is string => typeof item === 'string' && item.length > 0);
    }
    if (value && typeof value === 'object') {
      return Object.values(value as Record<string, unknown>)
        .flatMap((item) => {
          if (typeof item === 'string') {
            return [item];
          }
          if (Array.isArray(item)) {
            return item.filter((entry): entry is string => typeof entry === 'string');
          }
          return [];
        })
        .filter((item) => item.length > 0);
    }
    return [];
  };

  const normalizeImportResult = (payload: unknown): NormalizedPlayerImportResult => {
    const root = toRecord(payload);
    const data = toRecord(root.data);
    const batch = toRecord(
      pickFirstDefined(root.player_import_batch, root.playerImportBatch, data.player_import_batch, data.playerImportBatch)
    );

    const status = pickFirstDefined<string>(root.status, data.status, batch.status);
    const isAsyncCandidate = PLAYER_IMPORT_PROCESSING_STATUSES.has(status as PlayerImportBatchStatus);

    const batchId = pickFirstDefined<number | string>(
      root.player_import_batch_id,
      root.playerImportBatchId,
      root.batch_id,
      data.player_import_batch_id,
      data.playerImportBatchId,
      data.batch_id,
      batch.id,
      isAsyncCandidate ? data.id : undefined,
      isAsyncCandidate ? root.id : undefined
    );

    const importedCount = parseImportCount(pickFirstDefined(root.imported_count, data.imported_count, batch.imported_count));
    const skippedCount = parseImportCount(pickFirstDefined(root.skipped_count, data.skipped_count, batch.skipped_count));
    const errors = extractErrorMessages(pickFirstDefined(root.errors, data.errors, batch.errors));

    return {
      batchId,
      status,
      importedCount,
      skippedCount,
      firstError: errors[0],
      message: pickFirstDefined(root.message, data.message, batch.message),
    };
  };

  const resolveImportSummary = (result: NormalizedPlayerImportResult, fallback: string) => {
    const base = `Importados: ${result.importedCount}. Omitidos: ${result.skippedCount}.`;
    const detail = result.firstError ?? result.message;
    return detail ? `${base} ${detail}` : base || fallback;
  };

  const wait = async (timeMs: number) => {
    await new Promise((resolve) => setTimeout(resolve, timeMs));
  };

  const pollImportBatchStatus = async (batchId: number | string) => {
    const client = useSanctumClient();

    for (let attempt = 0; attempt < PLAYER_IMPORT_MAX_POLL_ATTEMPTS; attempt++) {
      const response = await client<PlayerImportResponse>(`/api/v1/admin/players/import/${batchId}`);
      const result = normalizeImportResult(response);
      const normalizedStatus = result.status as PlayerImportBatchStatus | undefined;

      if (!normalizedStatus || PLAYER_IMPORT_TERMINAL_STATUSES.has(normalizedStatus)) {
        return result;
      }

      if (!PLAYER_IMPORT_PROCESSING_STATUSES.has(normalizedStatus)) {
        return result;
      }

      await wait(PLAYER_IMPORT_POLL_INTERVAL_MS);
    }

    return null;
  };

  const getPlayer = async (id: string) => {
    player.value = null as unknown as Player;
    try {
      const client = useSanctumClient();
      const response = await client<{ data: Player }>(`/api/v1/admin/players/${id}`);
      player.value = response.data;
    } catch (error: any) {
      console.error(error);
      player.value = null as unknown as Player;
    } finally {
    }
  };
  const downloadTemplate = async () => {
    try {
      const client = useSanctumClient();
      loading.value = true;
      const blob = await client<Blob>('/api/v1/admin/players/template');
      parseBlobResponse(blob, 'plantilla de jugadores', 'excel');
    } catch {
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
      throw error;
    }
  };
  const buildEditPayload = () => {
    const basic = playerStoreRequest.value.basic ?? {};
    const details = playerStoreRequest.value.details ?? {};
    const contact = playerStoreRequest.value.contact ?? {};
    const guardian = playerStoreRequest.value.guardian ?? {};

    const payload: Record<string, any> = {
      name: basic.name ?? null,
      last_name: basic.last_name ?? null,
      birthdate: basic.birthdate ?? null,
      nationality: basic.nationality ?? null,
      team_id: basic.team_id ?? null,
      category_id: basic.category_id ?? null,
      curp: basic.curp ?? null,
      is_minor: basic.is_minor ?? null,
      position_id: details.position_id ?? null,
      number: details.number ?? null,
      height: details.height ?? null,
      weight: details.weight ?? null,
      dominant_foot: details.dominant_foot ?? null,
      medical_notes: details.medical_notes ?? null,
      email: contact.email ?? null,
      phone: contact.phone ?? null,
      notes: contact.notes ?? null,
      iso_code: contact.iso_code ?? null,
      guardian: {
        name: guardian.name ?? null,
        email: guardian.email ?? null,
        phone: guardian.phone ?? null,
        relationship: guardian.relationship ?? null,
      },
    };

    return payload;
  };
  const updatePlayerFromForm = async () => {
    if (!playerId.value) {
      return null;
    }
    const payload = buildEditPayload();
    return await updatePlayer(playerId.value, payload);
  };
  const openPlayerEdition = async (id: number) => {
    await getPlayer(String(id));
    const playerData = player.value as any;
    if (!playerData?.id) {
      return;
    }

    playerId.value = Number(playerData.id);
    isEdition.value = true;
    steps.value.current = 'basic-info';
    steps.value.steps['contact-info'].next_label = 'Guardar cambios';
    playerStoreRequest.value = {
      basic: {
        id: playerData.id,
        name: playerData.name ?? '',
        last_name: playerData.last_name ?? null,
        birthdate: playerData.birthdate ?? null,
        nationality: playerData.nationality ?? null,
        image: playerData.image ?? playerData.user?.image ?? '',
        team_id: playerData.team?.id ?? null,
        category_id: playerData.category?.id ?? playerData.team?.category?.id ?? null,
        curp: playerData.curp ?? null,
        is_minor: playerData.is_minor ?? null,
      },
      details: {
        position_id: playerData.position?.id ?? null,
        number: playerData.number ?? null,
        height: playerData.height ?? null,
        weight: playerData.weight ?? null,
        dominant_foot: playerData.dominant_foot ?? null,
        medical_notes: playerData.medical_notes ?? null,
      },
      contact: {
        email: playerData.email ?? null,
        phone: playerData.phone ?? null,
        notes: playerData.notes ?? null,
        iso_code: playerData.iso_code ?? null,
      },
      guardian: {
        name: playerData.guardian?.name ?? null,
        email: playerData.guardian?.email ?? null,
        phone: playerData.guardian?.phone ?? null,
        relationship: playerData.guardian?.relationship ?? null,
      },
    };
    dialog.value = true;
  };
  const createPlayer = async () => {
    const form = prepareForm(playerStoreRequest);
    const client = useSanctumClient();
    //@ts-ignore
    const isPreRegister = useRoute().name === 'equipos-equipo-jugadores-inscripcion';
    const url = isPreRegister
      ? `/api/v1/public/teams/${playerStoreRequest.value.basic.team_id}/pre-register-player`
      : '/api/v1/admin/players';
    try {
      await client(url, {
        method: 'POST',
        body: form,
      });
      toast({
        type: 'success',
        msg: 'Jugador creado',
        description: 'El nuevo jugadores se ha agregado exitosamente.',
      });
      dialog.value = false;
      if (!isPreRegister) {
        await getPlayers();
      }
      return true;
    } catch (error: any) {
      return false;
    }
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
  const importPlayersHandler = async (file: File, teamId?: number | null) => {
    isImporting.value = true;
    const client = useSanctumClient();
    const formData = new FormData();
    if (typeof teamId === 'number' && Number.isFinite(teamId)) {
      formData.append('team_id', teamId.toString());
    }
    formData.append('file', file);
    try {
      const response = await client<PlayerImportResponse>('/api/v1/admin/players/import', {
        method: 'POST',
        body: formData,
      });
      const importResult = normalizeImportResult(response);
      const status = importResult.status as PlayerImportBatchStatus | undefined;
      const shouldPollBatch = importResult.batchId !== undefined && (!status || PLAYER_IMPORT_PROCESSING_STATUSES.has(status));

      if (shouldPollBatch) {
        importModal.value = false;
        toast({
          type: 'info',
          msg: 'Importación en proceso',
          description: 'Estamos procesando el archivo en segundo plano.',
        });

        isImporting.value = false;

        const finalResult = await pollImportBatchStatus(importResult.batchId);

        if (!finalResult) {
          toast({
            type: 'warning',
            msg: 'Importación en proceso',
            description: 'La importación sigue ejecutándose. Actualiza la lista en unos segundos.',
          });
          return;
        }

        const finalStatus = finalResult.status as PlayerImportBatchStatus | undefined;

        if (finalStatus === 'completed_with_errors') {
          toast({
            type: 'warning',
            msg: 'Importación finalizada con observaciones',
            description: resolveImportSummary(finalResult, 'Se completó la importación con errores.'),
          });
        } else {
          toast({
            type: 'success',
            msg: 'Jugadores importados',
            description: resolveImportSummary(finalResult, 'La importación de jugadores finalizó.'),
          });
        }

        ga4Event('players_bulk_imported', {
          tournament_id: useTeamStore().team?.tournament_id ?? useTournamentStore().tournamentId?.value ?? null,
          players_count: finalResult.importedCount,
        });
        await getPlayers();
        return;
      }

      if (status === 'completed_with_errors') {
        toast({
          type: 'warning',
          msg: 'Importación finalizada con observaciones',
          description: resolveImportSummary(importResult, 'Se completó la importación con errores.'),
        });
      } else {
        toast({
          type: 'success',
          msg: 'Jugadores importados',
          description: resolveImportSummary(importResult, 'La importación de jugadores finalizó.'),
        });
      }
      ga4Event('players_bulk_imported', {
        tournament_id: useTeamStore().team?.tournament_id ?? useTournamentStore().tournamentId?.value ?? null,
        players_count: importResult.importedCount,
      });
      importModal.value = false;
      await getPlayers();
    } catch (error: any) {
      const firstValidationError = Object.values(error?.data?.errors ?? {})
        .flat()
        .find((message) => typeof message === 'string') as string | undefined;

      toast({
        type: 'error',
        msg: 'No se pudieron importar los jugadores',
        description:
          firstValidationError ?? error?.data?.message ?? 'Verifica el archivo y vuelve a intentarlo.',
      });
      console.error(error?.data?.errors ?? error);
    } finally {
      isImporting.value = false;
    }
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
      throw error;
    }
  };

  const uploadVerification = async (playerId: number, document: File, photo?: File | null) => {
    try {
      await playerAPI.uploadPlayerVerification(playerId, document, photo);
      toast({
        type: 'success',
        msg: 'Documentos cargados',
        description: 'La verificación fue enviada correctamente.',
      });
    } catch (error: any) {
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
    steps.value = cloneSteps();
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
    tourSteps: skipHydrate(tourSteps),
    $storeReset,
    updatePlayer,
    updatePlayerFromForm,
    openPlayerEdition,
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
