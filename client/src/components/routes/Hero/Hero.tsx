import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import HeroSearchbar from "./HeroSearchbar";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Decoration } from "./Decoration";

interface HeroProps {
  data: any;
}

const Hero: FC<HeroProps> = ({ data }) => {
  return (
    <section id="hero" className="relative overflow-x-hidden">
      <Decoration.Grid />
      <Decoration.Gradient />
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:h-screen lg:items-center lg:px-12">
        <motion.div
          className="mx-auto mt-32 max-w-3xl shrink-0 lg:mx-0 lg:mt-0 lg:max-w-xl lg:pt-8"
          viewport={{ once: true }}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div className="hidden items-center gap-x-4 sm:flex">
            <Badge>{`Version 1.1`}</Badge>

            <Link
              href="/documentation"
              className={cn(
                buttonVariants({ variant: "link" }),
                "space-x-2 text-left"
              )}
            >
              <p>{`What's new in the latest version`}</p>
              <ArrowRight />
            </Link>
          </div>
          <h2 className=" text-6xl md:text-7xl font-semibold font-Poppins tracking-tight text-background-foregroundL dark:text-background-foregroundD ">
            {data?.layout?.banner?.title}
          </h2>
          <p className="mt-8 max-w-sm font-light text-base font-Poppins text-background-foregroundL dark:text-background-foregroundD ">
            {data?.layout?.banner?.subTitle}
          </p>
          <div className=" mt-8">
            <HeroSearchbar />
          </div>
        </motion.div>
        {data && (
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-20">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <Image
                  priority
                  quality={100}
                  src={data?.layout?.banner?.image?.url}
                  alt="hero image"
                  width={1000}
                  height={1000}
                  className="w-[46rem] rounded-lg bg-background/5 shadow-2xl ring-1 ring-foreground/10"
                />
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
