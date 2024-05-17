"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { SocialAuth } from "../_components/social-auth";
import Link from "next/link";
import { ArrowRight, Eye, EyeSlash } from "@phosphor-icons/react";
import * as Yup from "yup";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

interface indexProps {}

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const RegisterForm: FC<indexProps> = ({}) => {
  const [show, setShow] = useState(false);
  const [register, { isLoading, data, error, isSuccess }] =
    useRegisterMutation();

  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      router.push("/verification");
      toast.success(message);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [data?.message, error, isSuccess, router]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className=" space-y-8">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">{`Create a new account`}</h2>
        <h6>
          <span className="opacity-75">{`Already have an account?`}</span>
          <Button asChild variant="link" className="px-1.5">
            <Link href="/login">
              Sign in now
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
                Name
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                type="text"
                value={values.name}
                onChange={handleChange}
                autoCapitalize="none"
                autoComplete="text"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            {errors.name && touched.name && (
              <span className=" text-destructive text-xs py-1 block">
                {errors.name}
              </span>
            )}
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                value={values.email}
                onChange={handleChange}
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
                autoComplete="none"
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
              <span className=" text-destructive text-xs py-1 block">
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
              <Button disabled={isLoading}>Sign up with Email</Button>
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

export default RegisterForm;
