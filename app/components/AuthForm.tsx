"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "./CustomFormField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const authFromSchema = (type: FormType) => {
  return z.object({
    userName:
      type === "sign-up" ? z.string().min(3).max(25) : z.string().optional(),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(100)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFromSchema(type);
  const router = useRouter();
  const isSignIn = type === "sign-in";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        toast.success("Account created!");
        router.push("/sign-in");
      } else {
        toast.success("Welcome back to the club migo");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${error}`);
    }
  }

  return (
    <div className=" card-border lg:min-w-[566px]">
      <div className=" flex flex-col gap-6 card py-14 px-10">
        <div className=" flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={32} />
          <h2 className=" text-primary-100">PrepWise</h2>
        </div>
        <div className=" flex items-center justify-center">
          <h3 className="">Practice Job Interviews with AI</h3>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full space-y-6 mt-4 form"
          >
            {isSignIn ? (
              <>
                <CustomFormField
                  label="Email"
                  placeholder="cool@hypnosis.com"
                  type="email"
                  form={form}
                />

                <CustomFormField
                  label="Password"
                  placeholder="Better be good"
                  type="password"
                  form={form}
                />
              </>
            ) : (
              <>
                <CustomFormField
                  label="Full Name"
                  placeholder="Not another batman"
                  type="userName"
                  form={form}
                />

                <CustomFormField
                  label="Email"
                  placeholder="cool@hypnosis.com"
                  type="email"
                  form={form}
                />

                <CustomFormField
                  label="Password"
                  placeholder="Better be good"
                  type="password"
                  form={form}
                />
              </>
            )}

            <Button className="btn" type="submit">
              {isSignIn ? "Sign in" : "Create new account"}
            </Button>
          </form>

          <p className=" text-center">
            {!isSignIn ? "Have an account already?" : "No account yet?"}
            <Link
              href={isSignIn ? "/sign-up" : "/sign-in"}
              className="font-bold text-user-primary ml-1"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
