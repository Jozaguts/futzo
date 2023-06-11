import {$Fetch} from "ofetch";
import {useRuntimeConfig} from "#app";
import Cookies from "js-cookie";
import {useLocalStorage} from "@vueuse/core";

class HttpFactory  {
  private readonly $fetch: $Fetch;
  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  async call<T>(method: string, url: string, data?: object, extras = {}): Promise<T> {
    return await this.$fetch(url, {
      method,
      body: data,
      // @ts-ignore
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + useLocalStorage('futzo_token',null).value ,
      },
      ...extras,
      }) as T;
  }

}

export default HttpFactory;
