import { Game } from "./Game";
import { GameModel } from "./GameModels";
interface GamePlayPageProps {
  id: string
  game: GameModel<unknown, unknown>
}

export const GamePlayPage = (props: GamePlayPageProps) => {
  const updateGame = (game: GameModel<unknown, unknown>) => {}
  return props.game ? Game.gamePage(props.game, updateGame) : <>asd</>;
};
