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
  teams: z.array(z.object({
    id: z.string(),
    name: z.string(),
    odd: z.string(),
    winner: z.boolean()
  })).min(2, {
    message: "Minimum 2 teams are required"
  })
})

export const BetSchema = z.object({
  eventId: z.string().min(1, {
    message: "Must select an ID"
  }),
  teamName: z.string().min(1, {
    message: "Must select a team"
  }),
  teamOdd: z.string(),
  amount: z.number().gte(1),
  userId: z.string(),
  userName: z.string()
})

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  budget: z.number().gte(1)
})

export const GameSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  description: z.string(),
  users: z.array(UserSchema),
  teams: z.array(TeamSchema),
  events: z.array(EventSchema)
})