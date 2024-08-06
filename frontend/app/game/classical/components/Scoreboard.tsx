import { Card } from "@/components/ui/card";
import { ClassicalGameDataPlayer } from "../ClassicalTypes";
import { PlayerAdditionalInfo } from "./PlayerAdditionalInfo";
import { calculateCurrenRoundPoints } from "../utils/classicalGameUtils";
import { cn } from "@/lib/utils";
import { IoHappy } from "react-icons/io5";
import { FaFaceSadCry } from "react-icons/fa6";

interface ScoreboardProps {
  players: ClassicalGameDataPlayer[];
  pointsToWin: number;
  currentPlayerIndex: number | undefined;
}

export const Scoreboard = (props: ScoreboardProps) => {
  const { players, pointsToWin, currentPlayerIndex } = props;

  const maxScore = Math.max(...players.map((x) => x.score));
  const minScore = Math.min(...players.map((x) => x.score));

  return (
    <>
      {players.map((player, index) => (
        <PlayerCard
          key={player.playerId}
          pointsToWin={pointsToWin}
          player={player}
          isCurrentPlayer={currentPlayerIndex === index}
          isLeader={player.score == maxScore && player.rounds.length > 0}
          isLoser={
            player.score == minScore &&
            player.rounds.length > 0 &&
            maxScore != minScore
          }
        />
      ))}
    </>
  );
};

interface PlayerProps {
  pointsToWin: number;
  player: ClassicalGameDataPlayer;
  isCurrentPlayer: boolean;
  isLeader: boolean;
  isLoser: boolean;
}

const PlayerCard = (props: PlayerProps) => {
  const { player, pointsToWin, isLeader, isLoser } = props;
  const score = player.score;
  const avg = score / (player.rounds.length ?? 0);

  const roundScores = player.rounds.map((round) =>
    calculateCurrenRoundPoints(round.throws)
  );

  return (
    <>
      <Card className="flex rounded-none bg-backgroundSecondary">
        <div
          className={cn(
            "bg-primary transition-all duration-500",
            props.isCurrentPlayer ? "w-5" : "w-0"
          )}
        ></div>
        <div className="p-3 flex flex-row justify-between w-full">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-3">
              {props.player.name}
              <PlayerAdditionalInfo player={props.player} roundThrows={3} />
            </div>
            <div className="text-sm">
              <div>Score: {score}</div>
              <div>To win: {pointsToWin - score}</div>
            </div>
          </div>
          <div className="flex flex-col self-end gap-1">
            <div className="flex self-start justify-center w-full">
              {isLeader && <IoHappy className="h-8 w-8 text-green-600" />}
              {isLoser && <FaFaceSadCry className="h-8 w-8 text-red-600"/>}
            </div>
            <div className="flex flex-col pr-3 gap-0 text-[10px]">
              <div>
                Max: {roundScores.length > 0 ? Math.max(...roundScores) : "-"}
              </div>
              <div>
                Min: {roundScores.length > 0 ? Math.min(...roundScores) : "-"}
              </div>
              <div>Avg: {roundScores.length > 0 ? avg : "-"}</div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
