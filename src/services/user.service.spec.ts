import { UserService } from './user.service';
import {
  User,
  IUserCreate,
  IUserLogin,
  IAuth,
} from '../models/interfaces/user.interface';
import fetchMock from 'jest-fetch-mock';

jest.mock('node-fetch', () => fetchMock);
fetchMock.enableMocks();

describe('UserService', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('logIn', async () => {
    const auth: IAuth = {
      identity: 'test@example.com',
      password: 'password123',
    };

    const mockUserLogin: IUserLogin = {
      record: {
        avatar: '',
        collectionId: '1',
        collectionName: 'Test Collection',
        created: '2023-03-27T00:00:00.000Z',
        email: 'test@example.com',
        emailVisibility: true,
        id: '1',
        name: 'Test User',
        updated: '2023-03-27T00:00:00.000Z',
        username: 'testuser',
        verified: false,
      },
      token: 'test_token',
    };

    fetchMock.mockResponse(JSON.stringify(mockUserLogin));

    const result = await UserService.logIn(auth);
    expect(result).toEqual(mockUserLogin);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('signUp', async () => {
    const newUser: IUserCreate = {
      email: 'test@example.com',
      emailVisibility: true,
      password: 'password123',
      passwordConfirm: 'password123',
      name: 'Test User',
    };

    const createdUser: User = {
      avatar: '',
      collectionId: '1',
      collectionName: 'Test Collection',
      created: '2023-03-27T00:00:00.000Z',
      email: 'test@example.com',
      emailVisibility: true,
      id: '1',
      name: 'Test User',
      updated: '2023-03-27T00:00:00.000Z',
      username: 'testuser',
      verified: false,
    };

    fetchMock.mockResponse(JSON.stringify(createdUser));

    const result = await UserService.signUp(newUser);
    expect(result).toEqual(createdUser);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
