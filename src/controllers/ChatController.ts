import store from '../utils/store';
import ChatAPI, { ChatInfo } from '../api/ChatAPI';
import WSController from './WSController';
// import router from '../utils/router';
// import store from '../utils/store';

class ChatController {
  private api = new ChatAPI();

  getToken(id:number) {
    return this.api.getToken(id);
  }

  async getUsers(id:number) {
    let users;
    try {
      users = await this.api.getUsers(id);
    } catch (error) {
      console.log(error);
    }
    return users;
  }

  async getChats(offset:number, limit: number, title: string) {
    const chats = await this.api.getChats(offset, limit, title);

    chats.map(async (chat:ChatInfo) => {
      const token = await this.getToken(chat.id);
      // chat.token = token;
      // chat.users = await this.getUsers(chat.id);
      await WSController.connect(chat.id, token);
    });

    store.set('chats', chats);
  }

  async getNewMessages(id:number) {
    try {
      await this.api.getNewMessages(id);
    } catch (error) {
      console.log(error);
    }
  }

  async removeChat(id:number) {
    try {
      await this.api.removeChat(id);
    } catch (error) {
      console.log(error);
    }
  }

  async removeUser(chatId:number, userId:number) {
    try {
      await this.api.removeUser(chatId, userId);
    } catch (error) {
      console.log(error);
    }
  }

  async addUser(chatId:number, userId:number) {
    try {
      await this.api.addUser(chatId, userId);
    } catch (error) {
      console.log(error);
    }
  }

  async addAvatar(data:FormData) {
    try {
      await this.api.addAvatar(data);
    } catch (error) {
      console.log(error);
    }
  }

  async addChat(name:string) {
    try {
      await this.api.addChat(name);
    } catch (error) {
      console.log(error);
    }
  }

  async selectChat(chatId: number) {
    console.log('selectChat', chatId);
    const chatUsers = await this.getUsers(chatId);
    const users = chatUsers!.map((user) => user.login);

    store.set('selectedChatId', chatId);
    store.set('chatUsers', users);
    // store.set('selectedChat', selChat);
  }
}

export default new ChatController();
