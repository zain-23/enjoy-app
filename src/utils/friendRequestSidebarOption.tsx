"use client";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import React, { FC, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface FriendRequestSidebarOptionProps {
  initialUnSeenRequestCount: number;
  sessionId: string;
}

const FriendRequestSidebarOption: FC<FriendRequestSidebarOptionProps> = ({
  initialUnSeenRequestCount,
  sessionId,
}) => {
  const [unSeenRequestCount, setUnSeenRequest] = useState<number>(
    initialUnSeenRequestCount
  );

  return (
    <Button className="w-full">
      <Link href={`/dashboard/requests`} className="flex items-center gap-x-4">
        <User className="h-4 w-4" />
        <span className="truncate">Friend Requests</span>
        {unSeenRequestCount > 0 && (
          <Badge variant={"secondary"}>{unSeenRequestCount}</Badge>
        )}
      </Link>
    </Button>
  );
};

export default FriendRequestSidebarOption;
