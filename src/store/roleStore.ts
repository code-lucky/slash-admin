import { Role } from "#/entity";
import roleService from "@/api/services/roleService";
import { useEffect } from "react";
import { create } from "zustand";

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
  // useEffect(() => {
  //   const fetchRoleList = async () => {
  //     const data = await roleService.roleList({ page: 1, limit: 10 });
  //     setRoleList(data.list);
  //   };
  //   fetchRoleList();
  // }, [setRoleList]);

  return { getRoleList };
};

export default useRoleStore;
