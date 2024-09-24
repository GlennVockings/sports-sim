import { TeamType } from "@/lib/types"
import { Team } from "./team"
import { Warning } from "@/components/warning"
import { Button } from "@/components/ui/button"
import { FaChevronDown } from "react-icons/fa6"
import { cn } from "@/lib/utils"
import { useState } from "react"

export const TeamsWrapper = ({ teams } : { teams: TeamType[] }) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  
  return (
    <div className="flex flex-col justify-center">
      <Button className="flex gap-2 md:hidden" variant={"outline"} size={"round"} onClick={() => setIsOpen(prevState => !prevState)}>
        <p>Teams</p>
        <div className={cn("transition-all duration-1000", isOpen ? "rotate-180" : "" )}>
          <FaChevronDown />
        </div>
      </Button>
      <div className={cn("grid grid-cols-1 gap-2 transition-all duration-1000 md:grid-cols-3 xl:grid-cols-5", isOpen ? "max-h-96 overflow-auto" : "max-h-0 overflow-hidden md:max-h-96" )}>
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
    </div>
  )
}