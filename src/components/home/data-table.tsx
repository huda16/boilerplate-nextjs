"use client";

import { MouseEvent, useState } from "react";

import { AccountCircle, Send } from "@mui/icons-material";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  lighten,
} from "@mui/material";
import { json2csv } from "json-2-csv";
import {
  MRT_ColumnFilterFnsState,
  MRT_ColumnFiltersState,
  MRT_GlobalFilterTextField,
  MRT_PaginationState,
  MRT_ShowHideColumnsButton,
  MRT_SortingState,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useSnackbar } from "notistack";
import * as XLSX from "xlsx";

import { useDeleteUser } from "@/hooks/mutations/user-managements";
import { useGetUsers } from "@/hooks/queries/user-managements";

import { convertFEParamsToAPIParams } from "@/utils/helpers";

import { Icon } from "../ui/icon";
import { columns } from "./columns";

export function DataTable() {
  const { enqueueSnackbar } = useSnackbar();

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );
  const [columnFilterFns, setColumnFilterFns] =
    useState<MRT_ColumnFilterFnsState>(
      Object.fromEntries(
        columns.map(({ accessorKey }) => [accessorKey, "contains"]),
      ),
    );
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickExport = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (type: "csv" | "xlsx") => {
    console.log({ type });
    switch (type) {
      case "csv":
        const test = json2csv(getUsers.data?.data ?? []);
        const blob = new Blob([test], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        break;
      case "xlsx":
        const ws = XLSX.utils.json_to_sheet(getUsers.data?.data ?? []);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "data.xlsx");
        break;
      default:
        break;
    }
    handleClose();
  };

  const getUsers = useGetUsers(
    convertFEParamsToAPIParams({
      pagination,
      columnFilterFns,
      columnFilters,
      sorting,
      globalFilter,
    }),
  );

  const deleteUser = useDeleteUser();

  const table = useMaterialReactTable({
    columns,
    data: getUsers.data?.data ?? [],
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: false,
      columnPinning: {
        left: ["mrt-row-select", "mrt-row-actions"],
        // right: ["mrt-row-actions"],
      },
      density: "compact",
    },
    state: {
      columnFilters,
      globalFilter,
      sorting,
      pagination,
      columnFilterFns,
      isLoading: getUsers.isFetching,
    },
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 20, 30, 100],
    },
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    rowCount: getUsers.data?.meta.total,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFilterFnsChange: setColumnFilterFns,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            href={`/user-managements/users/${row.original.id}`}
          >
            <Icon>edit</Icon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            color="error"
            onClick={() => {
              setIsOpenDeleteDialog((prev) => !prev);
            }}
          >
            <Icon>delete</Icon>
          </IconButton>
        </Tooltip>
        <Dialog
          open={isOpenDeleteDialog}
          onClose={() => setIsOpenDeleteDialog((prev) => !prev)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>Delete user?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove this user? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpenDeleteDialog((prev) => !prev)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                deleteUser.mutate(
                  { id: row.original.id },
                  {
                    onSuccess: () => {
                      enqueueSnackbar("Success delete user", {
                        variant: "success",
                      });
                    },
                    onError: (error) => {
                      enqueueSnackbar(error.message, { variant: "error" });
                    },
                    onSettled: () => {
                      setIsOpenDeleteDialog((prev) => !prev);
                    },
                  },
                );
              }}
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    ),
    renderRowActionMenuItems: ({ closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // View profile logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        View Profile
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          // Send email logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        Send Email
      </MenuItem>,
    ],
    renderTopToolbar: ({ table }) => {
      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: "flex",
            gap: "0.5rem",
            p: "8px",
            justifyContent: "space-between",
          })}
        >
          <Button
            variant="contained"
            href="/user-managements/users/create"
            startIcon={<Icon>add</Icon>}
          >
            Create
          </Button>
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
            <MRT_ShowHideColumnsButton table={table} />
            <MRT_ToggleDensePaddingButton table={table} />
            <MRT_ToggleFullScreenButton table={table} />
            <Tooltip arrow title="Reset Filter">
              <IconButton
                onClick={() => {
                  table.resetGlobalFilter();
                  table.resetColumnFilters();
                  table.setGlobalFilter("");
                  table.setColumnFilters([]);
                  table.setColumnFilterFns(
                    Object.fromEntries(
                      columns.map(({ accessorKey }) => [
                        accessorKey,
                        "contains",
                      ]),
                    ),
                  );
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Export Data">
              <IconButton
                id="download-button"
                aria-controls={open ? "download-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickExport}
              >
                <Icon>download</Icon>
              </IconButton>
            </Tooltip>
            <Menu
              id="download-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "download-button",
              }}
            >
              <MenuItem onClick={() => handleExport("csv")}>
                Export as CSV
              </MenuItem>
              <MenuItem onClick={() => handleExport("xlsx")}>
                Export as XLSX
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
}
