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
            console.log('clicked');
          },
        },
      });
      this.children.image = new Button({
        view: 'image',
        label: 'Фото и Видео',
        events: {
          click: (e:MouseEvent) => {
            e.preventDefault();
            console.log('clicked');
          },
        },
      });
      this.children.location = new Button({
        view: 'location',
        label: 'Локация',
        events: {
          click: (e:MouseEvent) => {
            e.preventDefault();
            console.log('clicked');
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
            console.log('clicked');
            store.set('isOpenUserModal', true);
            store.set('userModalAction', 'del');
            this.hide();
            this.setProps({ visible: false });
            // this.hide();
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
            if (this.props.visible) {
              this.hide();
              this.setProps({ visible: false });
            }
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
            console.log('state', state.selectedChat!.id);

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
            state.selectedChat!.users!.push(user);
            console.log('user', user);

            if (this.props.userModalAction === 'add') {
              await ChatController.addUser(state.selectedChat!.id, user[0].id);
            }
            if (this.props.userModalAction === 'del') {
              await ChatController.removeUser(state.selectedChat!.id, user[0].id);
            }
            this.hide();
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
            console.log('state', state);
            if (window.location.pathname === '/messenger') {
              formData.append('chatId', state.selectedChat!.id.toString());
              ChatController.addAvatar(formData);
            //   const response = await ChatController.addAvatar(formData);
            //   console.log('response',response);
            //   const resData = await response.json();
            //   console.log('resData',resData);
            } else if (window.location.pathname === '/profile') {
              UserController.changeAvatar(formData);
            }
            this.hide();
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
            console.log('first', e.target.files[0]);
            formData.append('avatar', e.target.files[0]);
            // this.setProps({avatar: e.target.files[0]});
            // console.log('formData222',formData.get('file'));
            // store.set('avatar', formData);
            // console.log('first', this.files);
            // const input = this.children.login;
            // const inputHTML = (input as Input).getHTMLElement();
            // const { value } = inputHTML;
            // const valid = value.length > 0 && TestLogin(value);

            // if (!valid) {
            //   if (value.length > 0) {
            //     errorMessage(inputHTML, 'Логин не соответсвует требованиям');
            //   }
            // }
          },
        },
      });
    }
  }

  public getHTMLElement() {
    return (this.element as HTMLDivElement);
  }

  render() {
    if (this.props.userModalAction !== '' && this.props.view === 'user') {
      this.children.action.setProps({ label: this.props.userModalAction === 'add' ? 'Добавить' : 'Удалить' });
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
