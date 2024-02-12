import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "../../globals.css";
import Link from "next/link";
import { Icon, Icons } from "@/utils/icon";

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
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="w-full flex h-screen">
          <div className="flex h-full w-full max-w-xs flex-col gap-y-5 overflow-y-auto border-r px-6">
            <Link
              href={"/dashboard"}
              className="flex h-16 flex-shrink-0 items-center"
            >
              <Icons.Logo className="h-8 w-auto" />
            </Link>
            <div className="text-xs font-semibold leading-6">Your Chats</div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>// Chats that user have</li>
                <li>
                  <div className="text-xs font-semibold leading-6">
                    Overview
                  </div>
                  <ul role="list" className="mt-2 space-y-1"></ul>
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
