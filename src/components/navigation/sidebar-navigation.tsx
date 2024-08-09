"use client";

import { useState } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { Icon } from "@/components/ui/icon";

import { useGetMenu } from "@/hooks/react-query/auth";

import { MenuType } from "@/validations/auth";

export function SidebarNavigation() {
  const getMenu = useGetMenu();

  const [open, setOpen] = useState<Record<string, boolean>>({});

  const handleClick = (itemKey: string) => {
    setOpen((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  const renderMenuItems = (
    items: MenuType[],
    parentKey = "",
    level = 0,
  ): JSX.Element[] => {
    return items.map((item) => {
      const itemKey = `${parentKey}/${item.label}`;
      return (
        <div key={itemKey}>
          <ListItemButton
            onClick={() => handleClick(itemKey)}
            sx={{ pl: 2 * level + 2 }}
            dense
            {...(item.href ? { href: item.href } : {})}
          >
            <ListItemIcon>
              <Icon>{item.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={item.label} />
            {item.children?.length > 0 ? (
              open[itemKey] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            ) : null}
          </ListItemButton>
          {item.children?.length > 0 && (
            <Collapse in={open[itemKey]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderMenuItems(item.children, itemKey, level + 1)}
              </List>
            </Collapse>
          )}
        </div>
      );
    });
  };

  return <List>{renderMenuItems(getMenu.data as MenuType[])}</List>;
}
