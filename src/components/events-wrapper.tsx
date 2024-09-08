import { EventType, TeamType, UserType } from "@/lib/types"
import { AddEventForm } from "./form/add-event-form"
import { BetForm } from "./form/bet-form"
import { Warning } from "./warning"
import { Event } from "./event"

export const EventsWrapper = ({ events, teams } : { events: EventType[], teams: TeamType[] }) => {

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3">
        <AddEventForm teams={teams || []} />
        <BetForm events={events || []} />
      </div>
      {
        events.map((event: EventType) => {
          return (
            <Event key={event.id} event={event} />
          )
        })
      }
      {
        events.length >= 5 ? (
          <Warning text="You have reached the limit for events, subscribe to get access to add more." />
        ) : ""
      }
    </div>
  )
}