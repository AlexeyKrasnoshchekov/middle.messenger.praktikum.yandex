import template from './mess.hbs';
import { State, withStore } from '../../utils/store';
import Block from '../../utils/block';
import { Message } from '../../controllers/WSController';
import MessageElem from '../message';

interface MessengesAreaProps {
  selectedChat: number | undefined;
  messages: Message[];
  userId: number;
}

class MessengesAreaBase extends Block<MessengesAreaProps> {
  constructor(props: MessengesAreaProps) {
    super(null, { ...props });

    // store.on(StorageEvent.UpdateState, () => {
    //   // вызываем обновление компонента, передав данные из хранилища
    //   this.setProps(store.getState());
    // });
  }

  protected init() {
    this.children.messages = [];
    // this.children.profileLink = new Link({ to: '/profile', label: 'Профиль' });
  }

  protected componentDidUpdate(oldProps: MessengesAreaProps, newProps: MessengesAreaProps): boolean {
    this.children.messages = this.formatMessages(newProps.messages);

    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  private formatMessages(messages: MessengesAreaProps, id:number) {
    // console.log('props777888', messages);
    return messages.map((data) => new MessageElem({ ...data, isMine: id === data.user_id }));
  }

  protected render(): DocumentFragment {
    console.log('props777888', this.props);
    if (this.props.messages) {
      // console.log('this.props999', this.props.chats[0]);
      // const selectedChat = this.props.selectedChat ? this.props.selectedChat : this.props.chats[0];
      this.children.messages = this.formatMessages(this.props.messages, this.props.userId);
    }
    return this.compile(template, { ...this.props });
  }
}

function mapStateToProps(state: State) {
  console.log('state888', state);

  const { selectedChat } = state;
  const { user } = state;

  if (!selectedChat && user) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: user.id,
    };
  }

  if (selectedChat && user) {
    console.log('selectedChat222', selectedChat!.id);
    return {
      messages: (state.messages || {})[selectedChat!.id] || [],
      selectedChat,
      userId: user.id,
    };
  }
}

const MessengesArea = withStore(mapStateToProps)(MessengesAreaBase);

export default MessengesArea;
