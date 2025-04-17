import { z } from "zod";

export const questionFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  forecast: z.number(),
});

export type QuestionFormValues = z.infer<typeof questionFormSchema>;
