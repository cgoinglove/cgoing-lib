import { Holder } from './holder';

/**
 * @read
 *
 * 사용 사례
 *
 *  1.   Authorization AccessToken Expired 시에 RefreshToken 으로 토큰을 갱신 하게 되는데
 *       만약 당시 여러개의 요청을 병렬로 요청하게 되었다면, RefreshToken 을 3번이나 요청하게 된다.
 *       그것을 막기 위해 맨처음 한버만 실행하고 나머지는 맨처음 실행된 Task 가 완료 될 때 까지 기다리고.
 *       해당 응답을 공유 한다.
 */
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
    if (!this.task) throw new Error('Task Is Required');
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
