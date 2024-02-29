import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layout.controller";

const router = express.Router();

//Get all notification
router.post(
  "/create-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(createLayout)
);

//Get all notification
router.put(
  "/edit-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(editLayout)
);

//Get all notification
router.get("/get-layout/:type", catchAsyncError(getLayoutByType));

export default router;
