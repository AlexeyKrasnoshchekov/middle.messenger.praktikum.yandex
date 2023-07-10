import router from '../utils/router';
import { AuthAPI, ILoginData, IRegisterData } from '../api/AuthAPI';
import store from '../utils/store';

class AuthController {
  private api = new AuthAPI();

  async signin(data: ILoginData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();
      console.log('333',store.getState());
      router.go('/profile');
    } catch (error) {
      if (error.reason === 'User already in system') {
        router.go('/profile');
      }
      console.log(error);
    }
  }

  async signup(data: IRegisterData) {
    try {
      console.log('data111', data);
      await this.api.signup(data);

      router.go('/profile');
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    console.log('logout');
    try {
      await this.api.logout();

      store.set('user', undefined);

      router.go('/login');
    } catch (error) {
      console.log(error);
    }
  }

  async fetchUser() {
    const user = await this.api.getUser();
    console.log('user11', user);
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
