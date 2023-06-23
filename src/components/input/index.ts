import Block from '../../utils/block';
import template from './input.hbs';

interface InputProps {
  placeholder:string,
  type: string,
  id: string,
  class?: string,
  name: string,
  required: boolean,
  events: {
    input: (arg0:any) => void
  }
}

class Input extends Block {
  constructor(props: InputProps) {
    console.log('props', props);
    super('fragment', props);
    // this.element!.classList.add(`${props.class}`);
  }

  render() {
    return this.compile(template, { 
      placeholder: this.props.placeholder,
      class:  this.props.class,
      name: this.props.name, 
      id: this.props.id, 
      type: this.props.type, 
      required: this.props.required
    });
  }
}

export default Input;
