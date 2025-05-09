import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const x = 'peanut butter';
    const data = await resolveValue(x);
    expect(data).toBe('peanut butter');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'random msg';
    expect(() => {
      throwError(msg);
    }).toThrow(msg);
  });

  test('should throw error with default message if message is not provided', () => {
    const msg = undefined;
    expect(() => {
      throwError(msg);
    }).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {
      throwCustomError();
    }).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
