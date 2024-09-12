import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { EventsWrapper } from "./events-wrapper"
import { TeamsWrapper } from "./teams-wrapper"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { GameType, UserType } from "@/lib/types"

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
            <div>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Pos.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Budget</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {
                    users.map((user,index) => {
                    return (
                        <TableRow key={user.id}>
                        <TableCell>
                            { index + 1 }
                        </TableCell>
                        <TableCell>
                            { user.name }
                        </TableCell>
                        <TableCell>
                            { user.budget }
                        </TableCell>
                        </TableRow>
                    )
                    })
                }
                </TableBody>
            </Table>
            </div>
        </TabsContent>
    </Tabs>
  )
}
