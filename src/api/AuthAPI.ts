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

  signin(data: ILoginData): Promise<XMLHttpRequest> {
    const options = {
      data,
    };
    return this.http.post('/signin', options);
  }

  signup(data: IRegisterData): Promise<XMLHttpRequest> {
    console.log('data222', data);
    const options = {
      data,
    };
    return this.http.post('/signup', options);
  }

  logout(): Promise<XMLHttpRequest> {
    return this.http.post('/logout');
  }

  getUser(): Promise<XMLHttpRequest> {
    return this.http.get('/user');
  }
}
