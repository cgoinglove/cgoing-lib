import { increment } from '🛠️';

test('sample test', () => {
  console.log(`Hello Cgoing!`);

  expect(increment()).toBe(0);
  expect(increment()).toBe(1);
});
