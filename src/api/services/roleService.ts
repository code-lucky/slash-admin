import { Role } from '#/entity';
import apiClient from '../apiClient';

type CreateAndAuthData = {
  name: string;
  description?: string;
  permissionIds: string[];
};

type UpdateAndAuthData = CreateAndAuthData & {
  id: number;
};

export enum RoleApi {
  RoleList = '/role/list',
  CreateAndAuth = '/role/createAndAuth',
  UpdateAndAuth = '/role/updateAndAuth',
}
const roleList = (data: { page: number; limit: number }) => apiClient.get<{ list: Role[]; total: number; page: number, limit: number }>({ url: RoleApi.RoleList, data });
const createAndAuth = (data: { data:CreateAndAuthData }) => apiClient.post<{ data: any }>({ url: RoleApi.CreateAndAuth, data });
const updateAndAuth = (data: { data:UpdateAndAuthData }) => apiClient.post<{ data: any }>({ url: RoleApi.UpdateAndAuth, data });
export default {
  roleList,
  createAndAuth,
  updateAndAuth,
};
