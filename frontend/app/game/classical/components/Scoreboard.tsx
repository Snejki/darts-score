import { Card } from "@/components/ui/card";
import { ClassicalGameDataPlayer } from "../ClassicalTypes";
import { PlayerAdditionalInfo } from "./PlayerAdditionalInfo";
import { calculateCurrenRoundPoints } from "../utils/classicalGameUtils";

interface ScoreboardProps {
  players: ClassicalGameDataPlayer[];
  pointsToWin: number;
}

export const Scoreboard = (props: ScoreboardProps) => {
  const { players, pointsToWin } = props;
  return (
    <>
      {players.map((player) => (
        <PlayerCard
          key={player.playerId}
          pointsToWin={pointsToWin}
          player={player}
          isCurrentPlayer={true}
        />
      ))}
    </>
  );
};

interface PlayerProps {
  pointsToWin: number;
  player: ClassicalGameDataPlayer;
  isCurrentPlayer: boolean;
}

const PlayerCard = (props: PlayerProps) => {
  const { player, pointsToWin } = props;

  const score = player.score;
  const avg = score / (player.rounds.length ?? 0);

  const roundScores = player.rounds.map((round) =>
    calculateCurrenRoundPoints(round.throws)
  );

  return (
    <>
      <Card className="rounded-none p-3 flex flex-row justify-between bg-backgroundSecondary">
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
        <div className="flex flex-col  pr-3 gap-0 self-end text-[10px]">
          <div>
            Max: {roundScores.length > 0 ? Math.max(...roundScores) : "-"}
          </div>
          <div>
            Min: {roundScores.length > 0 ? Math.min(...roundScores) : "-"}
          </div>
          <div>Avg: {roundScores.length > 0 ? avg : "-"}</div>
        </div>
      </Card>
    </>
  );
};
