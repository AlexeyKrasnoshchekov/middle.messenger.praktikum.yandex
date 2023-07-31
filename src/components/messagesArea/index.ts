import template from './mess.hbs';
import { State, withStore } from '../../utils/store';
import Block from '../../utils/block';
import MessageElem from '../message';
import { Message } from '../../types/index';
import { ChatInfo } from '../../api/ChatAPI';

interface MessengesAreaProps {
  selectedChat: number | undefined;
  messages: Message[];
  userId: number;
}

class MessengesAreaBase extends Block {
  constructor() {
    super('div', {});
  }

  protected init() {
    this.children.messages = [];
  }

  // eslint-disable-next-line max-len
  protected componentDidUpdate(_oldProps: MessengesAreaProps, newProps: MessengesAreaProps): boolean {
    this.children.messages = this.formatMessages(newProps.messages, newProps.userId);

    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  private formatMessages(messages: Message[], id:number) {
    // eslint-disable-next-line max-len
    return messages.map((data:Message) => new MessageElem({ ...data, isMine: id === data.user_id }));
  }

  protected render(): DocumentFragment {
    if (this.props.messages) {
      this.children.messages = this.formatMessages(this.props.messages, this.props.userId);
    }
    return this.compile(template, { ...this.props });
  }
}

function mapStateToProps(state: State) {
  let obj = {};

  const { selectedChatId } = state;
  const { user } = state;

  if (!selectedChatId && user) {
    obj = {
      messages: [],
      selectedChat: undefined,
      userId: user.id,
    };
  }
  if (state && state.chats) {
    const [selectedChat] = state!.chats!.filter((chat:ChatInfo) => chat.id === selectedChatId);

    if (selectedChat && user) {
      obj = {
        messages: (state.messages || {})[selectedChatId!] || [],
        selectedChat,
        userId: user.id,
      };
    }
  }

  return obj;
}

const MessengesArea:any = withStore(mapStateToProps)(MessengesAreaBase);

export default MessengesArea;
