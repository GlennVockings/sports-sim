import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(1, {
    message: "Password is required"
  })
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required"
  }),
  name: z.string().min(1, {
    message: "Name is required"
  })
})

export const TeamSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  odd: z.string().min(1, {
    message: "Odd is required"
  }),
  winner: z.boolean()
})

export const EventSchema = z.object({
  name: z.string(),
  status: z.enum(["active", "completed"]),
  teams: z.array(TeamSchema)
})