import {defineStore} from "pinia";import {Ref} from "vue";

import { useDisplay } from 'vuetify'

interface IAlertMessage {
    message: string,
    color: string,
    code: string | number,
    type:  "error" | "success" | "warning" | "info" | undefined,
    title: string
}
export const useGlobalStore = defineStore('global', () => {

    const { mobile } = useDisplay()

    const isMobile = computed(() => mobile.value)
    const isLoading = ref(true)
    const alert = ref({} as IAlertMessage)
    const computedAlert = computed(()=> alert)
    const appName = ref(useNuxtApp().$config.public.appName)

    const drawer = ref(false)
    const setAlert = (type ='error', _alert: {message: string, code: number | string}) => {
    switch (type) {
        case 'error':
            alert.value.color = 'error'
            alert.value.title = 'Error'
            break;
        case 'success':
            alert.value.color = 'success'
            alert.value.title = 'Success'
            break;
        case 'warning':
            alert.value.color = 'warning'
            alert.value.title = 'Warning'
            break;
        case 'info':
            alert.value.color = 'info'
            alert.value.title = 'Info'
            break;
        default:
            alert.value.color = 'error'
            alert.value.title = 'Error'
            break;
    }
    alert.value.message = _alert.message
    alert.value.code = _alert.code
  }
  const resetAlert = () => {
    alert.value = {} as IAlertMessage
  }

  return { isLoading, computedAlert, setAlert, resetAlert, drawer,appName, isMobile }
})
