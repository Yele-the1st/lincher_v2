import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const { data } = useLoadUserQuery({});

  return data?.user ? redirect("/") : children;
}
