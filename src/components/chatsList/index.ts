import template from './chatsList.hbs';
import ChatsController from '../../controllers/ChatController';
import { State, withStore } from '../../utils/store';
import ChatItem from '../chatItem';
import Block from '../../utils/block';
import { ChatInfo } from '../../api/ChatAPI';

interface ChatsListProps {
  chats?: ChatInfo[];
  isLoaded: boolean;
  selectedChatId: number;
}

class ChatsListBase extends Block {
  constructor() {
    super('fragment', {});
  }

  protected init() {
    this.children.chats = [];
  }

  // eslint-disable-next-line class-methods-use-this
  private createChats(chats: ChatInfo[], selectedChatId:number) {
    const chats1 = chats;
    return chats1.map((chat) => new ChatItem({
      ...chat,
      selectedChatId,
      events: {
        click: () => {
          ChatsController.selectChat(chat.id);
        },
      },
    }));
  }

  protected componentDidUpdate(_oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
    if (newProps.chats) {
      this.children.chats = this.createChats(newProps.chats, newProps.selectedChatId);
    }

    return true;
  }

  protected render(): DocumentFragment {
    if (this.props.chats) {
      this.children.chats = this.createChats(this.props.chats, this.props.selectedChatId);
    }
    return this.compile(template, { ...this.props });
  }
}

function mapStateToProps(state: State) {
  console.log('state111', state);
  return { chats: state.chats, selectedChatId: state.selectedChatId };
}

const ChatsList:any = withStore(mapStateToProps)(ChatsListBase);

export default ChatsList;
