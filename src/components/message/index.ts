import template from './message.hbs';
import Block from '../../utils/block';

interface MessageProps {
  content: string;
  isMine: boolean;
}

class MessageElem extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super(null, { ...props });
    console.log('props111',props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

export default MessageElem;
