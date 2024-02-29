import { FC, useState } from "react";
import { UserAvatar } from "../Navigation/UserAvatar";
import Ratings from "@/utils/Ratings";
import { timeAgo } from "@/utils/TimeAgo";
import { BadgeCheck, MessageSquareMore } from "lucide-react";
import { Button } from "../ui/button";

interface ReviewReplyProps {
  courseData: any;
  reply: string;
  setReply: (reply: string) => void;
  setReviewId: (reviewId: string) => void;
  handleReplySubmit: any;
  replyLoading: boolean;
  user: any;
  reviewId: string;
}

const ReviewReply: FC<ReviewReplyProps> = ({
  courseData,
  reply,
  setReply,
  setReviewId,
  handleReplySubmit,
  replyLoading,
  user,
  reviewId,
}) => {
  return (
    <>
      <div className=" w-full my-3">
        {(
          courseData?.course?.reviews &&
          [...courseData?.course?.reviews].reverse()
        ).map((item: any, index: number) => (
          <ReplyItem
            key={index}
            item={item}
            reply={reply}
            setReply={setReply}
            setReviewId={setReviewId}
            handleReplySubmit={handleReplySubmit}
            replyLoading={replyLoading}
            user={user}
            reviewId={reviewId}
          />
        ))}
      </div>
    </>
  );
};

export default ReviewReply;

export const ReplyItem = ({
  item,
  reply,
  setReply,
  setReviewId,
  handleReplySubmit,
  replyLoading,
  user,
  reviewId,
}: any) => {
  const [isReviewReply, setIsReviewReply] = useState(false);
  return (
    <>
      <div className=" w-full my-3 flex">
        <UserAvatar
          className="shrink-0"
          url={item.user?.avatar?.url}
          name={item.user?.name}
        />
        <div className=" ml-2">
          <h1 className=" text-base">{item.user?.name}</h1>
          <Ratings rating={item.rating} />
          <p>{item.comment}</p>
          <small className=" opacity-70">{timeAgo(item.createdAt)}</small>
        </div>
      </div>
      {user.role === "admin" && (
        <div className="w-full mt-2 flex opacity-70">
          <span
            className=" lg:pl-16 cursor-pointer mr-2"
            onClick={() => {
              setIsReviewReply(!isReviewReply);
              setReviewId(item._id);
            }}
          >
            Add Reply
          </span>
        </div>
      )}

      {item.commentReplies.map((item: any, index: number) => (
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
            <p>{item.comment}</p>
            <small className=" opacity-70">{timeAgo(item?.createdAt)}</small>
          </div>
        </div>
      ))}
      {isReviewReply && (
        <>
          <div className=" w-full flex relative">
            <input
              type="text"
              placeholder="Enter your answer..."
              value={reply}
              onChange={(e: any) => setReply(e.target.value)}
              className=" block lg:ml-12 mt-2 outline-none bg-transparent border-b p-1 w-[100%]"
            />
            <Button
              variant={"ghost"}
              type="submit"
              className=" absolute right-0 bottom-1"
              onClick={handleReplySubmit}
              disabled={replyLoading}
            >
              {replyLoading ? (
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
      )}
    </>
  );
};
