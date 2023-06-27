import template from './signin.hbs';
import Block from '../../utils/block';
import Form from '../../components/form';
import {
  TestEmail, TestLogin, TestName, TestPassword, TestPhone,
} from '../../utils/ui';

class SigninPage extends Block {
  constructor() {
    super('main', {});
    this.element!.classList.add('page_signin');
  }

  init() {
    this.children.form = new Form({
      view: 'signin',
      events: {
        submit: (e:any) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const email = formData.get('email');
          const firstName = formData.get('first_name');
          const secondName = formData.get('second_name');
          const phone = formData.get('phone');
          const login = formData.get('login');
          const password = formData.get('password');
          const repeatPassword = formData.get('repeat_password');

          if (
            TestEmail(email!.toString())
            && TestName(firstName!.toString())
            && TestName(secondName!.toString())
            && TestPhone(phone!.toString())
            && TestLogin(login!.toString())
            && TestPassword(password!.toString())
            && TestPassword(repeatPassword!.toString())
          ) {
            console.log('signinData', {
              email,
              firstName,
              secondName,
              phone,
              login,
              password,
              repeatPassword,
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

export default SigninPage;
