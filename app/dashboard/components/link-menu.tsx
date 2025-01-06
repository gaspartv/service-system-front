"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

interface LinkMenuProps {
  path: string;
  name: string;
  icon: React.ReactNode;
}

export default function LinkMenu({path, name, icon}: LinkMenuProps) {
  const pathname = usePathname();

  return (
    <Link
      className={`flex gap-2 items-end p-4 rounded hover:bg-zinc-900 hover:font-bold hover:text-zinc-100 ${pathname === path ? "bg-zinc-900 font-bold text-zinc-100" : "text-zinc-300"}`}
      href={path}
    >
      {icon}
      {name}
    </Link>
  )
}
