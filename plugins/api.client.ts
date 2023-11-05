import {defineNuxtPlugin} from '#app';
import {AuthModule} from "~/repositories/modules/auth";
import {AdminModule} from "~/repositories/modules/admin";
import { IApiInstance} from "~/interfaces";
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

  const modules: { auth: AuthModule; admin: AdminModule } = {
    auth: new AuthModule(apiFetcher),
    admin: new AdminModule(apiFetcher),
      }

  return {
    provide: {
      api: modules,
    }
  }

});
