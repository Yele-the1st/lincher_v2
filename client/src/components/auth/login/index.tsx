"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import { SocialAuth } from "../_components/social-auth";
import Link from "next/link";
import { ArrowRight, Eye, EyeSlash } from "@phosphor-icons/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface indexProps {}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const LoginForm: FC<indexProps> = ({}) => {
  const [show, setShow] = useState(false);
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
      toast.success("Login Successfully!");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [error, isSuccess, router]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className=" space-y-8">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">{`Sign in to your account`}</h2>
        <h6>
          <span className="opacity-75">{`Don't have an account?`}</span>
          <Button asChild variant="link" className="px-1.5">
            <Link href="/register">
              Create one now
              <ArrowRight className="ml-1" />
            </Link>
          </Button>
        </h6>
      </div>
      <div className={cn("grid gap-6")}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                onChange={handleChange}
                value={values.email}
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            {errors.email && touched.email && (
              <span className=" text-destructive text-xs py-1 block">
                {errors.email}
              </span>
            )}
            <div className="relative grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Password
              </Label>
              <Input
                id="password"
                placeholder="password"
                type={!show ? "password" : "text"}
                value={values.password}
                onChange={handleChange}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
              <div className=" absolute translate-y-1/2 right-0">
                {!show ? (
                  <span
                    onClick={() => setShow(true)}
                    className="flex cursor-pointer select-none items-center px-3"
                  >
                    <Eye className=" h-5 w-5" />
                  </span>
                ) : (
                  <span
                    onClick={() => setShow(false)}
                    className="flex select-none cursor-pointer items-center px-3"
                  >
                    <EyeSlash className=" h-5 w-5" />
                  </span>
                )}
              </div>
            </div>
            {errors.password && touched.password && (
              <span className=" text-destructive text-xs  py-1 block">
                {errors.password}
              </span>
            )}
            {isLoading ? (
              <div className=" w-full px-[80px] p-3 flex justify-center items-center overflow-hidden box-border">
                <div className=" justify-center flex items-center">
                  <div className=" w-2 h-2 rounded-full mr-1.5 bg-primary animate-loading"></div>
                  <div
                    style={{ animationDelay: "0.1s" }}
                    className=" w-2 h-2 rounded-full mr-1.5 bg-primary animate-loading"
                  ></div>
                  <div
                    style={{ animationDelay: "0.2s" }}
                    className=" w-2 h-2 rounded-full mr-1.5 bg-primary animate-loading"
                  ></div>
                </div>
              </div>
            ) : (
              <Button type="submit" disabled={isLoading}>
                Sign In with Email
              </Button>
            )}
          </div>
        </form>
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <SocialAuth /> */}
      </div>
    </div>
  );
};

export default LoginForm;
