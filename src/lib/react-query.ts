import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if ((error as FetchError)?.code === 404) return false;
        if (failureCount < 1) return true;
        return false;
      },
    },
  },
});
