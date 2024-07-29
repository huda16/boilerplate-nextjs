import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/utils/fetcher";

export const useGetProfile = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ["profile/getProfile", params],
    queryFn: () =>
      fetchData({
        url: `/account/users/v1`,
        params,
      }),
    staleTime: Infinity,
  });
};
