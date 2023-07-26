/* eslint-disable max-classes-per-file */
import EventBus from './event-bus';
import { set } from './index';
import { ChatInfo } from '../api/ChatAPI';
import { IUser } from '../api/AuthAPI';
import { Message } from '../types/index';

export interface State {
  user?: IUser;
  profileView: string;
  isOpenUserModal: boolean;
  userModalAction: string;
  chats?: ChatInfo[];
  messages: Record<number, Message[]>;
  selectedChat?: ChatInfo;
}

export enum StorageEvent {
  UpdateState = 'update',
}

class Store extends EventBus {
  private state: State = {
    isOpenUserModal: false,
    userModalAction: '',
    profileView: 'profile',
    messages: [],
  };

  getState() {
    return this.state;
  }

  set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StorageEvent.UpdateState, this.state);
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: State) => any) {
  return (Component: any) => class extends Component {
    constructor(props: any) {
      super('div', { ...props, ...mapStateToProps(store.getState()) });

      store.on(StorageEvent.UpdateState, () => {
        const propsFromState = mapStateToProps(store.getState());
        this.setProps(propsFromState);
      });
    }
  };
}

export default store;
