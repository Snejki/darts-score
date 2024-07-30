import { useEffect, useState } from "react";
import { Game } from "./Game"
import { Button } from "@/components/ui/button";
import { ComboBoxInput } from "~/common/components/ComboBox/ComboBoxInput";
import { BackendPaths } from "~/common/Paths";
import { Player } from "~/players/PlayerListPage";
import { useFetcher } from "@remix-run/react";
import { GameModel } from "./GameModels";
import { generateGUID } from "~/common/guid";
import { useArrayState } from "~/common/hooks/useArrayState";

interface GameConfigurationPageProps {
  gameType: string
}

export const GameConfigurationPage = (props: GameConfigurationPageProps) => {
  const [configuration, setConfiguration] = useState<unknown>({});
  const [players, addPlayer] = useArrayState<Player>([]);
  const specificGameonfiguration = Game.configurationPage(props.gameType, configuration, setConfiguration);


  const createGame = () => {
    const gameModel : GameModel<unknown, unknown> = {
      id: generateGUID(),
      type: props.gameType,
      createdAt: new Date(),
      finishedAt: undefined,
      state: "",
      winners: [],
      players: players,
      configuration: configuration,
      gameData: null
    }

    gameModel.gameData = Game.getInitialGameData(props.gameType, gameModel);

    console.log(gameModel)
  }

  return (
    <div>
      <PlayerConfigurationSection players={players} addPlayer={addPlayer}/>
      {specificGameonfiguration}
      <Button onClick={createGame}>Create game</Button>
    </div>
  )
}

interface PlayerConfigurationSectionProps {
  players: Player[],
  addPlayer: (player: Player) => void
}

const PlayerConfigurationSection = (props: PlayerConfigurationSectionProps) => {
  
  const [options, setOptions] = useState<Player []>([]);
  const [inputQuery, setInputQuery] = useState("")
  const playersFetcher = useFetcher<Player[]>()
  
  useEffect(() => {
    setOptions(playersFetcher.data ?? []);
  }, [playersFetcher.data])


  useEffect(() => {
    playersFetcher.load(BackendPaths.searchPlayers(inputQuery));
  }, [inputQuery])

  return (
    <div>
      <div>Players: </div>
      <ComboBoxInput
          options={options ?? []}
          onChange={props.addPlayer}
          value={undefined}
          onInputChange={setInputQuery}
        />
        {props.players && props.players.map(player => (
          <div key={player.id}>{player.name}</div>
        ))}
    </div>

  )
}