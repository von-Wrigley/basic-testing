import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockResponse = {
  userId: 1,
  id: 3,
  title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
  body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
};

describe('throttledGetDataFromApi', () => {
  const path = '/posts/3';
  let instance: Partial<jest.Mocked<AxiosInstance>>;

  beforeEach(() => {
    instance = {
      get: jest.fn().mockResolvedValue({ data: mockResponse }),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn(), clear: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn(), clear: jest.fn() },
      },
    };
    mockedAxios.create.mockReturnValue(instance as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(path);
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(path);
    expect(instance.get).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi(path);
    expect(data).toEqual(mockResponse);
  });
});
