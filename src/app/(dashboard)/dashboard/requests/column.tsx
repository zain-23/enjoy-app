"use client";
import { FriendRequest } from "@/types/request-table";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<FriendRequest>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
