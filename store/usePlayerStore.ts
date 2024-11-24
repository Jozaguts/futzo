import { defineStore } from "pinia";
import type { FormSteps, Player, PlayerStoreRequest } from "~/models/Player";
import prepareForm from "~/utils/prepareFormData";
import type { IPagination } from "~/interfaces";

export const usePlayerStore = defineStore("playerStore", () => {
  const { toast } = useToast();
  const players = ref<Player[]>([]);
  const dialog = ref<boolean>(false);
  const search = ref<string>("");
  const isEdition = ref<boolean>(false);
  const noPlayers = computed(() => players.value.length === 0);
  const playerStoreRequest = ref({} as PlayerStoreRequest);
  const playerId = ref(null);
  const pagination = ref<IPagination>({
    currentPage: 1,
    perPage: 10,
    total: 0,
    lastPage: 1,
    sort: "asc",
  });
  const importModal = ref(false);
  const updatePlayer = async (id: number) => {
    console.log(id);
  };
  const createPlayer = async () => {
    const form = prepareForm(playerStoreRequest);
    const client = useSanctumClient();
    await client("/api/v1/admin/players", {
      method: "POST",
      body: form,
    })
      .then(async () => {
        toast(
          "success",
          "Jugador creado",
          "El nuevo jugador se ha agregado exitosamente.",
        );
        dialog.value = false;
        await getPlayers();
      })
      .catch((error) => {
        console.error(error.data?.errors);

        toast(
          "error",
          "Error al crear al jugador",
          error.data?.message ??
            "No se pudo crear al jugador. Verifica tu información e inténtalo de nuevo.",
        );
      });
  };
  const getPlayers = async () => {
    try {
      const client = useSanctumClient();
      await client(
        `/api/v1/admin/players?per_page=${pagination.value.perPage}&page=${pagination.value.currentPage}&sort=${pagination.value.sort}`,
      ).then(({ data, pagination: _pagination }) => {
        pagination.value = { ...pagination.value, ..._pagination };
        players.value = data;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const importPlayersHandler = async (file: File) => {
    const client = useSanctumClient();
    const formData = new FormData();
    formData.append("file", file);
    await client("/api/v1/admin/players/import", {
      method: "POST",
      body: formData,
    })
      .then(async () => {
        toast(
          "success",
          "Jugadores importados",
          "Los jugadores han sido importados y registrados exitosamente.",
        );
        importModal.value = false;
        await getPlayers();
      })
      .catch((error) => {
        console.error(error.data?.errors);
        toast(
          "error",
          "Error importar",
          error.data?.message ??
            "No se pudo importar el documento. Verifica su información e inténtalo de nuevo.",
        );
      });
  };
  const steps = ref<FormSteps>({
    current: "basic-info",
    steps: [
      { step: "basic-info", completed: false, label: "Información básica" },
      { step: "details-info", completed: false, label: "Detalles del jugador" },
      {
        step: "contact-info",
        completed: false,
        label: "Información de contacto",
      },
    ],
  });

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
    updatePlayer,
    createPlayer,
    getPlayers,
    importPlayersHandler,
  };
});
