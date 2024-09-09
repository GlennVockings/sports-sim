"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGameStore } from "@/lib/store";
import { useMemo } from "react";
import { TeamsWrapper } from "./teams-wrapper";
import { EventsWrapper } from "./events-wrapper";

export const GamePage = ({ gameId } : {gameId:string}) => {
  const { games } = useGameStore(state => state)
  const filteredGames = useMemo(() => games.filter(game => game.id === gameId), [games, gameId])
  const sortedUsers = useMemo(() => filteredGames[0].users.sort((a,b) => b.budget - a.budget), [filteredGames])
  
  return (
    <div className="p-4">
      {
        filteredGames && (
          <>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold underline tracking-wide">{ filteredGames[0].name }</p>
                <p className="">{ filteredGames[0].description }</p>
              </div>
              <div className="bg-slate-100 shadow-inner py-3 px-4 rounded-md text-center tracking-wide">
                <p>Budget:</p>
                <p className="font-semibold">5000</p>
              </div>
            </div>
            <div className="py-2">
              <Tabs defaultValue="teams">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                  <TabsTrigger value="teams">Teams</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>
                <TabsContent value="teams">
                  <TeamsWrapper teams={ filteredGames[0]?.teams } />
                </TabsContent>
                <TabsContent value="events">
                  <EventsWrapper events={filteredGames[0]?.events} teams={filteredGames[0]?.teams} />
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
                          sortedUsers.map((user,index) => {
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
            </div>
          </>
        )
      }
    </div>
  )
}