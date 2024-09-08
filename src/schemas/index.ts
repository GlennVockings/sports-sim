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
  name: z.string().min(1, {
    message: "Name is required"
  }),
  status: z.enum(["active", "completed"]),
  teams: z.array(TeamSchema).min(2, {
    message: "2 teams are required"
  })
})

export const BetSchema = z.object({
  eventId: z.string().min(1, {
    message: "Must select an ID"
  }),
  eventName: z.string(),
  teamName: z.string().min(1, {
    message: "Must select a team"
  }),
  teamOdd: z.string(),
  amount: z.number().gte(1)
})