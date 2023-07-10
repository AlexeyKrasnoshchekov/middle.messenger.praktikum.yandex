type Indexed<T = unknown> = {
  [key in string]: T;
};

// eslint-disable-next-line import/prefer-default-export
export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  let obj;
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (typeof object !== 'object') {
    obj = object;
  } else {
    const arr = path.split('.');
    obj = {};
    if (arr.length !== 0) {
      let pointer:{ [index: string]:any } = obj;
      arr.forEach((elem:string, i:number) => {
        if (!pointer[elem]) {
          pointer[elem] = i === arr.length - 1 ? value : {};
        }

        pointer = pointer[elem];
      });
    }
    obj = Object.assign(object, obj);
  }
  return obj;
}
