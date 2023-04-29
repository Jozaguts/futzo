import {defineStore} from "pinia";

export const useLoaderStore = defineStore('loader', () => {
  const isLoading = ref(true)

  return { isLoading }
})
