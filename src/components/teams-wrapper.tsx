import { TeamType } from "@/lib/types"
import { AddTeamForm } from "./form/add-team-form"
import { Team } from "./team"
import { Warning } from "./warning"

export const TeamsWrapper = ({ teams } : { teams: TeamType[] }) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <AddTeamForm />
      </div>
      {
        teams.map((team: TeamType) => {
          return (
            <Team key={team.id} team={team} />
          )
        })
      }
      {
        teams.length >= 5 ? (
          <Warning text="You have reached the limit for teams, subscribe to get access to add more." />
        ) : ""
      }
    </div>
  )
}