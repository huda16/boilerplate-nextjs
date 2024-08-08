import React from "react";

import { Card as BaseCard, CardContent, Typography } from "@mui/material";

type HighlightCardProps = {
  title: string;
  value: number | undefined;
};

export function HighlightCard({ title, value }: HighlightCardProps) {
  return (
    <BaseCard sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" mb={1}>
          {value?.toLocaleString()}
        </Typography>
        <Typography>{title}</Typography>
      </CardContent>
    </BaseCard>
  );
}
