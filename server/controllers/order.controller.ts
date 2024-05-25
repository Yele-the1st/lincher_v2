import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import orderModel, { IOrder } from "../models/order.model";
import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import sendMail from "../utils/sendMail";
import notificationModel from "../models/notification.model";
import { redis } from "../utils/redis";
import * as orderService from "../services/order.services";
import { config } from "dotenv";
import { Stripe } from "stripe";
import createPurchaseConfirmationMail from "../mails/order-confirmation-mail";

config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// create order
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId, payment_info } = req.body as IOrder;

    if (payment_info) {
      if ("id" in payment_info) {
        const paymentIntentId = payment_info.id as string; // Explicitly cast to string
        const paymentIntent = await stripe.paymentIntents.retrieve(
          paymentIntentId
        );

        if (paymentIntent.status !== "succeeded") {
          return next(new ErrorHandler("Payment not authorised", 400));
        }
      }
    }

    const userId = req.user?._id;
    const user = await userModel.findById(userId);
    const courseExistInUser = user?.courses.some(
      (course: any) => course._id.toString() === courseId
    );
    if (courseExistInUser) {
      return next(
        new ErrorHandler("You have already purchased this course.", 400)
      );
    }

    const course = await courseModel.findById(courseId);

    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const data: any = {
      courseId: course._id,
      userId: user?._id,
      payment_info,
    };

    const order = await orderService.newOrder(data);

    const mailData = {
      _id: course._id.toString().slice(0, 6),
      name: course.name,
      price: course.price,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    const htmlContent = createPurchaseConfirmationMail(mailData);

    user?.courses.push(course?._id);

    // await redis.set(req.user?._id, JSON.stringify(user));

    await user?.save();

    await redis.set(userId, JSON.stringify(user));

    // Increment the purchased count
    course.purchased = (course.purchased ?? 0) + 1;

    // Update the course's purchasedBy field
    course?.purchasedBy?.push(userId);

    await course.save();

    await redis.del("allCourses", courseId);
    await redis.del(courseId);

    res.status(201).json({
      success: true,
      order,
    });

    try {
      if (user) {
        await sendMail({
          email: user.email,
          subject: "Order Confirmation",
          html: htmlContent,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }

    await notificationModel.create({
      user: user?._id,
      title: "New Order",
      message: `You have a new order from ${course?.name}`,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Get all orders

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await orderService.getAllOrders();

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// send stripe publishable key
export const sendStripePublishableKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(201).json({
    success: true,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
};

// new payment
export const newPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "USD",
      metadata: {
        company: "Lincher",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(201).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};
