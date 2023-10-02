import HttpFactory from "~/repositories/factory";
import {Auth} from "~/interfaces";
import {useAuthStore} from "~/store";

export class AuthModule extends HttpFactory {
  async register(data: any) {
    return await this.call('POST','/register', data);
  }
  async login(data: any) {
    const backedUrl = useRuntimeConfig().public.baseURLBackend
    await this.call('GET',`${backedUrl}/sanctum/csrf-cookie`).catch((e) => {
        console.log(e)
    } );
    return await this.call('POST','/auth/login', data);
  }
  async user () {
    const data =  await this.call('GET','/me');
    if (data){
      useAuthStore().auth.user = data
    }
  }
  async logout () {
    await this.call('POST','/logout').then(() => {
        useAuthStore().destroySession()
    });
  }
  async redirect(provider: string) {
    return await this.call('GET',`/auth/${provider}/redirect`);
  }
  async callback(provider: string = 'facebook', code:string) {
    return await this.call('GET',`/auth/${provider}/callback?code=${code}`);
  }
}
