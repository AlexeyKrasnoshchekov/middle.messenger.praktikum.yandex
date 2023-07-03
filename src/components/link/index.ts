import Block from '../../utils/block';
import template from './link.hbs';

interface LinkProps {
  href:string,
  label?:string,
  events?: {
    click: (arg0:any) => void
  }
}

class Link extends Block {
  constructor(props: LinkProps) {
    super('fragment', props);
    this.getContent()?.classList.add('linkWrapper');
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      href: this.props.href,
    });
  }
}

export default Link;
