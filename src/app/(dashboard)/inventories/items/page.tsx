import { Breadcrumbs, Grid, Stack, Typography } from "@mui/material";

export default function InventoriesItemsPage() {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Typography color="text.primary">Inventories</Typography>
        <Typography color="text.primary">Items</Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
      </Grid>
    </Stack>
  );
}
