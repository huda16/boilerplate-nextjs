import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().min(1, { message: "Invalid Email" }),
  password: z.string().min(1, { message: "Invalid Password" }),
});

export const signUpFormSchema = z
  .object({
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

export const profileSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const baseMenuSchema = z.object({
  label: z.string(),
  icon: z.string(),
  href: z.string().optional(),
});

export const menuSchema = baseMenuSchema.extend({
  children: z.array(
    baseMenuSchema.extend({
      children: z.array(
        baseMenuSchema.extend({
          children: z.array(
            baseMenuSchema.extend({ children: z.array(z.any()) }),
          ),
        }),
      ),
    }),
  ),
});

export type SignInFormType = z.infer<typeof signInFormSchema>;
export type SignUpFormType = z.infer<typeof signUpFormSchema>;
export type ProfileType = z.infer<typeof profileSchema>;
export type MenuType = z.infer<typeof menuSchema>;
