import { TierType } from "@/lib/types"
import { FaCheck } from "react-icons/fa6"

export const Tier = ({ name, benefits, description, price } : TierType) => {
  return (
    <div className="bg-white p-2 rounded-md">
      <div className="flex justify-center">
        <p className="text-lg font-semibold tracking-wide">{ name }</p>
        <p>{ description }</p>
      </div>
      <div className="space-y-2">
        {
          benefits.map(benefit => (
            <div key={benefit.id} className="flex justify-between items-center">
              <p>{ benefit.name }</p>
              <p>{ benefit.result }</p>
            </div>
          ))
        }
      </div>
      <div className="flex justify-center">
        <p className="text-xl">{ price }</p>
      </div>
    </div>
  )
}
