"use client";

import Loader from "@/components/Loader/Loader";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  BsFillArrowRightCircleFill,
  BsFillPlusCircleFill,
  BsTrash,
  BsTrash3Fill,
} from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";

interface EditFaqProps {}

const EditFaq: FC<EditFaqProps> = ({}) => {
  const {
    data,
    isLoading: loading,
    refetch,
  } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  const [questions, setQuestions] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<number | null>(null);

  const toggleTab = (index: number) => {
    setActiveTab(activeTab === index ? null : index);
  };

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
    if (isSuccess) {
      toast.success("Hero updated successfully!");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, error, isSuccess, refetch]);

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };
  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        questions: "",
        answer: "",
      },
    ]);
  };

  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async (e: any) => {
    await editLayout({
      type: "FAQ",
      faq: questions,
    });
  };

  return (
    <div className=" bg-transparent">
      {loading ? (
        <Loader />
      ) : (
        <div className=" py-10">
          <div className="max-w-7xl text-gray-900 dark:text-white mx-auto my-4 px-4">
            <div className="  rounded-[1rem] p-10">
              <h2 className="text-3xl md:text-4xl text-center font-semibold">
                Frequently asked questions
              </h2>
              <p className="mb-8 mt-2 text-sm text-center">
                Currently displayed questions on the landing
              </p>
              <div className="mx-auto space-y-4">
                {questions.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={` ${
                      item._id !== questions[0]?._id && " border-t"
                    } border-gray-200 pt-8`}
                  >
                    <button className="flex items-center justify-between w-full">
                      <span className="text-base w-full text-start mr-8 font-medium">
                        <input
                          className=" border-none outline-none w-full bg-transparent appearance-none"
                          value={item.question}
                          placeholder="Add your question"
                          onChange={(e: any) =>
                            handleQuestionChange(item._id, e.target.value)
                          }
                        />
                      </span>
                      <BsFillArrowRightCircleFill
                        onClick={() => toggleTab(index)}
                        className={`${
                          activeTab === index ? "transform rotate-90" : ""
                        } w-5 h-5 transition duration-300 ease-linear delay-0 shrink-0`}
                      />
                    </button>
                    {activeTab === index && (
                      <div className="mt-4 mr-8">
                        <div className="text-gray-900 w-full dark:text-white text-sm">
                          <textarea
                            className=" appearance-none bg-transparent outline-none w-full h-full "
                            value={item.answer}
                            placeholder="Add your answer"
                            rows={4}
                            onChange={(e: any) =>
                              handleAnswerChange(item._id, e.target.value)
                            }
                          />
                          <span className=" ml-6 flex-shrink-0">
                            <BsTrash3Fill
                              className={`text-gray-900 dark:text-white w-5 h-5 cursor-pointer `}
                              onClick={() => {
                                setQuestions((prevQuestions) =>
                                  prevQuestions.filter(
                                    (q) => q._id !== item._id
                                  )
                                );
                              }}
                            />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className=" mt-6">
                <BsFillPlusCircleFill
                  className=" dark:text-white text-black w-5 h-5 cursor-pointer"
                  onClick={newFaqHandler}
                />
              </div>
            </div>
            <div className=" flex px-4 pb-10 sm:px-6 sm:pb-12 lg:max-w-7xl  lg:px-8  800px:justify-end">
              <div
                className={` w-full 800px:w-[140px] flex items-center justify-center h-[44px] text-center rounded-[3px] mt-8 ${
                  areQuestionsUnchanged(data?.layout?.faq, questions) ||
                  isAnyQuestionEmpty(questions)
                    ? "cursor-not-allowed bg-accent dark:bg-background-darkHover text-gray-500"
                    : "cursor-pointer bg-primary text-white"
                } `}
                onClick={
                  areQuestionsUnchanged(data?.layout?.faq, questions) ||
                  isAnyQuestionEmpty(questions)
                    ? () => null
                    : handleEdit
                }
              >
                {isLoading ? (
                  <div className=" w-full flex justify-center items-center">
                    <div className=" justify-center flex items-center">
                      <div className=" w-2 h-2 rounded-full mr-1.5 bg-gray-100 animate-loading"></div>
                      <div
                        style={{ animationDelay: "0.1s" }}
                        className=" w-2 h-2 rounded-full mr-1.5 bg-gray-100 animate-loading"
                      ></div>
                      <div
                        style={{ animationDelay: "0.2s" }}
                        className=" w-2 h-2 rounded-full bg-gray-100 animate-loading"
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div>Save</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditFaq;
