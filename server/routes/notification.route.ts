import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller";

const router = express.Router();

//Get all notification
router.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(getNotifications)
);

//Update notification status
router.put(
  "/update-notification/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(updateNotification)
);

export default router;
