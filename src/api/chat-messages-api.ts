import HTTPTransport from '../utils/fetch';
import { BaseAPI } from './base-api';

const chatMessagesAPIInstance = new HTTPTransport();

class ChatMessagesAPI extends BaseAPI {
  request({ id }) {
    return chatMessagesAPIInstance.get(`/${id}`);
  }
}

export default ChatMessagesAPI;
