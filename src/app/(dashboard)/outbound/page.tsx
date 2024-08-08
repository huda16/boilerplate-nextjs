import { Breadcrumbs, Grid, Stack, Typography } from "@mui/material";

export default function OutboundPage() {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Typography color="text.primary">Outbound</Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
      </Grid>
    </Stack>
  );
}
