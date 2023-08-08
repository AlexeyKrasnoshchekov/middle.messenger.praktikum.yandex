import Block from '../../utils/block';
import template from './link.hbs';
import router from '../../utils/router';

interface LinkProps {
  href:string,
  label?:string,
  events?: {
    click: (event: MouseEvent) => void
  }
}

class Link extends Block {
  constructor(props: LinkProps) {
    super('fragment', {
      ...props,
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault();
          this.navigate();
        },
      },
    });
    this.getContent()?.classList.add('linkWrapper');
  }

  navigate() {
    router.go(this.props.href);
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      href: this.props.href,
    });
  }
}

export default Link;
