import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const x = { a: 2, b: 3, action: Action.Add };
    expect(simpleCalculator(x)).toBe(5);
  });

  test('should subtract two numbers', () => {
    const x = { a: 5, b: 3, action: Action.Subtract };
    expect(simpleCalculator(x)).toBe(2);
  });

  test('should multiply two numbers', () => {
    const x = { a: 5, b: 3, action: Action.Multiply };
    expect(simpleCalculator(x)).toBe(15);
  });

  test('should divide two numbers', () => {
    const x = { a: 30, b: 3, action: Action.Divide };
    expect(simpleCalculator(x)).toBe(10);
  });

  test('should exponentiate two numbers', () => {
    const x = { a: 2, b: 5, action: Action.Exponentiate };
    expect(simpleCalculator(x)).toBe(32);
  });

  test('should return null for invalid action', () => {
    const x = { a: 2, b: 5, action: 'Action.Add' };
    expect(simpleCalculator(x)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const x = { a: '2', b: '5', action: Action.Add };
    expect(simpleCalculator(x)).toBeNull();
  });
});
