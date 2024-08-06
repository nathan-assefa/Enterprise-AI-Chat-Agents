import { z } from "zod";

export const fromSchema = z.object({
  message: z.string().min(2, "Your Message is too short"),
});
