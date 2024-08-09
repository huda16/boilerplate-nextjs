import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "@/lib/react-query";

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

export const useCreateUser = () => {
  return useMutation({
    mutationFn: ({ data }: { data: UserManagementsUsersType }) => {
      return fetchData<UserManagementsUsersType>({
        url: "/users",
        method: "POST",
        data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile/getUsers"] });
    },
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UserManagementsUsersType;
    }) => {
      return fetchData<UserManagementsUsersType>({
        url: `/users/${id}`,
        method: "PUT",
        data,
      });
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["profile/getUsers"] });
      queryClient.invalidateQueries({
        queryKey: ["profile/getUser", data.id],
      });
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return fetchData<string>({
        url: `/users/${id}`,
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile/getUsers"] });
    },
  });
};

export const useRestoreUser = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return fetchData<string>({
        url: `/users/${id}/restore`,
        method: "PUT",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile/getUsers"] });
    },
  });
};
