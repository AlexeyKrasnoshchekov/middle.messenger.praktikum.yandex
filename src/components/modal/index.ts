/* eslint-disable max-len */
import Button from '../button';
import Block from '../../utils/block';
import template from './modal.hbs';
import Input from '../input';
import UserController from '../../controllers/UserController';
import { errorMessage, TestLogin, TestName } from '../../utils/ui';
import ChatController from '../../controllers/ChatController';
import store, { StorageEvent } from '../../utils/store';

interface ModalProps {
  view:string,
  visible:boolean,
}

class Modal extends Block {
  constructor(props:ModalProps) {
    super('div', props);

    if (
      this.props.view === 'attach'
    ) {
      this.getContent()?.classList.add('modal');
      this.getContent()?.classList.add('modal_attach');
    }
    if (
      this.props.view === 'chat'
    ) {
      this.getContent()?.classList.add('modal');
      this.getContent()?.classList.add('modal_chat');
    }
    if (
      this.props.view === 'menu'
    ) {
      this.getContent()?.classList.add('modal');
      this.getContent()?.classList.add('modal_menu');
    }
    if (
      this.props.view === 'user'
    ) {
      this.getContent()?.classList.add('modal');
      this.getContent()?.classList.add('overlay');
    }
    if (
      this.props.view === 'avatar'
    ) {
      this.getContent()?.classList.add('modal');
      this.getContent()?.classList.add('overlay');
    }

    store.on(StorageEvent.UpdateState, () => {
      // вызываем обновление компонента, передав данные из хранилища
      this.setProps(store.getState());
    });
  }

  init() {
    const formData = new FormData();
    if (
      this.props.view === 'attach'
    ) {
      this.children.file = new Button({
        view: 'file',
        label: 'Файл',
        events: {
          click: (e:MouseEvent) => {
            e.preventDefault();
          },
        },
      });
      this.children.image = new Button({
        view: 'image',
        label: 'Фото и Видео',
        events: {
          click: (e:MouseEvent) => {
            e.preventDefault();
          },
        },
      });
      this.children.location = new Button({
        view: 'location',
        label: 'Локация',
        events: {
          click: (e:MouseEvent) => {
            e.preventDefault();
          },
        },
      });
    }
    if (
      this.props.view === 'menu'
    ) {
      this.children.plus = new Button({
        view: 'plus',
        label: 'Добавить пользователя',
        events: {
          click: (e:MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            store.set('isOpenUserModal', true);
            store.set('userModalAction', 'add');
            this.hide();
            this.setProps({ visible: false });
          },
        },
      });
      this.children.minus = new Button({
        view: 'minus',
        label: 'Удалить пользователя',
        events: {
          click: (e:MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            store.set('isOpenUserModal', true);
            store.set('userModalAction', 'del');
            this.hide();
            this.setProps({ visible: false });
          },
        },
      });
    }
    if (
      this.props.view === 'user'
    ) {
      this.children.closeModal = new Button({
        view: 'close',
        events: {
          click: (e:MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            store.set('isOpenUserModal', false);
          },
        },
      });

      this.children.userLogin = new Input({
        placeholder: 'enter user login',
        type: 'text',
        class: 'form_input',
        id: 'user_login',
        name: 'user_login',
        required: true,
        events: {
          input: (e) => {
            e.preventDefault();
            console.log('typed');
          },
        },
      });

      this.children.action = new Button({
        view: 'form',
        label: 'Добавить',
        events: {
          click: async (e:MouseEvent) => {
            e.preventDefault();
            const state = store.getState();

            const input = this.children.userLogin;
            const inputHTML = (input as Input).getHTMLElement();
            const { value } = inputHTML;
            const valid = value.length > 0 && TestLogin(value);
            if (!valid) {
              if (value.length > 0) {
                errorMessage(inputHTML, 'Логин не соответсвует требованиям');
              }
            }

            const user = await UserController.searchUser(value);

            if (this.props.userModalAction === 'add') {
              await ChatController.addUser(state.selectedChatId!, user[0].id);
              const newChatUsers = state.chatUsers;
              const newChatUsers2 = [...newChatUsers!, user[0].login];
              store.set('chatUsers', newChatUsers2);
              console.log('add');
            }
            if (this.props.userModalAction === 'del') {
              await ChatController.removeUser(state.selectedChatId!, user[0].id);
              const newChatUsers = (state.chatUsers as Array<string>).filter((chatUser) => chatUser !== user[0].login);
              console.log('del');
              store.set('chatUsers', newChatUsers);
            }

            this.hide();
            store.set('isOpenUserModal', false);
          },
        },
      });
    }
    if (
      this.props.view === 'chat'
    ) {
      this.children.chatName = new Input({
        placeholder: 'enter chat name',
        type: 'text',
        class: 'form_input',
        id: 'chat_name',
        name: 'chat_name',
        required: true,
        events: {
          input: (e) => {
            e.preventDefault();
            console.log('typed');
          },
        },
      });
      this.children.createChat = new Button({
        view: 'form',
        label: 'Создать',
        events: {
          click: async (e:MouseEvent) => {
            e.preventDefault();
            const input = this.children.chatName;
            const inputHTML = (input as Input).getHTMLElement();
            const { value } = inputHTML;
            const valid = value.length > 0 && TestName(value);
            if (!valid) {
              if (value.length > 0) {
                errorMessage(inputHTML, 'Имя чата не соответсвует требованиям');
              }
            } else {
              await ChatController.addChat(value);
              await ChatController.getChats(0, 10, '');
              this.hide();
            }
          },
        },
      });
    }
    if (
      this.props.view === 'avatar'
    ) {
      this.children.changeAvatar = new Button({
        view: 'form',
        label: 'Поменять',
        events: {
          click: async (e:MouseEvent) => {
            e.preventDefault();
            const state = store.getState();
            if (window.location.pathname === '/messenger') {
              formData.append('chatId', state.selectedChatId!.toString());

              ChatController.addAvatar(formData).finally(() => {
                ChatController.getChats(0, 10, '');
              });
            } else if (window.location.pathname === '/profile') {
              UserController.changeAvatar(formData).finally(() => {
                ChatController.getChats(0, 10, '');
              });
            }

            this.hide();
            formData.delete('avatar');
            this.setProps({ visible: false });
          },
        },
      });
      this.children.closeModal = new Button({
        view: 'close',
        events: {
          click: (e:MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (this.props.visible) {
              this.hide();
              this.setProps({ visible: false });
            }
          },
        },
      });
      this.children.inputFile = new Input({
        type: 'file',
        class: 'file_input',
        id: 'avatar',
        name: 'avatar',
        required: true,
        events: {
          input: (e) => {
            e.preventDefault();
            console.log('typed');
          },
          change: (e) => {
            formData.append('avatar', e.target.files[0]);
          },
        },
      });
    }
  }

  public getHTMLElement() {
    return (this.element as HTMLDivElement);
  }

  public getProps() {
    return (this.props as ModalProps);
  }

  render() {
    if (this.props.userModalAction !== '' && this.props.view === 'user') {
      // eslint-disable-next-line max-len
      (this.children.action as Block).setProps({ label: this.props.userModalAction === 'add' ? 'Добавить' : 'Удалить' });
    }
    return this.compile(template, {
      isAttachModal: this.props.view === 'attach',
      isMenuModal: this.props.view === 'menu',
      isAvatarModal: this.props.view === 'avatar',
      isChatModal: this.props.view === 'chat',
      isUserModal: this.props.view === 'user',
    });
  }
}

export default Modal;
