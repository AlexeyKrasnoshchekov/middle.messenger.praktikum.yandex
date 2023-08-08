import { AuthAPI, ILoginData, IRegisterData } from '../api/AuthAPI';
import router from '../utils/router';
import store from '../utils/store';
import WSController from './WSController';

class AuthController {
  private api = new AuthAPI();

  async signin(data: ILoginData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();
      router.go('/messenger');
    } catch (error) {
      // if (error.reason === 'User already in system') {
      //   router.go('/');
      // }
      console.log(error);
    }
  }

  async signup(data: IRegisterData) {
    try {
      await this.api.signup(data);

      router.go('/messenger');
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    console.log('logout');
    try {
      WSController.closeAll();

      await this.api.logout();

      store.set('user', undefined);
      router.go('/');
    } catch (error) {
      console.log(error);
    }
  }

  async fetchUser() {
    const user = await this.api.getUser();
    store.set('user', user);
    // try {
    //   const user = await this.api.getUser();
    //   console.log('user', user);
    //   store.set('user', user);
    // } catch (error) {
    //   throw error;
    // }
  }
}

export default new AuthController();
