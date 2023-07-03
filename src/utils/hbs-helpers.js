import Handlebars from 'handlebars';

Handlebars.registerHelper('if', function (conditional, options) {
  if (conditional) {
    return options.fn(this);
  }
  return options.inverse(this);
});
