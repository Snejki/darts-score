import { GameModel } from "~/game/GameModels";

export interface RandomGameModel extends GameModel<RandomConfigurationType, RandomGameDataModel> {}


export interface RandomConfigurationType {
    rounds: RandomConfigurationRounds
}

export interface RandomGameDataModel {
    currentPlayerIndex: number | undefined;
    players: RandomGameDataPlayer[];
}

export interface RandomGameDataPlayer {
    playerId: string;
    name: string;
    score: number;
    rounds: RandomGamePlayerRound[];
}

interface RandomGamePlayerRound {
    toScore: string,
    throws: RandomGamePlayerThrow[];
}

export interface RandomGamePlayerThrow {
    points: number | undefined;
    segment: string | undefined;
}

export type RandomConfigurationRounds = 5 | 10 | 15;