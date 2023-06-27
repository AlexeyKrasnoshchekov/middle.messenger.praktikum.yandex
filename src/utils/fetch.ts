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
  get(url:string, options: Options) {
    return this.request(
      url + queryStringify(options.data),
      { ...options, method: METHODS.GET, timeout: 5000 },
    );
  }

  put(url:string, options = {}) {
    return this.request(url, { ...options, method: METHODS.PUT, timeout: 5000 });
  }

  post(url:string, options = {}) {
    return this.request(url, { ...options, method: METHODS.POST, timeout: 5000 });
  }

  delete(url:string, options = {}) {
    return this.request(url, { ...options, method: METHODS.DELETE, timeout: 5000 });
  }

  // eslint-disable-next-line class-methods-use-this
  request(url: string, options: Options): Promise<XMLHttpRequest> {
    const { method, data, timeout } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = timeout;
      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.open(method, url);
        xhr.send();
      } else {
        xhr.open(method, url);
        xhr.send(data);
      }
    });
  }
}

export default HTTPTransport;
