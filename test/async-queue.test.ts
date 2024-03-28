import { AsyncQueue } from '📦/async-queue';
import { createIncrement, wait } from '🛠️';

/**
 * @desc 비동기 함수를 직렬처리 하는 Class 이다.
 */

test(
  'resolve timeout',
  async () => {
    const queue = new AsyncQueue();

    const now = Date.now();
    queue.push(wait.bind(null, 400));

    queue.push(wait.bind(null, 300));

    queue.push(wait.bind(null, 200));

    await queue.push(wait.bind(null, 100));

    const timeout = Date.now() - now;
    /**
     * 직력처리로 인한 400+300+200+100 의 예상 시간 test
     */
    expect(timeout).toBeGreaterThanOrEqual(950);
    expect(timeout).toBeLessThanOrEqual(1050);
  },
  {
    timeout: 20000
  }
);

test(
  '비동기함수 실행 순서',
  async () => {
    const increment = createIncrement();

    const queue = new AsyncQueue();

    const result: number[] = [];

    queue.push(wait).then(() => result.push(increment()));
    queue.push(wait).then(() => result.push(increment()));
    queue.push(wait).then(() => result.push(increment()));
    await queue.push(wait).then(() => result.push(increment()));

    expect(result).toEqual([0, 1, 2, 3]);
  },
  {
    timeout: 20000
  }
);
