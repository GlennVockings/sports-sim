import { BetType } from "@/lib/types"
import { UserContext } from "@/lib/userContext"
import { useContext } from "react"
import { FaRegTrashCan } from "react-icons/fa6"

export const Bet = ({ bet } : { bet: BetType }) => {
  const userId = useContext(UserContext)

  return (
    <div className="flex justify-between gap-3 items-center">
      <div className="flex-grow flex justify-between">
        <p>{ bet.userName }</p>
        <p>{ bet.teamName }</p>
        <p>{ bet.amount }</p>
      </div>
      {
        bet.userId === userId ? (
          <div>
            <FaRegTrashCan />
          </div>
        ) : ""
      }
    </div>
  )
}