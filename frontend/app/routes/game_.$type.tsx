import { useFetcher, useParams } from "@remix-run/react";
import { useEffect } from "react";
import { BackendPaths } from "~/common/Paths";
import { GameConfigurationPage } from "~/game/GameConfigurationPage";

const GameConfiguration = () => {
  const fetcher = useFetcher();

  useEffect(() => {
    fetcher.load(BackendPaths.searchPlayers("asd"));
  }, [])

  const params = useParams();
  const gameType = params["type"];
  return <GameConfigurationPage gameType={gameType} />;
};

export default GameConfiguration;
