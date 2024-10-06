import { defineStore } from "pinia";
import type { FormSteps, Player, PlayerStoreRequest } from "~/models/player";
import { toast } from "vuetify-sonner";

export const usePlayerStore = defineStore("playerStore", () => {
  const players = ref<Player[]>([]);
  const dialog = ref<boolean>(false);
  const search = ref<string>("");
  const isEdition = ref<boolean>(false);
  const noPlayers = computed(() => players.value.length === 0);
  const playerStoreRequest = ref({} as PlayerStoreRequest);
  const updatePlayer = async (id: number) => {
    console.log(id);
  };
  const createPlayer = async () => {
    const form = prepareForm();
    const client = useSanctumClient();
    await client("/api/v1/admin/players", {
      method: "POST",
      body: form,
    })
      .then(async () => {
        toast.success("Jugador creado");
        dialog.value = false;
      })
      .catch((error) => {
        console.error(error.data?.errors);

        toast.error(error.data?.message ?? "Error al crear Jugador");
      });
  };
  const steps = ref<FormSteps>({
    current: "basic-info",
    completed: [],
  });
  const prepareForm = (): FormData => {
    const form = new FormData();
    const appendData = (prefix: string, data: any) => {
      for (const key in data) {
        if (data[key] instanceof File) {
          form.append(`${prefix}[${key}]`, data[key]);
        } else {
          form.append(`${prefix}[${key}]`, data[key]);
        }
      }
    };

    for (const key in playerStoreRequest.value) {
      const data = playerStoreRequest.value[key];
      appendData(key, data);
    }

    return form;
  };
  return {
    players,
    dialog,
    search,
    noPlayers,
    isEdition,
    steps,
    playerStoreRequest,
    updatePlayer,
    createPlayer,
  };
});
