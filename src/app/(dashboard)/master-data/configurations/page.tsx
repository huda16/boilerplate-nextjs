import { Breadcrumbs, Grid, Stack, Typography } from "@mui/material";

export default function MasterDataConfigurationsPage() {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Typography color="text.primary">Master Data</Typography>
        <Typography color="text.primary">Configurations</Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
      </Grid>
    </Stack>
  );
}
