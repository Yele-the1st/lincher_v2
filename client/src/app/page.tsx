"use client";

import Header from "@/components/Navigation/Header";
import Heading from "@/utils/Heading";
import { FC, useState } from "react";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "@/components/Loader/Loader";
import Hero from "@/components/routes/Hero/Hero";
import CoursesSection from "@/components/routes/courses";
import ReveiwsSection from "@/components/routes/reviews";
import FaqSection from "@/components/routes/faq";
import Footer from "@/components/Navigation/Footer";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Banner", {});

  return (
    <div>
      <Heading
        title="Lincher | The future of Learning"
        description="Lincher is a platform for student to learn and get help from teachers"
        keywords="Programming, courses, Machine Learning"
      />
      <Header activeItem={0} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Hero data={data} />
          <CoursesSection />
          <ReveiwsSection />
          <FaqSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Page;
