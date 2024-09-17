import { defineStore } from "pinia";
import type { FormSteps, Player, PlayerStoreRequest } from "~/models/player";

export const usePlayerStore = defineStore("playerStore", () => {
  const players = ref<Player[]>([]);
  const dialog = ref<boolean>(false);
  const search = ref<string>("");
  const isEdition = ref<boolean>(false);
  const noPlayers = computed(() => players.value.length === 0);
  const playerStoreRequest = ref<Partial<PlayerStoreRequest>>(
    {} as PlayerStoreRequest,
  );
  const updatePlayer = async () => {};
  const createPlayer = async () => {};
  const steps = ref<FormSteps>({
    current: "basic-info",
    completed: [],
  });
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
