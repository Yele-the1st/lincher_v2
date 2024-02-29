import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IComment extends Document {
  user: IUser;
  question: string;
  answer: string;
  questionReplies: IComment[];
  comment: string;
}

interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
  commentReplies?: IComment[];
}

interface ILink extends Document {
  title: string;
  url: string;
}

interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
}

interface ICourse extends Document {
  name: string;
  description: string;
  categories: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  curator: string;
  curatorInfo: string;
  type: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData[];
  ratings?: number;
  purchased?: number;
  purchasedBy: Array<{ userId: string }>;
}

const ReviewReply = new Schema<IComment>(
  {
    user: Object,
    comment: String,
  },
  { timestamps: true }
);

const reviewSchema = new Schema<IReview>(
  {
    user: Object,
    rating: {
      type: Number,
      default: 0,
    },
    comment: String,
    commentReplies: [ReviewReply],
  },
  { timestamps: true }
);

const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

const QuestionReply = new Schema<IComment>(
  {
    user: Object,
    answer: String,
  },
  { timestamps: true }
);

const commentSchema = new Schema<IComment>(
  {
    user: Object,
    question: String,
    questionReplies: [QuestionReply],
  },
  { timestamps: true }
);

const courseDataSchema = new Schema<ICourseData>({
  videoUrl: String,
  title: String,
  videoSection: String,
  description: String,
  videoLength: Number,
  links: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
});

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: true,
    },
    curator: {
      type: String,
      required: true,
    },
    curatorInfo: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedPrice: {
      type: Number,
    },
    thumbnail: {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
    tags: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    demoUrl: {
      type: String,
      required: true,
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
    purchasedBy: [
      {
        userId: String,
      },
    ],
  },
  { timestamps: true }
);

const courseModel: Model<ICourse> = mongoose.model("Course", courseSchema);

export default courseModel;
