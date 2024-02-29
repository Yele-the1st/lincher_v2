import orderModel from "../models/order.model";

// create new order
export const newOrder = async (data: any) => {
  const order = await orderModel.create(data);
  return order;
};

// Get All orders
export const getAllOrders = async () => {
  const orders = await orderModel.find().lean().sort({ createdAt: -1 });

  return orders;
};
