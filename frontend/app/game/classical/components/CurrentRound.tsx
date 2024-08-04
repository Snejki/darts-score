import {
  Card,
} from "@/components/ui/card";
import {
  ClassicalGameDataPlayer,
  ClassicalGamePlayerThrow,
} from "../ClassicalTypes";
import { Button } from "@/components/ui/button";
import { FaUndo } from "react-icons/fa";
import { calculateCurrenRoundPoints } from "../utils/classicalGameUtils";

interface CurrentRoundProps {
  player: ClassicalGameDataPlayer;
  currentThrows: ClassicalGamePlayerThrow[];
  pointsToScore: number;
  onFinishRound: () => void;
  undoThrow: () => void
}

export const CurrentRound = (props: CurrentRoundProps) => {
  const { player, currentThrows, pointsToScore, onFinishRound, undoThrow } = props;

  const liveScore = player.score + calculateCurrenRoundPoints(currentThrows);

  return (
    <Card className="rounded-none p-2 	 bg-backgroundSecondary">
        <div className="grid grid-cols-3 gap-10 columns-1">
          <div className="gap-10">
            <div>
              Player: <span className="font-bold">{player.name}</span>
            </div>
            <div>
              Score: <span className="font-bold">{liveScore}</span>
            </div>
            <div>
              To win: <span className="font-bold">{pointsToScore - liveScore}</span>
            </div>
          </div>
          <div className="flex gap-2 justify-center align-middle items-center">
            <div className="flex items-center justify-center h-16 w-16 bg-background font-bold transition-all">
              {currentThrows[0]?.segment}
            </div>
            <div className="flex items-center justify-center h-16 w-16 bg-background font-bold">
              {currentThrows[1]?.segment}
            </div>
            <div className="flex items-center justify-center h-16 w-16 bg-background font-bold">
              {currentThrows[2]?.segment}
            </div>
          </div>
          <div className="flex flex-row justify-end self-center gap-4">
            <FaUndo onClick={undoThrow} className="self-center cursor-pointer hover:opacity-35" />
            <Button onClick={onFinishRound}>Finish round</Button>
          </div>
        </div>
    </Card>
  );
};
