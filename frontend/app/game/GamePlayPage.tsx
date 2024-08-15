import { Game } from "./Game";
import { GameModel } from "./GameModels";
interface GamePlayPageProps {
  id: string
  game: GameModel<unknown, unknown>
  updateGame: (game: GameModel<unknown, unknown>) => void
}

export const GamePlayPage = (props: GamePlayPageProps) => {
  return props.game ? Game.gamePage(props.game, props.updateGame) : <></>;
};
