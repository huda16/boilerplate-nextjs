import { Breadcrumbs, Grid, Stack, Typography } from "@mui/material";

import { DataTable } from "@/components/common/data-table";

export default function MasterDataConfigurationsPage() {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Typography color="inherit">Master Data</Typography>
        <Typography color="text.primary">Configurations</Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DataTable />
        </Grid>
      </Grid>
    </Stack>
  );
}
