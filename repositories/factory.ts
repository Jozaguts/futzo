import {$Fetch} from "ofetch";
import {useRuntimeConfig} from "#app";

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
    }) as T;
  }

  protected async csrf() {
    return await this.$fetch(useRuntimeConfig().public.baseURLBackend +'/sanctum/csrf-cookie',{credentials: 'include', method: 'GET'});
  }

}

export default HttpFactory;
