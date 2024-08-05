import { MRT_ColumnDef } from "material-react-table";

import { ProfileType } from "@/validations/auth";

export const columns: MRT_ColumnDef<ProfileType>[] = [
  {
    accessorKey: "name",
    enableClickToCopy: true,
    filterVariant: "autocomplete",
    header: "Name",
    size: 300,
  },
  {
    accessorKey: "email",
    enableClickToCopy: true,
    filterVariant: "autocomplete",
    header: "Email",
    size: 300,
  },
  {
    accessorKey: "createdAt",
    enableClickToCopy: true,
    filterVariant: "autocomplete",
    header: "Created At",
    size: 300,
  },
  {
    accessorKey: "updatedAt",
    enableClickToCopy: true,
    filterVariant: "autocomplete",
    header: "Updated At",
    size: 300,
  },
];
