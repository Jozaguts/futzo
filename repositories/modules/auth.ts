import HttpFactory from "~/repositories/factory";
export class AuthModule extends HttpFactory {

  async register(data: any) {
    return await this.call('POST','/register', data);
  }
  async login(data: any) {
    await this.csrf()
    return await this.call('POST','/login', data);
  }
  async user () {
    return await this.call('GET','/api/v1/user');
  }
  async logout () {
    await this.csrf()
    return await this.call('POST','/logout')
  }
}
