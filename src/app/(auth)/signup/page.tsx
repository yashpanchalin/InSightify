"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/Schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { APIResponse } from "@/types/APIResponse";
import { title } from "process";
import { describe } from "node:test";
import { Description } from "@radix-ui/react-toast";
import errorMap from "zod/locales/en.js";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [usernameAvailabilityMessage, setsernameAvailabilityMessage] =
    useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 500);
  const { toast } = useToast();
  const router = useRouter();

  //zod implementation

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const uniqueUsernameCheck = async () => {
      if (username) {
        setIsUsernameAvailable(true);
        setsernameAvailabilityMessage("");
        try {
          const response = await axios.get(
            `/api/usernameCheck?username=${username}`
          );
          setsernameAvailabilityMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<APIResponse>;
          axiosError.response?.data.message ?? "Error while checking Username";
        } finally {
          setIsUsernameAvailable(false);
        }
      }
    };
    uniqueUsernameCheck();
  }, [username]);

  const onSumbit = async (data: z.infer<typeof signUpSchema>) => {
    setIsFormSubmitting(true);
    try {
      const response = await axios.post(`api/signup`, data);
      toast({
        title: "Sign up Sucessfully",
        description: response.data.message,
      });
      router.replace(`/verify/${username}`);
      setIsFormSubmitting(false);
    } catch (error) {
      console.error("Error while signing up of User", error);
      const axiosError = error as AxiosError<APIResponse>;
      let errorMessage = axiosError.response?.data?.message;
      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsFormSubmitting(false);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Join <span className="text-purple-500">In</span>Sightify
            </h1>
            <p className="mb-4">Sign up to InSightify</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          debounced(e.target.value);
                        }}
                      />
                    </FormControl>
                    {isUsernameAvailable && (
                      <Loader2 className="animate-spin" />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setUsername(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isFormSubmitting}>
                {isFormSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    Wait..
                  </>
                ) : (
                  "Signup "
                )}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p>
              Already a Member?{""}
              <Link
                href="/signin "
                className="text-blue-600 hover:text-blue-800"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
