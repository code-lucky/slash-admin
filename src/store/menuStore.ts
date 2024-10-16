import { Permission, Role } from "#/entity";
import roleService from "@/api/services/roleService";
import { create } from "zustand";

type MenuStore = {
  menuList: Permission[];
  menuTree: Permission[];
  actions: {
    setMenuList: (menuList: Permission[]) => void;
  };
}

type RoleStore = {
  roleList: Role[];
  actions: {
    setRoleList: (roleList: Role[]) => void;
  };
}

const useRoleStore = create<RoleStore>((set) => ({
  roleList: [],
  actions: {
    setRoleList: (roleList: Role[]) => set({ roleList }),
  },
}));


const useRoleActions = () => useRoleStore((state) => state.actions);

export const useGetRoleList = () => {
  const { setRoleList } = useRoleActions();
  const getRoleList = async() => {
    const data = await roleService.roleList({ page: 1, limit: 10 });
    setRoleList(data.list);
  }

  return { getRoleList };
};

export default useRoleStore;
