import { timeAgo } from "@/utils/TimeAgo";
import { FC, useState } from "react";
import { UserAvatar } from "../Navigation/UserAvatar";
import { BadgeCheck, MessageSquareMore } from "lucide-react";
import { Button } from "../ui/button";

interface CommentReplyProps {
  data: any;
  activeVideo: number;
  answer: string;
  setAnswer: (answer: string) => void;
  handleAnswerSubmit: () => void;
  setQuestionId: (questionId: string) => void;
  answerLoading: boolean;
}

const CommentReply: FC<CommentReplyProps> = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  setQuestionId,
  handleAnswerSubmit,
  answerLoading,
}) => {
  return (
    <>
      <div className=" w-full my-3">
        {(
          data[activeVideo].questions &&
          [...data[activeVideo].questions].reverse()
        ).map((item: any, index: any) => (
          <CommentItem
            key={index}
            item={item}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerLoading={answerLoading}
          />
        ))}
      </div>
    </>
  );
};

export default CommentReply;

export const CommentItem = ({
  setQuestionId,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className=" my-4">
        <div className=" flex mb-2">
          <UserAvatar
            className="shrink-0"
            url={item?.user?.avatar?.url}
            name={item?.user.name}
          />
          <div className=" pl-3">
            <h5 className=" text-base">{item?.user.name}</h5>
            <p>{item?.question}</p>
            <small className=" opacity-70">
              {!item.createdAt ? "" : timeAgo(item?.createdAt)}
            </small>
          </div>
        </div>
        <div className="w-full flex opacity-70">
          <span
            className=" lg:pl-16 cursor-pointer mr-2"
            onClick={() => {
              setQuestionId(item._id);
              setReplyActive(!replyActive);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <MessageSquareMore size={20} className=" cursor-pointer" />
          <span className=" pl-1 mt-[-4px] cursor-pointer">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((item: any, index: number) => (
              <div key={index} className=" w-full flex lg:ml-16 my-5">
                <UserAvatar
                  className="shrink-0"
                  url={item?.user?.avatar?.url}
                  name={item?.user.name}
                />
                <div className="pl-3">
                  <div className=" flex items-center">
                    <h5 className="text-base">{item.user.name}</h5>{" "}
                    {item.user.role === "admin" && (
                      <BadgeCheck size={14} className=" ml-1 text-green-600" />
                    )}
                  </div>
                  <p>{item.answer}</p>
                  <small className=" opacity-70">
                    {timeAgo(item?.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className=" w-full flex relative">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className=" block lg:ml-12 mt-2 outline-none bg-transparent border-b p-1 w-[100%]"
                />
                <Button
                  variant={"ghost"}
                  type="submit"
                  className=" absolute right-0 bottom-1"
                  onClick={handleAnswerSubmit}
                  disabled={answerLoading}
                >
                  {answerLoading ? (
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
            </>
          </>
        )}
      </div>
    </>
  );
};
