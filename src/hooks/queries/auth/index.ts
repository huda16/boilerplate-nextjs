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
        href: "/",
        children: [],
      },
      {
        label: "User Managements",
        icon: "manage_accounts",
        children: [
          {
            label: "Users",
            icon: "person",
            href: "/user-managements/users",
            children: [],
          },
          {
            label: "Permissions",
            icon: "vpn_key",
            href: "/user-managements/permissions",
            children: [],
          },
          {
            label: "Roles",
            icon: "admin_panel_settings",
            href: "/user-managements/roles",
            children: [],
          },
          {
            label: "Menu Items",
            icon: "menu",
            href: "/user-managements/menu-items",
            children: [],
          },
          {
            label: "Master Menu",
            icon: "view_list",
            href: "/user-managements/master-menu",
            children: [],
          },
        ],
      },
      {
        label: "Inbound",
        icon: "keyboard_double_arrow_down",
        href: "/inbound",
        children: [],
      },
      {
        label: "Outbound",
        icon: "keyboard_double_arrow_up",
        href: "/outbound",
        children: [],
      },
    ],
  });
};
