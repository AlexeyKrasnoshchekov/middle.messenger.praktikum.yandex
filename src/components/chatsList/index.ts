import template from './chatsList.hbs';
import ChatsController from '../../controllers/ChatController';
import { State, withStore } from '../../utils/store';
import ChatItem from '../chatItem';
import Block from '../../utils/block';
import { ChatInfo } from '../../api/ChatAPI';

interface ChatsListProps {
  chats?: ChatInfo[];
  isLoaded: boolean;
  selectedChat: ChatInfo;
}

class ChatsListBase extends Block<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super(null, { ...props });

    // store.on(StorageEvent.UpdateState, () => {
    //   // вызываем обновление компонента, передав данные из хранилища
    //   this.setProps(store.getState());
    // });
  }

  protected init() {
    this.children.chats = [];
    // this.children.profileLink = new Link({ to: '/profile', label: 'Профиль' });
  }

  // protected componentDidUpdate(oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
  //   this.children.chats = this.createChats(newProps.chats!, newProps.selectedChat);

  //   return true;
  // }

  // eslint-disable-next-line class-methods-use-this
  private createChats(chats: ChatInfo[], selectedChat:ChatInfo) {
    return chats.map((chat) => new ChatItem({
      ...chat,
      selectedChat,
      events: {
        click: () => {
          ChatsController.selectChat(chat);
        },
      },
    }));
  }

  protected render(): DocumentFragment {
    if (this.props.chats) {
      // console.log('this.props999', this.props.chats[0]);
      // const selectedChat = this.props.selectedChat ? this.props.selectedChat : this.props.chats[0];
      this.children.chats = this.createChats(this.props.chats, this.props.selectedChat);
    }
    return this.compile(template, { ...this.props });
  }
}

function mapStateToProps(state: State) {
  console.log('state555', state);
  return { ...state };
}

const ChatsList = withStore(mapStateToProps)(ChatsListBase);

export default ChatsList;
