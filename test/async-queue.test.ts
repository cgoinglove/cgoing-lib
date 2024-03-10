import { AsyncQueue } from '📦/async-queue';
import { randomRange, wait } from '🛠️';

test('async-queue', () => {
  const queue = new AsyncQueue();

  const genResolveFunction = (name: string) => () =>
    new Promise(resolve => {
      console.log(`name: ${name}`);
      return wait(1000).then(() => resolve(name));
    });

  queue.add(genResolveFunction('cgoing'));
  queue.add(genResolveFunction('stella'));
  // 3. reject 에 대한
});
