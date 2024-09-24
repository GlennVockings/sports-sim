import { TeamType } from "@/lib/types"
import { Team } from "./team"
import { Warning } from "./warning"

export const TeamsWrapper = ({ teams } : { teams: TeamType[] }) => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 xl:grid-cols-5">
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