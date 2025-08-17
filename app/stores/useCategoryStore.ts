import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('categoryStore', () => {
  const categories = ref([]);
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
