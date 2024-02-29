import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { redis } from "../utils/redis";
import { IUser } from "../models/user.model";
import { updateAccessToken } from "../controllers/user.controller";

// AUthenticate user
export const isAuthenticated = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.cookies || !req.cookies.access_token) {
        console.error("Access token is missing in cookies");
        throw new ErrorHandler("Please login to access this resource", 400);
      }

      const decoded = jwt.verify(
        req.cookies.access_token,
        process.env.ACCESS_TOKEN as Secret
      ) as JwtPayload;

      console.log("Decoded Token:", decoded);

      const user = await redis.get(decoded.id);

      if (!user) {
        console.error("User data not found in Redis");
        throw new ErrorHandler("Please login to access this resource", 400);
      }

      req.user = JSON.parse(user);
      next();
    } catch (error: any) {
      console.error("Authentication Error:", error);

      if (error.name === "TokenExpiredError") {
        // Handle token expiration, e.g., update token
        console.log(error);
        console.log("Handling Token Expiry");
        try {
          await updateAccessToken(req, res, next);
        } catch (updateError) {
          console.error("Error updating access token:", updateError);
          return next(updateError);
        }
      } else {
        console.error("Access Token verification error:", error);
        throw new ErrorHandler("Access Token is not valid", 400);
      }
    }
  }
);

// Validate user Role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user!.role)) {
      throw new ErrorHandler(
        `Role:${req.user?.role} is not authorized to access this resource`,
        403
      );
    }
    next();
  };
};
