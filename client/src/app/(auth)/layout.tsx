"use client";

import { ThemeSwitch } from "@/components/theme/ThemeSwitch";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { Library, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
      }
    }
    // if (data !== null) {
    //   if (isSuccess) {
    //     toast.success("Login Successfully");
    //     router.push("/");
    //   }
    // }
  }, [data, isSuccess, router, socialAuth, user]);

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Button
        onClick={() => router.push("/")}
        variant={"ghost"}
        size={"icon"}
        className={cn("absolute right-4 top-4 md:right-8 md:top-8")}
      >
        <X />
      </Button>
      <div className="relative hidden h-screenflex-col bg-muted text-white lg:flex dark:border-r">
        <div className="relative hidden lg:block lg:flex-1">
          <Image
            width={1920}
            height={1080}
            alt="Open books on a table"
            className="h-screen w-full object-cover object-center"
            src="/assets/k2/kkkk.webp"
          />

          <div className="absolute bottom-5 right-5 z-10 bg-primary/30 px-4 py-2 text-xs font-medium text-primary-foreground backdrop-blur-sm">
            <a
              target="_blank"
              rel="noopener noreferrer nofollow"
              href="https://unsplash.com/photos/Oaqk7qqNh_c"
            >
              {`Photograph by Patrick Tomasso`}
            </a>
          </div>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex items-center pt-16 justify-between">
            <Link href={`/`} className=" flex items-center">
              <Library size={42} />
              <div className="ml-1 font-bold text-4xl">lincher</div>
            </Link>

            <div className="right-0 space-x-2 text-right lg:absolute lg:p-12 lg:text-center">
              <ThemeSwitch />
            </div>
          </div>
          {children}
          <p className="px-8 text-center text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="underline whitespace-nowrap underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
