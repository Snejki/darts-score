import { Player } from "@prisma/client";

export type GameType = "x01";

export interface GamePlayer extends Player {}

export interface GameModel<ConfigurationType, GameModel> extends GameModelBase {
  configuration: ConfigurationType;
  gameData: GameModel;
=
}

export interface GameModelBase {
  id: string;
  type: string;
  state: string;
  players: GamePlayer[];
  createdAt: Date;
  finishedAt: Date | undefined;
  winners: GamePlayer[];
}
