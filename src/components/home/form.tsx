"use client";

import { useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Loader2 } from "lucide-react";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import {
  useCreateUser,
  useUpdateUser,
} from "@/hooks/mutations/user-managements";

import {
  UserManagementsUsersType,
  userManagementsUsersSchema,
} from "@/validations/user-managements";

type UserFormProps = {
  initialData?: UserManagementsUsersType;
};

export default function UserForm({ initialData }: UserFormProps) {
  const router = useRouter();
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);

  const isLoading = createUser.isPending || updateUser.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserManagementsUsersType>({
    resolver: zodResolver(userManagementsUsersSchema),
    mode: "onChange",
    defaultValues: {
      username: initialData?.username ?? "",
      email: initialData?.email ?? "",
      password: initialData?.password ?? "",
      confirm_password: initialData?.password ?? "",
      name: initialData?.name ?? "",
    },
  });
  const onSubmit = async (data: UserManagementsUsersType) => {
    console.log("data@@", data);
    if (initialData) {
      updateUser.mutate(
        { id: Number(params.id), data },
        {
          onSuccess: () => {
            enqueueSnackbar("Success update user", { variant: "success" });
            router.back();
          },
          onError: (error) => {
            enqueueSnackbar(error.message, { variant: "error" });
          },
        },
      );
    } else {
      createUser.mutate(
        { data },
        {
          onSuccess: () => {
            enqueueSnackbar("Success create user", { variant: "success" });
            router.back();
          },
          onError: (error) => {
            enqueueSnackbar(error.message, { variant: "error" });
          },
        },
      );
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          mx: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {initialData ? "Edit" : "Create"} User
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoComplete="off"
            disabled={isLoading}
            size="small"
            autoFocus
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="off"
            disabled={isLoading}
            size="small"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            id="password"
            autoComplete="off"
            type={isShowPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setIsShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {isShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            id="confirm_password"
            autoComplete="off"
            type={isShowConfirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setIsShowConfirmPassword((prev) => !prev)}
                    edge="end"
                  >
                    {isShowConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
            {...register("confirm_password")}
            error={!!errors.confirm_password}
            helperText={errors.confirm_password?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            autoComplete="off"
            disabled={isLoading}
            size="small"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          {errors?.root && (
            <p className="px-1 text-left text-xs text-red-600">
              {errors.root.message}
            </p>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
