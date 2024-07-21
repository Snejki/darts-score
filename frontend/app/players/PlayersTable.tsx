import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Player } from "./PlayerListPage";

interface PlayersTableProps {
  players: Player[];
}

export const PlayersTable = (props: PlayersTableProps) => {
  const { players } = props;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player, index) => (
          <TableRow key={index}>
            <TableCell className="text-left">{player.id}</TableCell>
            <TableCell className="text-left">{player.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
