import template from './profile.hbs';
import Block from '../../utils/block';
import Button from '../../components/button';
import Avatar from '../../components/avatar';
import store, { State, withStore } from '../../utils/store';
import Router from '../../utils/router';
import AuthController from '../../controllers/AuthController';
import Input from '../../components/input/index';
import {
  delErrorMessage,
  errorMessage, TestEmail, TestLogin, TestName, TestPassword, TestPhone,
} from '../../utils/ui';
import Modal from '../../components/modal';
import UserController from '../../controllers/UserController';

class BaseProfile extends Block {
  constructor() {
    super('main', {});
    this.element!.classList.add('page_profile');
    store.set('profileView', 'profile');
  }

  init() {
    this.children.button = new Button({
      view: 'back',
      events: {
        click: (e) => {
          e.preventDefault();
          const state = store.getState();
          if (state.profileView === 'profile') {
            Router.back();
          } else if (
            state.profileView === 'profileChange'
            || state.profileView === 'profilePassword') {
            store.set('profileView', 'profile');
          }
        },
      },
    });
    this.children.avatarModal = new Modal({
      view: 'avatar',
      visible: false,

    });
    this.children.avatar = new Avatar({
      class: 'avatar',
      alt: 'аватар пользователя',
      src: '',
      events: {
        click: (e:MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();

          if ((this.children.avatarModal as Modal).getProps().visible) {
            (this.children.avatarModal as Block).hide();
            (this.children.avatarModal as Block).setProps({ visible: false });
          } else {
            (this.children.avatarModal as Block).show();
            (this.children.avatarModal as Block).setProps({ visible: true });
          }
        },
      },
    });
    this.children.changeProfile = new Button({
      label: 'Изменить данные',
      view: 'link',
      events: {
        click: () => {
          store.set('profileView', 'profileChange');
        },
      },
    });
    this.children.changePassword = new Button({
      label: 'Изменить пароль',
      view: 'link',
      events: {
        click: () => {
          store.set('profileView', 'profilePassword');
        },
      },
    });
    this.children.logout = new Button({
      label: 'Выйти',
      view: 'link',
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });
    this.children.save = new Button({
      label: 'Сохранить',
      view: 'form',
      type: 'submit',
      disabled: true,
      events: {
        click: () => this.onSubmit(),
      },
    });

    this.children.email1 = new Input({
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
        focusout: () => {
          const input = this.children.email1;
          const inputHTML = (input as Input).getHTMLElement();
          const { value } = inputHTML;
          const valid = value.length > 0 && TestEmail(value);
          if (!valid && value.length > 0) {
            errorMessage(inputHTML, 'Email не соответсвует требованиям');
          } else {
            delErrorMessage(inputHTML);
          }
        },
      },
    });

    this.children.login1 = new Input({
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
          const input = this.children.login1;
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
    this.children.chatName = new Input({
      placeholder: 'enter chat name',
      type: 'text',
      class: 'form_input',
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

          if (!valid && value.length > 0) {
            errorMessage(inputHTML, 'Имя в чате не соответсвует требованиям');
          } else {
            delErrorMessage(inputHTML);
          }
        },
      },
    });
    this.children.phone1 = new Input({
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
          const input = this.children.phone1;
          const inputHTML = (input as Input).getHTMLElement();
          const { value } = inputHTML;

          const valid = value.length > 0 && TestPhone(value);

          if (!valid && value.length > 0) {
            errorMessage(inputHTML, 'Телефон не соответсвует требованиям, пример +79281112233');
          } else {
            delErrorMessage(inputHTML);
          }
        },
      },
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

          if (!valid && value.length > 0) {
            errorMessage(inputHTML, 'Пароль не соответсвует требованиям');
          } else {
            delErrorMessage(inputHTML);
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

          if (!valid && value.length > 0) {
            errorMessage(inputHTML, 'Пароль не соответсвует требованиям');
          } else {
            delErrorMessage(inputHTML);
          }
        },
      },
    });
    this.children.repeatNewPassword = new Input({
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
        focusout: () => {
          const input = this.children.repeatNewPassword;
          const inputHTML = (input as Input).getHTMLElement();
          const valueRepeat = inputHTML.value;

          const inputNew = this.children.newPassword;
          const inputHTMLNew = (inputNew as Input).getHTMLElement();
          const valueNew = inputHTMLNew.value;

          if (valueNew !== valueRepeat) {
            errorMessage(inputHTML, 'Пароли не соответствуют');
          } else {
            delErrorMessage(inputHTML);
          }

          const valid = valueRepeat.length > 0 && TestPassword(valueRepeat);

          if (!valid && valueRepeat.length > 0) {
            errorMessage(inputHTML, 'Пароль не соответсвует требованиям');
          } else {
            delErrorMessage(inputHTML);
          }
        },
      },
    });
  }

  // clearAllInputs() {

  // }

  onSubmit() {
    const inputs = Object
      .values(this.children)
      .filter((child) => child instanceof Input);

    // eslint-disable-next-line max-len
    const values = inputs.map((child) => ([(child as Input).getName(), (child as Input).getValue()]));

    const data = Object.fromEntries(values);

    const state = store.getState();

    if (state.profileView === 'profileChange') {
      delete data.newPassword;
      delete data.oldPassword;

      UserController.changeProfile(data);
      store.set('profileView', 'profile');
    }
    if (state.profileView === 'profilePassword') {
      const data2 = {
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
        repeatNewPassword: data.newPasswordRepeat,
      };

      if (
        TestPassword(data2.oldPassword!.toString())
        && TestPassword(data2.newPassword!.toString())
        // eslint-disable-next-line max-len
        && (data2.repeatNewPassword!.toString() === data2.newPassword!.toString() && TestPassword(data2.repeatNewPassword!.toString()))
      ) {
        UserController.changePassword(data2);
      }

      // очистка инпутов
      inputs.forEach((input) => { (input as Input).setValue(''); });
    }
  }

  protected componentDidUpdate(_oldProps: State, newProps: State): boolean {
    if (newProps.user) {
      (this.children.avatar as Block).setProps({
        // eslint-disable-next-line max-len
        src: newProps.user.avatar !== null ? `https://ya-praktikum.tech/api/v2/resources${newProps.user.avatar}` : undefined,
      });
    }

    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    if (this.props.user) {
      (this.children.email1 as Block).setProps({ value: this.props.user.email });
      (this.children.login1 as Block).setProps({ value: this.props.user.login });
      (this.children.firstName as Block).setProps({ value: this.props.user.first_name });
      (this.children.lastName as Block).setProps({ value: this.props.user.second_name });
      (this.children.chatName as Block).setProps({ value: this.props.user.display_name });
      (this.children.phone1 as Block).setProps({ value: this.props.user.phone });
      (this.children.avatar as Block).setProps({
        src: `https://ya-praktikum.tech/api/v2/resources${this.props.user.avatar}`,
      });
    }
    return this.compile(template, {
      ...this.props.user,
      isProfile: this.props.profileView === 'profile',
      isProfileChange: this.props.profileView === 'profileChange',
      isProfilePassword: this.props.profileView === 'profilePassword',
    });
  }
}

function mapStateToProps(state: State) {
  // return { user: {...state.user} };
  return { user: state.user, profileView: state.profileView };
}

// eslint-disable-next-line import/prefer-default-export
export const ProfilePage = withStore(mapStateToProps)(BaseProfile);
// export default ProfilePage;
