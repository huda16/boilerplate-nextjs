import { Breadcrumbs, Grid, Link, Stack, Typography } from "@mui/material";

import UserForm from "@/components/home/form";

export default function UserManagementsUsersCreatePage() {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Typography color="inherit">User Managements</Typography>
        <Link color="inherit" underline="hover" href="/user-managements/users">
          Users
        </Link>
        <Typography color="text.primary">Create</Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UserForm />
        </Grid>
      </Grid>
    </Stack>
  );
}
