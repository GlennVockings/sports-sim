import { EventType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { FaCrown, FaRegTrashCan } from "react-icons/fa6"
import { useGameStore } from "@/lib/store"
import { Separator } from "./ui/separator"

export const Event = ({ event } : { event: EventType }) => {
  const removeEvent = useGameStore(state => state.removeEvent)

  return (
    <div className={cn("flex flex-col justify-between gap-2 rounded-md text-white", event.status === "completed" ? "bg-custom-4/90" : "bg-custom-4")}>
      <div className="p-3">  
        <div className="flex justify-between items-center gap-3">
          <div className="flex justify-between flex-grow">
            <p className="font-bold tracking-wide">{ event.name }</p>
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
      {
        event.bets.length > 0 ? (
          <div className="bg-custom-3 text-custom-4 p-3 rounded-b-md flex flex-col gap-1">
            <p className="font-bold tracking-wide text-center leading-4">Bets</p>
            <Separator className="bg-custom-4" />
            <div>
              {
                event.bets.map((bet : any) => (
                  <div key={bet.id} className="flex justify-between gap-3">
                    <p>{ bet.userName }</p>
                    <p>{ bet.teamName }</p>
                    <p>{ bet.amount }</p>
                  </div>
                ))
              }
            </div>
          </div>
        ) : ""
      }
    </div>
  )
}