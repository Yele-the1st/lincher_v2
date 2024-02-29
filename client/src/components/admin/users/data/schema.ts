import { z } from "zod";

export const UsersSchema = z.object({
  _id: z.string(), // Check the case of "_id"
  name: z.string(),
  email: z.string(),
  role: z.string(),
  courses: z
    .array(
      z.object({
        _id: z.string(), // Check the case of "_id" here as well
        // Define other properties for each course as needed
      })
    )
    .optional(),
  createdAt: z.string(),
});

export type Users = z.infer<typeof UsersSchema>;
