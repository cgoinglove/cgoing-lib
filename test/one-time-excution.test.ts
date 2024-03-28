import { OneTimeExecution } from '📦/one-time-excution';
import { randomRange, wait } from '🛠️';

/**
 * @read
 */

test('한번만 잘 실행 되는지', async () => {
  let index = 0;

  const updateIndex = async () => {
    await wait(randomRange(100, 300));
    return index++;
  };

  const worker = new OneTimeExecution();
  worker.setTask(updateIndex);

  worker.execute();
  worker.execute();
  worker.execute();
  worker.execute();
  await worker.execute();

  expect(index).toEqual(1);
});

test('같은 result 를 반환 하는지 ', async () => {
  let index = 0;

  const updateIndex = async () => {
    await wait(randomRange(100, 300));

    return index++;
  };

  const worker = new OneTimeExecution();
  worker.setTask(updateIndex);

  const case1 = worker.execute();
  const case2 = worker.execute();
  const case3 = worker.execute();

  expect(await Promise.all([case1, case2, case3])).toEqual([0, 0, 0]);

  const case4 = worker.execute();
  const case5 = worker.execute();

  expect(await Promise.all([case4, case5])).toEqual([1, 1]);
});
