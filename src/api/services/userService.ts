import apiClient from '../apiClient';

import { UserInfo, UserToken } from '#/entity';
import { getItem } from '@/utils/storage';
import { StorageEnum } from '#/enum';

const token = getItem<UserToken>(StorageEnum.Token);
export interface SignInReq {
  username: string;
  password: string;
}

export interface SignUpReq extends SignInReq {
  email: string;
}
export type SignInRes = UserToken & { user: UserInfo };

export enum UserApi {
  SignIn = '/user/login',
  SignUp = '/auth/signup',
  Logout = '/auth/logout',
  User = '/user/info',
  UserList = '/user/list',
}

const signin = (data: SignInReq) => apiClient.post<SignInRes>({ url: UserApi.SignIn, data });
const signup = (data: SignUpReq) => apiClient.post<SignInRes>({ url: UserApi.SignUp, data });
const logout = () => apiClient.get({ url: UserApi.Logout });
const userInfo = () => apiClient.get<UserInfo>({ url: UserApi.User, headers: { Authorization: `Bearer ${token}` } });
const userList = (data: { page: number; limit: number }) => apiClient.get<{ list: UserInfo[]; total: number; page: number, limit: number }>({ url: UserApi.UserList, data });
export default {
  signin,
  signup,
  userInfo,
  logout,
  userList,
};
