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
      // @ts-ignore
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
        'Authorization': 'Bearer ' + useCookie('XSRF-TOKEN').value,
      },
      ...extras,
      }) as T;
  }

  protected async csrf() {
    await this.$fetch(useRuntimeConfig().public.baseURLBackend +'/sanctum/csrf-cookie',{credentials: 'include'});
  }

}

export default HttpFactory;
