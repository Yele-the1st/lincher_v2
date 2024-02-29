"use client";

import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import EditHero from "./EditHero";
import EditFaq from "./EditFaq";
import EditCategories from "./EditCategories";

interface indexProps {}

const Customize: FC<indexProps> = ({}) => {
  return (
    <div>
      <div>
        <Tabs defaultValue="hero">
          <div className="flex items-center px-4 py-2">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold tracking-tight"
            >
              {`Customization`}
            </motion.h1>
          </div>
          <div className=" p-4">
            <TabsList className="ml-auto">
              <TabsTrigger
                value="hero"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Hero
              </TabsTrigger>
              <TabsTrigger
                value="faq"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Faq
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Categories
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="hero" className="m-0">
            <EditHero />
          </TabsContent>
          <TabsContent value="faq" className="m-0">
            <EditFaq />
          </TabsContent>
          <TabsContent value="categories" className="m-0">
            <EditCategories />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Customize;
