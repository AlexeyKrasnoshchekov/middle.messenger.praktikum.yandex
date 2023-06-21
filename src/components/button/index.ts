import Block from '../../utils/block';
import template from './button.hbs';

interface ButtonProps {
  label:string,
  events: {
    click: (any) => void
  }
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', props);
    this.element!.classList.add('button_form');
  }

  render() {
    return this.compile(template, { label: this.props.label });
  }
}

export default Button;
