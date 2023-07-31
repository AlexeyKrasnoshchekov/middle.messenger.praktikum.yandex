import API from './api';

export interface ChatUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  role: string
}

export interface ChatInfo {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: ChatUser,
    time: string;
    content: string;
  };
  users?: ChatUser | ChatUser[]
}

class ChatAPI extends API {
  constructor() {
    super('/chats');
  }

  addChat(name: string) {
    const options = {
      data: { title: name },
    };
    return this.http.post('/', options);
  }

  getChats(offset: number, limit: number, title: string): Promise<ChatInfo[]> {
    const options = {
      data: {
        offset,
        limit,
        title,
      },
    };
    return this.http.get('/', options);
  }

  addUser(chatId:number, userId: number) {
    const options = {
      data: { users: [userId], chatId },
    };
    return this.http.put('/users', options);
  }

  addAvatar(data:FormData) {
    const options = {
      data,
    };
    return this.http.put('/avatar', options);
  }

  removeUser(chatId: number, userId: number) {
    const options = {
      data: { users: [userId], chatId },
    };
    return this.http.delete('/users', options);
  }

  removeChat(chatId: number): Promise<unknown> {
    const options = {
      data: { chatId },
    };
    return this.http.delete('/', options);
  }

  getUsers(chatId: number): Promise<Array<ChatUser>> {
    return this.http.get(`/${chatId}/users`);
  }

  async getToken(chatId: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${chatId}`);
    return response.token;
  }

  getNewMessages(chatId: number) {
    return this.http.get(`/new/${chatId}`);
  }
}

export default ChatAPI;
