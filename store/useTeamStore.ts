import {defineStore} from "pinia";
import type {FormSteps, Team, TeamResponse, TeamStoreRequest} from "~/models/Team";
import type {IPagination} from "~/interfaces";
import {getTeamBySlug} from "~/http/api/team";
import prepareForm from "~/utils/prepareFormData";

export const useTeamStore = defineStore("teamStore", () => {
    const {toast} = useToast();
    const dialog = ref(false);
    const teams = ref<TeamResponse[]>();
    const team = ref<Team>();
    const teamId = ref(0);
    const search = ref("");
    const importModal = ref(false);
    const pagination = ref<IPagination>({
        currentPage: 1,
        perPage: 10,
        lastPage: 1,
        total: 0,
        sort: "asc",
    });
    const teamStoreRequest = ref<Partial<TeamStoreRequest>>(
        {} as TeamStoreRequest,
    );
    const client = useSanctumClient();
    const steps = ref<FormSteps>({
        current: "createTeam",
        steps: [
            {
                step: "createTeam",
                completed: false,
                label: "Crea un equipo",
            },
            {
                step: "createDt",
                completed: false,
                label: "Crea el DT",
            },
            {
                step: "createOwner",
                completed: false,
                label: "Crea el presidente",
            },
        ],
    });
    const isEdition = ref(false);
    const loading = ref(false);


    const downloadTemplate = async () => {
        loading.value = true;
        await client("/api/v1/admin/teams/template", {
            method: "GET",
            // responseType: "blob",
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "template.xlsx");
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                toast(
                    "error",
                    "Error al descargar la plantilla",
                    error.data?.message ??
                    "No se pudo descargar la plantilla. Inténtalo de nuevo.",
                );
            })
            .finally(() => {
                loading.value = false
            });
    }

    async function importTeamsHandler(file: File, tournamentId: number) {
        const formData = new FormData();
        formData.append("tournament_id", tournamentId.toString());
        formData.append('file', file);

        await client("/api/v1/admin/teams/import", {
            method: "POST",
            body: formData,
        })
            .then(async () => {
                toast(
                    "success",
                    "Equipos Importados",
                    "Los equipos se han importado exitosamente."
                );
                importModal.value = false;
                await getTeams();
            })
            .catch((error) => {
                toast(
                    "error",
                    "Error al importar equipos",
                    error.data?.message ??
                    "No se pudieron importar los equipos. Verifica tu archivo e inténtalo de nuevo."
                );
            });
    }

    const createTeam = async () => {
        let form = prepareForm(teamStoreRequest);

        await client("/api/v1/admin/teams", {
            method: "POST",
            body: form,
        })
            .then(async () => {
                await getTeams();
                toast(
                    "success",
                    "Equipo Creado",
                    "El nuevo equipo se ha creado exitosamente.",
                );

                dialog.value = false;
            })
            .catch((error) => {
                toast(
                    "error",
                    "Error al crear el equipo",
                    error.data?.message ??
                    "No se pudo crear el equipo. Verifica tu información e inténtalo de nuevo.",
                );
            });
    };
    const updateTeam = async (teamId: number) => {
        let form = prepareForm(teamStoreRequest);
        await client(`/api/v1/admin/teams/${teamId}`, {
            method: "PUT",
            body: form,
        })
            .then(async () => {
                await getTeams();
                toast(
                    "success",
                    "Equipo actualizado",
                    "El equipo se ha actualizado exitosamente",
                );
                dialog.value = false;
            })
            .catch((error) => {
                toast(
                    "error",
                    "Error al actualizar el equipo",
                    error.data?.message ??
                    "No se pudo actualizar el equipo. Verifica tu información e inténtalo de nuevo.",
                );
            });
    };
    // const prepareForm = (): FormData => {
    //     let form = new FormData();
    //
    //     for (const key in teamStoreRequest.value) {
    //         if (key === "team") {
    //             for (const keyTeam in teamStoreRequest.value.team) {
    //                 if (teamStoreRequest.value?.team[keyTeam] instanceof File) {
    //                     form.append(
    //                         `team[${keyTeam}]`,
    //                         teamStoreRequest.value.team[keyTeam],
    //                     );
    //                 }
    //                 if (
    //                     (typeof teamStoreRequest.value.team[keyTeam] === "object" &&
    //                         keyTeam === "colors") ||
    //                     keyTeam === "address"
    //                 ) {
    //                     form.append(
    //                         `team[${keyTeam}]`,
    //                         JSON.stringify(teamStoreRequest.value.team[keyTeam]),
    //                     );
    //                 } else {
    //                     form.append(
    //                         `team[${keyTeam}]`,
    //                         teamStoreRequest.value.team[keyTeam],
    //                     );
    //                 }
    //             }
    //         } else if (key === "coach") {
    //             for (const keyCoach in teamStoreRequest.value.coach) {
    //                 if (teamStoreRequest.value.coach[keyCoach] instanceof File) {
    //                     form.append(
    //                         `coach[${keyCoach}]`,
    //                         teamStoreRequest.value.coach[keyCoach],
    //                     );
    //                 } else {
    //                     form.append(
    //                         `coach[${keyCoach}]`,
    //                         teamStoreRequest.value.coach[keyCoach],
    //                     );
    //                 }
    //             }
    //         } else if (key === "president") {
    //             for (const keyPresident in teamStoreRequest.value.president) {
    //                 if (teamStoreRequest.value.president[keyPresident] instanceof File) {
    //                     form.append(
    //                         `president[${keyPresident}]`,
    //                         teamStoreRequest.value.president[keyPresident],
    //                     );
    //                 } else {
    //                     form.append(
    //                         `president[${keyPresident}]`,
    //                         teamStoreRequest.value.president[keyPresident],
    //                     );
    //                 }
    //             }
    //         }
    //     }
    //     return form;
    // };
    const getTeams = async () => {
        try {
            await client(
                `/api/v1/admin/teams?per_page=${pagination.value.perPage}&page=${pagination.value.currentPage}&sort=${pagination.value.sort}`,
            ).then(({data, pagination: _pagination}) => {
                teams.value = data || [];
                pagination.value = {...pagination.value, ..._pagination};
            });
        } catch (error) {
            console.log(error);
        }
    };
    const searchTeams = (value: string = '') => {
        const client = useSanctumClient();
        client(
            `/api/v1/admin/teams/search?value=${value}`,
        ).then(({data, pagination: _pagination}) => {
            teams.value = data || [];
            pagination.value = {...pagination.value, ..._pagination};
        });
    }
    const list = async () => {
        try {
            teams.value = await client("/api/v1/admin/teams/list");
        } catch (error) {
            console.log(error);
        }
    };
    const getBySlug = async (slug: string) => {
        return await getTeamBySlug(slug);
    }
    const getTeam = async (id: number) => {
        try {
            return await client<{ data: TeamStoreRequest }>(
                `/api/v1/admin/teams/${id}`,
            );
        } catch (error) {
            console.log(error);
        }
    };

    return {
        teams,
        team,
        dialog,
        steps,
        isEdition,
        teamStoreRequest,
        teamId,
        pagination,
        search,
        importModal,
        loading,
        createTeam,
        getTeams,
        getTeam,
        updateTeam,
        list,
        importTeamsHandler,
        downloadTemplate,
        searchTeams,
        getBySlug
    };
});
