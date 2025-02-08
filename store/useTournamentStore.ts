import {defineStore} from "pinia";
import type {
    CalendarStepsForm,
    CalendarStoreRequest,
    FormSteps,
    Tournament,
    TournamentForm,
    TournamentLocation,
    TournamentLocationStoreRequest,
    TournamentStoreRequest,
} from "~/models/tournament";
import type {Game} from "~/models/Game";
import type {User} from "~/models/user";
import prepareForm from "~/utils/prepareFormData";
import type {IPagination} from "~/interfaces";
import type {
    FootballType,
    Format,
    FormEliminationPhaseStep,
    FormGeneralScheduleRequest,
    FormLocationAvailabilityStep,
    FormRegularPhaseStep,
    Schedule,
    ScheduleSettings,
    ScheduleStoreRequest
} from "~/models/Schedule";
import type {Ref} from "vue";

export const useTournamentStore = defineStore("tournamentStore", () => {
    const tournament = ref<Tournament | null>(null);
    const tournaments = ref<Tournament[]>([]);
    const noTournaments = computed(() => !tournaments.value.length);
    const search = ref("");
    const calendarDialog = ref(false);
    const tournamentStoreRequest = ref({} as TournamentStoreRequest);
    const calendarStoreRequest = ref({} as CalendarStoreRequest);
    const steps = ref<FormSteps>({
        current: "basic-info",
        steps: [
            {
                step: "basic-info",
                completed: false,
                label: "Crea un torneo",
            },
            {
                step: "details-info",
                completed: false,
                label: "Detalles del torneo",
            },
        ],
    });
    const calendarSteps = ref<CalendarStepsForm>({
        current: "general",
        steps: [
            {
                step: "general",
                completed: false,
                label: "General",
            },
            {
                step: "regular",
                completed: false,
                label: "Fase Regular",
            },
            {
                step: "elimination",
                completed: false,
                label: "Fase de Eliminación",
            },
        ],
    });
    const nextGames = ref<Game[]>([
        {
            id: 1,
            away: {
                name: "Cruz azul",
                img: "https://ui-avatars.com/api/?name=Cruz azul",
            },
            home: {
                name: "Santos",
                img: "https://ui-avatars.com/api/?name=Santos",
            },
            result: null,
            schedule: {
                day: "Sab. 9/3",
                hour: "19:00",
            },
        },
        {
            id: 2,
            away: {
                name: "Cruz azul",
                img: "https://ui-avatars.com/api/?name=Cruz azul",
            },
            home: {
                name: "Santos",
                img: "https://ui-avatars.com/api/?name=Santos",
            },
            result: "1-0",
            schedule: {
                day: "Sab. 9/3",
                hour: "19:00",
            },
        },
        {
            id: 3,
            away: {
                name: "Cruz azul",
                img: "https://ui-avatars.com/api/?name=Cruz azul",
            },
            home: {
                name: "Santos",
                img: "https://ui-avatars.com/api/?name=Santos",
            },
            result: "1-0",
            schedule: {
                day: "Sab. 9/3",
                hour: "19:00",
            },
        },
        {
            id: 4,
            away: {
                name: "Cruz azul",
                img: "https://ui-avatars.com/api/?name=Cruz azul",
            },
            home: {
                name: "Santos",
                img: "https://ui-avatars.com/api/?name=Santos",
            },
            result: "1-0",
            schedule: {
                day: "Sab. 9/3",
                hour: "19:00",
            },
        },
        {
            id: 5,
            away: {
                name: "Cruz azul",
                img: "https://ui-avatars.com/api/?name=Cruz azul",
            },
            home: {
                name: "Santos",
                img: "https://ui-avatars.com/api/?name=Santos",
            },
            result: "1-0",
            schedule: {
                day: "Sab. 9/3",
                hour: "19:00",
            },
        },
        {
            id: 6,
            away: {
                name: "Cruz azul",
                img: "https://ui-avatars.com/api/?name=Cruz azul",
            },
            home: {
                name: "Santos",
                img: "https://ui-avatars.com/api/?name=Santos",
            },
            result: "1-0",
            schedule: {
                day: "Sab. 9/3",
                hour: "19:00",
            },
        },
        {
            id: 7,
            away: {
                name: "Cruz azul",
                img: "https://ui-avatars.com/api/?name=Cruz azul",
            },
            home: {
                name: "Santos",
                img: "https://ui-avatars.com/api/?name=Santos",
            },
            result: "1-0",
            schedule: {
                day: "Sab. 9/3",
                hour: "19:00",
            },
        },
        {
            id: 8,
            away: {
                name: "Cruz azul",
                img: "https://ui-avatars.com/api/?name=Cruz azul",
            },
            home: {
                name: "Santos",
                img: "https://ui-avatars.com/api/?name=Santos",
            },
            result: "1-0",
            schedule: {
                day: "Sab. 9/3",
                hour: "19:00",
            },
        },
        {
            id: 9,
            away: {
                name: "Cruz azul",
                img: "https://ui-avatars.com/api/?name=Cruz azul",
            },
            home: {
                name: "Santos",
                img: "https://ui-avatars.com/api/?name=Santos",
            },
            result: "1-0",
            schedule: {
                day: "Sab. 9/3",
                hour: "19:00",
            },
        },
        {
            id: 10,
            away: {
                name: "Cruz azul",
                img: "https://ui-avatars.com/api/?name=Cruz azul",
            },
            home: {
                name: "Santos",
                img: "https://ui-avatars.com/api/?name=Santos",
            },
            result: "1-0",
            schedule: {
                day: "Sab. 9/3",
                hour: "19:00",
            },
        },
    ]);
    const currentGames = ref<Game[]>([
        {
            id: 1,
            away: {
                name: "Chivas",
                img: "https://ui-avatars.com/api/?name=Cruz azul",
            },
            home: {
                name: "Monterrey",
                img: "https://ui-avatars.com/api/?name=Santos",
            },
            result: null,
            schedule: {
                day: "Sab. 9/3",
                hour: "19:00",
            },
        },
        {
            id: 2,
            away: {
                name: "Pachuca",
                img: "https://ui-avatars.com/api/?name=Cruz azul",
            },
            home: {
                name: "Tigres",
                img: "https://ui-avatars.com/api/?name=Santos",
            },
            result: "1-0",
            schedule: {
                day: "Sab. 9/3",
                hour: "19:00",
            },
        },
        {
            id: 3,
            away: {
                name: "Santos",
                img: "https://ui-avatars.com/api/?name=Cruz azul",
            },
            home: {
                name: "America",
                img: "https://ui-avatars.com/api/?name=Santos",
            },
            result: "1-0",
            schedule: {
                day: "Sab. 9/3",
                hour: "19:00",
            },
        },
        {
            id: 4,
            away: {
                name: "Santos",
                img: "https://ui-avatars.com/api/?name=Cruz azul",
            },
            home: {
                name: "America",
                img: "https://ui-avatars.com/api/?name=Santos",
            },
            result: "1-0",
            schedule: {
                day: "Sab. 9/3",
                hour: "19:00",
            },
        },
        {
            id: 5,
            away: {
                name: "Santos",
                img: "https://ui-avatars.com/api/?name=Cruz azul",
            },
            home: {
                name: "America",
                img: "https://ui-avatars.com/api/?name=Santos",
            },
            result: "1-0",
            schedule: {
                day: "Sab. 9/3",
                hour: "19:00",
            },
        },
        {
            id: 6,
            away: {
                name: "Santos",
                img: "https://ui-avatars.com/api/?name=Cruz azul",
            },
            home: {
                name: "America",
                img: "https://ui-avatars.com/api/?name=Santos",
            },
            result: "1-0",
            schedule: {
                day: "Sab. 9/3",
                hour: "19:00",
            },
        },
    ]);
    const categories = ref([]);
    const teamsCount = ref(0);
    const roundsCount = ref(0);
    const matchesCount = ref(0);
    const matchesByRound = ref(0);
    const loading = ref(false);
    const tournamentTypes = ref();
    const dialog = ref(false);
    const isEdition = ref(false);
    const isCalendarEdition = ref(false);
    const tournamentId = ref<number | null>(null);
    const tournamentToEdit = ref({} as TournamentForm);
    const pagination = ref<IPagination>({
        currentPage: 1,
        perPage: 10,
        lastPage: 1,
        total: 0,
        sort: "asc",
    });
    const tournamentLocations = ref<TournamentLocation[]>(
        [] as TournamentLocation[],
    );
    const tournamentLocationStoreRequest = ref<TournamentLocationStoreRequest>();
    const selectedLocations = ref<TournamentLocation[]>([]);
    const selectedLocationsHasError = ref(false);
    const isLoadingSchedules = ref(false);
    const schedules = ref<Schedule[]>([]);
    const noSchedules = computed(() => schedules.value.length === 0);
    const scheduleDialog = ref(false)
    const scheduleStoreRequest = ref<ScheduleStoreRequest>({
        general: {} as FormGeneralScheduleRequest,
        regular_phase: {} as FormRegularPhaseStep,
        elimination_phase: {} as FormEliminationPhaseStep,
        locations_availability: {} as FormLocationAvailabilityStep[],
    });
    const scheduleSettings = ref<ScheduleSettings>({
        start_date: new Date(),
        end_date: null,
        game_time: 0,
        min_teams: 0,
        max_teams: 0,
        time_between_games: 0,
        teams: 0,
        format: {} as Format,
        footballType: {} as FootballType,
        locations: [],
        tiebreakers: [],
        phases: []
    });

    const settingsSchedule = async () => {
        const client = useSanctumClient();
        const {data} = await useAsyncData<ScheduleSettings>('tournament-settings', () =>
            client(
                `api/v1/admin/tournaments/${tournamentId.value}/schedule/settings`,
            )
        ) as { data: Ref<ScheduleSettings> };
        const generalSchedule = {} as FormGeneralScheduleRequest
        generalSchedule.tournament_id = tournamentId.value as number;
        generalSchedule.tournament_format_id = data.value.format.id;
        generalSchedule.football_type_id = data.value.footballType.id;
        generalSchedule.start_date = data.value.start_date;
        generalSchedule.game_time = data.value.game_time;
        generalSchedule.time_between_games = data.value.time_between_games;
        generalSchedule.locations = data.value.locations;
        scheduleStoreRequest.value = {
            general: generalSchedule,
        }
        scheduleSettings.value = data.value;
    };
    const fetchSchedule = async () => {
        isLoadingSchedules.value = true;
        const client = useSanctumClient();
        const {tournamentId} = useTournamentStore();
        schedules.value = await client(`/api/v1/admin/tournaments/${tournamentId}/schedule`)
            .finally(() => {
                    isLoadingSchedules.value = false;
                }
            );
    };

    function $reset() {
        tournamentStoreRequest.value = {} as TournamentStoreRequest;
        steps.value.current = "basic-info";
        steps.value.steps.map((step) => (step.completed = false));
        isEdition.value = false;
        tournamentId.value = null;
    }

    async function loadTournaments() {
        loading.value = true;
        const client = useSanctumClient();
        await client(
            `/api/v1/admin/tournaments?per_page=${pagination.value.perPage}&page=${pagination.value.currentPage}`,
        )
            .then(({data, pagination: _pagination}) => {
                tournaments.value = data || [];
                pagination.value = {...pagination.value, ..._pagination};
            })
            .finally(() => (loading.value = false));
    }

    async function storeTournament() {
        const form = prepareForm(tournamentStoreRequest);
        return await useSanctumClient()("api/v1/admin/tournaments", {
            method: "POST",
            body: form,
        })
            .then(async (response) => {
                await loadTournaments();
                useToast().toast(
                    "success",
                    "Torneo Creado",
                    "El nuevo torneo se ha creado exitosamente.",
                );
                dialog.value = false;
                $reset();
                return response;
            })
            .catch(() => {
                useToast().toast(
                    "error",
                    "Error al Crear Torneo",
                    "No se pudo crear el torneo. Por favor, intenta nuevamente.",
                );
            });
    }

    async function updateTournament() {
        const form = prepareForm(tournamentStoreRequest);
        return await useSanctumClient()(
            `api/v1/admin/tournaments/${tournamentId}`,
            {
                method: "PUT",
                body: form,
            },
        )
            .then(async (response) => {
                return response;
            })
            .catch((error) => {
                console.log({error});
            });
    }

    async function fetchTournamentsByLeagueId() {
        const client = useSanctumClient();
        const user = useSanctumUser<User>();
        const {data} = await client(
            `/api/v1/admin/leagues/${user.value?.league?.id}/tournaments`,
        );
        tournaments.value = data || [];
        // todo revisar la manera en la que contamos el teamCount y machesByRound
        // creo debería ser un computed que se actualice cuando cambie el valor de tournaments

        // console.log({tournaments:tournaments.value })
        // teamsCount.value = data.teams_count || 0;
        // const test = teamsCount.value / 2 ;
        // matchesByRound.value = teamsCount.value / 2 ;

        // console.log( matchesByRound.value, 2222222)
    }

    async function updateTournamentStatus(tournamentId: number, status: string) {
        const client = useSanctumClient();
        await client(`api/v1/admin/tournaments/${tournamentId}/status`, {
            method: "PUT",
            body: {status},
        }).then(async () => {
            await loadTournaments();
        });
    }

    async function markAsCompleted() {
        const client = useSanctumClient();

        return await client(
            `api/v1/admin/tournaments/${tournamentId.value}/mark-as-completed`,
            {
                method: "PUT",
                body: {tournament_id: tournamentId.value},
            },
        );
    }

    const getTournamentLocations = async () => {
        const client = useSanctumClient();
        client(`/api/v1/admin/tournaments/${tournamentId.value}/locations`).then(
            (data) => {
                tournamentLocations.value = data;
            },
        );
    };
    const storeTournamentLocation = async () => {
        const client = useSanctumClient();
        await client(`/api/v1/admin/tournaments/${tournamentId.value}/locations`, {
            method: "POST",
            body: tournamentLocationStoreRequest.value,
        }).then(async () => {
            useToast().toast(
                "success",
                "Ubicación del torneo",
                "La Ubicación del torneo ha sido agregada correctamente.",
            );
            await getTournamentLocations();
        });
    };

    return {
        scheduleStoreRequest,
        tournaments,
        tournament,
        nextGames,
        categories,
        currentGames,
        teamsCount,
        roundsCount,
        matchesCount,
        matchesByRound,
        loading,
        tournamentTypes,
        dialog,
        isEdition,
        tournamentId,
        tournamentToEdit,
        updateTournamentStatus,
        pagination,
        markAsCompleted,
        noTournaments,
        search,
        steps,
        tournamentStoreRequest,
        calendarDialog,
        calendarSteps,
        calendarStoreRequest,
        isCalendarEdition,
        tournamentLocations,
        tournamentLocationStoreRequest,
        selectedLocations,
        selectedLocationsHasError,
        isLoadingSchedules,
        schedules,
        noSchedules,
        scheduleDialog,
        scheduleSettings,
        fetchSchedule,
        getTournamentLocations,
        settingsSchedule,
        loadTournaments,
        storeTournament,
        fetchTournamentsByLeagueId,
        $reset,
        updateTournament,
        storeTournamentLocation,
    };
});
