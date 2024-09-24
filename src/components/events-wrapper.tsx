import { EventType, TeamType } from "@/lib/types"
import { Warning } from "./warning"
import { Event } from "./event"

export const EventsWrapper = ({ events, teams } : { events: EventType[], teams: TeamType[] }) => {

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {
          events.map((event: EventType) => {
            return (
              <Event key={event.id} event={event} />
            )
          })
        }
      </div>
      {
        events.length >= 5 ? (
          <Warning text="You have reached the limit for events, subscribe to get access to add more." />
        ) : ""
      }
    </div>
  )
}