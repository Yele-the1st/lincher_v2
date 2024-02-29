import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const MapsSchema = z.object({
  _id: z.string(),
  name: z.string(),
  categories: z.string().optional(),
  level: z.string(),
  purchased: z.number(),
  createdAt: z.string(),
});

export type Maps = z.infer<typeof MapsSchema>;
