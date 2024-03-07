import { Holder } from './holder';

export class AsyncQueue {
  private promise: Promise<any>;

  constructor() {
    this.promise = Promise.resolve();
  }

  add<T = void>(task: () => Promise<T>) {
    return new Promise<T>((resolve, reject) => {
      this.promise = this.promise.then(() =>
        task().then(resolve).catch(reject),
      );
    });
  }
}

export const createAsyncQueueManager = () => {
  const queues = new Map<string, AsyncQueue>();
  const holder = new Holder();
  holder.resolve();
  const AddAsyncQueue = <T = void>(key: string, task: () => Promise<T>) => {
    if (!queues.has(key)) {
      queues.set(key, new AsyncQueue());
    }
    const queue = queues.get(key)!;
    const wrapper = async () => {
      await holder.promise;
      return task();
    };
    return queue.add<T>(wrapper);
  };

  AddAsyncQueue.holder = holder;

  return AddAsyncQueue;
};

export const ChatAsyncQueue = createAsyncQueueManager();
