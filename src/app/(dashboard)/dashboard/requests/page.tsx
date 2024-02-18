import { fetchRedis } from "@/helpers/redis";
import { FriendRequest } from "@/types/request-table";
import { User } from "@/types/types";
import { authOption } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./column";

const Page = async () => {
  const session = await getServerSession(authOption);
  if (!session) notFound();

  const incomingSendId = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];
  const incomingFriendRequest = await Promise.all(
    incomingSendId.map(async (senderId) => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as User;

      return {
        senderId,
        sender: sender,
      };
    })
  );

  const data = await getData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;

async function getData(): Promise<FriendRequest[]> {
  return [
    {
      id: "728ed52f",
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      status: "pending",
      email: "m@example.com",
    },
  ];
}
