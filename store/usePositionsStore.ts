import { defineStore } from "pinia";
import type { Position } from "~/models/Position";

export const usePositionsStore = defineStore("positionsStore", () => {
  const positions = ref([] as Position[]);

  const fetchPositions = async () => {
    const client = useSanctumClient();
    positions.value = await client("api/v1/admin/positions");
  };
  onMounted(fetchPositions);
  return {
    positions,
  };
});
