import {btnTemplate} from './button.tmpl';
import Handlebars from 'handlebars';

const templateFunc = Handlebars.compile(btnTemplate);
const Button = templateFunc({name: 'igor'});

export default Button;