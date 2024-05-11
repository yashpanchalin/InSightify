"use client";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-3xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"#"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Home"
          ></MenuItem>
        </Link>
        <Link href={"features"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Features"
          ></MenuItem>
        </Link>
        <Link href={"aboutus"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="About us"
          ></MenuItem>
        </Link>
        {/* <Switch /> */}
      </Menu>
    </div>
  );
}
export default Navbar;
