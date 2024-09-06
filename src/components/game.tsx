"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCrown } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/lib/store";
import { useMemo } from "react";
import { ModalWrapper } from "@/components/modal-wrapper";
import { AddEventForm } from "@/components/form/add-event-form";
import { AddTeamForm } from "@/components/form/add-team-form";
import { Badge } from "./ui/badge";

export const GamePage = ({ gameId } : {gameId:string}) => {
  const games = useGameStore(state => state.games)
  const filteredGames = useMemo(() => games.filter(game => game.id === gameId), [games, gameId])
  const sortedUsers = useMemo(() => filteredGames[0].users.sort((a,b) => b.budget - a.budget), [filteredGames])
  
  return (
    <div className="p-4">
      {
        filteredGames && (
          <>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold underline tracking-wide">{ filteredGames[0].name }</p>
              <p className="">{ filteredGames[0].description }</p>
            </div>
            <div className="py-2">
              <Tabs defaultValue="teams">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                  <TabsTrigger value="teams">Teams</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>
                <TabsContent value="teams">
                  <div className="flex flex-col gap-2">
                    <div>
                      <ModalWrapper buttonLabel="Add Team" modalTitle="Add Team">
                        <AddTeamForm />
                      </ModalWrapper>
                    </div>
                    {
                      filteredGames[0].teams?.map((team: any) => {
                        return (
                          <div key={team.id} className="flex justify-between px-2 py-4 bg-custom-3 text-custom-1 rounded-md">
                            <p className="font-semibold">{ team.name }</p>
                            <p>{`Odds: ${team.odd}`}</p>
                          </div>
                        )
                      })
                    }
                  </div>
                </TabsContent>
                <TabsContent value="events">
                  <div className="flex flex-col gap-2">
                    <div>
                      <ModalWrapper buttonLabel="Add Event" modalTitle="Add Event">
                        <AddEventForm teams={filteredGames[0].teams || []} />
                      </ModalWrapper>
                    </div>
                    {
                      filteredGames[0].events?.map((event: any) => {
                        return (
                          <div key={event.id} className={cn("flex flex-col justify-between gap-2 p-3 rounded-md text-white", event.status === "completed" ? "bg-custom-4/90" : "bg-custom-4")}>
                            <div className="flex justify-between items-center">
                              <p className="font-semibold">{ event.name }</p>
                              {
                                event.status === "active" ? (
                                  <Button className="h-6 px-4 tracking-wide">
                                    Bet
                                  </Button>
                                ) : (
                                  <Badge>
                                    Completed
                                  </Badge>
                                )
                              }
                            </div>
                            <div>
                              {
                                event.teams.map((team:any) => {
                                  return (
                                    <div key={team.id} className="flex justify-between">
                                      <div className="flex gap-2 items-center">
                                        <p>{ team.name }</p>
                                        {
                                          event.status === "completed" ? (
                                            <div>
                                              {
                                                team.winner ? <FaCrown className="fill-custom-2 text-xl" /> : ""
                                              }
                                            </div>
                                          ) : (
                                            ""
                                          )
                                        }
                                      </div>
                                      <p>{`Odds: ${team.odd}`}</p>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
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