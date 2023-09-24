import {$Fetch, FetchContext, FetchResponse} from "ofetch";
import {useLocalStorage} from "@vueuse/core";
import Cookies from "js-cookie";

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
        'Authorization': 'Bearer ' + useLocalStorage('token',null).value,
      },

      onResponse: async (response) => {
      },
      onResponseError(context: FetchContext & { response: FetchResponse<R> }): Promise<void> | void {
      }
    }) as T;
  }

}

export default HttpFactory;
