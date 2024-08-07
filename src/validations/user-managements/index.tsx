import { z } from "zod";

export const userManagementsUsersSchema = z
  .object({
    id: z.number().optional(),
    username: z.string().min(1, { message: "Invalid Username" }),
    email: z.string().email().min(1, { message: "Invalid Email" }),
    password: z.string().min(1, { message: "Invalid Password" }),
    confirm_password: z
      .string()
      .min(1, { message: "Invalid Confirm Password" }),
    name: z.union([z.string(), z.null()]),
  })
  .refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: "Passwords must match!",
      path: ["confirm_password"],
    },
  );

export type UserManagementsUsersType = z.infer<
  typeof userManagementsUsersSchema
>;
