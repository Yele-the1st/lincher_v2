"use client";

import { Button } from "@/components/ui/button";
import { CloudSun, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { motion, Variants } from "framer-motion";
import { useMemo } from "react";
import { RxMoon } from "react-icons/rx";

type Props = {
  size?: number;
};

export const ThemeSwitch = ({ size = 20 }: Props) => {
  const { setTheme, theme } = useTheme();

  const variants: Variants = useMemo(() => {
    return {
      light: { x: 0 },
      system: { x: size * -1 },
      dark: { x: size * -2 },
    };
  }, [size]);

  const toggleTheme = () => {
    const themes = ["system", "dark", "light"];
    const currentIndex = themes.indexOf(theme as string);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    setTheme(nextTheme);
  };

  return (
    <Button size="icon" variant="ghost" onClick={toggleTheme}>
      <div
        className="cursor-pointer overflow-hidden"
        style={{ width: size, height: size }}
      >
        <motion.div animate={theme} variants={variants} className="flex">
          <Sun size={size} className="shrink-0" />
          <CloudSun size={size} className="shrink-0" />
          <RxMoon size={size} className="shrink-0" />
        </motion.div>
      </div>
    </Button>
  );
};
