import { EventType, TeamType } from "@/lib/types"
import { AddEventForm } from "./form/add-event-form"
import { AddTeamForm } from "./form/add-team-form"
import { BetForm } from "./form/bet-form"

export const Buttons = ({ teams, events } : { teams: TeamType[], events: EventType[] }) => {
  return (
    <div className="flex gap-2">
        <AddTeamForm />
        <AddEventForm teams={teams} />
        <BetForm events={events} />
    </div>
  )
}
