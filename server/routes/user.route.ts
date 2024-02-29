import express from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import {
  activateUser,
  deletePicture,
  deleteUser,
  getAllAdminUsers,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  updatePassword,
  updatePicture,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const router = express.Router();

//Create a user
router.post("/registration", catchAsyncError(registerUser));

//Verify a user
router.post("/activation", catchAsyncError(activateUser));

//Login a user
router.post("/login", catchAsyncError(loginUser));

//Logout a user
router.get(
  "/logout",

  isAuthenticated,
  catchAsyncError(logoutUser)
);

//Get user info
router.get(
  "/me",

  isAuthenticated,
  catchAsyncError(getUserInfo)
);

//Social Authentication
router.post("/social-auth", catchAsyncError(socialAuth));

//Get update user info
router.put(
  "/update-user-info",

  isAuthenticated,
  catchAsyncError(updateUserInfo)
);

// Update user Password
router.put(
  "/update-user-password",

  isAuthenticated,
  catchAsyncError(updatePassword)
);

// Update user Avatar
router.put(
  "/update-user-avatar",

  isAuthenticated,
  catchAsyncError(updatePicture)
);

// Update user Avatar
router.delete(
  "/delete-user-avatar",

  isAuthenticated,
  catchAsyncError(deletePicture)
);

// Get all users
router.get(
  "/get-all-users",

  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(getAllUsers)
);

// Get all admin users
router.get(
  "/get-all-admin-users",

  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(getAllAdminUsers)
);

// update user role
router.put(
  "/update-user-roles",

  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(updateUserRole)
);

// delete user
router.delete(
  "/delete-user/:id",

  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(deleteUser)
);
export default router;
