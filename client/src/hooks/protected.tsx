import Loader from "@/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const { data, isLoading } = useLoadUserQuery({});

  if (isLoading) {
    // Optional: You can render a loading indicator while user data is being fetched
    return (
      <div>
        <Loader />
      </div>
    );
  }

  // Ensure that the user object is available and properly validated
  if (data.user) {
    return redirect("/");
    // Render children if user is an admin
  } else {
    return <>{children}</>; // Redirect to home page if user is not an admin or if user data is not available
  }
}
