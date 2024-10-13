import { Permission, Role } from "#/entity";
import permissionService from "@/api/services/permissionService";
import { useEffect } from "react";
import { create } from "zustand";

type PermissionStore = {
  permissionList: Permission[];
  actions: {
    setPermissionList: (permissionList: Permission[]) => void;
  };
}

const usePermissionStore = create<PermissionStore>((set) => ({
  permissionList: [],
  actions: {
    setPermissionList: (permissionList: Permission[]) => set({ permissionList }),
  },
}));

const usePermissionActions = () => usePermissionStore((state) => state.actions);

export const useGetPermissionList = () => {
  const { setPermissionList } = usePermissionActions();
  
  useEffect(() => {
    const fetchPermissionList = async () => {
      const data = await permissionService.permissionList();
      setPermissionList(data);
    };
    fetchPermissionList();
  }, [setPermissionList]);
};

export default usePermissionStore;
