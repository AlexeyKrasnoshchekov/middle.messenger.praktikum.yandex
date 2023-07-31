/* eslint-disable max-len */
enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type Options = {
  method?: METHODS;
  data?: any;
  timeout?: number
};

function queryStringify(data:Record<string, any>) {
  if (typeof data === 'undefined') {
    return '';
  }
  if (Object.keys(data).length === 0) {
    return '';
  }
  return `?${Object.keys(data).map((key) => `${key}=${data[key]}`).join('&')}`;
}

class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  get<Response>(url:string, options?: Options):Promise<Response> {
    let url1 = '';
    if (options) {
      url1 = options.data
        ? this.endpoint + url + queryStringify(options.data) : this.endpoint + url;
    } else {
      url1 = this.endpoint + url;
    }
    return this.request<Response>(

      url1,
      { ...options, method: METHODS.GET, timeout: 5000 },
    );
  }

  put<Response = void>(url:string, options = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + url, { ...options, method: METHODS.PUT, timeout: 5000 });
  }

  post<Response = void>(url:string, options = {}):Promise<Response> {
    return this.request<Response>(this.endpoint + url, { ...options, method: METHODS.POST, timeout: 5000 });
  }

  delete<Response>(url:string, options = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + url, { ...options, method: METHODS.DELETE, timeout: 5000 });
  }

  // eslint-disable-next-line class-methods-use-this
  request<Response>(url: string, options: Options): Promise<Response> {
    const { method, data, timeout } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method!, url, true);
      xhr.timeout = timeout!;

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default HTTPTransport;
