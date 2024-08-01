import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClassicalGameDataPlayer } from "../ClassicalTypes";
import { PlayerAdditionalInfo } from "./PlayerAdditionalInfo";

interface ScoreboardProps {
  players: ClassicalGameDataPlayer[];
  pointsToWin: number;
}

export const Scoreboard = (props: ScoreboardProps) => (
  <Table>
    <TableHeader>
      <TableHead key="player">Player</TableHead>
      <TableHead key="scored">Scored</TableHead>
      <TableHead key="towin">To Win</TableHead>
      <TableHead> </TableHead>
    </TableHeader>
    <TableBody>
      {props.players.map((item) => {
        return (
          <TableRow key={item.playerId}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.score}</TableCell>
            <TableCell>{props.pointsToWin - item.score}</TableCell>
            <TableCell>
              <PlayerAdditionalInfo player={item} roundThrows={3} />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
