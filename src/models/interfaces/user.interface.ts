export interface IUserCreate {
  email: string;
  emailVisibility: boolean;
  password: string;
  passwordConfirm: string;
  name: string;
}

export interface User {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  updated: string;
  username: string;
  verified: false;
}

export interface IUserLogin {
  record: User;
  token: string;
}

export interface IAuth {
  identity: string;
  password: string;
}
