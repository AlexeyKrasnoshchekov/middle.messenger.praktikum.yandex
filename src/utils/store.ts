/* eslint-disable max-classes-per-file */
import { IUser } from '../api/AuthAPI';
import EventBus from './event-bus';
import { set } from './index';

export interface State {
  user?: IUser;
}

export enum StorageEvent {
  UpdateState = 'update',
}

class Store extends EventBus {
  private state: State = {};

  getState() {
    return this.state;
  }

  set(path: string, value: unknown) {
    set(this.state, path, value);

    console.log(this.state);

    this.emit(StorageEvent.UpdateState, this.state);
  }
}

const store = new Store();

// export function withStore(Component:any) {
//   return class extends Component {
//     constructor(props: any) {
//       const state = store.getState();
//       console.log('props555',props);
//       super('div', { ...props, ...state });

//       store.on(StorageEvent.UpdateState, () => {
//         //   const propsFromState = mapStateToProps(store.getState());
//         this.setProps(state);
//       });
//     }
//   };
// }

export default store;
