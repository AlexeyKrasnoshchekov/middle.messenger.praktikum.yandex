import Avatar from '../avatar/index';
import Block from '../../utils/block';
import template from './chatItem.hbs';

interface ChatItemProps {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  selectedChatId?: number;
  events: {
    click: (e:MouseEvent) => void;
  }
}

class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super('fragment', props);
  }

  init() {
    this.children.avatar = new Avatar({
      class: 'avatar',
      alt: 'аватар чата',
      src: '',
    });
  }

  // protected componentDidUpdate(_oldProps: ChatItemProps, newProps: ChatItemProps): boolean {
  //   console.log('newProps111',newProps);
  //   if (newProps.avatar) {
  //     (this.children.avatar as Block).setProps({
  //       src: `https://ya-praktikum.tech/api/v2/resources${newProps.avatar}`,
  //     });
  //   }

  //   return true;
  // }

  render() {
    if (this.props.avatar) {
      (this.children.avatar as Block).setProps({
        src: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
      });
    }

    // eslint-disable-next-line max-len
    const date = new Date(this.props.last_message?.time).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
    return this.compile(template, {
      ...this.props,
      // eslint-disable-next-line max-len
      sender: `${this.props.last_message?.user.first_name ? this.props.last_message?.user.first_name : ''} ${this.props.last_message?.user.second_name ? this.props.last_message?.user.second_name : ''}`,
      text: this.props.last_message?.content,
      time: date.split(' ')[1],
      date: date.split(' ')[0].replace(',', ''),
      unread: this.props.unread_count !== 0 ? this.props.unread_count : undefined,
      title: `Title: ${this.props.title}`,
      isSelected: this.props.id === this.props.selectedChatId,
    });
  }
}

export default ChatItem;
