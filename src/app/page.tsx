import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";

export default async function Home() {
  await db.set("hello", "zain");
  return <Button>Hello</Button>;
}
