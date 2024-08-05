import { Grid } from "@mui/material";

import { RecaptchaProvider } from "@/providers/recaptcha-provider";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <RecaptchaProvider>
      <Grid container component="main" sx={{ height: "100vh" }}>
        {children}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        />
      </Grid>
    </RecaptchaProvider>
  );
}
