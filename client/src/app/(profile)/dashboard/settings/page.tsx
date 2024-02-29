"use client";

import UserSettings from "@/components/dashboard/settings";
import { FC } from "react";
import { useSelector } from "react-redux";

interface pageProps {}

const SettingsPage: FC<pageProps> = ({}) => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <UserSettings user={user} />
    </div>
  );
};

export default SettingsPage;
