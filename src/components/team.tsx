import { TeamType } from "@/lib/types"
import { Button } from "./ui/button"
import { FaRegTrashCan } from "react-icons/fa6"
import { useGameStore } from "@/lib/store"

export const Team = ({ team } : { team: TeamType }) => {
  const removeTeam = useGameStore(state => state.removeTeam)

  return (
    <div className="flex justify-between items-center gap-4 px-2 py-4 bg-custom-3 text-custom-1 rounded-md lg:basis-1/5">
      <div className="flex justify-between flex-grow">
        <p className="font-semibold">{ team.name }</p>
        <p>{`Odds: ${team.odd}`}</p>
      </div>
      <Button variant={"secondary"} size={"icon"} onClick={() => removeTeam("10", team.id)}>
        <FaRegTrashCan />
      </Button>
    </div>
  )
}