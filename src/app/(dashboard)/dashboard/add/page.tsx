import AddFriendButton from "@/utils/addFriendButton";
import { TypographyH2 } from "@/utils/typography";

const Page = () => {
  return (
    <section className="pt-8 border w-full">
      <div className="flex items-center w-full h-full">
        <div className="max-w-sm w-full mx-auto">
          <AddFriendButton />
        </div>
      </div>
    </section>
  );
};

export default Page;
