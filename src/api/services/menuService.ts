import { Permission, Role } from '#/entity';
import apiClient from '../apiClient';

type CreateMenuDto = {
  label: string;
  name: string;
  icon?: string;
  route: string;
  parent_id?: number;
  type?: number;
  sort?: number;
  hide?: boolean;
  frame_src?: string;
  component?: string;
};

type UpdateMenuDto = CreateMenuDto & {
  id: number;
};

export enum MenuApi {
  MenuAll = '/menu/all',
  MenuList = '/menu/list',
  CreateMenu = '/menu/create',
  UpdateMenu = '/menu/update',
  DeleteMenu = '/menu/delete',
  MenuTree = '/menu/tree',
}
const menuAll = () => apiClient.get({ url: MenuApi.MenuAll });
const menuList = (data: { page: number; limit: number }) => apiClient.get<{ list: Role[]; total: number; page: number, limit: number }>({ url: MenuApi.MenuList, data });
const createMenu = (data: { data:CreateMenuDto }) => apiClient.post<{ data: any }>({ url: MenuApi.CreateMenu, data });
const updateMenu = (data: { data:UpdateMenuDto }) => apiClient.post<{ data: any }>({ url: MenuApi.UpdateMenu, data });
const deleteMenu = (id: number) => apiClient.post<{ data: any }>({ url: MenuApi.DeleteMenu + `/${id}` });
const menuTree = () => apiClient.get<Permission[]>({ url: MenuApi.MenuTree });
export default {
  menuAll,
  menuList,
  createMenu,
  updateMenu,
  deleteMenu,
  menuTree,
};
