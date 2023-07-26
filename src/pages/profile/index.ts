import template from './profile.hbs';
import Block from '../../utils/block';
import Button from '../../components/button';
import Avatar from '../../components/avatar';
import store, { State, StorageEvent, withStore } from '../../utils/store';
import Router from '../../utils/router';
import AuthController from '../../controllers/AuthController';
import Input from '../../components/input/index';
import {
  errorMessage, TestEmail, TestLogin, TestName, TestPassword, TestPhone,
} from '../../utils/ui';
import Modal from '../../components/modal';
import UserController from '../../controllers/UserController';

class BaseProfile extends Block {
  constructor() {
    super('main', {});
    this.element!.classList.add('page_profile');

    // UserController.getUser();
    store.set('profileView', 'profile');

    // console.log('props222',this.props);
    // store.on(StoreEvents.Updated, () => {
    //   // вызываем обновление компонента, передав данные из хранилища
    //   this.setProps(store.getState());
    // });
  }

  init() {
    this.children.button = new Button({
      view: 'back',
      events: {
        click: (e: any) => {
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

          if (this.children.avatarModal.props.visible) {
            this.children.avatarModal.hide();
            this.children.avatarModal.setProps({ visible: false });
          } else {
            this.children.avatarModal.show();
            this.children.avatarModal.setProps({ visible: true });
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
          if (!valid) {
            if (value.length > 0) {
              errorMessage(inputHTML, 'Email не соответсвует требованиям');
            }
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
          if (!valid) {
            if (value.length > 0) {
              errorMessage(inputHTML, 'Телефон не соответсвует требованиям');
            }
          }
        },
      },
    });
    // this.children.button = new Button({
    //   label: 'Сохранить',
    //   view: 'form',
    //   // events: {
    //   //   sub: (e:any) => {
    //   //     e.preventDefault();
    //   //     console.log('clicked');
    //   //   },
    //   // },
    // });

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
          }

          const valid = valueRepeat.length > 0 && TestPassword(valueRepeat);
          if (!valid) {
            if (valueRepeat.length > 0) {
              errorMessage(inputHTML, 'Пароль не соответсвует требованиям');
            }
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

    const values = inputs.map((child) => ([(child as Input).getName(), (child as Input).getValue()]));

    const data = Object.fromEntries(values);

    const state = store.getState();

    if (state.profileView === 'profileChange') {
      delete data.newPassword;
      delete data.oldPassword;

      if (
        TestEmail(data.email!.toString())
              && TestName(data.first_name!.toString())
              && TestName(data.second_name!.toString())
              && TestPhone(data.phone!.toString())
              && TestLogin(data.login!.toString())
              && TestEmail(data.email!.toString())
              && TestLogin(data.display_name!.toString())
      ) {
        UserController.changeProfile(data);
      }
    }
    if (state.profileView === 'profilePassword') {
      console.log('data111', data);
      const data2 = {
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
        repeatNewPassword: data.newPasswordRepeat,
      };

      console.log('data2', data2);

      if (
        TestPassword(data2.oldPassword!.toString())
        && TestPassword(data2.newPassword!.toString())
        && (data2.repeatNewPassword!.toString() === data2.newPassword!.toString() && TestPassword(data2.repeatNewPassword!.toString()))
      ) {
        UserController.changePassword(data2);
      }

      // очистка инпутов
      inputs.forEach((input) => { input.setValue(''); });
    }
  }

  protected componentDidUpdate(oldProps: State, newProps: State): boolean {
    if (newProps.user) {
      this.children.avatar.setProps({
        src: newProps.user.avatar !== null ? `https://ya-praktikum.tech/api/v2/resources${newProps.user.avatar}` : undefined,
      });
    }

    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    // console.log('this.children.email',this.children.email1);
    if (this.props.user) {
      this.children.email1.setProps({ value: this.props.user.email });
      this.children.login1.setProps({ value: this.props.user.login });
      this.children.firstName.setProps({ value: this.props.user.first_name });
      this.children.lastName.setProps({ value: this.props.user.second_name });
      this.children.chatName.setProps({ value: this.props.user.display_name });
      this.children.phone1.setProps({ value: this.props.user.phone });
      this.children.avatar.setProps({
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
  return { ...state };
}

// eslint-disable-next-line import/prefer-default-export
export const ProfilePage = withStore(mapStateToProps)(BaseProfile?);
// export default ProfilePage;
