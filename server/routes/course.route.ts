import express from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  addAnswer,
  addQuestion,
  addReplyReview,
  addReview,
  deleteCourse,
  editCourse,
  getAllCourses,
  getAllCoursesContent,
  getCourseById,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { updateAccessToken } from "../controllers/user.controller";
const router = express.Router();

//Create a course
router.post(
  "/create-course",

  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(uploadCourse)
);

//Edit a course
router.put(
  "/edit-course/:id",

  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(editCourse)
);

//get a course
router.get("/get-course/:id", catchAsyncError(getSingleCourse));

//get all course
router.get("/get-courses", catchAsyncError(getAllCourses));

//get a course by purchase
router.get(
  "/get-course-content/:id",

  isAuthenticated,
  catchAsyncError(getCourseByUser)
);

//get a course by purchase
router.get(
  "/get-course-edit/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(getCourseById)
);

//add question
router.put(
  "/add-question",

  isAuthenticated,
  catchAsyncError(addQuestion)
);

//add answer
router.put(
  "/add-answer",

  isAuthenticated,
  catchAsyncError(addAnswer)
);

//add review
router.put(
  "/add-review/:id",

  isAuthenticated,
  catchAsyncError(addReview)
);

//add review
router.put(
  "/add-review-reply",

  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(addReplyReview)
);

//Get all courses content
router.get(
  "/get-all-courses",

  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(getAllCoursesContent)
);

// Get all users
router.delete(
  "/delete-course/:id",

  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(deleteCourse)
);

export default router;
