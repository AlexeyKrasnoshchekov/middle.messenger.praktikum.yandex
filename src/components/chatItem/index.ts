import Avatar from '../avatar/index';
import Block from '../../utils/block';
import template from './chatItem.hbs';
import { ChatInfo } from '../../api/ChatAPI';
// import { State, withStore } from '../../utils/store';

interface ChatItemProps {
  id: number;
  title: string;
  unread_count: number;
  selectedChat?: ChatInfo;
  events: {
    click: () => void;
  }
}

class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super(null, props);
  }

  init() {
    this.children.avatar = new Avatar({
      class: 'avatar',
      alt: 'аватар чата',
      src: '',
    });
  }

  render() {
    if (this.props.avatar) {
      this.children.avatar.setProps({
        src: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
      });
    }

    const date = new Date(this.props.last_message?.time).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
    return this.compile(template, {
      sender: `${this.props.last_message?.user.first_name ? this.props.last_message?.user.first_name : ''} ${this.props.last_message?.user.second_name ? this.props.last_message?.user.second_name : ''}`,
      text: this.props.last_message?.content,
      time: date.split(' ')[1],
      date: date.split(' ')[0].replace(',', ''),
      unread: this.props.unread_count,
      title: `Title: ${this.props.title}`,
      isSelected: this.props.id === this.props.selectedChat?.id,
    });
  }
}

// function mapStateToProps(state: State) {
//   console.log('rrr', state);
//   return { ...state };
// }

// const ChatItem = withStore(mapStateToProps)(ChatItemBase);

export default ChatItem;
