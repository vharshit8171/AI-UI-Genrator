import { z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .regex(/^(?=.*[A-Za-z])[A-Za-z0-9\s._-]+$/, "Username must contain at least one letter")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters"),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    contactNumber: z
      .string()
      .trim()
      .regex(/^[0-9]{10}$/, "Contact number must be 10 digits"),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  }),
});
