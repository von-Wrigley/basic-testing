import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 30, b: 2, action: Action.Divide, expected: 15 },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
  { a: 3, b: 2, action: 'Action.Add', expected: null },
  { a: '3', b: '2', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(`returns smth`, ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
