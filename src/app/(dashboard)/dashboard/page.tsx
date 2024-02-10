import { authOption } from "@/utils/auth";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const session = await getServerSession(authOption);

  return <h1>Dashboard</h1>;
};

export default Page;
