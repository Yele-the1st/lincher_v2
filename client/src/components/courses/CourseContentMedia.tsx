"use client";

import { FC, useEffect, useState } from "react";
import CoursePlayer from "../admin/create-maps/CoursePlayer";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, MessageSquareMore } from "lucide-react";
import { UserAvatar } from "../Navigation/UserAvatar";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import toast from "react-hot-toast";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import CommentReply from "./CommentReply";
import Ratings from "@/utils/Ratings";
import { timeAgo } from "@/utils/TimeAgo";
import { Separator } from "../ui/separator";
import ReviewReply from "./ReviewReply";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

interface CourseContentMediaProps {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
}

const CourseContentMedia: FC<CourseContentMediaProps> = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");

  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );

  const [addNewQuestion, { isSuccess, error, isLoading: addQuestionLoading }] =
    useAddNewQuestionMutation();

  const [
    addAnswerInQuestion,
    { isSuccess: answerSuccess, error: answerError, isLoading: answerLoading },
  ] = useAddAnswerInQuestionMutation();

  const [
    addReviewInCourse,
    { isSuccess: reviewSuccess, error: reviewError, isLoading: reviewLoading },
  ] = useAddReviewInCourseMutation();

  const [
    addReplyInReview,
    { isSuccess: replySuccess, error: replyError, isLoading: replyLoading },
  ] = useAddReplyInReviewMutation();

  const isReviewExists = courseData?.course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestionSubmit = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };
  const handleReplySubmit = async () => {
    if (reply.length === 0) {
      toast.error("Reply can't be empty");
    } else {
      addReplyInReview({ comment: reply, courseId: id, reviewId: reviewId });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();

      toast.success("Question added successfully");

      socket.emit("notification", {
        title: "New Question Received",
        message: `You have a new question in ${data[activeVideo].title} `,
        userId: user._id,
      });
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully");
      if (user.role !== "admin") {
        socket.emit("notification", {
          title: "New Question Reply Received",
          message: `You have a new question reply in ${data[activeVideo].title} `,
          userId: user._id,
        });
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(0);
      courseRefetch();
      toast.success("Review added successfully");

      socket.emit("notification", {
        title: "New review Received",
        message: `You have a new review in ${data[activeVideo].title} `,
        userId: user._id,
      });
    }
    if (replySuccess) {
      setReply("");
      courseRefetch();
      toast.success("Reply added successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = replyError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    activeVideo,
    answerError,
    answerSuccess,
    courseRefetch,
    data,
    error,
    isSuccess,
    refetch,
    replyError,
    replySuccess,
    reviewError,
    reviewSuccess,
    user._id,
    user.role,
  ]);

  return (
    <div className=" w-[95%] lg:w-[86%]  py-4 mx-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className=" w-full flex items-center justify-between my-3">
        <Button
          className={cn(activeVideo === 0 && "cursor-not-allowed opacity-75")}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <ArrowLeft className=" mr-1" size={16} />
          Prev Lesson
        </Button>
        <Button
          className={cn(
            data.length - 1 === activeVideo && "cursor-not-allowed opacity-75"
          )}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <ArrowRight className=" ml-1" size={16} />
        </Button>
      </div>
      <h1 className=" py-4 text-2xl font-bold">{data[activeVideo].title}</h1>
      <div className=" w-full p-1 flex items-center justify-between bg-secondary bg-opacity-20 backdrop-blur shadow-[secondary] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={` cursor-pointer rounded-md py-2 px-2 ${
              activeBar === index && " bg-background"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      {activeBar === 0 && (
        <p className=" whitespace-pre-line my-3">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div key={index} className=" flex flex-col my-3">
              <h2 className="">{item.title && item.title + " :"}</h2>
              <a
                className=" text-[#4395c4] max-w-[300px] truncate lg:max-w-full inline-block flex-wrap"
                href={item.url}
                title={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className=" flex w-full my-3">
            <UserAvatar
              className="shrink-0"
              url={user?.avatar?.url}
              name={user?.name}
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Write your question..."
              className=" outline-none bg-transparent ml-3 border border-border/70 w-full p-2 rounded  "
            ></textarea>
          </div>
          <div className="flex justify-end w-full">
            <Button
              variant={"secondary"}
              onClick={addQuestionLoading ? () => {} : handleQuestionSubmit}
              className={cn(addQuestionLoading && "cursor-not-allowed")}
            >
              {addQuestionLoading ? (
                <div className=" w-full flex justify-center items-center overflow-hidden">
                  <div className=" py-2 justify-center space-x-1.5 flex items-center">
                    <div className=" w-2 h-2 rounded-full bg-primary animate-loading"></div>
                    <div
                      style={{ animationDelay: "0.1s" }}
                      className=" w-2 h-2 rounded-full bg-primary animate-loading"
                    ></div>
                    <div
                      style={{ animationDelay: "0.2s" }}
                      className=" w-2 h-2 rounded-full bg-primary animate-loading"
                    ></div>
                  </div>
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
          <Separator className=" mt-4" />
          <div className=" mt-4 w-full">
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              setQuestionId={setQuestionId}
              answerLoading={answerLoading}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <div className=" w-full my-3">
          <>
            {!isReviewExists && (
              <div className=" w-full flex my-3">
                <UserAvatar
                  className="shrink-0"
                  url={user?.avatar?.url}
                  name={user?.name}
                />
                <div className=" w-full">
                  <div className=" mb-2">
                    <h5 className=" pl-3 ">
                      Give a Rating<span className=" text-destructive">*</span>
                    </h5>
                    <div className=" flex w-full pl-3 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            color="#f6b100"
                            size={16}
                            className={`mr-1 cursor-pointer`}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            color="#f6b100"
                            size={16}
                            className={`mr-1 cursor-pointer`}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="Write your review..."
                      className=" outline-none bg-transparent border border-border/70 w-full p-2 rounded  "
                    ></textarea>
                  </div>
                  <div className="flex justify-end w-full">
                    <Button
                      variant={"secondary"}
                      onClick={reviewLoading ? () => {} : handleReviewSubmit}
                      className={cn(reviewLoading && "cursor-not-allowed")}
                    >
                      {reviewLoading ? (
                        <div className=" w-full flex justify-center items-center overflow-hidden">
                          <div className=" py-2 justify-center space-x-1.5 flex items-center">
                            <div className=" w-2 h-2 rounded-full bg-primary animate-loading"></div>
                            <div
                              style={{ animationDelay: "0.1s" }}
                              className=" w-2 h-2 rounded-full bg-primary animate-loading"
                            ></div>
                            <div
                              style={{ animationDelay: "0.2s" }}
                              className=" w-2 h-2 rounded-full bg-primary animate-loading"
                            ></div>
                          </div>
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className=" w-full">
              <ReviewReply
                courseData={courseData}
                reply={reply}
                setReply={setReply}
                setReviewId={setReviewId}
                reviewId={reviewId}
                handleReplySubmit={handleReplySubmit}
                replyLoading={replyLoading}
                user={user}
              />
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;
