"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { IconButton, InputAdornment } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Loader2 } from "lucide-react";
// import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { Copyright } from "@/components/common/copyright";

import { useSignUp } from "@/hooks/mutations/auth";

import { SignUpFormType, signUpFormSchema } from "@/validations/auth";

export function SignUpForm() {
  // const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  // const { enqueueSnackbar } = useSnackbar();

  const signUp = useSignUp();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: SignUpFormType) => {
    // if (!executeRecaptcha) {
    //   return setError("root", {
    //     message:
    //       "Failed to connect to Google ReCAPTCHA, please refresh the page",
    //   });
    // }

    setIsLoading(true);

    // const recaptcha = await executeRecaptcha();
    console.log("data@@", data);
    signUp.mutate(data, {
      onSuccess: () => {
        // enqueueSnackbar("Success register user", { variant: "success" });
        router.push("/signin");
        // toast({
        //   title: "Baseline price created",
        //   status: "success",
        //   isClosable: true,
        //   position: "bottom-right",
        // });
        // navigate("/baseline-price");
      },
      onError: (error) => {
        // enqueueSnackbar(error.message, { variant: "error" });
        setError("root", {
          message:
            error.message ?? "Something went wrong. Please try again later.",
        });
        // toast({
        //   title: "Can't create baseline price",
        //   description: (error as FetchError)?.error,
        //   status: "error",
        //   isClosable: true,
        //   position: "bottom-right",
        // });
      },
    });
    // const auth = await signIn("credentials", {
    //   email,
    //   password,
    //   recaptcha,
    //   redirect: false,
    // });

    setIsLoading(false);

    // if (auth?.ok) {
    //   router.push("/signin");
    // } else {
    //   setError("root", {
    //     message: auth?.error ?? "Something went wrong. Please try again later.",
    //   });
    // }
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 12,
          mx: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </Grid>
  );
}
