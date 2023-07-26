import template from './main.hbs';
import Block from '../../utils/block';
import Button from '../../components/button/index';
import Avatar from '../../components/avatar/index';
import ChatItem from '../../components/chatItem/index';
import Input from '../../components/input/index';
import Link from '../../components/link/index';
import AuthController from '../../controllers/AuthController';
import store, { StorageEvent } from '../../utils/store';
import Modal from '../../components/modal';
import ChatController from '../../controllers/ChatController';
import ChatsList from '../../components/chatsList';
import WSController from '~/controllers/WSController';
import MessengesArea from '~components/messagesArea';
// import { errorMessage } from '../../utils/ui';

class MainPage extends Block {
  constructor() {
    super('main', {});
    this.element!.classList.add('page_main');
    // ChatController.getChats(0, 10, '');

    ChatController.getChats(0, 10, '').finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true,
      });
    });

    // подписываемся на событие
    store.on(StorageEvent.UpdateState, () => {
      // вызываем обновление компонента, передав данные из хранилища
      this.setProps(store.getState());
    });

    // закрытие открытых модалов при клике снаружи
    this.element!.addEventListener('click', (e) => {
      const modals = Object
        .values(this.children)
        .filter((child) => child instanceof Modal);

      modals.forEach((modal) => {
        if (!e.composedPath().includes(modal.getContent())) {
          if (modal.props.visible) {
            modal.hide();
            modal.setProps({ visible: false });
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
          console.log('createChat');
          if (this.children.createChatModal.props.visible) {
            this.children.createChatModal.hide();
            this.children.createChatModal.setProps({ visible: false });
          } else {
            this.children.createChatModal.show();
            this.children.createChatModal.setProps({ visible: true });
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
          console.log('clicked', this.children.attachModal);
          if (this.children.attachModal.props.visible) {
            this.children.attachModal.hide();
            this.children.attachModal.setProps({ visible: false });
          } else {
            this.children.attachModal.show();
            this.children.attachModal.setProps({ visible: true });
          }
        },
      },
    });
    this.children.buttonSend = new Button({
      view: 'send',
      events: {
        click: () => {
          const input = this.children.inputMessage as Input;
          const message = input.getValue();
          console.log('clicked', message);
          input.setValue('');

          WSController.sendMessage(this.props.selectedChat!.id, message);
        },
      },
    });
    this.children.buttonMenu = new Button({
      view: 'menu',
      events: {
        click: (e:MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('clicked', this.children.attachModal);
          if (this.children.menuModal.props.visible) {
            this.children.menuModal.hide();
            this.children.menuModal.setProps({ visible: false });
          } else {
            this.children.menuModal.show();
            this.children.menuModal.setProps({ visible: true });
          }
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

    this.children.linkLogin = new Link({
      href: '/',
      label: 'Login',
      // events: {
      //   click: (e:any) => {
      //     e.preventDefault();
      //     Router.go('/login');
      //   },
      // },
    });
  }

  protected componentDidUpdate(oldProps: State, newProps: State): boolean {
    if (newProps.selectedChat) {
      this.children.avatar.setProps({
        src: newProps.selectedChat.avatar !== null ? `https://ya-praktikum.tech/api/v2/resources${newProps.selectedChat.avatar}` : undefined,
      });

      // this.setProps({ selectedChat: newProps.selectedChat });
    }

    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    if (this.props.selectedChat) {
      if (this.props.selectedChat.avatar !== null) {
        this.children.avatar.setProps({
          src: `https://ya-praktikum.tech/api/v2/resources${this.props.selectedChat.avatar}`,
        });
      }
    }
    if (this.props.isOpenUserModal) {
      this.children.userModal.show();
      this.children.userModal.setProps({
        visible: this.props.isOpenUserModal,
      });
    } else {
      this.children.userModal.hide();
      this.children.userModal.setProps({
        visible: this.props.isOpenUserModal,
      });
    }

    return this.compile(template, { ...this.props.selectedChat });
  }
}

export default MainPage;
