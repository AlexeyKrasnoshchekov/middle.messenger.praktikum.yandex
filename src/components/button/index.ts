import Block from '../../utils/block';
import template from './button.hbs';

interface ButtonProps {
  label?:string,
  view:string,
  type?:string,
  events: {
    click: (arg0:any) => void
  }
}

class Button extends Block {
  constructor(props: ButtonProps) {
    console.log('props', props);
    super('button', props);
    props.view === 'form' && this.element!.classList.add('button_form');
    props.view === 'back' && this.element!.classList.add('button_back');
    props.view === 'send' && this.element!.classList.add('button_send');
    props.view === 'attach' && this.element!.classList.add('button_attach');
    props.view === 'menu' && this.element!.classList.add('button_menu');
  }

  render() {
    return this.compile(template, { 
        label: this.props.label,
        isFormButton: this.props.view === 'form',
        isBackButton: this.props.view === 'back',
        isSendButton: this.props.view === 'send',
        isAttachButton: this.props.view === 'attach',
        isMenuButton: this.props.view === 'menu',
    });
  }
}

export default Button;
