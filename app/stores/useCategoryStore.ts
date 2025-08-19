import { defineStore } from 'pinia';
import type { Category } from '~/models/Team';

export const useCategoryStore = defineStore('categoryStore', () => {
  const categories = ref<Category[]>([] as Category[]);
  const formats = ref([]);
  const fetchCategories = async () => {
    const client = useSanctumClient();
    categories.value = await client('/api/v1/admin/categories');
  };
  const fetchFormats = async () => {
    const client = useSanctumClient();
    formats.value = await client('/api/v1/admin/tournaments/formats');
  };
  // onMounted(async () => {
  //     await fetchCategories()
  //     await fetchFormats()
  // })
  return {
    categories,
    formats,
    fetchFormats,
    fetchCategories,
  };
});
