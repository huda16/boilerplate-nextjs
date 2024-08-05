import { useMutation } from "@tanstack/react-query";

import { fetchData } from "@/utils/fetcher";

import { SignUpFormType } from "@/validations/auth";

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["auth/signUp"],
    mutationFn: (data: SignUpFormType) => {
      return fetchData<{}>({
        method: "POST",
        url: "/auth/signup",
        data: { ...data, confirmationPassword: data.confirm_password },
      });
    },
  });
};
