export const createIncrement = () =>
  (
    (index = 0) =>
    () =>
      index++
  )();

export const increment = createIncrement();

export const isString = (value: any): value is string =>
  typeof value === 'string';

export const isFunction = (value: any): value is Func =>
  typeof value === 'function';

export const isObject = (value: any): value is Record<string, any> =>
  Object(value) === value;

export const isNull = (value: any): value is null | undefined => value == null;

export const jsonCopy = <T>(obj: T): T =>
  obj === undefined ? (undefined as T) : (JSON.parse(JSON.stringify(obj)) as T);

export const randomRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const genArrayRandomBox =
  <T extends Array<any>>(arr: T): (() => ElementType<T>) =>
  () =>
    arr[randomRange(0, arr.length - 1)];

export const genArray = (length: number): number[] =>
  Array.from({ length }, (_, i) => i);

export const insertAt = <T>(
  origin: T[],
  index: number,
  ...values: T[]
): T[] => {
  if (index < 0) return origin;
  if (origin.length < index) origin.splice(origin.length, 0, ...values);
  else origin.splice(index, 0, ...values);
  return origin;
};

export const infinityArray = <T>(arr: T[], startIndex: number = 0) => {
  let cursor = Math.max(startIndex, 0);
  return () => arr[cursor++ % arr.length];
};

export const arrayToObject = <T extends Record<string, any>>(
  arr: T[],
  getKey: (item: T) => string
): Record<string, T> =>
  arr.reduce(
    (prev, item) =>
      Object.assign(prev, {
        [getKey(item)]: item
      }),
    {}
  );

export const shakeArray = <T>(arr: T[]) => {
  const copy = [...arr];
  const result: T[] = [];
  while (copy.length) {
    const index = Math.floor(Math.random() * (copy.length - 1 - 0 + 1) + 0);
    result.push(copy.splice(index, 1)[0]);
  }
  return result;
};

export const deduplicate = <T>(arr: T[], getKey: (item: T) => string): T[] => {
  const map = new Map<string, T>();
  arr.forEach(item => {
    map.set(getKey(item), item);
  });
  return Array.from(map.values());
};

export const groupBy = <T>(arr: T[], getter: keyof T | ((item: T) => string)) =>
  arr.reduce(
    (prev, item) => {
      const key: string =
        getter instanceof Function ? getter(item) : (item[getter] as string);

      if (!prev[key]) prev[key] = [];
      prev[key].push(item);
      return prev;
    },
    {} as Record<string, T[]>
  );

export const noop = () => {};

export const wait = (delay: number = 3000) =>
  new Promise(timeout => setTimeout(timeout, delay));

export const createDebounce = () => {
  let timeout: ReturnType<typeof setTimeout>;

  return (callback: Func, delay: number = 300) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback();
    }, delay);
  };
};

export const createThrottle = (delay: number) => {
  let lock: boolean = false;
  let timeout: ReturnType<typeof setTimeout>;
  let keepCallback: Func | null = null;
  return (callback: Func) => {
    if (lock) {
      keepCallback = callback;
      return;
    }
    callback();
    lock = true;
    keepCallback = null;
    clearTimeout(timeout);
    setTimeout(() => {
      lock = false;
      timeout = setTimeout(() => keepCallback?.(), delay);
    }, delay);
  };
};
