import { Permission } from '#/entity';
import apiClient from '../apiClient';

export enum PermissionApi {
  PermissionList = '/menu/tree',
}
const permissionList = () => apiClient.get<Permission[]>({ url: PermissionApi.PermissionList });
export default {
  permissionList
};
