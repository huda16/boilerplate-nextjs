import { MRT_ColumnDef } from "material-react-table";

import { ProfileType } from "@/validations/auth";

export const columns: MRT_ColumnDef<ProfileType>[] = [
  {
    accessorKey: "name",
    filterVariant: "autocomplete",
    header: "Name",
    size: 300,
  },
  {
    accessorKey: "email",
    filterVariant: "autocomplete",
    header: "Email",
    size: 300,
  },
  {
    accessorKey: "createdAt",
    filterVariant: "datetime",
    header: "Created At",
    size: 300,
  },
  {
    accessorKey: "updatedAt",
    filterVariant: "datetime",
    header: "Updated At",
    size: 300,
  },
];
