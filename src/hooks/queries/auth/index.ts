import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/utils/fetcher";

import { ProfileType } from "@/validations/auth";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["auth/getProfile"],
    queryFn: () => fetchData<ProfileType>({ url: "/auth/profile" }),
    staleTime: Infinity,
  });
};

export const useGetMenu = () => {
  return useQuery({
    queryKey: ["auth/getMenu"],
    // queryFn: () => fetchData<ProfileType>({ url: "/auth/profile" }),
    initialData: [
      {
        label: "Dashboard",
        icon: "dashboard",
        children: [],
      },
      {
        label: "User Managements",
        icon: "manage_accounts",
        children: [
          {
            label: "Users",
            icon: "person",
            children: [],
          },
          {
            label: "Permissions",
            icon: "vpn_key",
            children: [],
          },
          {
            label: "Roles",
            icon: "admin_panel_settings",
            children: [],
          },
          {
            label: "Menu Items",
            icon: "menu",
            children: [],
          },
          {
            label: "Master Menu",
            icon: "view_list",
            children: [],
          },
        ],
      },
    ],
  });
};
