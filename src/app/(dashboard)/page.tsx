import { Metadata } from "next";
import dynamic from "next/dynamic";

import { Grid, Paper } from "@mui/material";

// import Chart from "react-apexcharts";
import { Copyright } from "@/components/common/copyright";
import Deposits from "@/components/dashboard/deposits";
import { DataTable } from "@/components/home/data-table";

const Chart = dynamic(() => import("@/components/home/chart"), { ssr: false });

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <DataTable />
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </>
  );
}
