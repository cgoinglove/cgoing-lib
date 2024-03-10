import { OneTimeExecution } from '📦/one-time-excution';
import { randomRange, wait } from '🛠️';

/**
 * @read
 */

test('one-time-excution', async () => {
  let index = 0;

  const fetchIndex = async () => {
    await wait(randomRange(1000, 3000));
    return index++;
  };

  const worker = new OneTimeExecution();
  worker.setTask(fetchIndex);

  const values = await Promise.all([
    worker.execute(),
    worker.execute(),
    worker.execute(),
    worker.execute(),
    worker.execute(),
  ]);

  expect(values).toEqual([0, 0, 0, 0, 0]);
});
