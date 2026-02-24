import * as playerAPI from "~/http/api/players";
import type {Tag} from "~/types/shared";
export const usePlayerTags = defineStore('playerTags', ()=>{
    const playersTags = ref<string[]>(['Foraneo', 'Local'])
    const draftTag = ref<string>('')
    const loading = ref(false);
    const getPlayersTags = async () =>{
        playersTags.value =  await playerAPI.getPlayerTags()
    }
    return {
        getPlayersTags,
        draftTag,
        loading,
        playersTags,
    }
})