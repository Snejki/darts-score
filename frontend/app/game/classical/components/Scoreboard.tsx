import { Card } from "@/components/ui/card";
import { ClassicalGameDataPlayer } from "../ClassicalTypes";
import { PlayerAdditionalInfo } from "./PlayerAdditionalInfo";

interface ScoreboardProps {
  players: ClassicalGameDataPlayer[];
  pointsToWin: number;
}

export const Scoreboard = (props: ScoreboardProps) => {
  const { players, pointsTowin } = props;
  return (
    <>
      {players.map((player) => (
        <PlayerCard
          key={player.playerId}
          pointsToWin={pointsTowin}
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
  const { player } = props;

  const score = player.score;
  const avg = score / player.rounds ?? 0;
  const lastRound = player.rounds.at(-1);

  return (
    <>
      <Card className="rounded-none p-3 flex flex-row justify-between bg-backgroundSecondary">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3">
            {props.player.name}
            <PlayerAdditionalInfo player={props.player} roundThrows={3} />
          </div>
          <div className="flex flex-row gap-3 justify-center">
            <div className="h-8 w-8 bg-background text-center">
              {lastRound?.throws[0].segment}
            </div>
            <div className="h-8 w-8 bg-background text-center">
              {lastRound?.throws[1].segment}
            </div>
            <div className="h-8 w-8 bg-background text-center">
              {lastRound?.throws[2].segment}
            </div>
          </div>
        </div>
        <div className="flex flex-col  pr-3 gap-2 self-end">
          <div className="text-xs">Score: {score}</div>
          <div className="text-[8px]">
            <div>Max: 180</div>
            <div>Min: 12</div>
            <div>Avg: {avg}</div>
          </div>
        </div>
      </Card>
    </>
  );
};
