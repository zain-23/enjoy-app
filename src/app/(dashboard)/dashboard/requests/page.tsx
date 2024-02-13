import { authOption } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOption);
  if (!session) notFound();

  return <div></div>;
};

export default Page;
