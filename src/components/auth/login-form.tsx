"use client";

import { useEffect, useState } from "react";

import { signIn } from "next-auth/react";

import { testGetCookie } from "@/actions/cookie";
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
import { useForm } from "react-hook-form";

import { Copyright } from "@/components/common/copyright";

import { SignInFormType, signInFormSchema } from "@/validations/auth";

type SignInFormProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export function SignInForm({ searchParams }: SignInFormProps) {
  // const { executeRecaptcha } = useGoogleReCaptcha();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  async function test() {
    return await testGetCookie();
  }

  useEffect(() => {
    console.log(
      "first",
      test()
        .then((result) => {
          console.log("result", result);
        })
        .catch((err) => {
          console.log("err", err);
        }),
    );
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async ({ username, password }: SignInFormType) => {
    // if (!executeRecaptcha) {
    //   return setError("root", {
    //     message:
    //       "Failed to connect to Google ReCAPTCHA, please refresh the page",
    //   });
    // }

    setIsLoading(true);

    // const recaptcha = await executeRecaptcha();
    const auth = await signIn("credentials", {
      username,
      password,
      // recaptcha,
      redirect: false,
    });

    setIsLoading(false);

    if (auth?.ok) {
      window.location.href = decodeURIComponent(
        searchParams.callbackUrl?.toString() ?? "/",
      );
    } else {
      setError("root", {
        message: auth?.error ?? "Something went wrong. Please try again later.",
      });
    }
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
          Sign in
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
            autoComplete="username"
            autoFocus
            disabled={isLoading}
            size="small"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            id="password"
            autoComplete="password"
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </Grid>
  );
}
