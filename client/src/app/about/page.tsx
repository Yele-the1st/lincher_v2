import Footer from "@/components/Navigation/Footer";
import Header from "@/components/Navigation/Header";
import { Separator } from "@/components/ui/separator";
import { Spotlight } from "@/components/ui/spotlight";
import Heading from "@/utils/Heading";
import Image from "next/image";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <Heading
        title="Lincher | The future of Learning"
        description="Lincher is a platform for student to learn and get help from teachers"
        keywords="Programming, courses, Machine Learning"
      />
      <Header activeItem={2} />
      <div className=" min-h-screen">
        <div className=" pt-10 md:pt-32 w-full rounded-md flex md:items-center md:justify-center relative overflow-hidden">
          <Spotlight
            className=" -top-96 left-10 md:left-96 md:-top-20"
            fill="white"
          />
          <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
            <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text dark:text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              Who are we?
            </h1>
            <p className="mt-4 font-normal text-base max-w-3xl text-center mx-auto">
              {` Every big idea starts when someone notices a problem that needs
              fixing. In the world of online learning, one big problem was that
              it felt like a maze. People trying to learn things like coding or
              design would get stuck, feeling like they weren't making progress.
              Tutorials didn't always help, and it seemed like there had to be a
              better way.`}
            </p>
            <p className="mt-8 font-normal text-base max-w-lg text-center mx-auto">
              Our platform, is a <strong>beacon of light</strong> in the fog of
              tutorial purgatory. Our mission is simple: to provide a curated
              collection of expertly selected YouTube videos, resources,
              assignments, and capstone projects. You can start as a beginner
              and become a pro without ever leaving our site.
            </p>
            <Separator className=" mt-24" />
            <div className="py-12">
              <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-5xl font-bold text-center mb-12">
                  Our Curators
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="flex flex-col items-center">
                    <Image
                      alt="Georges Bock"
                      className="rounded-md mb-4"
                      height="300"
                      src="/assets/portrait/k.webp"
                      style={{
                        aspectRatio: "300/300",
                        objectFit: "cover",
                      }}
                      width="300"
                    />
                    <h2 className="text-xl font-semibold">Georges Bock</h2>
                    <p className="text-gray-600 text-center">
                      Senior Frontend developer @ Bompa
                    </p>
                  </div>
                  {/* <div className="flex flex-col items-center">
                    <Image
                      alt="Ala Presenti"
                      className="rounded-md mb-4"
                      height="300"
                      src="/assets/portrait/kk.webp"
                      style={{
                        aspectRatio: "300/300",
                        objectFit: "cover",
                      }}
                      width="300"
                    />
                    <h2 className="text-xl font-semibold">Ala Presenti</h2>
                    <p className="text-gray-600 text-center">
                      Senior Data Analyst @ VogueIT
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Image
                      alt="Jordan Abrahams"
                      className="rounded-md mb-4"
                      height="300"
                      src="/assets/portrait/kkkk.webp"
                      style={{
                        aspectRatio: "300/300",
                        objectFit: "cover",
                      }}
                      width="300"
                    />
                    <h2 className="text-xl font-semibold">Cynthia Abrahams</h2>
                    <p className="text-gray-600 text-center">
                      Marketer & Growth Lead @ Inspireon
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Image
                      alt="Laure-Helene Renouard"
                      className="rounded-md mb-4"
                      height="300"
                      src="/assets/portrait/kkk.webp"
                      style={{
                        aspectRatio: "300/300",
                        objectFit: "cover",
                      }}
                      width="300"
                    />
                    <h2 className="text-xl font-semibold">
                      Laure-Helene Renouard
                    </h2>
                    <p className="text-gray-600 text-center">
                      Cryto Expert @ Imodium Inc.
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
