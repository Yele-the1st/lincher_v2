import { FC } from "react";
import { SidebarItem } from "./sidebarItem";
import {
  Book,
  LayoutDashboard,
  Library,
  LogOut,
  MonitorPlay,
  PanelRightOpen,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useLogOutMutation } from "@/redux/features/auth/authApi";
import { signOut } from "../../../../node_modules/next-auth/react";
import { UserOptions } from "./UserOptions";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/Navigation/UserAvatar";
import { useSelector } from "react-redux";
import { CopyRight } from "@/components/Navigation/copyright";
import Link from "next/link";

interface indexProps {
  isCollapsed: boolean;
  handleCollapseButtonClick: () => void;
}

const sidebarItems = [
  {
    path: "/dashboard/courses",
    name: `My Library`,
    icon: <MonitorPlay size={16} />,
  },
  {
    path: "/dashboard/settings",
    name: `Settings`,
    icon: <SlidersHorizontal size={16} />,
  },
];

const LogoutItem = {
  path: "",
  name: `Logout`,
  icon: <LogOut size={16} />,
};

const AdminItem = {
  path: "/admin/overview",
  name: `Admin`,
  icon: <LayoutDashboard size={16} />,
};

const Sidebar: FC<indexProps> = ({
  isCollapsed,
  handleCollapseButtonClick,
}) => {
  const { user } = useSelector((state: any) => state.auth);
  const [logOut] = useLogOutMutation();

  const logOutHandler = async () => {
    await logOut({});

    signOut();
  };
  return (
    <div className=" flex flex-col gap-y-4 h-full">
      <div
        className={cn(
          "flex h-[52px] items-center justify-center",
          isCollapsed ? "h-[52px]" : "px-2"
        )}
      >
        <div
          className={`px-2 w-full flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          } `}
        >
          <Link href={`/`} className=" flex items-center">
            <Library />
            <h1
              className={`ml-1 text-xl font-bold ${
                isCollapsed ? "hidden" : ""
              }`}
            >
              lincher
            </h1>
          </Link>
          {!isCollapsed && (
            <button onClick={handleCollapseButtonClick}>
              <PanelRightOpen size={18} />
            </button>
          )}
        </div>
      </div>

      <Separator className="opacity-50" />

      <div className="grid gap-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem
            {...item}
            key={item.path}
            path={item.path}
            icon={item.icon}
            name={item.name}
            isCollapsed={isCollapsed}
          />
        ))}
        {user?.role === "admin" && (
          <SidebarItem
            path={AdminItem.path}
            icon={AdminItem.icon}
            name={AdminItem.name}
            isCollapsed={isCollapsed}
          />
        )}
        <SidebarItem
          path={LogoutItem.path}
          icon={LogoutItem.icon}
          name={LogoutItem.name}
          onClick={logOutHandler}
          isCollapsed={isCollapsed}
        />
      </div>

      <div className="flex-1" />
      <Separator className="opacity-50" />

      <div className="grid p-2">
        <UserOptions>
          <Button
            size="lg"
            variant="ghost"
            className={`w-full justify-start shrink-0 ${
              isCollapsed ? "px-1.5" : "px-3"
            }`}
          >
            <UserAvatar
              name={user?.name}
              url={user?.avatar?.url}
              size={24}
              className=" shrink-0"
            />
            {!isCollapsed && <span className=" ml-3">{user?.name}</span>}
          </Button>
        </UserOptions>

        {!isCollapsed && <CopyRight className=" pt-4 pb-6 px-3" />}
      </div>
    </div>
  );
};

export default Sidebar;
