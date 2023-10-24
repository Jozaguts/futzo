import HttpFactory from "~/repositories/factory";
import {Auth, User} from "~/interfaces";

export class AuthModule extends HttpFactory {
  async register(data: any) {
    return await this.call('POST','/auth/register', data);
  }
  async login(data: any) {
    const backedUrl = useRuntimeConfig().public.baseURLBackend
    await this.call('GET',`${backedUrl}/sanctum/csrf-cookie`).catch((e) => {
        console.log(e)
    } );
    return await this.call('POST','/auth/login', data);
  }
  async user () : Promise<User>{
    return await this.call<Promise<User>>('GET','/me');
  }
  async logout () {
    await this.call('POST','/logout');
  }
  async redirect(provider: string) {
    return await this.call('GET',`/auth/${provider}/redirect`);
  }
  async callback(provider: string = 'facebook', code:string) {
    return await this.call('GET',`/auth/${provider}/callback?code=${code}`);
  }
}
