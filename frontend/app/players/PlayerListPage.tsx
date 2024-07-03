import { useState } from "react"

interface Player {
    id: string,
    name: string
}


export const PlayerListPage = () => {
    const [players, setPlayers] = useState<Player []>();

  return (
    <div>PlayerListPage</div>
  )
}