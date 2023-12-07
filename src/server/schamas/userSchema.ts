import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  occupation: z.string(),
  adm: z.boolean(),
  photo: z.string(),
  departmentId: z.string().optional(),
});

export const idUserSchema = z.string().uuid(); // Defina o esquema de validação para UUID

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  departmentId: z.string().optional(),
  occupation: z.string().optional(),
  adm: z.boolean().optional(),
  photo: z.string().optional(),
});

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });


