import express from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  getCoursesAnalytics,
  getOrdersAnalytics,
  getUsersAnalytics,
} from "../controllers/analytics.controller";

const router = express.Router();

//user analytics
router.get(
  "/get-user-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(getUsersAnalytics)
);

//order analytics
router.get(
  "/get-order-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(getOrdersAnalytics)
);

//course analytics
router.get(
  "/get-course-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(getCoursesAnalytics)
);

export default router;
