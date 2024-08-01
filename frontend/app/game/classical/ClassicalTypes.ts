import { GameModel } from "../GameModels";

export interface ClassicalGameModel
  extends GameModel<ClassicalConfigurationType, ClassicalGameDataModel> {}

export interface ClassicalGameDataModel {
  currentPlayerIndex: number | undefined;
  players: ClassicalGameDataPlayer[];
}

export interface ClassicalGameDataPlayer {
  playerId: string;
  name: string;
  score: number;
  rounds: ClassicalGamePlayerRound[];
}

type pointsToScoreType = 101 | 201 | 301 | 501 | 701 | 901;
type checkInType = "All" | "Single" | "Double" | "Triple";

export interface ClassicalConfigurationType {
  pointsToScore: pointsToScoreType;

  checkIn: checkInType;
}

interface ClassicalGamePlayerRound {
  throws: ClassicalGamePlayerThrow[];
}

export interface ClassicalGamePlayerThrow {
  points: number | undefined;
  segment: string | undefined;
}
