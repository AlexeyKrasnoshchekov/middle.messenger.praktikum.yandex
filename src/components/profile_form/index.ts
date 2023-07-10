import template from './profile_form.hbs';
import Block from '../../utils/block';
import Link from '../link';
import {
  errorMessage,
  TestEmail, TestLogin, TestName, TestPassword, TestPhone,
} from '../../utils/ui';
import AuthController from '../../controllers/AuthController';
import Button from '../button';
import Input from '../input';
// import withStore from '../../hocs/withStore';
import store, { withStore } from '../../utils/store';

interface ProfileFormProps {
  view: string,
  email?: string,
  login?: string,
  firstName?: string,
  lastName?: string,
  chatName?: string,
  phone?: string
}
class ProfileForm extends Block {
  constructor(props: ProfileFormProps) {
    // console.log('props',props);
    super('div', props);
    this.getContent()?.classList.add('profile');
  }

  init() {
    if (this.props.view === 'profile') {
      this.children.changeProfile = new Link({
        href: '/profile_change',
        label: 'Изменить данные',
      });
      this.children.changePassword = new Link({
        href: '/profile_password',
        label: 'Изменить пароль',
      });
      this.children.logout = new Button({
        label: 'Выйти',
        view: 'form',
        events: {
          click: () => {
            AuthController.logout();
          },
        },
      });
      // this.children.logout = new Link({
      //   href: '/login',
      //   label: 'Выйти',
      //   events: {
      //     click: (e:MouseEvent) => {
      //       e.preventDefault();
      //       AuthController.logout();
      //     },
      //   },
      // });
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
      this.children.email = new Input({
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
          focusout: () => {
            const input = this.children.email;
            const inputHTML = (input as Input).getHTMLElement();
            const { value } = inputHTML;
            const valid = value.length > 0 && TestEmail(value);
            if (!valid) {
              if (value.length > 0) {
                errorMessage(inputHTML, 'Email не соответсвует требованиям');
              }
            }
          },
        },
      });
      this.children.login = new Input({
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
      this.children.firstName = new Input({
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
          focusout: () => {
            const input = this.children.firstName;
            const inputHTML = (input as Input).getHTMLElement();
            const { value } = inputHTML;
            const valid = value.length > 0 && TestName(value);
            if (!valid) {
              if (value.length > 0) {
                errorMessage(inputHTML, 'Имя не соответсвует требованиям');
              }
            }
          },
        },
      });
      this.children.lastName = new Input({
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
          focusout: () => {
            const input = this.children.lastName;
            const inputHTML = (input as Input).getHTMLElement();
            const { value } = inputHTML;
            const valid = value.length > 0 && TestName(value);
            if (!valid) {
              if (value.length > 0) {
                errorMessage(inputHTML, 'Фамилия не соответсвует требованиям');
              }
            }
          },
        },
      });
      this.children.chatName = new Input({
        placeholder: 'enter chat name',
        type: 'text',
        class: 'form_input',
        value: this.props.chatName,
        id: 'chat_name',
        name: 'display_name',
        required: true,
        events: {
          input: (e) => {
            e.preventDefault();
            console.log('typed');
          },
          focusout: () => {
            const input = this.children.chatName;
            const inputHTML = (input as Input).getHTMLElement();
            const { value } = inputHTML;
            const valid = value.length > 0 && TestLogin(value);
            if (!valid) {
              if (value.length > 0) {
                errorMessage(inputHTML, 'Имя в чате не соответсвует требованиям');
              }
            }
          },
        },
      });
      this.children.phone = new Input({
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
          focusout: () => {
            const input = this.children.phone;
            const inputHTML = (input as Input).getHTMLElement();
            const { value } = inputHTML;

            const valid = value.length > 0 && TestPhone(value);
            if (!valid) {
              if (value.length > 0) {
                errorMessage(inputHTML, 'Телефон не соответсвует требованиям');
              }
            }
          },
        },
      });
      // this.children.form = new Form({
      //   view: 'profile_change',
      //   email: this.props.email,
      //   login: this.props.login,
      //   firstName: this.props.firstName,
      //   lastName: this.props.lastName,
      //   phone: this.props.phone,
      //   chatName: this.props.chatName,
      //   events: {
      //     submit: (e: any) => {
      //       e.preventDefault();
      //       const formData = new FormData(e.target);
      //       const email = formData.get('email');
      //       const firstName = formData.get('first_name');
      //       const secondName = formData.get('second_name');
      //       const phone = formData.get('phone');
      //       const login = formData.get('login');
      //       const chatName = formData.get('chatName');

