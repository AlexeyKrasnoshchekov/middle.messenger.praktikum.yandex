import template from './login.hbs';
import Block from '../../utils/block';
import { errorMessage, TestLogin, TestPassword } from '../../utils/ui';
import AuthController from '../../controllers/AuthController';
import Input from '../../components/input';
import Link from '../../components/link';
import Button from '../../components/button';

class LoginPage extends Block {
  constructor() {
    super('main', {});
    this.getContent()?.classList.add('page_login');
  }

  init() {
    this.children.link = new Link({
      href: '/signin',
      label: 'Нет аккаунта?',
    });
    this.children.button = new Button({
      label: 'Войти',
      view: 'form',
      events: {
        click: () => this.onSubmit(),
      },
    });
    this.children.login = new Input({
      placeholder: 'enter login',
      type: 'text',
      class: 'form_input',
      id: 'login',
      name: 'login',
      required: true,
      events: {
        input: (e) => {
          e.preventDefault();
          console.log('typed');
        },
        focusout: () => {
          const input = this.children.login;
          const inputHTML = (input as Input).getHTMLElement();
          const { value } = inputHTML;
          const valid = value.length > 0 && TestLogin(value);

          if (!valid) {
            if (value.length > 0) {
              errorMessage(inputHTML, 'Логин не соответсвует требованиям');
            }
          }
        },
      },
    });
    this.children.password = new Input({
      placeholder: 'enter password',
      type: 'text',
      class: 'form_input',
      id: 'password',
      name: 'password',
      required: true,
      events: {
        input: (e) => {
          e.preventDefault();
          console.log('typed');
        },
      },
    });
  }

  onSubmit() {
    const values = Object
      .values(this.children)
      .filter((child) => child instanceof Input)
      .map((child) => ([(child as Input).getName(), (child as Input).getValue()]));

    const data = Object.fromEntries(values);

    if (
      TestLogin(data.login!.toString())
    && TestPassword(data.password!.toString())
    ) {
      AuthController.signin(data);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, {});
  }
}

export default LoginPage;
