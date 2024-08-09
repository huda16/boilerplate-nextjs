import { useMutation, useQuery } from "@tanstack/react-query";

import { fetchData } from "@/utils/fetcher";

import { ProfileType, SignUpFormType } from "@/validations/auth";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["auth/getProfile"],
    queryFn: () => fetchData<ProfileType>({ url: "/authentications/me" }),
    staleTime: Infinity,
  });
};

export const useGetMenu = () => {
  return useQuery({
    queryKey: ["auth/getMenu"],
    // queryFn: () => fetchData<ProfileType>({ url: "/authentications/menu" }),
    initialData: [
      {
        label: "Dashboard",
        icon: "dashboard",
        href: "/",
      },
      {
        label: "User Managements",
        icon: "manage_accounts",
        children: [
          {
            label: "Users",
            icon: "person",
            href: "/user-managements/users",
          },
          {
            label: "Permissions",
            icon: "vpn_key",
            href: "/user-managements/permissions",
          },
          {
            label: "Roles",
            icon: "admin_panel_settings",
            href: "/user-managements/roles",
          },
          {
            label: "Menu Items",
            icon: "menu",
            href: "/user-managements/menu-items",
          },
          {
            label: "Master Menu",
            icon: "view_list",
            href: "/user-managements/master-menu",
          },
        ],
      },
      {
        label: "Master Data",
        icon: "database",
        children: [
          {
            label: "Companies",
            icon: "business",
            href: "/master-data/companies",
          },
          {
            label: "User Companies",
            icon: "group",
            href: "/master-data/user-companies",
          },
          {
            label: "Products",
            icon: "inventory",
            href: "/master-data/products",
          },
          {
            label: "Warehouses",
            icon: "warehouse",
            href: "/master-data/warehouses",
          },
          {
            label: "Configurations",
            icon: "settings",
            href: "/master-data/configurations",
          },
          {
            label: "Master Files",
            icon: "file_copy",
            href: "/master-data/master-files",
          },
        ],
      },
      {
        label: "Inventories",
        icon: "inventory",
        children: [
          {
            label: "Items",
            icon: "widgets",
            href: "/inventories/items",
          },
          {
            label: "Stock Movements",
            icon: "track_changes",
            href: "/inventories/stock-movements",
          },
          {
            label: "Storages",
            icon: "storage",
            href: "/inventories/storages",
          },
        ],
      },
      {
        label: "Transactions",
        icon: "payments",
        children: [
          {
            label: "Item Movements",
            icon: "local_shipping",
            href: "/transactions/item-movements",
          },
          {
            label: "Rental Contracts",
            icon: "contract",
            href: "/transactions/rental-contracts",
          },
          {
            label: "Payments",
            icon: "payment",
            href: "/transactions/payments",
          },
        ],
      },
    ],
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["auth/signUp"],
    mutationFn: ({ data }: { data: SignUpFormType }) => {
      return fetchData<{}>({
        method: "POST",
        url: "/users",
        data: { ...data, confirmationPassword: data.confirm_password },
      });
    },
  });
};
