"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
};

const ActiveIndicator = ({ className }: Props) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={cn(
      "h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_12px] shadow-primary",
      className
    )}
  />
);

export interface SidebarItem {
  onClick?: () => void;
  name: string;
  label?: string;
  icon: React.ReactNode;
  path: string;
  isCollapsed: boolean;
}

export function SidebarItem({
  path,
  name,
  icon,
  onClick,
  isCollapsed,
}: SidebarItem) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <div
      data-collapsed={isCollapsed}
      className="group data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {isCollapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={path}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  isActive && " bg-secondary/50 text-secondary-foreground"
                )}
              >
                <div className="h-4 w-4">{icon}</div>
                <span className="sr-only">{name}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {name}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            asChild
            size="lg"
            variant="ghost"
            onClick={onClick}
            className={cn(
              "h-auto justify-start px-4 py-3",
              isActive &&
                "pointer-events-none bg-secondary/50 text-secondary-foreground"
            )}
          >
            {
              <Link href={path}>
                <div className="mr-3">{icon}</div>
                <span>{name}</span>

                {isActive && <ActiveIndicator className="ml-auto" />}
              </Link>
            }
          </Button>
        )}
      </nav>
    </div>
  );
}
