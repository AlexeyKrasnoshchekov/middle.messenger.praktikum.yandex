import Block from '../utils/block';
import router from '../utils/router';

export function withRouter(Component: typeof Block) {
  type Props = typeof Component extends typeof Block<infer P extends Record<string, any>> ? P : any;

  return class extends Component {
    constructor(props: Props & PropsWithRouter) {
      super('fragment', { ...props, router });
    }
  };
}

export interface PropsWithRouter {
  router: typeof router;
}
