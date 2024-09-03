import { GamePage } from "@/components/game";

export default function Page({ params } : { params: { gameId: string }}) {

  return (
    <GamePage gameId={params.gameId} />
  )
}