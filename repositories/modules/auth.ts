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

    return await this.call('POST','/login', data).then(async (data) => {
      useLocalStorage('futzo_token', data?.token as string)
    });
  }
  async loginWithFacebook(data: any) {
    return await this.call('GET','/auth/facebook/redirect');
  }
  async user () {
    const data =  await this.call('GET','/user');
    if (data){
      const auth = useState<Auth>('futzo_auth', () => {
        return {
          user: null,
          loggedIn: false,
          token: null
        }
      })
      auth.value.loggedIn = true
      auth.value.user = data
    }
  }
  async logout () {
    await this.call('POST','/logout');

    useCookie('XSRF-TOKEN').value  = null
    useCookie('futzo_session').value  = null
    const futzo_token = useLocalStorage('futzo_token',null)
    futzo_token.value = null
    let auth =  await useState<Auth>('futzo_auth')
    auth.value.loggedIn = false
    auth.value.user = null

    navigateTo('/login')
  }
}
