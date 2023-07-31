/* eslint-disable max-classes-per-file */
import EventBus from './event-bus';
import { isEqual, set } from './index';
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
  selectedChatId?: number;
  selectedChat?: ChatInfo;
  chatUsers?: string[];
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
      // сохраняем начальное состояние
      const state = store.getState();

      super('div', { ...props, ...mapStateToProps(state) });

      store.on(StorageEvent.UpdateState, () => {
        const newState = mapStateToProps(store.getState());

        // если что-то из используемых данных поменялось, обновляем компонент
        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
        }

        this.setProps(newState);
      });
    }
  };
}

export default store;
