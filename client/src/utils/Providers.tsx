"use client";

import { FC, ReactNode, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "../../node_modules/next-auth/react";
import ReduxProvider from "@/Providers/ReduxProvider";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "@/components/Loader/Loader";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Custom>{children}</Custom>
        </ThemeProvider>
      </SessionProvider>
    </ReduxProvider>
  );
};

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  useEffect(() => {
    const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return <>{isLoading ? <Loader /> : <>{children}</>}</>;
};

export default Providers;
