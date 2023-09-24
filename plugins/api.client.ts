import {defineNuxtPlugin} from '#app';
import {AuthModule} from "~/repositories/modules/auth";
import { IApiInstance} from "~/interfaces";
import { FetchOptions} from "ofetch/dist/node";
import Cookies from "js-cookie";
import {$fetch } from 'ofetch'
import {useLocalStorage} from "@vueuse/core";
export default defineNuxtPlugin((nuxtApp) => {
  const config = nuxtApp.$config.public
  const fetchOption = (): { headers: { Authorization: string; Accept: string }; baseURL: string; credentials: string } => {
    let headers = {}
    const token =  useLocalStorage('token',null).value
    if (token){
      headers = {
        'Authorization': `Bearer ${token}`,
      }
    }
    // @ts-ignore
    return {
      baseURL: `${config.baseURLBackend}/${config.backendPrefix}`,
        headers: {
          ...headers
        }
    }
  }

  const apiFetcher =  $fetch.create(fetchOption());

  const modules: IApiInstance = {
    auth: new AuthModule(apiFetcher),
      }

  return {
    provide: {
      api: modules,
    }
  }

});
