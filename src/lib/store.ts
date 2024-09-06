import { create } from "zustand"
import { v4 as uuid } from "uuid"

export type Status = "active" | "completed"

export type Team = {
  id: string
  name: string
  odd: string
  winner?: boolean
}

export type Event = {
  id: string
  name: string
  status: Status
  teams: Team[]
}

export type User = {
  id: string
  name: string
  budget: number
  admin:  boolean
}

export type Game = {
  id: string
  name: string
  description: string
  users: User[]
  teams: Team[] | []
  events: Event[] | []
}

export type State = {
  games: Game[]
}

export type Actions = {
  addGame: (name: string, description: string, users: [], teams: [], events: []) => void
  removeGame: (id: string) => void
  updateGame: (id: string, name: string, description: string, users: [], teams: [], events: []) => void
  addTeam: (id: string, name: string, odd: string) => void
}

export const useGameStore = create<State & Actions>((set) => ({
  games: [
    {
      "id": "10",
      "name": "Demo Sim",
      "description": "Showcases the betting system",
      "users": [
        {
          "id": "1",
          "name": "Glenn",
          "budget": 4000,
          "admin": true
        },
        {
          "id": "2",
          "name": "James",
          "budget": 5000,
          "admin": false

        },
        {
          "id": "3",
          "name": "Craig",
          "budget": 5500,
          "admin": false
        },
        {
          "id": "4",
          "name": "Karen",
          "budget": 8500,
          "admin": false
        },
        {
          "id": "5",
          "name": "Olivia",
          "budget": 500,
          "admin": false
        }
      ],
      "teams": [
        {
          "id": "110",
          "name": "Orange Team",
          "odd": "1/4"
        },
        {
          "id": "120",
          "name": "Yellow Team",
          "odd": "2/9"
        },
        {
          "id": "130",
          "name": "Red Team",
          "odd": "1/8"
        },
        {
          "id": "140",
          "name": "Blue Team",
          "odd": "4/5"
        }
      ],
      "events": [
        {
          "id": "101",
          "name": "Egg and Spoon race",
          "status": "active",
          "teams": [
            {
              "id": "110",
              "name": "Orange Team",
              "odd": "1/4",
              "winner": false
            },
            {
              "id": "120",
              "name": "Yellow Team",
              "odd": "2/9",
              "winner": false
            },
            {
              "id": "130",
              "name": "Red Team",
              "odd": "1/8",
              "winner": false
            },
            {
              "id": "140",
              "name": "Blue Team",
              "odd": "4/5",
              "winner": false
            }
          ]
        },
        {
          "id": "102",
          "name": "Three legged race",
          "status": "active",
          "teams": [
            {
              "id": "110",
              "name": "Orange Team",
              "odd": "1/4",
              "winner": false
            },
            {
              "id": "120",
              "name": "Yellow Team",
              "odd": "2/9",
              "winner": false
            },
            {
              "id": "130",
              "name": "Red Team",
              "odd": "1/8",
              "winner": false
            },
            {
              "id": "140",
              "name": "Blue Team",
              "odd": "4/5",
              "winner": false
            }
          ]
        },
        {
          "id": "103",
          "name": "Skipping rope race",
          "status": "completed",
          "teams": [
            {
              "id": "110",
              "name": "Orange Team",
              "odd": "1/4",
              "winner": true
            },
            {
              "id": "120",
              "name": "Yellow Team",
              "odd": "2/9",
              "winner": false
            },
            {
              "id": "130",
              "name": "Red Team",
              "odd": "1/8",
              "winner": false
            },
            {
              "id": "140",
              "name": "Blue Team",
              "odd": "4/5",
              "winner": false
            }
          ]
        }
      ]
    }
  ],
  addGame: (name: string, description: string, users: [], teams: [], events: []) => set((state) => ({
    games: [
      ...state.games,
      { id: uuid(), name, description, users, teams, events }
    ]
  })),
  removeGame: (id: string) => set((state) => ({
    games: state.games.filter(game => game.id !== id)
  })),
  updateGame: (id: string, name: string, description: string, users: [], teams: [], events: []) => set((state) => ({
    games: state.games.map(game => game.id === id ? { ...game, name, description, users, teams, events } : game)
  })),
  addTeam: (id: string, name: string, odd: string) => set((state) => ({
    games: state.games.map(game => game.id === id ? { ...game, teams: [...game.teams, {id: uuid(), name, odd}] } : game )
  }))
}))