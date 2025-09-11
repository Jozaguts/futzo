import { defineStore } from 'pinia';
import type { Category } from '~/models/Team';
import type { Format } from '~/models/tournament';

export const useCategoryStore = defineStore('categoryStore', () => {
  const categories = ref<Category[]>([] as Category[]);
  const formats = ref<Format[]>([] as Format[]);
  const fetchCategories = async () => {
    const client = useSanctumClient();
    categories.value = await client('/api/v1/admin/categories');
  };
  const fetchFormats = async () => {
    const client = useSanctumClient();
    formats.value = await client<Format[]>('/api/v1/admin/tournaments/formats');
  };
  return {
    categories,
    formats,
    fetchFormats,
    fetchCategories,
  };
});
