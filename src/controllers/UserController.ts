import { IPasswordData, IUserData, UserAPI } from '../api/UserAPI';

import store from '../utils/store';
import AuthController from './AuthController';

class UserController {
  private api = new UserAPI();

  async changeProfile(data: IUserData) {
    console.log('datata', data);
    try {
      await this.api.changeProfile(data);

      await AuthController.fetchUser();
      store.set('profileView', 'profile');
    } catch (error) {
      console.log(error);
    }
  }

  async changeAvatar(data: FormData) {
    try {
      await this.api.changeAvatar(data);

      await AuthController.fetchUser();
    } catch (error) {
      console.log(error);
    }
  }

  async changePassword(data: IPasswordData) {
    try {
      await this.api.changePassword(data);
      await AuthController.logout();
    } catch (error) {
      console.log(error);
    }
  }

  async searchUser(login: string) {
    const user = await this.api.searchUser(login);

    return user;
  }

  async getUser(id:string) {
    console.log('getUser');
    try {
      const user = await this.api.getUser(id);

      store.set('user', user);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserController();
