import template from './form.hbs';
import Button from '../button';
import Block from '../../utils/block';
import Input from '../input';
import Link from '~components/link';

interface FormProps {
  view:string
}
class Form extends Block {
  constructor(props:FormProps) {
    console.log('props777', props);
    super('form', props);
    this.element.classList.add('form');
    props.view === 'login' && this.element.classList.add('form_login');
  }

  init () {

    if (this.props.view === 'login') {
      this.children.link = new Link({
        href: '/signin',
        label:'Нет аккаунта?',
        // events: {
        //   click: (e:any) => {
        //     e.preventDefault();
        //   },
        // },
      });
      this.children.button = new Button({
        label: 'Войти',
        view: 'form',
        events: {
          click: (e:any) => {
            e.preventDefault();
            console.log('clicked');
          },
        },
      });
    }
    if (this.props.view === 'signin') {
      this.children.link = new Link({
        href: '/login',
        label:'Войти',
        // events: {
        //   click: (e:any) => {
        //     e.preventDefault();
        //   },
        // },
      });
      this.children.button = new Button({
        label: 'Зарегистрироваться',
        view: 'form',
        events: {
          click: (e:any) => {
            e.preventDefault();
            console.log('clicked');
          },
        },
      });
    }

    this.children.input = new Input({
      placeholder: 'type something',
      type: 'text',
      class: 'form_input',
      id: 'email',
      name: 'email',
      required: true,
      events: {
        input: (e) => {
          e.preventDefault();
          console.log('typed');
        },
      },
    });

    
  }

  render() {
    return this.compile(template, {
      isLoginForm: this.props.view === 'login' ? true : false,
      isSigninForm: this.props.view === 'signin' ? true : false
    });
  }
}

export default Form;
