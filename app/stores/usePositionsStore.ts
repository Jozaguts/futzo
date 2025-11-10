import { defineStore } from 'pinia';
import { onMounted } from 'vue';
import type { Position } from '~/models/Position';

export const usePositionsStore = defineStore('positionsStore', () => {
  const positions = ref<Position[]>([] as Position[]);

  const fetchPositions = async () => {
    const client = useSanctumClient();
    positions.value = await client('api/v1/admin/positions');
  };
  onMounted(async () => {
    if (!positions.value.length) {
      await fetchPositions();
    }
  });
  return {
    positions,
    fetchPositions,
  };
});
