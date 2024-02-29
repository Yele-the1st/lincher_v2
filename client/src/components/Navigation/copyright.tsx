import { cn } from "@/lib/utils";
import { Copyright } from "@phosphor-icons/react";

type Props = {
  className?: string;
};

export const CopyRight = ({ className }: Props) => (
  <div
    className={cn(
      "prose prose-sm prose-zinc flex max-w-none flex-col gap-y-1 text-xs opacity-40 dark:prose-invert",
      className
    )}
  >
    <span>{`Support@letsgo.com`}</span>

    <span>
      Socials
      <a target="_blank" rel="noopener noreferrer nofollow" href="">
        .
      </a>
    </span>

    <span className="">{`Terms & Privacy`}</span>
    <span className="mt-4 flex flex-wrap items-center">
      <Copyright className=" mr-1" />
      2024
      <a
        className=" mx-1"
        target="_blank"
        rel="noopener noreferrer nofollow"
        href=""
      >
        Billioniares,
      </a>
      All Rights Reserved
    </span>
  </div>
);
