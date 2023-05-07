import {defineStore, skipHydrate} from "pinia";

export const useGlobalStore = defineStore('global', () => {
  const isLoading = ref(true)
  return { isLoading }
})
