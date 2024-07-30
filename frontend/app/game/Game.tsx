import { SetStateAction } from "react";
import ClassicalConfiguration from "./classical/ClassicalConfiguration";
import { ClassicalGame } from "./classical/ClassicalGame";
import {
  ClassicalConfigurationType,
  ClassicalGameDataModel,
  ClassicalGameModel,
} from "./classical/ClassicalTypes";
import { GameModel } from "./GameModels";

export class Game {
  private static games = {
    x01: {
      name: "x01",
      configurationPage: (
        configuration: ClassicalConfigurationType,
        setConfiguration: React.Dispatch<SetStateAction<ClassicalConfigurationType>>
      ) => (
        <ClassicalConfiguration
          configuration={configuration}
          setConfiguration={setConfiguration}
        />
      ),
      gamePage: ClassicalGame,
      getInitialGameDataModel: (
        gameData: ClassicalGameModel
      ): ClassicalGameDataModel => {
        const players = gameData.players;
        return {
          currentPlayerIndex: 0,
          players: players.map((x) => ({
            playerId: x.id,
            rounds: [],
            score: 0,
          })),
        };
      },
    },
  };

  static getGameTypes = () => {
    return Object.keys(this.games).map((key) => ({
      type: key,
      name: this.games[key].name,
    }));
  };

  static configurationPage = (
    gameType: string,
    configuration: unknown,
    setConfiguration: React.Dispatch<SetStateAction<unknown>>
  ) => {
    return this.games[gameType].configurationPage(
      configuration,
      setConfiguration
    );
  };

  static getInitialGameData = (
    gameType: string,
    gameData: GameModel<unknown, unknown>
  ) => {
    return this.games[gameType].getInitialGameDataModel(gameData);
  };
}
