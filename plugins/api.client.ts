import {defineNuxtPlugin} from '#app';
import {AuthModule} from "~/repositories/modules/auth";
import {IApiInstance} from "~/interfaces";
import {FetchContext, FetchOptions} from "ofetch/dist/node";
import Cookies from "js-cookie";
import {$fetch } from 'ofetch'
export default defineNuxtPlugin((nuxtApp) => {

  const fetchOption: FetchOptions = {
    baseURL: nuxtApp.$config.public.baseURLBackend,
    credentials: 'include',
    // @ts-ignore
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
    },
    onRequest(context: FetchContext): Promise<void> | void  {
      // @ts-ignore
      context.options.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')

    },
    onResponse(context: FetchContext): Promise<void> | void {
    },
    onRequestError(context: FetchContext): Promise<void> | void {
    },
    onResponseError(context: FetchContext): Promise<void> | void {

    },
  }

  const apiFetcher =  $fetch.create(fetchOption);

  const modules: IApiInstance = {
    auth: new AuthModule(apiFetcher),
  }

  return {
    provide: {
      api: modules
    }
  }

});
