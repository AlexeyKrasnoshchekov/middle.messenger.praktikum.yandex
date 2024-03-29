import Icon from '../icon';
import Block from '../../utils/block';
import template from './button.hbs';

interface ButtonProps {
  label?:string,
  view:string,
  type?:string,
  icon?:HTMLElement,
  disabled?:boolean,
  events?: {
    click: (arg0:MouseEvent) => void
    keydown?: (arg0:KeyboardEvent) => void
  }
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', props);

    if (props.disabled) {
      this.element!.classList.add('disabled');
    }
    if (props.view === 'form') {
      if (props.type === 'submit') {
        this.element!.setAttribute('type', 'submit');
      }
      this.element!.classList.add('button_form');
    }
    if (props.view === 'back') {
      this.element!.classList.add('button_back');
    }
    if (props.view === 'send') {
      this.element!.classList.add('button_send');
    }
    if (props.view === 'attach') {
      this.element!.classList.add('button_attach');
    }
    if (props.view === 'menu') {
      this.element!.classList.add('button_menu');
    }
    if (props.view === 'link') {
      this.element!.classList.add('button_link');
    }
    if (props.view === 'iconButton') {
      this.element!.classList.add('button_icon');
    }
  }

  init() {
    if (
      this.props.view === 'menu'
      || this.props.view === 'back'
      || this.props.view === 'send'
      || this.props.view === 'attach'
      || this.props.view === 'image'
      || this.props.view === 'file'
      || this.props.view === 'location'
      || this.props.view === 'plus'
      || this.props.view === 'minus'
      || this.props.view === 'close'
    ) {
      this.children.icon = new Icon({ view: this.props.view });
    }
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      isFormButton: this.props.view === 'form',
      isBackButton: this.props.view === 'back',
      isSendButton: this.props.view === 'send',
      isAttachButton: this.props.view === 'attach',
      isMenuButton: this.props.view === 'menu',
      isLinkButton: this.props.view === 'link',
      isImageButton: this.props.view === 'image',
      isFileButton: this.props.view === 'file',
      isLocationButton: this.props.view === 'location',
      isPlusButton: this.props.view === 'plus',
      isMinusButton: this.props.view === 'minus',
      isCloseButton: this.props.view === 'close',
    });
  }
}

export default Button;
