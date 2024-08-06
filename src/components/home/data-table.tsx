"use client";

import { MouseEvent, useState } from "react";

import { AccountCircle, Send } from "@mui/icons-material";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  lighten,
} from "@mui/material";
import { json2csv } from "json-2-csv";
import {
  MRT_GlobalFilterTextField,
  MRT_PaginationState,
  MRT_ToggleFiltersButton,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import * as XLSX from "xlsx";

import { useGetUsers } from "@/hooks/queries/users";

import { Icon } from "../ui/icon";
import { columns } from "./columns";

export function DataTable() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

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

  const getUsers = useGetUsers({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  });

  const table = useMaterialReactTable({
    columns,
    data: getUsers.data?.data ?? [],
    state: { pagination, isLoading: getUsers.isFetching },
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 20, 30, 100],
    },
    manualPagination: true,
    rowCount: getUsers.data?.meta?.rowCount,
    onPaginationChange: setPagination,
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
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
            <Tooltip arrow title="Refresh Data">
              <IconButton
                onClick={() => {
                  table.resetColumnFilters();
                  table.resetGlobalFilter();
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
