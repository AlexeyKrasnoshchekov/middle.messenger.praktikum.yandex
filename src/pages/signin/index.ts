import template from './signin.hbs';
import Block from '../../utils/block';
import {
  delErrorMessage,
  errorMessage,
  TestEmail, TestLogin, TestName, TestPassword, TestPhone,
} from '../../utils/ui';
import Link from '../../components/link';
import Button from '../../components/button';
import Input from '../../components/input';
import AuthController from '../../controllers/AuthController';

class SigninPage extends Block {
  constructor() {
    super('main', {});
    this.element!.classList.add('page_signin');
  }

  init() {
    this.children.link = new Link({
      href: '/messenger',
      label: 'Войти',
    });
    this.children.button = new Button({
      label: 'Зарегистрироваться',
      view: 'form',
      events: {
        click: () => this.onSubmit(),
        // click: () => console.log('signup'),
      },
    });
    this.children.email = new Input({
      placeholder: 'enter email',
      type: 'email',
      class: 'form_input',
      id: 'email',
      name: 'email',
      required: true,
      events: {
        input: (e:InputEvent) => {
          e.preventDefault();
          console.log('typed');
        },
        focusout: () => {
          const input = this.children.email;
          const inputHTML = (input as Input).getHTMLElement();
          const { value } = inputHTML;
          console.log('value', value);

          const valid = value.length > 0 && TestEmail(value);

          if (!valid && value.length > 0) {
            console.log('valid222');
            errorMessage(inputHTML, 'Email не соответсвует требованиям');
          } else {
            delErrorMessage(inputHTML);
          }
        },
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

          if (!valid && value.length > 0) {
            errorMessage(inputHTML, 'Логин не соответсвует требованиям');
          } else {
            delErrorMessage(inputHTML);
          }
        },
      },
    });
    this.children.firstName = new Input({
      placeholder: 'enter first name',
      type: 'text',
      class: 'form_input',
      id: 'first_name',
      name: 'first_name',
      required: true,
      events: {
        input: (e) => {
          e.preventDefault();
          console.log('typed');
        },
        focusout: () => {
          const input = this.children.firstName;
          const inputHTML = (input as Input).getHTMLElement();
          const { value } = inputHTML;
          const valid = value.length > 0 && TestName(value);

          if (!valid && value.length > 0) {
            errorMessage(inputHTML, 'Имя не соответсвует требованиям');
          } else {
            delErrorMessage(inputHTML);
          }
        },
      },
    });
    this.children.lastName = new Input({
      placeholder: 'enter last name',
      type: 'text',
      class: 'form_input',
      id: 'second_name',
      name: 'second_name',
      required: true,
      events: {
        input: (e) => {
          e.preventDefault();
          console.log('typed');
        },
        focusout: () => {
          const input = this.children.lastName;
          const inputHTML = (input as Input).getHTMLElement();
          const { value } = inputHTML;
          const valid = value.length > 0 && TestName(value);

          if (!valid && value.length > 0) {
            errorMessage(inputHTML, 'Фамилия не соответсвует требованиям');
          } else {
            delErrorMessage(inputHTML);
          }
        },
      },
    });
    this.children.phone = new Input({
      placeholder: '+7 (900) 111 22 33',
      type: 'tel',
      class: 'form_input',
      id: 'phone',
      name: 'phone',
      required: true,
      events: {
        input: (e) => {
          e.preventDefault();
          console.log('typed');
        },
        focusout: () => {
          const input = this.children.phone;
          const inputHTML = (input as Input).getHTMLElement();
          const { value } = inputHTML;
          const valid = value.length > 0 && TestPhone(value);

          if (!valid && value.length > 0) {
            errorMessage(inputHTML, 'Телефон не соответсвует требованиям');
          } else {
            delErrorMessage(inputHTML);
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
        focusout: () => {
          const input = this.children.password;
          const inputHTML = (input as Input).getHTMLElement();
          const { value } = inputHTML;
          const valid = value.length > 0 && TestPassword(value);

          if (!valid && value.length > 0) {
            errorMessage(inputHTML, 'Пароль не соответсвует требованиям');
          } else {
            delErrorMessage(inputHTML);
          }
        },
      },
    });
    this.children.repeatPassword = new Input({
      placeholder: 'repeat password',
      type: 'text',
      class: 'form_input',
      id: 'repeat_password',
      name: 'password_repeat',
      required: true,
      events: {
        input: (e) => {
          e.preventDefault();
          console.log('typed');
        },
        focusout: () => {
          const input = this.children.password;
          const inputHTML = (input as Input).getHTMLElement();
          // eslint-disable-next-line prefer-destructuring
          const value = inputHTML.value;

          const inputRep = this.children.repeatPassword;
          const inputHTMLRep = (inputRep as Input).getHTMLElement();
          const valueRep = inputHTMLRep.value;

          const valid = value.length > 0 && TestPassword(value);

          if (!valid && value.length > 0) {
            errorMessage(inputHTMLRep, 'Пароль не соответсвует требованиям');
          } else if (value !== valueRep) {
            errorMessage(inputHTMLRep, 'Пароли не соответствуют');
          } else {
            delErrorMessage(inputHTMLRep);
          }
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
      TestEmail(data.email!.toString())
            && TestName(data.first_name!.toString())
            && TestName(data.second_name!.toString())
            && TestPhone(data.phone!.toString())
            && TestLogin(data.login!.toString())
            && TestPassword(data.password!.toString())
            && TestPassword(data.password_repeat!.toString())
    ) {
      console.log('signup');
      AuthController.signup(data);
    } else {
      throw new Error('поля заполнены неправильно');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, {});
  }
}

export default SigninPage;
