import NavigateNext from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Grid, Link, Stack, Typography } from "@mui/material";

import UserManagementsUserDetail from "@/components/home/detail";

type UserManagementsUsersDetailPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function UserManagementsUsersDetailPage({
  searchParams,
}: UserManagementsUsersDetailPageProps) {
  return (
    <Stack gap={2}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Typography color="inherit">User Managements</Typography>
        <Link color="inherit" underline="hover" href="/user-managements/users">
          Users
        </Link>
        <Typography color="text.primary">Detail/Edit</Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UserManagementsUserDetail isEdit={searchParams.edit === "1"} />
        </Grid>
      </Grid>
    </Stack>
  );
}
