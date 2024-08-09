import { Metadata } from "next";
import dynamic from "next/dynamic";

import { Breadcrumbs, Grid, Stack, Typography } from "@mui/material";

import { HighlightCard } from "@/components/common/card/highlight-card";

const Chart = dynamic(() => import("@/components/common/chart"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Typography color="text.primary">Dashboard</Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <HighlightCard title="Total Orders" value={123456789} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <HighlightCard title="Total Orders Processed" value={987654321} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <HighlightCard title="Total Orders Unprocessed" value={456789123} />
        </Grid>
        <Grid item xs={12}>
          <Chart />
        </Grid>
      </Grid>
    </Stack>
  );
}
