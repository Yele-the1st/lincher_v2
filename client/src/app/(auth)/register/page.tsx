import RegisterForm from "@/components/auth/register";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default page;
