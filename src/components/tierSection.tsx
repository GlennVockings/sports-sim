import { Tier } from "@/components/tier"
import tiers from "@/mocks/tiers.json"

export const TierSection = () => {
  return (
    <div className="grid lg:grid-cols-3 bg-gray-200 gap-2 lg:shadow-inner lg:p-3">
      {
        tiers.map(tier => (
          <Tier key={tier.name} {...tier} />
        ))
      }
    </div>
  )
}
