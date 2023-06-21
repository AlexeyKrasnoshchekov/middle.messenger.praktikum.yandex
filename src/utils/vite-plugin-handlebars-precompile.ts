import { PluginOption } from 'vite';
import Handlebars from 'handlebars';

export default function handlebarsPrecompile(): PluginOption {
  const fileRegex = /\.hbs$|\.handlebars$/;

  return {
    name: 'vite-plugin-handlebars-precompile',

    transform(src: string, id: string) {
      if (!fileRegex.test(id)) {
        return;
      }

      const code = `
                import Handlebars from 'handlebars/runtime';
                export default Handlebars.template(${Handlebars.precompile(src)});
            `;

      return {
        code,
      };
    },
  };
}
