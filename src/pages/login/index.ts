import template from './login.hbs';
import Block from '../../utils/block';
import Form from '../../components/form';

class LoginPage extends Block {
  constructor() {
    super('main');
    this.element.classList.add('page_login');
  }

  init () {
    this.children.form = new Form({
        view: 'login'
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, {});
  }
}

export default LoginPage;
