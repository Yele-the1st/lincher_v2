import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KeyboardShortcut } from "@/components/ui/shortcut";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export const UserOptions = ({ children }: Props) => {
  const router = useRouter();
  //   const { logout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent side="top" align="start" className="w-48">
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/settings", { scroll: false })}
        >
          {`Settings`}

          <KeyboardShortcut>⇧S</KeyboardShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
        // onClick={() => logout()}
        >
          {`Logout`}

          <KeyboardShortcut>⇧Q</KeyboardShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
