export type Status = "active" | "completed"

export interface TeamType {
  id: string
  name: string
  odd: string
  winner?: boolean
}

export interface EventType {
  id: string
  name: string
  status: Status
  teams: TeamType[]
}

export interface UserType {
  id: string
  name: string
  budget: number
  admin:  boolean
}

export interface BetType {
  id: string
  eventId: string
  userId: string
  amount: number
  teamName: string
  teamOdd: string
}

export interface GameType {
  id: string
  name: string
  description: string
  users: UserType[]
  teams: TeamType[] | []
  events: EventType[] | []
  activeBets: BetType[] | []
}