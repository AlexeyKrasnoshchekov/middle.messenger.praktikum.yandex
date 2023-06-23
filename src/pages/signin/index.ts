import template from './signin.hbs';
import Block from '../../utils/block';
import Form from '../../components/form';

class SigninPage extends Block {
  constructor() {
    super('main');
    this.element.classList.add('page_signin');
  }

  init () {
    this.children.form = new Form({
        view: 'signin'
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, {});
  }
}

export default SigninPage;
