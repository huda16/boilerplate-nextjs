"use client";

import { useParams } from "next/navigation";

import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

import { useGetUser } from "@/hooks/queries/user-managements";

import UserForm from "./form";

type UserManagementsUserDetailProps = {
  isEdit: boolean;
};

export default function UserManagementsUserDetail({
  isEdit,
}: UserManagementsUserDetailProps) {
  const params = useParams();
  const getUser = useGetUser(Number(params.id));

  if (getUser.isLoading) {
    return <CircularProgress />;
  }

  if (isEdit) {
    return (
      <>
        <UserForm initialData={getUser.data?.data} />
      </>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          p: 2,
          // mx: 24,
        }}
      >
        <Typography component="h1" variant="h5" textAlign="center">
          Detail User
        </Typography>
        <Table size="small">
          <TableBody>
            {Object.entries(getUser.data?.data ?? [])
              .filter(([key]) => key !== "password")
              .map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1" fontWeight="bold">
                      {key}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{String(value)}</Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
}
