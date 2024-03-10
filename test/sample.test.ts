import { increment } from '🛠️';

test('Symbol-Test', () => {
  const symbol = Symbol('cgoing');

  const Row = {
    name: 'Choi SungKeun',
    age: 31,
    [symbol]: 'is Symbol Value',
  };

  console.log(Row);

  expect(symbol).toBe(symbol);
  expect(Object.keys(Row).length).toBe(2);
});
