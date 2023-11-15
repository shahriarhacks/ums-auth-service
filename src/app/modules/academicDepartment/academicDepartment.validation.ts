import { z } from "zod";

export const academicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    academicFaculty: z.string({
      required_error: "Academic Faculty ObjectId is required",
    }),
  }),
});

export const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: "Academic Faculty ObjectId is required",
      })
      .optional(),
  }),
});
