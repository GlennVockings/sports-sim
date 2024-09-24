"use client"

import { useGameStore } from "@/lib/store";
import { useEffect, useMemo, useState } from "react";
import { TeamsWrapper } from "./teams-wrapper";
import { EventsWrapper } from "./events-wrapper";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserType } from "@/lib/types";
import { UserContext } from "@/lib/userContext";
import { GameMobile } from "./game-mobile";
import { Buttons } from "./buttons";
import { Leaderboard } from "./leaderboard";

export const GamePage = ({ gameId } : { gameId: string }) => {
  const { games } = useGameStore(state => state)
  const [sortedUsers, setSortedUsers] = useState<UserType[]>([]);
  
  const filteredGames = useMemo(() => games.filter(game => game.id === gameId), [games, gameId])
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (filteredGames.length > 0) {
      const sorted = [...filteredGames[0].users].sort((a, b) => b.budget - a.budget);
      setSortedUsers(sorted);
    }
  }, [filteredGames]);

  // TODO: make sure budget updates when a bet is made
  
  return (
    <div className="p-4">
      {
        filteredGames && (
          <UserContext.Provider value={currentUser?.id || ""}>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold underline tracking-wide">{ filteredGames[0].name }</p>
                <p className="">{ filteredGames[0].description }</p>
              </div>
              <div className="bg-slate-100 shadow-inner py-3 px-4 rounded-md text-center tracking-wide">
                <p>Budget:</p>
                {
                  sortedUsers?.map((user : UserType) =>
                    user.id === currentUser?.id ? (
                      <p key={user.id} className="font-semibold">
                        {user.budget}
                      </p>
                    ) : (
                      ""
                    )
                  )
                }
              </div>
            </div>
            <div className="py-4">
              <Buttons teams={filteredGames[0].teams} events={filteredGames[0].events} />
            </div>
            {/* <div className="py-2">
              <GameMobile game={filteredGames[0]} users={sortedUsers} />
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-2">
                <div className="order-2 bg-gray-100 shadow-inner p-2 rounded-md md:order-1 md:col-span-4">
                  <TeamsWrapper teams={filteredGames[0].teams} />
                </div>
                <div className="order-1 bg-gray-100 shadow-inner p-2 rounded-md md:order-2 md:col-span-2 lg:col-span-1">
                  <Leaderboard users={sortedUsers} />
                </div>
                <div className="order-3 bg-gray-100 shadow-inner p-2 rounded-md md:order-3 md:col-span-2 lg:col-span-3">
                  <EventsWrapper events={filteredGames[0].events} teams={filteredGames[0].teams} />
                </div>
            </div>
          </UserContext.Provider>
        )
      }
    </div>
  )
}