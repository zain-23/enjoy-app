import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "../../globals.css";
import Link from "next/link";
import { Icon, Icons } from "@/utils/icon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOption } from "@/utils/auth";
import ProfileImage from "@/utils/ProfileImage";
import SignOutButton from "@/utils/signOutButton";
import FriendRequestSidebarOption from "@/utils/friendRequestSidebarOption";
import { fetchRedis } from "@/helpers/redis";
import { User } from "@/types/types";

const inter = Inter({ subsets: ["latin"] });

interface SidebarOption {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Add Friend",
    href: "/dashboard/add",
    Icon: "UserPlus",
  },
];

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOption);
  const unSeenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session?.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="w-full flex h-screen">
          <div className="flex h-full w-full max-w-xs flex-col gap-y-5 overflow-y-auto border-r px-6">
            <Link
              href={"/dashboard"}
              className="w-full flex justify-center py-2"
            >
              <Image
                src={"/chat-application-logo-removebg-preview.png"}
                width={200}
                height={200}
                alt="logo"
                className="w-20 h-20"
              />
            </Link>
            <div className="text-xs font-semibold leading-6">Your Chats</div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>// Chats that user have</li>
                <li>
                  <div className="text-xs font-semibold leading-6">
                    Overview
                  </div>
                  <ul role="list" className="mt-2 space-y-1">
                    {sidebarOptions.map((menu, i) => {
                      const Icon = Icons[menu.Icon];
                      return (
                        <li key={menu.id} className="w-full">
                          <Button className="w-full">
                            <Link
                              href={menu.href}
                              className="flex items-center"
                            >
                              <span className="mr-4">
                                <Icon className="h-4 w-4" />
                              </span>
                              <span className="truncate">{menu.name}</span>
                            </Link>
                          </Button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li>
                  <FriendRequestSidebarOption
                    sessionId={session?.user.id!}
                    initialUnSeenRequestCount={unSeenRequestCount}
                  />
                </li>
                <li className="-mx-6 mt-auto flex items-center">
                  <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6">
                    <ProfileImage image={session?.user.image} />
                    <span className="sr-only">Your Profile</span>
                    <div className="flex flex-col">
                      <span aria-hidden="true">{session?.user.name}</span>
                      <span aria-hidden="true" className="text-xs">
                        {session?.user.email}
                      </span>
                    </div>
                  </div>
                  <SignOutButton />
                </li>
              </ul>
            </nav>
          </div>
          {children}
        </div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
