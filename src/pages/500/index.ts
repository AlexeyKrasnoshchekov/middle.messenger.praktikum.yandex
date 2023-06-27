import template from './500.hbs';
import Block from '../../utils/block';
import Link from '../../components/link/index';

class Error500Page extends Block {
  constructor() {
    super('main',{});
    this.getContent()?.classList.add('page_not_found');
  }

  init() {
    this.children.link = new Link({
      href: '/',
      label: 'Назад к чатам',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, {});
  }
}

export default Error500Page;
