import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { FC, SetStateAction, useState } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

interface FaqProps {}

const FaqSection: FC<FaqProps> = ({}) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {});

  console.log(data);

  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab: SetStateAction<number>) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };
  return (
    <div className="container relative space-y-12 py-24 sm:py-32">
      <div className=" grid gap-4 grid-cols-1 lg:grid-cols-7">
        <div className=" lg:col-span-3">
          <h2 className=" text-3xl md:text-4xl font-semibold ">
            Frequently asked questions
          </h2>
          <p className="mb-8 mt-4 text-sm ">
            Have more questions? Email us at yele.olabode@gmail.com
          </p>
        </div>
        <div className=" space-y-4 lg:col-span-4 ">
          {data &&
            data.layout.faq.map((faq: any, index: any) => (
              <div key={index} className="border-b pb-4 ">
                <button
                  className=" flex items-center justify-between w-full "
                  onClick={() => toggleTab(index + 1)}
                >
                  <span className=" text-start mr-8">{faq.question}</span>
                  <BsFillArrowRightCircleFill
                    className={` ${
                      activeTab === index + 1 ? "transform rotate-90" : ""
                    } w-5 h-5 transition duration-300 ease-linear delay-0 shrink-0 `}
                  />
                </button>
                {activeTab === index + 1 && (
                  <div className="mt-4 mr-8">
                    <p className=" text-foreground/75 text-sm">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