      //       if (
      //         TestEmail(email!.toString())
      //         && TestName(firstName!.toString())
      //         && TestName(secondName!.toString())
      //         && TestPhone(phone!.toString())
      //         && TestLogin(login!.toString())
      //         && TestLogin(chatName!.toString())
      //       ) {
      //         console.log('profileChangeData', {
      //           email,
      //           firstName,
      //           secondName,
      //           phone,
      //           login,
      //           chatName,
      //         });
      //       }
      //     },
      //   },
      // });
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

      this.children.oldPassword = new Input({
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
          focusout: () => {
            const input = this.children.oldPassword;
            const inputHTML = (input as Input).getHTMLElement();
            const { value } = inputHTML;
            const valid = value.length > 0 && TestPassword(value);

            if (!valid) {
              if (value.length > 0) {
                errorMessage(inputHTML, 'Пароль не соответсвует требованиям');
              }
            }
          },
        },
      });
      this.children.newPassword = new Input({
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
          focusout: () => {
            const input = this.children.newPassword;
            const inputHTML = (input as Input).getHTMLElement();
            const { value } = inputHTML;

            const valid = value.length > 0 && TestPassword(value);
            if (!valid) {
              if (value.length > 0) {
                errorMessage(inputHTML, 'Пароль не соответсвует требованиям');
              }
            }
          },
        },
      });
      this.children.repeatNewPassword = new Input({
        placeholder: 'repeat password',
        type: 'text',
        class: 'form_input',
        id: 'new_password_repeat',
        name: 'newPassword',
        required: true,
        events: {
          input: (e) => {
            e.preventDefault();
            console.log('typed');
          },
          focusout: () => {
            const input = this.children.repeatNewPassword;
            const inputHTML = (input as Input).getHTMLElement();
            const { value } = inputHTML;

            const valid = value.length > 0 && TestPassword(value);
            if (!valid) {
              if (value.length > 0) {
                errorMessage(inputHTML, 'Пароль не соответсвует требованиям');
              }
            }
          },
        },
      });
      // this.children.form = new Form({
      //   view: 'profile_password',
      //   events: {
      //     submit: (e: any) => {
      //       e.preventDefault();
      //       const formData = new FormData(e.target);
      //       const oldPassword = formData.get('oldPassword');
      //       const newPassword = formData.get('newPassword');
      //       const newPasswordRepeat = formData.get('newPasswordRepeat');

      //       if (
      //         TestPassword(oldPassword!.toString())
      //         && TestPassword(newPassword!.toString())
      //         && TestPassword(newPasswordRepeat!.toString())
      //       ) {
      //         console.log('profileChangeData', {
      //           oldPassword,
      //           newPassword,
      //           newPasswordRepeat,
      //         });
      //       }
      //     },
      //   },
      // });
    }
  }

  render() {
    return this.compile(template, {
      // email: this.props.user.email,
      // login: this.props.user.login,
      // firstName: this.props.user.firstName,
      // lastName: this.props.user.lastName,
      // chatName: this.props.user.chatName,
      // phone: this.props.user.phone,
      isProfile: this.props.view === 'profile',
      isProfileChange: this.props.view === 'profile_change',
      isProfilePassword: this.props.view === 'profile_password',
    });
  }
}

// const ProfileForm = withStore(BaseProfileForm);

export default ProfileForm;
