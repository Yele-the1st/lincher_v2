import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import * as authService from "../services/auth.services";
import * as userService from "../services/user.services";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import { redis } from "../utils/redis";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import userModel from "../models/user.model";
import cloudinary from "cloudinary";

// Registration user
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const userData = {
      name,
      email,
      password,
    };
    const activationToken = await authService.registerUser(userData);

    res.status(201).json({
      success: true,
      message: `Please check your email: ${email} to activate your account`,
      activationToken: activationToken.token,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Activate user

export const activateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { activation_token, activation_code } = req.body;
    const activationData = {
      activation_token,
      activation_code,
    };

    const user = await authService.activateUser(activationData);
    res.status(201).json({
      success: true,
      message: `User has been verified succesfully`,
      username: user.name,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Login user

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const loginDetails = {
      email,
      password,
    };
    // Call the service function to handle the authentication
    const user = await authService.loginUser(loginDetails);

    // If authentication is successful, set tokens and send a response
    sendToken(user, 200, res);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Logout user

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });

    const userId = req.user?._id;

    redis.del(userId);

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// update Access Token

export const updateAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refresh_token = req.cookies.refresh_token as string;
    const decoded = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN as Secret
    ) as JwtPayload;

    const message = "Session expired, please login to access this resource";
    if (!decoded) {
      return next(new ErrorHandler(message, 400));
    }
    const session = await redis.get(decoded.id as string);

    if (!session) {
      return next(new ErrorHandler(message, 400));
    }

    const user = JSON.parse(session);

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN as Secret,
      {
        expiresIn: "5m",
      }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN as Secret,
      {
        expiresIn: "3d",
      }
    );

    req.user = user;

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    await redis.set(user._id, JSON.stringify(user), "EX", 604800); // expires in 7days

    // res.status(200).json({
    //   success: true,
    //   accessToken,
    // });
    next();
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Get user info
export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;

    const user = await userService.getUserById(userId);

    // Exclude password field from user object
    const { password, ...userInfoWithoutPassword } = user;

    res.status(201).json({
      success: true,
      user: userInfoWithoutPassword,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

interface ISocialAuthBody {
  email: string;
  name: string;
  avatar: string;
}

// Social auth

export const socialAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, avatar } = req.body as ISocialAuthBody;
    const user = await userModel.findOne({ email });
    if (!user) {
      const newUser = await userModel.create({ email, name, avatar });
      sendToken(newUser, 200, res);
    } else {
      sendToken(user, 200, res);
    }
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// update user info

interface IUpdateUserInfo {
  name?: string;
  email?: string;
}

export const updateUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body as IUpdateUserInfo;
    const userId = req.user?._id;
    const user = await userModel.findById(userId);

    // if (email && user) {
    //   const isEmailExist = await userModel.findOne({ email });
    //   if (isEmailExist) {
    //     return next(new ErrorHandler("Email already exist", 400));
    //   }
    //   user.email = email;
    // }

    if (name && user) {
      user.name = name;
    }

    await user?.save();

    await redis.set(userId, JSON.stringify(user));

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

// update user password

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, newPassword } = req.body as IUpdatePassword;

    if (!oldPassword || !newPassword) {
      return next(new ErrorHandler("Please enter old and new password", 400));
    }

    const user = await userModel.findById(req.user?._id).select("+password");

    if (user?.password === undefined) {
      return next(new ErrorHandler("Invalid user", 400));
    }

    const isPasswordMatch = await user?.comparePassword(oldPassword);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid old password", 400));
    }

    user.password = newPassword;

    await user.save();

    await redis.set(req.user?._id, JSON.stringify(user));

    res.status(201).json({
      success: true,
      message: "Password updated successfully",
      // user,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

interface IUpdateProfilePicture {
  avatar: string;
}

//update profile picture

export const updatePicture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { avatar } = req.body as IUpdateProfilePicture;

    const userId = req?.user?._id;

    const user = await userModel.findById(userId);

    if (avatar && user) {
      // Delete the existing avatar if it exists
      if (user?.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
      }

      // Upload the new avatar to Cloudinary
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
        width: 150,
      });

      // Update the user's avatar information
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await user?.save();

    await redis.set(userId, JSON.stringify(user));

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user: {
        _id: user?._id,
        avatar: user?.avatar,
        // Include other user properties as needed
      },
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const deletePicture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      return next(new ErrorHandler("User ID not provided", 400));
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Delete the existing avatar if it exists
    if (user?.avatar?.public_id) {
      await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
    }

    // Update the user's avatar information
    user.avatar = {
      public_id: "",
      url: "",
    };

    await user.save();

    await redis.set(userId, JSON.stringify(user));

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user: {
        _id: user?._id,
        avatar: user?.avatar,
        // Include other user properties as needed
      },
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Get all users

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers();

    res.status(201).json({
      success: true,
      users,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Get all admin users
export const getAllAdminUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ensure 'role' field is indexed in the database
    const adminUsers = await userModel.find({ role: "admin" });
    // .select("username email role courses");

    res.status(200).json({
      success: true,
      users: adminUsers,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// update user role -- only for admin
export const updateUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, role } = req.body;

    // Check if the user making the request has admin role
    // You might want to implement proper authentication and authorization logic
    if (req.user?.role !== "admin") {
      return next(new ErrorHandler("Unauthorized", 403));
    }

    // Check if the email exists in the database
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      // Return an error if the email is not found
      return next(
        new ErrorHandler("User with the provided email not found", 404)
      );
    }

    // Update user role using userService
    const updatedUser = await userService.updateUserRole(
      existingUser._id,
      role
    );

    if (!updatedUser) {
      // Return an error if the user is not found by ID
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// delete user -- only for admin
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    await user.deleteOne({ id });

    await redis.del(id);

    res.status(201).json({
      success: true,
      message: "User successfully deleted",
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};
