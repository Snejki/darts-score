import { SetStateAction } from "react";
import ClassicalConfiguration from "./classical/ClassicalConfiguration";
import { ClassicalGame } from "./classical/ClassicalGame";
import {
  ClassicalConfigurationType,
  ClassicalGameDataModel,
  ClassicalGameModel,
} from "./classical/ClassicalTypes";
import { GameModel, GameTypes } from "./GameModels";
import { RandomConfiguration } from "./random/RandomConfiguration";
import { RandomConfigurationType } from "./random/models/RandomGameModels";

type GameItems = {
  [x in GameTypes]: GameItem;
};

interface GameItem {
  name: string;
  configurationPage: (
    configuration: unknown,
    setConfiguration: React.Dispatch<SetStateAction<unknown>>
  ) => JSX.Element;
  gamePage: (game: unknown, updateGame: unknown) => JSX.Element;
  getInitialGameDataModel: (gameData: unknown) => unknown;
}

const classicalGame: GameItem = {
  name: "Classical",
  configurationPage: (configuration, setConfiguration) => (
    <ClassicalConfiguration
      configuration={configuration as ClassicalConfigurationType}
      setConfiguration={
        setConfiguration as React.Dispatch<
          SetStateAction<ClassicalConfigurationType>
        >
      }
    />
  ),
  gamePage: (game, updateGame) => (
    <ClassicalGame
      game={game as ClassicalGameModel}
      updateGame={updateGame as (game: ClassicalGameModel) => void}
    />
  ),
  getInitialGameDataModel: (gameData): ClassicalGameDataModel => {
    const players = (gameData as ClassicalGameModel).players;
    return {
      currentPlayerIndex: 0,
      players: players.map((x) => ({
        playerId: x.id,
        name: x.name,
        rounds: [],
        score: 0,
      })),
    };
  },
};

const randomGame: GameItem = {
  name: "Random",
  configurationPage: (configuration, setConfiguration) => (
    <RandomConfiguration 
      configuration={configuration as RandomConfigurationType} 
      setConfiguration={setConfiguration as React.Dispatch<SetStateAction<RandomConfigurationType>>} 
    />
  )
}

export class Game {
  private static games: GameItems = {
    x01: classicalGame,
    random: randomGame
  };

  static getGameTypes = () => {
    return Object.keys(this.games).map((key) => ({
      type: key,
      name: this.games[key as GameTypes].name,
    }));
  };

  static configurationPage = (
    gameType: GameTypes,
    configuration: unknown,
    setConfiguration: React.Dispatch<SetStateAction<unknown>>
  ) => {
    return this.games[gameType].configurationPage(
      configuration as ClassicalConfigurationType,
      setConfiguration
    );
  };

  static gamePage = (
    game: GameModel<unknown, unknown>,
    udapteGame: (game: GameModel<unknown, unknown>) => void
  ) => {
    return this.games[game.type].gamePage(game, udapteGame);
  };
  
  static name = (gameType: GameTypes) => {    
    return this.games[gameType].name;
  }

  static getInitialGameData = (
    gameType: GameTypes,
    gameData: GameModel<unknown, unknown>
  ) => {
    return this.games[gameType].getInitialGameDataModel(gameData);
  };
}
