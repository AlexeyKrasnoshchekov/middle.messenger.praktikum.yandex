import API from './api';

export interface IUserData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface IPasswordData {
  oldPassword: string;
  newPassword: string;
}

export class UserAPI extends API {
  constructor() {
    super('/user');
  }

  changeProfile(data: IUserData): Promise<unknown> {
    const options = {
      data,
    };
    return this.http.put('/profile', options);
  }

  changePassword(data: IPasswordData): Promise<unknown> {
    const options = {
      data,
    };
    return this.http.put('/password', options);
  }

  getUser(id:string): Promise<IUserData> {
    return this.http.get(`?id=${id}`);
  }

  searchUser(login:string): Promise<IUserData> {
    const data = { login };
    const options = {
      data,
    };
    return this.http.post('/search', options);
  }

  changeAvatar(data: FormData): Promise<unknown> {
    const options = {
      data,
    };
    return this.http.put('/profile/avatar', options);
  }
}
