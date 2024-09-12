import { EventType, TeamType } from "@/lib/types"
import { Warning } from "./warning"
import { Event } from "./event"

export const EventsWrapper = ({ events, teams } : { events: EventType[], teams: TeamType[] }) => {

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-4 md:flex-row">
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