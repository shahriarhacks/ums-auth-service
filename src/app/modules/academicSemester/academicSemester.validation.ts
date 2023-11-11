import { z } from "zod";
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitle,
} from "./academicSemester.constant";

export const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitle] as [string, ...string[]], {
      required_error: "Title is required",
    }),
    year: z.string({ required_error: "Year is required" }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]], {
      required_error: "Code is required",
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: "Start Month is required",
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: "End Month is required",
    }),
  }),
});
export const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitle] as [string, ...string[]], {
          required_error: "Title is required",
        })
        .optional(),
      year: z.string({ required_error: "Year is required" }).optional(),
      code: z
        .enum([...academicSemesterCode] as [string, ...string[]], {
          required_error: "Code is required",
        })
        .optional(),
      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: "Start Month is required",
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: "End Month is required",
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: "Either both code and title should be provided or neither",
    },
  );
