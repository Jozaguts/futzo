import HttpFactory from "~/repositories/factory";
import {Auth} from "~/interfaces";
export class AuthModule extends HttpFactory {
  async register(data: any) {
    return await this.call('POST','/register', data);
  }
  async login(data: any) {
    useState<Auth>('futzo_auth', () => {
      return {
        user: null,
        loggedIn: false,
        token: null
      }
    })
    await this.csrf()
    return await this.call('POST','/login', data);
  }
  async user () {
    const data =  await this.call('GET','/api/v1/user');
    if (data){
     const auth =  useState<Auth>(`futzo_auth`)
      auth.value.loggedIn = true
      auth.value.user = data

    }
  }
  async logout () {
    await this.call('POST','/logout');
    const auth =  useState<Auth>('futzo_auth')
    auth.value.loggedIn = false
    auth.value.user = null
    useCookie('XSRF-TOKEN').value  = null
    useCookie('futzo_session').value  = null
    navigateTo('/login')
  }
}
