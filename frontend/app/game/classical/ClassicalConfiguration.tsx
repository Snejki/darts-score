import { Button } from "@/components/ui/button";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ComboBoxInput } from "~/common/components/ComboBox/ComboBoxInput";
import { BackendPaths } from "~/common/Paths";
import { Player } from "~/players/PlayerListPage";
import { ClassicalConfigurationType } from "./ClassicalTypes";

interface ClassicalConfigurationProps {

}

const ClassicalConfiguration = () => {
  const [gameConfiguration] = useState<ClassicalConfigurationType>({
    checkIn: "All",
    pointsToScore: 301,
    players: []
  });

  const [playerOptions, setPlayerOptions] = useState<{ id: string, name: string }[]>();
  const playersFetcher = useFetcher<Player []>()
  

  useEffect(() => {
    playersFetcher.load(BackendPaths.searchPlayers("s"));
    
  }, [])

  useEffect(() => {
    const options = playersFetcher.data?.map(x => ({ id: x.id, name: x.name }));
    setPlayerOptions(options);
  }, [playersFetcher.data])

  const toPointsOptions = [101, 201, 301, 501, 701, 901];
  const checkInType = ["All", "Single", "Double", "Triple"];

  return (
    <div className="flex flex-col items-center">
      <div>Players: </div>
      <div>
        <ComboBoxInput options={playerOptions ?? []} onChange={(player) => gameConfiguration.players.push({ playerId: player.id, name: player?.name})} value={undefined}/>
      </div>
      <hr />
      <h1>Game</h1>
      <div className="mb-2">
        <div className="flex gap-1">
          {toPointsOptions.map((x) => (
            <Button
              color={x == gameConfiguration.pointsToScore ? "primary" : "default"}
              onClick={() => gameConfiguration.pointsToScore = x}
              key={x}
            >
              {x}
            </Button>
          ))}
        </div>
      </div>
      <hr />
      <div>Check in</div>
      <div>
        <div className="flex gap-1">
          {checkInType.map((x) => (
            <Button
              onClick={() => gameConfiguration.checkIn = x}
              color={x == gameConfiguration.checkIn ? "primary" : "default"}
              key={x}
            >
              {x}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassicalConfiguration;
