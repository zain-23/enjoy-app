import { fetchRedis } from "@/helpers/redis";
import { authOption } from "@/utils/auth";
import { db } from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  try {
    const { email } = await req.json();

    const restResponse = await fetch(
      `${process.env.UPSTASH_REDIS_REST_URL}/get/user:email:${email}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
        cache: "no-store",
      }
    );
    const data = (await restResponse.json()) as { result: string | null };

    const idToAdd = data.result;

    if (!idToAdd) {
      return NextResponse.json(
        { error: "This person is not exist" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOption);

    if (!session) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    if (idToAdd === session.user.id) {
      return NextResponse.json(
        { error: "you can't add yourself as a friend" },
        { status: 400 }
      );
    }

    const isAlreadyAdded = (await fetchRedis(
      "sismember",
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    )) as 0 | 1;

    if (isAlreadyAdded) {
      return NextResponse.json(
        { error: "Already added user" },
        { status: 400 }
      );
    }

    const isAlreadyFriends = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    )) as 0 | 1;

    if (isAlreadyFriends) {
      return NextResponse.json({ error: "Already friends" }, { status: 400 });
    }

    db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);

    return NextResponse.json({ message: "Friend Added Successfully" });
  } catch (error) {
    return NextResponse.json({ error: "invalid Request" }, { status: 400 });
  }
};
