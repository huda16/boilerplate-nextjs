"use client";

import { Paper } from "@mui/material";
import ReactApexChart from "react-apexcharts";

export default function InboundOutboundChart() {
  return (
    <Paper sx={{ p: 2, height: 480 }}>
      <ReactApexChart
        options={{
          chart: {
            id: "inbound-outbound-chart",
            toolbar: {
              show: true,
            },
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            title: {
              text: "Months",
            },
          },
          yaxis: {
            title: {
              text: "Number of Shipments",
            },
          },
          title: {
            text: "Inbound vs Outbound Shipments",
            align: "center",
          },
          dataLabels: {
            enabled: true,
          },
          grid: {
            borderColor: "#e0e0e0",
          },
          colors: ["#34c38f", "#ff4560"], // Green for Inbound, Red for Outbound
          legend: {
            position: "top",
          },
        }}
        series={[
          {
            name: "Inbound Shipments",
            data: [120, 130, 140, 150, 170, 160, 180, 200, 210, 220, 230, 250],
          },
          {
            name: "Outbound Shipments",
            data: [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210],
          },
        ]}
        type="bar"
        height="100%"
        width="100%"
      />
    </Paper>
  );
}
