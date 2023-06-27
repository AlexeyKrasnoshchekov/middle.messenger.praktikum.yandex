import template from './form.hbs';
import Button from '../button';
import Block from '../../utils/block';
import Input from '../input';
import Link from '../link/index';
import {
  TestEmail, TestLogin, TestName, TestPassword, TestPhone,
} from '../../utils/ui';

interface FormProps {
  view:string,
  email?: string,
  login?: string,
  firstName?: string,
  lastName?: string,
  phone?: string,
  chatName?: string,
  events?: {
    submit: (arg0:any) => void
  }
}
class Form extends Block {
  constructor(props:FormProps) {
    super('form', props);
    if (props.view !== 'profile_password' && props.view !== 'profile_change') {
      this.getContent()?.classList.add('form');
    }
    if (props.view === 'profile_password' || props.view === 'profile_change') {
      this.getContent()?.classList.add('profile_change_form');
    }
    if (props.view === 'login') {
      this.getContent()?.classList.add('form_login');
    }
  }

  init() {
    if (this.props.view === 'login') {
      this.children.link = new Link({
        href: '/signin',
        label: 'Нет аккаунта?',
        // events: {
        //   click: (e:any) => {
        //     e.preventDefault();
        //   },
        // },
      });
      this.children.button = new Button({
        label: 'Войти',
        view: 'form',
        // events: {
        //   click: (e:any) => {
        //     e.preventDefault();
        //     console.log('clicked');
        //   },
        // },
      });
      this.children.inputLogin = new Input({
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
          focusout: (e) => {
            e.preventDefault();

            const valid = TestLogin(e.target.value);

            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
      this.children.inputPassword = new Input({
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
          focusout: (e) => {
            e.preventDefault();
            const valid = TestPassword(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
    }
    if (this.props.view === 'signin') {
      this.children.link = new Link({
        href: '/login',
        label: 'Войти',
        // events: {
        //   click: (e:any) => {
        //     e.preventDefault();
        //   },
        // },
      });
      this.children.button = new Button({
        label: 'Зарегистрироваться',
        view: 'form',
        // events: {
        //   click: (e:any) => {
        //     e.preventDefault();
        //     console.log('clicked');
        //   },
        // },
      });
      this.children.inputEmail = new Input({
        placeholder: 'enter email',
        type: 'email',
        class: 'form_input',
        id: 'email',
        name: 'email',
        required: true,
        events: {
          input: (e) => {
            e.preventDefault();
            console.log('typed');
          },
          focusout: (e) => {
            e.preventDefault();
            const valid = TestEmail(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
      this.children.inputLogin = new Input({
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
          focusout: (e) => {
            e.preventDefault();
            const valid = TestLogin(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
      this.children.inputFirstName = new Input({
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
          focusout: (e) => {
            e.preventDefault();
            const valid = TestName(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
      this.children.inputLastName = new Input({
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
          focusout: (e) => {
            e.preventDefault();
            const valid = TestName(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
      this.children.inputPhone = new Input({
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
          focusout: (e) => {
            e.preventDefault();
            const valid = TestPhone(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
      this.children.inputPassword = new Input({
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
          focusout: (e) => {
            e.preventDefault();
            const valid = TestPassword(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
      this.children.inputRepeatPassword = new Input({
        placeholder: 'repeat password',
        type: 'text',
        class: 'form_input',
        id: 'repeat_password',
        name: 'repeat_password',
        required: true,
        events: {
          input: (e) => {
            e.preventDefault();
            console.log('typed');
          },
          focusout: (e) => {
            e.preventDefault();
            const valid = TestPassword(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
    }

    if (this.props.view === 'profile_change') {
      this.children.button = new Button({
        label: 'Сохранить',
        view: 'form',
        // events: {
        //   sub: (e:any) => {
        //     e.preventDefault();
        //     console.log('clicked');
        //   },
        // },
      });
      this.children.inputEmail = new Input({
        placeholder: 'enter email',
        value: this.props.email,
        type: 'email',
        class: 'form_input',
        id: 'email',
        name: 'email',
        required: true,
        events: {
          input: (e) => {
            e.preventDefault();
            console.log('typed');
          },
          focusout: (e) => {
            e.preventDefault();
            const valid = TestEmail(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
      this.children.inputLogin = new Input({
        placeholder: 'enter login',
        type: 'text',
        class: 'form_input',
        value: this.props.login,
        id: 'login',
        name: 'login',
        required: true,
        events: {
          input: (e) => {
            e.preventDefault();
            console.log('typed');
          },
          focusout: (e) => {
            e.preventDefault();
            const valid = TestLogin(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
      this.children.inputFirstName = new Input({
        placeholder: 'enter first name',
        type: 'text',
        class: 'form_input',
        value: this.props.firstName,
        id: 'first_name',
        name: 'first_name',
        required: true,
        events: {
          input: (e) => {
            e.preventDefault();
            console.log('typed');
          },
          focusout: (e) => {
            e.preventDefault();
            const valid = TestName(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
      this.children.inputLastName = new Input({
        placeholder: 'enter last name',
        type: 'text',
        class: 'form_input',
        value: this.props.lastName,
        id: 'second_name',
        name: 'second_name',
        required: true,
        events: {
          input: (e) => {
            e.preventDefault();
            console.log('typed');
          },
          focusout: (e) => {
            e.preventDefault();
            const valid = TestName(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
      this.children.inputChatName = new Input({
        placeholder: 'enter chat name',
        type: 'text',
        class: 'form_input',
        value: this.props.chatName,
        id: 'chat_name',
        name: 'chat_name',
        required: true,
        events: {
          input: (e) => {
            e.preventDefault();
            console.log('typed');
          },
          focusout: (e) => {
            e.preventDefault();
            const valid = TestLogin(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
      this.children.inputPhone = new Input({
        placeholder: '+7 (900) 111 22 33',
        type: 'tel',
        class: 'form_input',
        value: this.props.phone,
        id: 'phone',
        name: 'phone',
        required: true,
        events: {
          input: (e) => {
            e.preventDefault();
            console.log('typed');
          },
          focusout: (e) => {
            e.preventDefault();
            const valid = TestPassword(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
    }
    if (this.props.view === 'profile_password') {
      this.children.button = new Button({
        label: 'Сохранить',
        view: 'form',
        // events: {
        //   sub: (e:any) => {
        //     e.preventDefault();
        //     console.log('clicked');
        //   },
        // },
      });

      this.children.inputOldPassword = new Input({
        placeholder: 'enter old password',
        type: 'text',
        class: 'form_input',
        id: 'old_password',
        name: 'oldPassword',
        required: true,
        events: {
          input: (e) => {
            e.preventDefault();
            console.log('typed');
          },
          focusout: (e) => {
            e.preventDefault();
            const valid = TestPassword(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
      this.children.inputNewPassword = new Input({
        placeholder: 'enter new password',
        type: 'text',
        class: 'form_input',
        id: 'new_password',
        name: 'newPassword',
        required: true,
        events: {
          input: (e) => {
            e.preventDefault();
            console.log('typed');
          },
          focusout: (e) => {
            e.preventDefault();
            const valid = TestPassword(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
      this.children.inputRepeatNewPassword = new Input({
        placeholder: 'repeat password',
        type: 'text',
        class: 'form_input',
        id: 'new_password_repeat',
        name: 'newPasswordRepeat',
        required: true,
        events: {
          input: (e) => {
            e.preventDefault();
            console.log('typed');
          },
          focusout: (e) => {
            e.preventDefault();
            const valid = TestPassword(e.target.value);
            console.log('first', valid);
            if (!valid) {
              e.target.classList.add('invalid');
            }
          },
        },
      });
    }
  }

  render() {
    return this.compile(template, {
      isLoginForm: this.props.view === 'login',
      isSigninForm: this.props.view === 'signin',
      isProfileChangeForm: this.props.view === 'profile_change',
      isProfilePasswordChangeForm: this.props.view === 'profile_password',
    });
  }
}

export default Form;
