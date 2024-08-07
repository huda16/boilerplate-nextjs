import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/lib/react-query";

import { fetchData } from "@/utils/fetcher";

import { UserManagementsUsersType } from "@/validations/user-managements";

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
      return fetchData<UserManagementsUsersType>({
        url: `/users/${id}`,
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile/getUsers"] });
    },
  });
};
