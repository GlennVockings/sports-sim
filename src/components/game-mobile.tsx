import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { EventsWrapper } from "./events-wrapper"
import { TeamsWrapper } from "./teams-wrapper"
import { GameType, UserType } from "@/lib/types"
import { Leaderboard } from "./leaderboard"

export const GameMobile = ({ game, users } : { game: GameType, users: UserType[] }) => {
  return (
    <Tabs defaultValue="teams">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="teams">
            <TeamsWrapper teams={ game.teams } />
        </TabsContent>
        <TabsContent value="events">
            <EventsWrapper events={game.events} teams={ game.teams} />
        </TabsContent>
        <TabsContent value="leaderboard">
            <Leaderboard users={users} />
        </TabsContent>
    </Tabs>
  )
}
