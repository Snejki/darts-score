export interface ClassicalGameData {
  id: string;
  type: string;
  state: string;
  configuration: ClassicalConfigurationType;
  currentPlayerIndex: number | undefined;
  players: {
    playerId: string;
    score: number;
    rounds: ClassicalGamePlayerRound[];
  }[];
  createdAt: Date;
  finishedAt: Date | undefined;
  winners: { playerId: string}[]
}

type pointsToScoreType = 101 | 201 | 301 | 501 | 701 | 901;
type checkInType = "All" | "Single" | "Double" | "Triple";

export interface ClassicalConfigurationType {
  pointsToScore: pointsToScoreType;
  players: {
    playerId: string;
    name: string
  }[];
  checkIn: checkInType;
}

interface ClassicalGamePlayerRound {
  throws: ClassicalGamePlayerThrow[];
}

export interface ClassicalGamePlayerThrow {
  points: number | undefined;
  segment: string | undefined;
}
