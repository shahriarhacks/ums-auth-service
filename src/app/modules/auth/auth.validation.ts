import { z } from "zod";

export const authLoginZodSchema = z.object({
  body: z.object({
    uid: z.string({
      required_error: "UID must be required",
    }),
    password: z.string({
      required_error: "Password must be required",
    }),
  }),
});

export const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refToken: z
      .string({
        required_error: "Refresh Token is required",
      })
      .optional(),
  }),
});
