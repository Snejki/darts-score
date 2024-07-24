import { useParams } from "@remix-run/react";
import { GameConfigurationPage } from "~/game/GameConfigurationPage";

const GameConfiguration = () => {
  const params = useParams();
  const gameType = params["type"];
  return <GameConfigurationPage gameType={gameType} />;
};

export default GameConfiguration;
