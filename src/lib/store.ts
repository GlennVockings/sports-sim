import { create } from "zustand"
import { v4 as uuid } from "uuid"

export type Status = "active" | "completed"

export type User = {
  id: string
  name: string
  budget: number
  admin:  boolean
}

export type Team = {
  id: string
  name: string
  odd: string
  winner?: boolean
}

export type Bet = {
  amount: number
  id: string
  teamOdd: string
  teamName: string
  userId: string
  userName: string
}

export type Event = {
  id: string
  name: string
  status: Status
  teams: Team[]
  bets: Bet[] | []
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
  addGame: (name: string, description: string, users: [], teams: [], events: [], activeBets: []) => void
  removeGame: (id: string) => void
  updateGame: (id: string, name: string, description: string, users: [], teams: [], events: []) => void
  addTeam: (id: string, name: string, odd: string) => void
  removeTeam: (gameId: string, id: string) => void
  addEvent: (gameId: string, name: string, status: Status, teams: Team[], bets: []) => void
  removeEvent: (gameId: string, id: string) => void
  addBet: (gameId: string, eventId: string, teamName: string, teamOdd: string, userId: string, userName: string, amount: number) => void
  removeBet: (gameId: string, eventId: string, id: string) => void
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
          ],
          "bets": [
            {
              "id": "200",
              "userId": "1",
              "userName": "Glenn",
              "amount": 3000,
              "teamName": "Orange Team",
              "teamOdd": "1/4",
            },
            {
              "id": "201",
              "userId": "2",
              "userName": "James",
              "amount": 400,
              "teamName": "Red Team",
              "teamOdd": "1/8",
            },
            {
              "id": "202",
              "userId": "3",
              "userName": "Craig",
              "amount": 2100,
              "teamName": "Blue Team",
              "teamOdd": "4/5",
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
          ],
          "bets": []
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
          ],
          "bets": []
        }
      ]
    }
  ],
  addGame: (name: string, description: string, users: [], teams: [], events: [], activeBets: []) => set((state) => ({
    games: [
      ...state.games,
      { id: uuid(), name, description, users, teams, events, activeBets }
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
  })),
  removeTeam: (gameId: string, id: string) => set((state) => ({
    games: state.games.map(game => game.id === gameId ? { ...game, teams: game.teams.filter(team => team.id !== id) } : game)
  })),
  addEvent: (gameId: string, name: string, status: Status, teams: Team[], bets: []) => set((state) => ({
    games: state.games.map(game => game.id === gameId ? { ...game, events: [ ...game.events, { id: uuid(), name, status, teams, bets}]} : game)
  })),
  removeEvent: (gameId: string, id: string) => set((state) => ({
    games: state.games.map(game => game.id === gameId ? { ...game, events: game.events.filter(event => event.id !== id)} : game)
  })),
  addBet: (gameId: string, eventId: string, teamName: string, teamOdd: string, userId: string, userName: string, amount: number) => set((state) => ({
    games: state.games.map(game => game.id === gameId ? { ...game, events: game.events.map(event => event.id === eventId ? { ...event, bets: [ ...event.bets, { id: uuid(), teamName, teamOdd, userId, userName, amount}] } : event) } : game)
  })),
  removeBet: (gameId: string, eventId: string, id: string) => set((state) => ({
    games: state.games.map(game => game.id === gameId ? { ...game, events: game.events.map(event => event.id === eventId ? { ...event, bets: event.bets.filter(bet => bet.id !== id) } : event )} : game)
  }))
}))