"use client";
import React, { FC, useState } from "react";
import { TypographyH2 } from "./typography";
import { IncomingFriendRequest } from "@/types/pusher";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FriendRequestProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequest: FC<FriendRequestProps> = ({ incomingFriendRequests }) => {
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );

  return (
    <>
      {friendRequests.length === 0 ? (
        <TypographyH2>No Friend Requests</TypographyH2>
      ) : (
        <Card className="max-w-3xl w-full mx-auto p-2">
          <Table className="w-full">
            <TableCaption>A list of your Friend Request.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>S.no</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {friendRequests.map((data, i: number) => (
                <TableRow key={data.sender.id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell className="font-medium">
                    {data.sender.name}
                  </TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={data.sender.image} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{data.sender.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </>
  );
};

export default FriendRequest;
