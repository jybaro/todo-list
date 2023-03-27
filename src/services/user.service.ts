import { API_URL } from '../constants/env';
import {
  User,
  IAuth,
  IUserLogin,
  IUserCreate,
} from '../models/interfaces/user.interface';

const logIn = async (auth: IAuth): Promise<IUserLogin> => {
  const response = await fetch(`${API_URL}/users/auth-with-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(auth),
  });
  return response.json();
};

const signUp = async (user: IUserCreate): Promise<User> => {
  const response = await fetch(`${API_URL}/users/records`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const UserService = {
  signUp,
  logIn,
};
