import store from '../utils/store';
import { Message } from '../types/index';

import WSTransport, { WSTransportEvents } from '../utils/WSTRansport';

class WSController {
  private sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {
    if (this.sockets.has(id)) {
      return;
    }

    const state = store.getState();
    const userId = state!.user!.id;

    // eslint-disable-next-line max-len
    const wsTransport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId!}/${id!}/${token!}`);

    this.sockets.set(id, wsTransport);

    await wsTransport.connect();

    this.subscribe(wsTransport, id);
    this.fetchOldMessages(id);
  }

  private subscribe(transport: WSTransport, id: number) {
    transport.on(WSTransportEvents.Message, (message:any) => this.onMessage(id, message));
    transport.on(WSTransportEvents.Close, () => this.onClose(id));
  }

  private onClose(id: number) {
    this.sockets.delete(id);
  }

  // eslint-disable-next-line class-methods-use-this
  private onMessage(id: number, messages: Message | Message[]) {
    let messagesToAdd: Message[] = [];

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currentMessages = (store.getState().messages || {})[id] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    // let obj = {
    //   messages: messagesToAdd,
    //   id,
    // }

    store.set(`messages.${id}`, messagesToAdd);
    // store.set('messages', obj);
  }

  //   async setStore(id: number, messages:Message[]) {
  //     await store.set(`messages.${id}`, messages);
  //   }

  sendMessage(id: number, message: string) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({
      type: 'message',
      content: message,
    });
  }

  fetchOldMessages(id: number) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({ type: 'get old', content: '0' });
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close());
  }
}

export default new WSController();
