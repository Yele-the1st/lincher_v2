"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { ThemeSwitch } from "@/components/theme/ThemeSwitch";

import socketIO from "socket.io-client";
import {
  useGetAllNoticationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import { timeAgo } from "@/utils/TimeAgo";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

const NOTIFICATION_SOUND_URL = "/assets/audio/MYL9XUR-bell-notification.mp3";

interface DashboardHeaderProps {}

const DashboardHeader: FC<DashboardHeaderProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useGetAllNoticationsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();

  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState(new Audio(NOTIFICATION_SOUND_URL));

  useEffect(() => {
    if (!isLoading && data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [audio, data, isLoading, isSuccess, refetch]);

  useEffect(() => {
    const playerNotificationSound = () => {
      audio.play();
    };

    socket.on("newNotification", () => {
      if (!isLoading && data) {
        refetch();
        playerNotificationSound();
      }
    });

    return () => {
      socket.off("newNotification");
    };
  }, [audio, data, isLoading, refetch]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className=" z-[60] hidden sm:flex items-center justify-end py-4 px-6 fixed top-0 right-0 ">
      <ThemeSwitch />
      <div
        onClick={() => setOpen(!open)}
        className="relative flex items-center cursor-pointer justify-center hover:bg-accent rounded-[8px] py-2 px-3"
      >
        <MdNotifications className={` w-5 h-5`} />
        <span className=" absolute -top-1 -right-1 bg-primary rounded-full w-5 h-5 text-xs flex items-center justify-center text-white ">
          {notifications && notifications.length}
        </span>
      </div>
      {open && (
        <div className=" text-xs w-[350px] bg-secondary  shadow-xl absolute top-16 z-10 rounded-[8px] ">
          <h5 className=" text-center font-semibold text-base font-Poppins p-3">
            Notifications
          </h5>
          <div className=" h-[50vh] overflow-scroll ">
            {notifications &&
              notifications.map((item: any, index: number) => (
                <div
                  key={index}
                  className=" dark:bg-accent-hover bg-background font-Poppins border-b "
                >
                  <div className=" w-full flex items-center justify-between p-2">
                    <p className=" ">{item.title}</p>
                    <p
                      onClick={() => handleNotificationStatusChange(item._id)}
                      className=" cursor-pointer"
                    >
                      Mark as read
                    </p>
                  </div>
                  <p className=" px-2">{item.message}</p>
                  <p className=" p-2 ">{timeAgo(item.createdAt)}</p>
                </div>
              ))}
          </div>
          <h5 className=" h-12 p-3"></h5>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
