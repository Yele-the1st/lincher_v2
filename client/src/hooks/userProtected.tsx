import { redirect } from "next/navigation";
import useAuth from "./useAuth";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function UserProtected({ children }: ProtectedProps) {
  const isAuthenticated = useAuth();

  return isAuthenticated ? children : redirect("/");
}
