import Block from '../../utils/block';
import template from './input.hbs';

interface InputProps {
  placeholder:string,
  type: string,
  id: string,
  class?: string,
  value?: string,
  name: string,
  required: boolean,
  events: {
    input: (arg0:any) => void
    focusout?: () => void
  }
}

class Input extends Block {
  constructor(props: InputProps) {
    super('fragment', props);
    // this.element!.classList.add(`${props.class}`);
  }

  public getName() {
    return (this.element.querySelector('input') as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element.querySelector('input') as HTMLInputElement).value;
  }

  public getHTMLElement() {
    return (this.element.querySelector('input') as HTMLInputElement);
  }

  render() {
    return this.compile(template, {
      placeholder: this.props.placeholder,
      class: this.props.class,
      value: this.props.value,
      name: this.props.name,
      id: this.props.id,
      type: this.props.type,
      required: this.props.required,
    });
  }
}

export default Input;
