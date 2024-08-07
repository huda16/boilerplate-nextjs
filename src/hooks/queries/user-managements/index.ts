import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/utils/fetcher";

import { ProfileType } from "@/validations/auth";
import { UserManagementsUsersType } from "@/validations/user-managements";

export const useGetUsers = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ["profile/getUsers", params],
    queryFn: () =>
      fetchData<ProfileType[]>({
        url: "/users",
        params: { ...params, table: true },
      }),
  });
};

export const useGetUser = (id: number) => {
  return useQuery({
    queryKey: ["profile/getUser", id],
    queryFn: () => fetchData<UserManagementsUsersType>({ url: `/users/${id}` }),
  });
};
