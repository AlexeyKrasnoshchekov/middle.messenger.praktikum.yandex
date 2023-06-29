import template from './main.hbs';
import Block from '../../utils/block';
import Button from '../../components/button/index';
import Avatar from '../../components/avatar/index';
import ChatItem from '../../components/chatItem/index';
import Input from '../../components/input/index';
// import { errorMessage } from '../../utils/ui';

class MainPage extends Block {
  constructor() {
    super('main', {});
    this.element!.classList.add('page_main');
  }

  init() {
    this.children.buttonAttach = new Button({
      view: 'attach',
      events: {
        click: (e:any) => {
          e.preventDefault();
          console.log('clicked');
        },
      },
    });
    this.children.buttonSend = new Button({
      view: 'send',
      events: {
        click: (e:any) => {
          e.preventDefault();
          console.log('clicked');
        },
      },
    });
    this.children.buttonMenu = new Button({
      view: 'menu',
      events: {
        click: (e:any) => {
          e.preventDefault();
          console.log('clicked');
        },
      },
    });

    this.children.avatar = new Avatar({
      class: 'avatar',
      alt: 'аватар пользователя',
      src: '',
    });
    this.children.chatItem = new ChatItem({
      src: '',
      sender: 'Виктор',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, rerum.',
      time: '10:15',
      unread: true,
      events: {
        click: (e) => {
          e.preventDefault();
          console.log('clicked');
        },
      },
    });

    this.children.inputMessage = new Input({
      placeholder: 'message',
      type: 'text',
      class: 'message_input',
      id: 'chat_message',
      name: 'message',
      required: false,
      events: {
        input: (e) => {
          e.preventDefault();
          console.log('typed');
        },
        // focusout: (e) => {
        //   e.preventDefault();
        //   const message = e.target.value;
        //   if (message.length === 0) {
        //     errorMessage(e.target.id, 'Введите сообщение перед отправкой');
        //     e.target.classList.add('invalid');
        //   }
        // },
      },
    });
    this.children.inputSearch = new Input({
      placeholder: 'search',
      type: 'search',
      class: 'search_input',
      id: 'chat_search',
      name: 'search',
      required: false,
      events: {
        input: (e) => {
          e.preventDefault();
          console.log('typed');
        },
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, {});
  }
}

export default MainPage;
