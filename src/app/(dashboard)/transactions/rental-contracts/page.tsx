import { Breadcrumbs, Grid, Stack, Typography } from "@mui/material";

import { DataTable } from "@/components/common/data-table";

export default function TransactionsRentalContractsPage() {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Typography color="inherit">Transactions</Typography>
        <Typography color="text.primary">Rental Contracts</Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DataTable />
        </Grid>
      </Grid>
    </Stack>
  );
}
