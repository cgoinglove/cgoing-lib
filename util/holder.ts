export class Holder<T = undefined, E = any> {
  promise: Promise<T>;
  resolve: (value?: T) => void;
  reject: (error?: E) => void;

  constructor() {
    this.hold();
  }
  hold() {
    this.promise = new Promise((resolve, reject) =>
      Object.assign(this, { reject, resolve }),
    );
  }
}

export class OneTimeExecution {
  private isLocked: boolean = false;
  private holder: Holder = new Holder();
  private task: () => Promise<any>;
  constructor(task?: () => Promise<any>) {
    this.task = task!;
    this.holder.resolve();
  }
  get isRunning() {
    return this.isLocked;
  }
  setTask(task: () => Promise<any>) {
    this.task = task;
  }
  async ifRunningWait(): Promise<void> {
    if (this.isLocked) await this.holder.promise;
    return Promise.resolve();
  }
  async execute(): ReturnType<typeof this.task> {
    if (!this.task) throw new Error('Task 는 필수');
    if (this.isLocked) {
      return this.holder.promise;
    }
    this.isLocked = true;
    this.holder.hold();
    try {
      const value = await this.task();
      this.holder.resolve(value);
      return value;
    } catch (e) {
      this.holder.reject(e);
      console.error(e);
      throw e;
    } finally {
      this.isLocked = false;
    }
  }
}
