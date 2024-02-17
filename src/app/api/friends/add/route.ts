import { authOption } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
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
      { message: "you can add yourself as a friend" },
      { status: 400 }
    );
  }
};
