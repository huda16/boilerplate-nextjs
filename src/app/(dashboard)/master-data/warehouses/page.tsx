import { Breadcrumbs, Grid, Stack, Typography } from "@mui/material";

export default function MasterDataWarehousesPage() {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Typography color="text.primary">Master Data</Typography>
        <Typography color="text.primary">Warehouses</Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
      </Grid>
    </Stack>
  );
}
