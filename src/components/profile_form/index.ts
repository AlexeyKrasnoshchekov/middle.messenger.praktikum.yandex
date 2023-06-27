import template from './profile_form.hbs';
import Block from '../../utils/block';
import Link from '../link';
import Form from '../form/index';
import {
  TestEmail, TestLogin, TestName, TestPassword, TestPhone,
} from '../../utils/ui';

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
    super('div', props);
    this.getContent()?.classList.add('profile');
  }

  init() {
    if (this.props.view === 'profile') {
      this.children.link1 = new Link({
        href: '/profile_change',
        label: 'Изменить данные',
        // events: {
        //   click: (e:any) => {
        //     e.preventDefault();
        //     console.log('click1111')
        //     // route1(e);
        //   },
        // },
      });
      this.children.link2 = new Link({
        href: '/profile_password',
        label: 'Изменить пароль',
        // events: {
        //   click: (e:any) => {
        //     e.preventDefault();

        //     // route1(e);

        //   },
        // },
      });
      this.children.link3 = new Link({
        href: '/login',
        label: 'Выйти',
        // events: {
        //   click: (e: any) => {
        //     e.preventDefault();
        //     console.log('clicked');
        //   },
        // },
      });
    }
    if (this.props.view === 'profile_change') {
      this.children.form = new Form({
        view: 'profile_change',
        email: this.props.email,
        login: this.props.login,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        phone: this.props.phone,
        chatName: this.props.chatName,
        events: {
          submit: (e: any) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const email = formData.get('email');
            const firstName = formData.get('first_name');
            const secondName = formData.get('second_name');
            const phone = formData.get('phone');
            const login = formData.get('login');
            const chatName = formData.get('chatName');

            if (
              TestEmail(email!.toString())
              && TestName(firstName!.toString())
              && TestName(secondName!.toString())
              && TestPhone(phone!.toString())
              && TestLogin(login!.toString())
              && TestLogin(chatName!.toString())
            ) {
              console.log('profileChangeData', {
                email,
                firstName,
                secondName,
                phone,
                login,
                chatName,
              });
            }
          },
        },
      });
    }
    if (this.props.view === 'profile_password') {
      this.children.form = new Form({
        view: 'profile_password',
        events: {
          submit: (e: any) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const oldPassword = formData.get('oldPassword');
            const newPassword = formData.get('newPassword');
            const newPasswordRepeat = formData.get('newPasswordRepeat');

            if (
              TestPassword(oldPassword!.toString())
              && TestPassword(newPassword!.toString())
              && TestPassword(newPasswordRepeat!.toString())
            ) {
              console.log('profileChangeData', {
                oldPassword,
                newPassword,
                newPasswordRepeat,
              });
            }
          },
        },
      });
    }
  }

  render() {
    return this.compile(template, {
      email: this.props.email,
      login: this.props.login,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      chatName: this.props.chatName,
      phone: this.props.phone,
      isProfile: this.props.view === 'profile',
      isProfileChange: this.props.view === 'profile_change',
      isProfilePassword: this.props.view === 'profile_password',
    });
  }
}

export default ProfileForm;
