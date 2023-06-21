import template from './form.hbs';
import Button from '../button';
import Block from '../../utils/block';
// import Handlebars from 'handlebars/runtime';

// Handlebars.registerPartial('form', template);


class Form extends Block {
  constructor() {
    super('form');
  }

  init () {
    this.children.button = new Button({
      label: 'Click me',
      events: {
        click: (e:any) => {
          e.preventDefault();
          console.log('clicked');
        },
      },
    });

    
  }

  render() {
    return this.compile(template, {});
  }
}

export default Form;
