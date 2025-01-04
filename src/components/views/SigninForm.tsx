"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useUserLoginMutation } from "@/redux/features/auth/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

const SignInForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login] = useUserLoginMutation();
  const onSubmit = async (data: any) => {
    try {
      data.role = "student";
      const res = await login(data).unwrap();

      const user = verifyToken(res.accessToken);

      dispatch(setUser({ user: user, token: res.accessToken }));
      if (user.userId) {
        router.push(`/timer`);
      }
    } catch (error) {}
    //
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
