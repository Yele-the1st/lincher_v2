import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signIn, useSession } from "../../../../node_modules/next-auth/react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export const SocialAuth = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleSignIn = (provider: "google" | "github") => {
    signIn(provider, {
      // callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      callbackUrl: callbackUrl || "/",
    });
  };

  return (
    <>
      {!loading ? (
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => handleSignIn("github")}
            size="lg"
            variant="outline"
            className="w-full"
          >
            <FaGithub className="mr-3 h-4 w-4" />
            {`GitHub`}
          </Button>
          <Button
            onClick={() => handleSignIn("google")}
            size="lg"
            variant="outline"
            className="w-full "
          >
            <FcGoogle className="mr-3 h-4 w-4" />
            {`Google`}
          </Button>
        </div>
      ) : (
        <div className=" w-full px-[80px] p-3 flex justify-center items-center overflow-hidden box-border">
          <div className=" justify-center flex items-center">
            <div className=" w-2 h-2 rounded-full mr-1.5 bg-indigo-600 animate-loading"></div>
            <div
              style={{ animationDelay: "0.1s" }}
              className=" w-2 h-2 rounded-full mr-1.5 bg-indigo-600 animate-loading"
            ></div>
            <div
              style={{ animationDelay: "0.2s" }}
              className=" w-2 h-2 rounded-full mr-1.5 bg-indigo-600 animate-loading"
            ></div>
          </div>
        </div>
      )}
    </>
  );
};
