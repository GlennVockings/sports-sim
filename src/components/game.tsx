"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dummyGames from '@/mocks/dummyGames.json';
import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export const GamePage = ({ gameId } : {gameId:string}) => {
  const [ game, setGame ] = useState<any>()
  const data = dummyGames

  useEffect(() => {
    data.forEach(item => {
      if (item.id === gameId) {
        setGame(item)
      }
    })
  }, [data, gameId])
  
  return (
    <div className="p-4">
      {
        game && (
          <>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold underline tracking-wide">{ game.name }</p>
              <p className="">{ game.description }</p>
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
                      <Button>
                        Add Team
                      </Button>
                    </div>
                    {
                      game.teams.map((team: any) => {
                        return (
                          <div key={team.id} className="flex justify-between p-2 bg-orange-100 rounded-md">
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
                      <Button>
                        Add Event
                      </Button>
                    </div>
                    {
                      game.events.map((event: any) => {
                        return (
                          <div key={event.id} className={cn("flex flex-col justify-between gap-2 p-2 rounded-md", event.status !== "completed" ? "bg-blue-100" : "bg-red-100")}>
                            <div className="flex justify-between items-center">
                              <p className="font-semibold">{ event.name }</p>
                              {
                                event.status === "active" ? (
                                  <Button className="h-6 px-2">
                                    Bet
                                  </Button>
                                ) : (
                                  <div>
                                    Completed
                                  </div>
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
                                                team.winner ? <FaCrown /> : ""
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
                        <TableRow>
                          <TableCell>
                            1
                          </TableCell>
                          <TableCell>
                            Glenn
                          </TableCell>
                          <TableCell>
                            5000
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            2
                          </TableCell>
                          <TableCell>
                            James
                          </TableCell>
                          <TableCell>
                            5000
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            3
                          </TableCell>
                          <TableCell>
                            Craig
                          </TableCell>
                          <TableCell>
                            5000
                          </TableCell>
                        </TableRow>
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