import Block from '../../utils/block';
import template from './avatar.hbs';

interface AvatarProps {
  class:string,
  alt: string,
  src: string
}

class Avatar extends Block {
  constructor(props: AvatarProps) {
    console.log('props', props);
    super('fragment', props);
    this.element!.classList.add(`${props.class}`);
  }

  render() {
    return this.compile(template, { 
      alt: this.props.alt,
      class:  this.props.class,
      src: this.props.src
    });
  }
}

export default Avatar;
