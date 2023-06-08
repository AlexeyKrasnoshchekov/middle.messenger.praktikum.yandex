import Handlebars from 'handlebars';

Handlebars.registerHelper('if', function (conditional, options) {
  if (conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});




