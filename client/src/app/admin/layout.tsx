"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ImperativePanelHandle } from "react-resizable-panels";

import { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";

import { ScrollArea } from "@/components/ui/scroll-area";
import AdminSidebar from "@/components/admin/sidebar";
import DashboardHeader from "@/components/admin/dashboardHeader";
import AdminProtected from "@/hooks/adminProtected";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const panelRef = useRef<ImperativePanelHandle>(null);
  const { user } = useSelector((state: any) => state.auth);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!isDesktop && panelRef.current) {
      panelRef.current.collapse();
      setIsCollapsed(true);
    }
    if (isDesktop && panelRef.current) {
      panelRef.current.expand();
      setIsCollapsed(false);
    }
  }, [isDesktop]);

  const handleCollapseButtonClick = () => {
    if (!isCollapsed && panelRef.current) {
      panelRef.current.collapse();

      setIsCollapsed(true);
    }
    if (isCollapsed && panelRef.current) {
      panelRef.current.expand();

      setIsCollapsed(false);
    }
  };

  return (
    <AdminProtected>
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes
            )}`;
          }}
          className="h-full min-h-screen items-stretch"
        >
          <ResizablePanel
            ref={panelRef}
            defaultSize={20}
            collapsedSize={4}
            collapsible={true}
            minSize={15}
            maxSize={30}
            onCollapse={() => {
              setIsCollapsed(true);
            }}
            onExpand={() => {
              setIsCollapsed(false);
            }}
            className={cn(
              isCollapsed &&
                "min-w-[50px]  transition-all duration-300 ease-in-out"
            )}
          >
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              className=" h-full max-h-screen w-full"
            >
              <AdminSidebar
                isCollapsed={isCollapsed}
                handleCollapseButtonClick={handleCollapseButtonClick}
              />
            </motion.div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80} minSize={30}>
            <ScrollArea className="h-screen">
              <DashboardHeader />
              {children}
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </AdminProtected>
  );
}
