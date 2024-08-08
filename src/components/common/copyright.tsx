import Link from "next/link";

import { Typography } from "@mui/material";

export function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Copyright &copy;
      <Link color="inherit" href="https://mui.com/">
        JNE
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
