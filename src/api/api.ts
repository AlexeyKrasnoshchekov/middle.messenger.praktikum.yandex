import HTTPTransport from '../utils/HTTPTransport';

abstract class API {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }
}

export default API;
