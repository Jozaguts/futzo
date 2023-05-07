import {defineNuxtPlugin} from '#app';
import {AuthModule} from "~/repositories/modules/auth";
import { IApiInstance} from "~/interfaces";
import { FetchOptions} from "ofetch/dist/node";
import Cookies from "js-cookie";
import {$fetch } from 'ofetch'
export default defineNuxtPlugin((nuxtApp) => {
  const fetchOption = (): FetchOptions => {
    return {
      baseURL: nuxtApp.$config.public.baseURLBackend,
      credentials: 'include',
      // @ts-ignore
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
        'Authorization': 'Bearer ' + useCookie('XSRF-TOKEN').value,
      },
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
