import Avatar from '../avatar/index';
import Block from '../../utils/block';
import template from './chatItem.hbs';

interface ChatItemProps {
  src:string,
  sender:string,
  text:string,
  time:string,
  unread:boolean,
  events: {
    click: (arg0:any) => void
  }
}

class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super('div', props);
    this.element!.classList.add('chat_item');
  }

  init() {
    this.children.avatar = new Avatar({
      class: 'avatar',
      alt: 'аватар пользователя',
      src: '',
    });
  }

  render() {
    return this.compile(template, {
      src: this.props.src,
      sender: this.props.sender,
      text: this.props.text,
      time: this.props.time,
      unread: this.props.unread,
    });
  }
}

export default ChatItem;
