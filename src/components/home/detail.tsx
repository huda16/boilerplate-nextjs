"use client";

import { useParams } from "next/navigation";

import { CircularProgress } from "@mui/material";

import { useGetUser } from "@/hooks/queries/user-managements";

import UserForm from "./form";

export default function UserManagementsUserDetail() {
  const params = useParams();
  const getUser = useGetUser(Number(params.id));

  if (getUser.isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <div>UserManagementsUserDetail</div>
      <UserForm initialData={getUser.data?.data} />
    </>
  );
}
