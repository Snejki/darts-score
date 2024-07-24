import { Game } from "./Game"

interface GameConfigurationPageProps {
  gameType: string | undefined
}

export const GameConfigurationPage = (props: GameConfigurationPageProps) => {
  return Game.configurationPage(props.gameType)
}