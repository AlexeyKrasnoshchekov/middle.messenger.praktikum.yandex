import template from './notFound.hbs';
import Block from '../../utils/block';
import Link from '../../components/link/index';

class NotFoundPage extends Block {
  constructor() {
    super('main', {});
    this.getContent()?.classList.add('page_not_found');
  }

  init() {
    this.children.link = new Link({
      href: '/messenger',
      label: 'Назад к чатам',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, {});
  }
}

export default NotFoundPage;
