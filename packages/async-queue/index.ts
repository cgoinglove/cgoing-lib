export class AsyncQueue {
  private promise: Promise<any>;

  constructor() {
    this.promise = Promise.resolve();
  }
  push<T = void>(task: () => Promise<T>) {
    return new Promise<T>((resolve, reject) => {
      this.promise = this.promise.then(() =>
        task().then(resolve).catch(reject)
      );
    });
  }
  async wait(): Promise<void> {
    await this.promise;
  }
}
