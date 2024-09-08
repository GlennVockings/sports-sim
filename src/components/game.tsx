"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCrown } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/lib/store";
import { useMemo } from "react";
import { AddEventForm } from "@/components/form/add-event-form";
import { AddTeamForm } from "@/components/form/add-team-form";
import { Badge } from "@/components/ui/badge";
import { Warning } from "@/components/warning";
import { FaRegTrashCan } from "react-icons/fa6";
import { BetForm } from "./form/bet-form";

export const GamePage = ({ gameId } : {gameId:string}) => {
  const {games, removeTeam, removeEvent} = useGameStore(state => state)
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
                  <div className="flex flex-col gap-2">
                    <div>
                      <AddTeamForm />
                    </div>
                    {
                      filteredGames[0].teams?.map((team: any) => {
                        return (
                          <div key={team.id} className="flex justify-between items-center gap-4 px-2 py-4 bg-custom-3 text-custom-1 rounded-md">
                            <div className="flex justify-between flex-grow">
                              <p className="font-semibold">{ team.name }</p>
                              <p>{`Odds: ${team.odd}`}</p>
                            </div>
                            <Button variant={"secondary"} size={"icon"} onClick={() => removeTeam("10", team.id)}>
                              <FaRegTrashCan />
                            </Button>
                          </div>
                        )
                      })
                    }
                    {
                      filteredGames[0].teams.length >= 5 ? (
                        <Warning text="You have reached the limit for teams, subscribe to get access to add more." />
                      ) : ""
                    }
                  </div>
                </TabsContent>
                <TabsContent value="events">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-3">
                      <AddEventForm teams={filteredGames[0].teams || []} />
                      <BetForm events={filteredGames[0].events || []} />
                    </div>
                    {
                      filteredGames[0].events?.map((event: any) => {
                        return (
                          <div key={event.id} className={cn("flex flex-col justify-between gap-2 p-3 rounded-md text-white", event.status === "completed" ? "bg-custom-4/90" : "bg-custom-4")}>
                            <div className="flex justify-between items-center gap-3">
                              <div className="flex justify-between flex-grow">
                                <p className="font-semibold">{ event.name }</p>
                                {
                                  event.status === "completed" ? (
                                    <Badge>
                                      Completed
                                    </Badge>
                                  ) : ""
                                }
                              </div>
                              <Button size={"icon"} onClick={() => removeEvent("10", event.id)}>
                                <FaRegTrashCan />
                              </Button>
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
                    {
                      filteredGames[0].events.length >= 5 ? (
                        <Warning text="You have reached the limit for events, subscribe to get access to add more." />
                      ) : ""
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