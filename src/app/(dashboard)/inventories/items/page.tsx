import { Breadcrumbs, Grid, Stack, Typography } from "@mui/material";

import { DataTable } from "@/components/common/data-table";

export default function InventoriesItemsPage() {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Typography color="inherit">Inventories</Typography>
        <Typography color="text.primary">Items</Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DataTable />
        </Grid>
      </Grid>
    </Stack>
  );
}
