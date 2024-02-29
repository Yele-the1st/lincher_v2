import notificationModel from "../models/notification.model";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import cron from "node-cron";

// get all notification for admin only
export const getNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notifications = await notificationModel
      .find()
      .lean()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Update notification status -- only admin
export const updateNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notification = await notificationModel.findById(req.params.id);

    if (!notification) {
      return next(new ErrorHandler("Notification not found", 404));
    }

    // Update the status field
    notification.status = "read";

    // Save the updated notification back to the database
    await notification.save();

    const notifications = await notificationModel
      .find()
      .lean()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// delete notification -- only admin
cron.schedule(
  "0 0 0 * * *",
  async () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await notificationModel.deleteMany({
      status: "read",
      createdAt: { $lt: thirtyDaysAgo },
    });
    console.log("Deleted read notification");
  },
  { scheduled: true, timezone: "Africa/Lagos" }
);
