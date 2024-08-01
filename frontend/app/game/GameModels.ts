import { Player } from "@prisma/client";

export type GameTypes = "x01";

export interface GamePlayer extends Player {}

export interface GameModel<ConfigurationType, GameModel> {
  configuration: ConfigurationType;
  gameData: GameModel;
  id: string;
  type: string;
  state: string;
  players: GamePlayer[];
  createdAt: Date;
  finishedAt: Date | undefined;
  winners: GamePlayer[];
}