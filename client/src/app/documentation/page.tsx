import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className=" flex flex-col h-screen items-center justify-center">
      <h1 className=" text-2xl font-semibold">Page is Not ready</h1>
      <Button asChild className=" mt-4">
        <Link href={"/"}>Go back</Link>
      </Button>
    </div>
  );
};

export default page;
