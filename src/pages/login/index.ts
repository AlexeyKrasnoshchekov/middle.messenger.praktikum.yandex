import template from './login.hbs';
import Block from '../../utils/block';
import Form from '../../components/form/index';
import { TestLogin, TestPassword } from '../../utils/ui';

class LoginPage extends Block {
  constructor() {
    super('main',{});
    this.getContent()?.classList.add('page_login');
  }

  init() {
    this.children.form = new Form({
      view: 'login',
      events: {
        submit: (e:any) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const login = formData.get('login');
          const password = formData.get('password');

          if (TestLogin(login!.toString()) && TestPassword(password!.toString())) {
            console.log('loginData', {
              login,
              password,
            });
          }
        },
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, {});
  }
}

export default LoginPage;
