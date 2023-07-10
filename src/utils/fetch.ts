enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type Options = {
  method: METHODS;
  data?: any;
  timeout: number
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

// console.log('111', queryStringify({a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}))

class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  get(url:string, options?: Options) {
    return this.request(
      // this.endpoint + url + queryStringify(options.data),
      this.endpoint + url,
      { ...options, method: METHODS.GET, timeout: 5000 },
    );
  }

  put(url:string, options = {}) {
    return this.request(this.endpoint + url, { ...options, method: METHODS.PUT, timeout: 5000 });
  }

  post(url:string, options = {}) {
    return this.request(this.endpoint + url, { ...options, method: METHODS.POST, timeout: 5000 });
  }

  delete(url:string, options = {}) {
    return this.request(this.endpoint + url, { ...options, method: METHODS.DELETE, timeout: 5000 });
  }

  // eslint-disable-next-line class-methods-use-this
  request(url: string, options: Options): Promise<XMLHttpRequest> {
    const { method, data, timeout } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = timeout;

      xhr.onreadystatechange = (e) => {
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

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default HTTPTransport;
