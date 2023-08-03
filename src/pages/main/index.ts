/* eslint-disable max-len */
import template from './main.hbs';
import Block from '../../utils/block';
import Button from '../../components/button/index';
import Avatar from '../../components/avatar/index';
import Input from '../../components/input/index';
import Link from '../../components/link/index';
import store, { State, withStore } from '../../utils/store';
import Modal from '../../components/modal';
import ChatController from '../../controllers/ChatController';
import ChatsList from '../../components/chatsList';
import WSController from '../../controllers/WSController';
import MessengesArea from '../../components/messagesArea';
import { ChatInfo } from '../../api/ChatAPI';
import { delErrorMessage, errorMessage } from '../../utils/ui';

class BaseMainPage extends Block {
  constructor() {
    super('main', {});
    this.element!.classList.add('page_main');
    // ChatController.getChats(0, 10, '');

    ChatController.getChats(0, 10, '').finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true,
      });
    });

    // setInterval(() => {
    //   ChatController.getChats(0, 10, '');
    // }, 5000);

    // подписываемся на событие
    // store.on(StorageEvent.UpdateState, () => {
    //   // вызываем обновление компонента, передав данные из хранилища
    //   this.setProps(store.getState());
    // });

    // закрытие открытых модалов при клике снаружи
    this.element!.addEventListener('click', (e) => {
      const modals = Object
        .values(this.children)
        .filter((child) => child instanceof Modal);

      modals.forEach((modal) => {
        if (!e.composedPath().includes((modal as Modal).getHTMLElement())) {
          if ((modal as Modal).getProps().visible) {
            (modal as Block).hide();
            (modal as Block).setProps({ visible: false });
          }
        }
      });
    });
  }

  init() {
    this.children.chatsList = new ChatsList({ isLoaded: false });
    this.children.messengesArea = new MessengesArea({});

    this.children.link = new Link({
      href: '/profile',
      label: 'Профиль',
    });
    this.children.attachModal = new Modal({
      view: 'attach',
      visible: false,
    });
    this.children.avatarModal = new Modal({
      view: 'avatar',
      visible: false,
    });
    this.children.userModal = new Modal({
      view: 'user',
      visible: false,
    });
    this.children.createChatModal = new Modal({
      view: 'chat',
      visible: false,
    });
    this.children.menuModal = new Modal({
      view: 'menu',
      visible: false,
    });
    this.children.link = new Link({
      href: '/profile',
      label: 'Профиль',
    });
    this.children.createChat = new Button({
      label: 'Создать чат',
      view: 'link',
      events: {
        click: (e:MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          if ((this.children.createChatModal as Modal).getProps().visible) {
            (this.children.createChatModal as Block).hide();
            (this.children.createChatModal as Block).setProps({ visible: false });
          } else {
            (this.children.createChatModal as Block).show();
            (this.children.createChatModal as Block).setProps({ visible: true });
          }
        },
      },
    });
    this.children.buttonAttach = new Button({
      view: 'attach',
      events: {
        click: (e:MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          if ((this.children.attachModal as Modal).getProps().visible) {
            (this.children.attachModal as Block).hide();
            (this.children.attachModal as Block).setProps({ visible: false });
          } else {
            (this.children.attachModal as Block).show();
            (this.children.attachModal as Block).setProps({ visible: true });
          }
        },
      },
    });
    this.children.buttonSend = new Button({
      view: 'send',
      events: {
        click: () => {
          const input = this.children.inputMessage as Input;
          const inputHTML = (input as Input).getHTMLElement();
          const message = input.getValue();
          console.log('clicked', message);
          input.setValue('');

          if (!this.props.selectedChat) {
            errorMessage(inputHTML, 'Выберите чат...');
          } else if (message && message.length > 0 && /^[A-Za-z0-9]*$/.test(message)) {
            WSController.sendMessage(this.props.selectedChat!.id, message);
            delErrorMessage(inputHTML);
          } else {
            errorMessage(inputHTML, 'Напишите что-нибудь...');
          }
        },
      },
    });
    this.children.buttonMenu = new Button({
      view: 'menu',
      events: {
        click: (e:MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          if ((this.children.menuModal as Modal).getProps().visible) {
            (this.children.menuModal as Block).hide();
            (this.children.menuModal as Block).setProps({ visible: false });
          } else {
            (this.children.menuModal as Block).show();
            (this.children.menuModal as Block).setProps({ visible: true });
          }
        },
      },
    });
    this.children.delChat = new Button({
      view: 'link',
      label: 'Удалить чат',
      events: {
        click: () => {
          const state = store.getState();
          ChatController.removeChat(state.selectedChatId!).finally(() => {
            ChatController.getChats(0, 10, '');
          });
        },
      },
    });

    this.children.avatar = new Avatar({
      class: 'avatar',
      alt: 'аватар чата',
      src: '',
      events: {
        click: (e) => {
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
        keydown: (e) => {
          if (e.keyCode === 13) {
            const input = this.children.inputMessage as Input;
            const inputHTML = (input as Input).getHTMLElement();
            const message = input.getValue();
            console.log('clicked', message);
            console.log('clicked111', message.length);
            input.setValue('');

            if (!this.props.selectedChat) {
              errorMessage(inputHTML, 'Выберите чат...');
            } else if (message && message.length > 0 && /^[A-Za-z0-9]*$/.test(message)) {
              WSController.sendMessage(this.props.selectedChat!.id, message);
              delErrorMessage(inputHTML);
            } else {
              errorMessage(inputHTML, 'Напишите что-нибудь...');
            }
          }
        },
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

    this.children.linkLogin = new Link({
      href: '/',
      label: 'Login',
    });
    this.children.linkSignin = new Link({
      href: '/signin',
      label: 'Signin',
    });
    this.children.linkProfile = new Link({
      href: '/profile',
      label: 'Profile',
    });
    this.children.link404 = new Link({
      href: '/notFound',
      label: '404',
    });
    this.children.link500 = new Link({
      href: '/error_500',
      label: '500',
    });
  }

  protected componentDidUpdate(_oldProps: State, newProps: State): boolean {
    if (newProps.chatUsers) {
      this.setProps({ users: newProps.chatUsers });
    }

    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    if (this.props.selectedChat) {
      (this.children.avatar as Block).setProps({
        src: this.props.selectedChat!.avatar ? `https://ya-praktikum.tech/api/v2/resources${this.props.selectedChat!.avatar}` : undefined,
      });
    }

    if (this.props.isOpenUserModal) {
      (this.children.userModal as Block).show();
      (this.children.userModal as Block).setProps({
        visible: this.props.isOpenUserModal,
      });
    } else {
      (this.children.userModal as Block).hide();
      (this.children.userModal as Block).setProps({
        visible: this.props.isOpenUserModal,
      });
    }

    return this.compile(template, { ...this.props });
  }
}

function mapStateToProps(state: State) {
  const obj = {};

  if (state.selectedChatId) {
    if (state.chats) {
      const [selectedChat] = state!.chats!.filter((chat:ChatInfo) => chat.id === state.selectedChatId);
      Object.assign(obj, { selectedChat });
    }
  }

  if (state.chatUsers) {
    Object.assign(obj, { users: state.chatUsers });
  }

  Object.assign(obj, { isOpenUserModal: state.isOpenUserModal });

  return { ...obj };
}

const MainPage = withStore(mapStateToProps)(BaseMainPage);

export default MainPage;
