export type Status = "active" | "completed"

export interface Team {
  id: string
  name: string
  odd: string
  winner?: boolean
}

export interface Event {
  id: string
  name: string
  status: Status
  teams: Team[]
}

export interface User {
  id: string
  name: string
  budget: number
  admin:  boolean
}

export interface Bet {
  id: string
  eventId: string
  eventName: string
  amount: number
  team: Team
}

export interface Game {
  id: string
  name: string
  description: string
  users: User[]
  teams: Team[] | []
  events: Event[] | []
  activeBets: Bet[] | []
}