import { useEffect, useState } from "react";
import { PlayersTable } from "./PlayersTable";
import { CreatePlayerModal } from "./CreatePlayerModal";

export interface Player {
  id: string;
  name: string;
}

interface PlayerListPageProps {
  onChange: (player: Player) => void;
  players: Player[];
}

export const PlayerListPage = (props: PlayerListPageProps) => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setPlayers(props.players);
  }, [props.players]);

  return (
    <div className="flex flex-col gap-4">
      <PlayersTable players={players} />
      <div className="flex justify-end">
        <CreatePlayerModal onAddPlayer={props.onChange} />
      </div>
    </div>
  );
};
