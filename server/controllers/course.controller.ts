import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";
import cloudinary from "cloudinary";
import * as courseService from "../services/course.services";
import courseModel, { IComment } from "../models/course.model";
import mongoose from "mongoose";
import sendMail from "../utils/sendMail";
import notificationModel from "../models/notification.model";

export const uploadCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const thumbnail = data.thumbnail;
    if (thumbnail) {
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await courseService.createCourse(data);

    // Invalidate cache after creating a new course
    await redis.del("allCourses");

    res.status(201).json({
      sucess: true,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Edit Course
export const editCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const thumbnail = data.thumbnail;

    const courseId = req.params.id;

    const courseData = (await courseModel.findById(courseId)) as any;

    if (thumbnail && !thumbnail.startsWith("https")) {
      await cloudinary.v2.uploader.destroy(courseData?.thumbnail?.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    if (thumbnail.startsWith("https")) {
      data.thumbnail = {
        public_id: courseData?.thumbnail.public_id,
        url: courseData?.thumbnail.url,
      };
    }

    const course = await courseModel.findByIdAndUpdate(
      courseId,
      {
        $set: data,
      },
      { new: true }
    );

    // Invalidate cache after creating a new course
    await redis.del("allCourses");
    await redis.del(courseId);

    res.status(201).json({
      success: true,
      course,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

//Get single course --- without purchasing
export const getSingleCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseId = req.params.id;

    const isCachedExist = await redis.get(courseId);

    if (isCachedExist) {
      const course = JSON.parse(isCachedExist);
      return res.status(200).json({
        success: true,
        course,
      });
    }
    const course = await courseModel
      .findById(courseId)
      .select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
      )
      .lean();

    await redis.set(courseId, JSON.stringify(course), "EX", 604800); // expires in 7days

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

//Get all courses --- without purchasing
export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isCachedExist = await redis.get("allCourses");
    if (isCachedExist) {
      const courses = JSON.parse(isCachedExist);

      return res.status(200).json({
        success: true,
        courses,
      });
    }

    const courses = await courseModel
      .find()
      .select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
      )
      .lean();

    await redis.set("allCourses", JSON.stringify(courses));

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// get course content -- only for valid user
export const getCourseByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCourseList = req.user?.courses;
    const courseId = req.params.id;

    const courseExist = userCourseList?.find(
      (course: any) => course._id.toString() === courseId
    );

    if (!courseExist) {
      throw new ErrorHandler("You are not eligible to access this course", 404);
    }

    const course = await courseModel.findById(courseId);

    const content = course?.courseData;

    res.status(200).json({
      success: true,
      content,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// get course content -- only for valid user
export const getCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseId = req.params.id;

    const course = await courseModel.findById(courseId);

    if (!course) {
      throw new ErrorHandler("Course does not exist", 404);
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Add question in course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { question, courseId, contentId }: IAddQuestionData = req.body;

    // Validate input
    if (!question || !courseId || !contentId) {
      return next(new ErrorHandler("Invalid input data", 400));
    }

    const course = await courseModel.findById(courseId);

    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("Invalid content Id", 400));
    }

    const courseContent = course?.courseData?.find((item: any) =>
      item._id.equals(contentId)
    );

    if (!courseContent) {
      return next(new ErrorHandler("Content not found", 404));
    }

    // Create a new question object
    const newQuestion: any = {
      user: req.user,
      question,
      questionReplies: [],
    };

    // Add this question to our course content
    courseContent.questions.push(newQuestion);

    // create a notification
    await notificationModel.create({
      user: req.user?._id,
      title: "New question recieved",
      message: `You have a new question in ${courseContent?.title}`,
    });

    // Save the updated course
    await course.save();

    await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7days

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error: any) {
    console.error("Error in addQuestion:", error);
    return next(new ErrorHandler(error.message, 400));
  }
};

// Add answer in course question
interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export const addAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { answer, courseId, contentId, questionId }: IAddAnswerData =
      req.body;

    // Validate input
    if (!answer || !courseId || !contentId || !questionId) {
      return next(new ErrorHandler("Invalid input data", 400));
    }

    const course = await courseModel.findById(courseId);

    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("Invalid content Id", 400));
    }

    const courseContent = course?.courseData?.find((item: any) =>
      item._id.equals(contentId)
    );

    if (!courseContent) {
      return next(new ErrorHandler("Content not found", 404));
    }

    const question = courseContent?.questions?.find((item: any) =>
      item._id.equals(questionId)
    );

    if (!question) {
      return next(new ErrorHandler("question not found", 404));
    }

    // Create a new answer object
    const newAnswer: any = {
      user: req.user,
      answer,
    };

    // Add this answer to our course content
    question?.questionReplies.push(newAnswer);

    // Save the updated course
    await course?.save();

    await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7days

    if (req.user?._id === question.user._id) {
      // create a notification

      await notificationModel.create({
        user: req.user?._id,
        title: "New question reply recieved",
        message: `You have a new question reply in ${courseContent?.title}`,
      });
    } else {
      const data = {
        name: question.user.name,
        title: courseContent.title,
      };

      try {
        await sendMail({
          email: question.user.email,
          subject: "Question reply",
          template: "question-reply.ejs",
          data,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error: any) {
    console.error("Error in addAnswer:", error);
    return next(new ErrorHandler(error.message, 500));
  }
};

// add review in course
interface IAddReviewData {
  review: string;
  rating: number;
  userId: string;
}

export const addReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCourseList = req.user?.courses;
    console.log(userCourseList);

    const courseId = req.params.id;

    //check if courseId already exists in userCourseList based on _id
    const courseExist = userCourseList?.some(
      (course: any) => course._id?.toString() === courseId.toString()
    );

    if (!courseExist) {
      return next(
        new ErrorHandler("You are not eligible to access this course", 404)
      );
    }

    const course = await courseModel.findById(courseId);

    const { review, rating } = req.body as IAddReviewData;

    const reviewData: any = {
      user: req.user,
      comment: review,
      rating,
    };

    course?.reviews.push(reviewData);

    let avg = 0;
    course?.reviews.forEach((rev: any) => {
      avg += rev.rating;
    });

    if (course) {
      course.ratings = avg / course.reviews.length;
    }

    await course?.save();

    await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7days

    await redis.del("allCourses", courseId);

    // create  notification
    await notificationModel.create({
      user: req.user?._id,
      title: "New review recieved",
      message: `${req.user?.name} has given a review in ${course?.name}`,
    });

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// add review in course
interface IAddReviewData {
  comment: string;
  courseId: string;
  reviewId: string;
}

// add review reply
export const addReplyReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { comment, courseId, reviewId } = req.body as IAddReviewData;

    const course = await courseModel.findById(courseId);

    if (!course) {
      return next(new ErrorHandler("Course not found", 400));
    }

    const review = course?.reviews.find(
      (rev: any) => rev._id.toString() === reviewId
    );

    if (!review) {
      return next(new ErrorHandler("Review not found", 400));
    }

    const replyData: any = {
      user: req.user,
      comment,
    };

    if (!review.commentReplies) {
      review.commentReplies = [];
    }

    review.commentReplies?.push(replyData);

    await course?.save();

    await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7days

    res.status(201).json({
      success: true,
      course,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Get all courses
export const getAllCoursesContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await courseService.getAllCoursesContent();

    res.status(201).json({
      success: true,
      courses,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// delete course -- only for admin
export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const course = await courseModel.findById(id);

    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    await course.deleteOne({ id });

    // Invalidate cache after creating a new course
    await redis.del("allCourses", id);

    res.status(201).json({
      success: true,
      message: "course successfully deleted",
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};
