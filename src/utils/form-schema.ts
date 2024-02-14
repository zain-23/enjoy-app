import { z } from "zod";

export const addFriendFormSchema = z.object({
  email: z.string({ required_error: "email field is required" }).email(),
});
