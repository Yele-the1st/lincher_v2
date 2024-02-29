import Orders from "@/components/admin/invoices";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className=" relative w-full py-4 flex justify-center">
      <div className=" absolute inset-0">
        <Orders />
      </div>
    </div>
  );
};

export default page;
