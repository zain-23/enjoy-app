"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addFriendFormSchema } from "./form-schema";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const AddFriendButton = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof addFriendFormSchema>>({
    resolver: zodResolver(addFriendFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof addFriendFormSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/friends/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        cache: "no-cache",
      });

      if (!response.ok) {
        const strData = await response.text();
        const parseData = JSON.parse(strData);
        toast.error(parseData.error);
      } else {
        const strData = await response.text();
        const parseData = JSON.parse(strData);
        toast.success(parseData.message);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
      form.reset();
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a Friend.</CardTitle>
        <CardDescription>
          Send a friend requests is now easy just enter friend email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Friend Email" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddFriendButton;
