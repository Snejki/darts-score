import { useEffect, useState } from "react";
import { Game } from "./Game";
import { Button } from "@/components/ui/button";
import { Player } from "~/players/PlayerListPage";
import { useFetcher, useSubmit } from "@remix-run/react";
import { GameModel, GameTypes } from "./GameModels";
import { generateGUID } from "~/common/guid";
import { useArrayState } from "~/common/hooks/useArrayState";
import { Paths } from "~/common/Paths";
import { ConfigurationParameter } from "~/common/components/ConfigurationParameter/ConfigurationParameter";
import { ComboBoxInput } from "~/common/components/ComboBox/ComboBoxInput";
import { MdDelete } from "react-icons/md";

interface GameConfigurationPageProps {
  gameType: GameTypes;
  errors: { [name: string]: string}
}

export const GameConfigurationPage = (props: GameConfigurationPageProps) => {
  const [configuration, setConfiguration] = useState<unknown>({});
  const [players, addPlayer, removePlayer] = useArrayState<Player>([]);
  const specificGameonfiguration = Game.configurationPage(
    props.gameType,
    configuration,
    setConfiguration
  );

  const gameName = Game.name(props.gameType);
  const [errors, setErrors] = useState<{ [row: string]: string }>({});
  const submit = useSubmit();

  const createGame = async () => {
      if(players.length <= 0 ) {
        setErrors(e => ({ ...e, ["players"]: "You mus select at least one player"}))
        return;
      }

    const gameModel: GameModel<unknown, unknown> = {
      id: generateGUID(),
      type: props.gameType,
      createdAt: new Date(),
      finishedAt: undefined,
      state: "",
      winners: [],
      players: players,
      configuration: configuration,
      gameData: null,
    };

    gameModel.gameData = Game.getInitialGameData(props.gameType, gameModel);
    const formData = new FormData();
    formData.set("body", JSON.stringify(gameModel));

    submit(formData, { method: "POST" });
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="flex flex-col w-[50%] gap-5 p-10 border-[1px] rounded-lg">
        <div className="flex justify-center text-3xl font-bold mb-5">{gameName} configuration</div>
        <PlayerConfigurationSection
          players={players}
          addPlayer={addPlayer}
          removePlayer={removePlayer}
          setError={(key: string, value: string) => setErrors(e => ({ ...e, [key]: value}))}
          error={errors["players"]}
        />
        {specificGameonfiguration}
        <Button onClick={createGame} className="self-end mt-5">Create game</Button>
      </div>
    </div>
  );
};

interface PlayerConfigurationSectionProps {
  players: Player[];
  addPlayer: (player: Player) => void;
  removePlayer: (player: Player) => void;
  error: string,
  setError: (key: string, value: string) => void
}

const PlayerConfigurationSection = (props: PlayerConfigurationSectionProps) => {
  const [options, setOptions] = useState<Player[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const playersFetcher = useFetcher<Player[]>();

  useEffect(() => {
    if(props.players.length > 0) {
      const playerIndexes = props.players.map(x => x.id);
      setOptions(playersFetcher.data?.filter(x => !playerIndexes.includes(x.id)) ?? [])
    } else {
      setOptions(playersFetcher.data ?? []);
    }

  }, [playersFetcher.data, props.players]);

  useEffect(() => {
    playersFetcher.load(Paths.searchPlayers(inputQuery));
  }, [inputQuery]);

  const addPlayer = (player: Player) => {
    props.addPlayer(player);
    props.setError("players", "");
  }

  return (
    <ConfigurationParameter label="Players" error={props.error}>
      <>
        <ComboBoxInput
          options={options ?? []}
          onChange={addPlayer}
          value={undefined}
          onInputChange={setInputQuery}
        />
        <div className="mt-5">
          {props.players &&
            props.players.map((player) => (
              <Player
                player={player}
                onDelete={props.removePlayer}
                key={player.id}
              />
            ))}
        </div>
      </>
    </ConfigurationParameter>
  );
};

interface PlayerProps {
  player: Player;
  onDelete: (player: Player) => void;
}

const Player = (props: PlayerProps) => {
  return (
    <div>
      <div className="inline-flex flex-row gap-10 items-center cursor-pointer rounded-md hover:bg-backgroundSecondary transition-all p-1">
        {props.player.name}
        <MdDelete
          onClick={() => props.onDelete(props.player)}
          className="hover:text-red-700 transition-colors"
        />
      </div>
    </div>
  );
};
