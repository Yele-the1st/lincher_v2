import { PersonIcon } from "@radix-ui/react-icons";
import { UserCog } from "lucide-react";

export const Roles = [
  {
    value: "user",
    label: "User",
    icon: PersonIcon,
  },
  {
    value: "admin",
    label: "Admin",
    icon: UserCog,
  },
];
