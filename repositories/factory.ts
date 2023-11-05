import {$Fetch, FetchContext, FetchResponse} from "ofetch";
import {useLocalStorage} from "@vueuse/core";
import {useAuthStore} from "~/store";

class HttpFactory  {
  private readonly $fetch: $Fetch;
  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  async call<T>(method: string, url: string, data?: object, extras = {}): Promise<T> {
    return await this.$fetch(url, {
      method,
      body: data,
      ...extras,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + useLocalStorage('token',null).value,
      },

      onResponse: async (response) => {
      },
      onResponseError(context: FetchContext & { response: FetchResponse<R> }): Promise<void> | void {
        const HTTP_STATUS_UNAUTHORIZED = 401;
       if(context.response.status  === HTTP_STATUS_UNAUTHORIZED){
           useAuthStore().destroySession()
       }
      }
    }) as T;
  }

}

export default HttpFactory;
