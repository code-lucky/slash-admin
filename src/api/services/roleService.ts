import apiClient from '../apiClient';

export enum RoleApi {
  RoleList = '/role/list',
}
const roleList = (data: { page: number; limit: number }) => apiClient.get<{ list: Role[]; total: number; page: number, limit: number }>({ url: RoleApi.RoleList, data });
export default {
  roleList
};
