import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(1, { message: "Invalid Email" }),
  password: z.string().min(1, { message: "Invalid Password" }),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
