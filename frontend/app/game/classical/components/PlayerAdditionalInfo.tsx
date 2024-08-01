import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClassicalGameDataPlayer } from "../ClassicalTypes";

interface PlayerAdditionalInfoProps {
  player: ClassicalGameDataPlayer;
  roundThrows: number;
}

export const PlayerAdditionalInfo = (props: PlayerAdditionalInfoProps) => {
  const roundsArray = Array.from({ length: props.roundThrows }, (_, i) => i);
  console.log(roundsArray);

  return (
    <Popover>
      <PopoverTrigger>
        <Button>Show</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Table>
          <TableHeader>
            {roundsArray.map((round) => (
              <TableHead key={round}>Throw {round}</TableHead>
            ))}
            <TableHead key="4">Sum</TableHead>
          </TableHeader>
          <TableBody>
            {props.player.rounds?.map((item, index) => {
              return (
                <TableRow key={index}>
                  {roundsArray.map((round) => (
                    <TableCell key={round}>
                      {item.throws[round]?.points} ({item.throws[round]?.segment})
                    </TableCell>
                  ))}
                  <TableCell>
                    {" "}
                    {item.throws.reduce((acc, curr) => (acc += curr.points ?? 0), 0)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </PopoverContent>
    </Popover>
  );
};
