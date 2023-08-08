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
    // let messages1 = 0;

    console.log('messages', messages);

    if (Array.isArray(messages)) {
      // messages1 = messages.length;
      messagesToAdd = messages.reverse();
    } else if (messages.type !== 'user connected') {
      messagesToAdd.push(messages);
      // messages1 += messages1;
    }

    // console.log('messages1', messages1);

    const currentMessages = (store.getState().messages || {})[id] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    // const { chats } = store.getState();
    // const selChat = chats!.filter((chat) => chat.id === id);

    // selChat![0].unread_count = messages1;
    // selChat![0].last_message.content = messagesToAdd[messagesToAdd.length - 1].content;
    // selChat![0].last_message.time = messagesToAdd[messagesToAdd.length - 1].time;

    store.set(`messages.${id}`, messagesToAdd);

    // console.log('selChat', selChat);
    // chats![id].last_message = messagesToAdd[messagesToAdd.length - 1];
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
