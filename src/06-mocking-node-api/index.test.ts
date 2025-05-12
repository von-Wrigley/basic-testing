import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import fs from 'fs';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

jest.mock('path');
jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));
jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

const mockReadFile = readFile as jest.Mock;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const timeout = 1000;
  const callback = jest.fn();

  test('should set timeout with provided callback and timeout', () => {
    const x = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(x).toHaveBeenCalledWith(callback, timeout);
    x.mockRestore();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const timeout = 1000;
  const callback = jest.fn();

  test('should set interval with provided callback and timeout', () => {
    const x = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timeout);
    expect(x).toHaveBeenCalledWith(callback, timeout);
    x.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout * 5);
    expect(callback).toHaveBeenCalledTimes(10);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile: string = 'README.md';
  let mockedJoin: jest.Mocked<typeof join>;
  const join2 = join as typeof mockedJoin;

  const fileContent = 'Basic testing';
  const mockExistsSync = existsSync as jest.MockedFunction<typeof existsSync>;

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(pathToFile);
    expect(join2).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const spy = jest.spyOn(fs, 'existsSync').mockImplementation();
    if (spy.mockReturnValue(false)) {
      const xx = await readFileAsynchronously(pathToFile);
      expect(xx).toBeNull();
    }
  });

  test('should return file content if file exists', async () => {
    mockExistsSync.mockReturnValue(true);

    mockReadFile.mockResolvedValue(Buffer.from(fileContent));
    const xx = await readFileAsynchronously('index.txt');
    expect(mockExistsSync).toHaveBeenCalled();
    expect(xx).toBe(fileContent);
    expect(mockReadFile).toHaveBeenCalled();
  });
});

