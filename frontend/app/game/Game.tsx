import ClassicalConfiguration from "./classical/ClassicalConfiguration";
import { ClassicalGame } from "./classical/ClassicalGame";

export class Game {
  private static games = {
    "x01": {
      name: "x01",
      configurationPage: <ClassicalConfiguration />,
      gamePage: ClassicalGame,
    },
  };

  static getGameTypes = () => {
    return Object.keys(this.games).map((key) => ({
      type: key,
      name: this.games[key].name,
    }));
  };

  static configurationPage = (gameType: string) => {
    return this.games[gameType].configurationPage
  }
}
