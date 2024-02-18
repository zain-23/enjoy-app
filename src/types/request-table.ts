export type FriendRequest = {
  id: string;
  status: "pending" | "success";
  email: string;
};

export const friends: FriendRequest[] = [
  {
    id: "728ed52f",
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    email: "example@gmail.com",
    status: "success",
  },
];
