import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const OrdersSchema = z.object({
  _id: z.string(),
  userName: z.string().optional(),
  userEmail: z.string().optional(),
  title: z.string().optional(),
  price: z.string().optional(),
  createdAt: z.string(),
});

export type Orders = z.infer<typeof OrdersSchema>;
