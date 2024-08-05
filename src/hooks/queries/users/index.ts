import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/utils/fetcher";

import { ProfileType } from "@/validations/auth";

export const useGetUsers = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ["profile/getUsers", params],
    queryFn: () => fetchData<ProfileType[]>({ url: "/users", params }),
  });
};
