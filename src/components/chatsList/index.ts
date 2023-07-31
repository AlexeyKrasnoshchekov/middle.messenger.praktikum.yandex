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

class ChatsListBase extends Block<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super('fragment', { ...props });
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

  protected render(): DocumentFragment {
    if (this.props.chats) {
      this.children.chats = this.createChats(this.props.chats, this.props.selectedChatId);
    }
    return this.compile(template, { ...this.props });
  }
}

function mapStateToProps(state: State) {
  return { chats: state.chats, selectedChatId: state.selectedChatId };
}

const ChatsList:any = withStore(mapStateToProps)(ChatsListBase);

export default ChatsList;
