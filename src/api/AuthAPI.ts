import API from './api';

export interface IRegisterData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ILoginData {
  login: string;
  password: string;
}

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export class AuthAPI extends API {
  constructor() {
    super('/auth');
  }

  signin(data: ILoginData) {
    const options = {
      data,
    };
    return this.http.post('/signin', options);
  }

  signup(data: IRegisterData) {
    const options = {
      data,
    };
    return this.http.post('/signup', options);
  }

  logout() {
    return this.http.post('/logout');
  }

  getUser() {
    return this.http.get('/user');
  }
}
