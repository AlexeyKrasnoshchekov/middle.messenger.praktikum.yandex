import Block from '../../utils/block';
import template from './input.hbs';

interface InputProps {
  placeholder?:string,
  type: string,
  id: string,
  class?: string,
  value?: string,
  name: string,
  required: boolean,
  events: {
    input: (arg0:InputEvent) => void
    focusout?: () => void
    change?: (arg0:any) => void
    keydown?: (arg0:KeyboardEvent) => void
  }
}

class Input extends Block {
  constructor(props: InputProps) {
    super('fragment', props);
    // this.element!.classList.add(`${props.class}`);
  }

  public getName() {
    return (this.element!.querySelector('input') as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element!.querySelector('input') as HTMLInputElement).value;
  }

  public setValue(value: string) {
    const elem = this.getHTMLElement();
    elem.value = value;
    return elem;
  }

  public getHTMLElement() {
    return (this.element!.querySelector('input') as HTMLInputElement);
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
