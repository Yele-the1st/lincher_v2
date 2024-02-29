import express from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  createOrder,
  getAllOrders,
  newPayment,
  sendStripePublishableKey,
} from "../controllers/order.controller";

const router = express.Router();

//Create an Order
router.post("/create-order", isAuthenticated, catchAsyncError(createOrder));

//Create payment
router.post("/payment", isAuthenticated, catchAsyncError(newPayment));

//Get stripe key
router.get(
  "/payment/stripepublishablekey",
  catchAsyncError(sendStripePublishableKey)
);

//Get all Orders
router.get(
  "/get-all-orders",
  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncError(getAllOrders)
);

export default router;
