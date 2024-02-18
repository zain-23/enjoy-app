import { fetchRedis } from "@/helpers/redis";
import { User } from "@/types/types";
import { authOption } from "@/utils/auth";
import FriendRequest from "@/utils/friendRequest";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOption);
  if (!session) notFound();

  const incomingSendId = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingFriendRequest = await Promise.all(
    incomingSendId.map(async (senderId) => {
      const data = (await fetchRedis("get", `user:${senderId}`)) as string;
      const sender = JSON.parse(data) as User;

      return {
        senderId,
        sender: sender,
      };
    })
  );

  return (
    <div className="py-10 w-full">
      <FriendRequest
        incomingFriendRequests={incomingFriendRequest}
        sessionId={session.user.id}
      />
    </div>
  );
};

export default Page;
