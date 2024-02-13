import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const ProfileImage: React.FC<{ image: string | null | undefined }> = ({
  image,
}) => {
  if (image === null || image === undefined) return;
  return (
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default ProfileImage;
