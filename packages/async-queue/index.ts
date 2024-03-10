import { Holder } from '📦/one-time-excution/holder';

/**
 *
 * @read
 *
 * 사용 사례
 *
 *  @todo 자세한 설명은 다시 작성
 *  1. 채팅 서비스를 만들 때, RoomList Fetch, Socket 으로 Chat의 Push
 *     Join Room 을 할때 기존의 Chat List fetch 와 그사이에 새로운 메시지
 *     등 다양하게 채팅의 대한 정보가 꼬일 수 있기 때문에, 클라이언트 사이드에서
 *     queueing 을 한다.
 *  2.
 */

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
