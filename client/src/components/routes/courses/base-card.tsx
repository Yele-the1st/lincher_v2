"use client";

import { FC } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BaseCardProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const BaseCard: FC<BaseCardProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "relative flex scale-100 cursor-pointer items-center justify-center bg-secondary/50 p-0 transition-transform active:scale-95",
        className
      )}
    >
      {children}
    </Card>
  );
};
