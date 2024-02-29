import LoginForm from "@/components/auth/login";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
