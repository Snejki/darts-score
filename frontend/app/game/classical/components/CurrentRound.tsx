import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ClassicalGameDataPlayer, ClassicalGamePlayerThrow } from "../ClassicalTypes";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface CurrentRoundProps {
  player: ClassicalGameDataPlayer;
  currentThrows: ClassicalGamePlayerThrow[];
  pointsToScore: number;
  onFinishRound: () => void;
}

export const CurrentRound = (props: CurrentRoundProps) => {
  const { player, currentThrows, pointsToScore } = props;

  return (
    <Card>
      <CardHeader className="p-3">
        <div>
          Current player: <span className="ml-4 font-black">{player.name}</span>
        </div>
      </CardHeader>
      <Separator />

      <CardContent className="flex flex-rowc p-3">
        Throws:
        {currentThrows?.map((element, index) => (
          <div key={index} className="ml-4 font-black">
            {element?.points} ({element?.segment})
          </div>
        ))}
      </CardContent>
      <Separator />
      <CardContent className="grid grid-cols-2 p-3">
        <div>
          Score:
          <span className="font-black ml-4">
            {player.score +
              currentThrows.reduce((acc, curr) => (acc += curr.points ?? 0), 0)}
          </span>
        </div>
        <div>
          To win:
          <span className="font-black ml-4">
            {pointsToScore -
              (player.score +
                currentThrows.reduce(
                  (acc, curr) => (acc += curr.points ?? 0),
                  0
                ))}
          </span>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-row-reverse p-3">
        <Button onClick={props.onFinishRound}>Finish round</Button>
      </CardFooter>
    </Card>
  );
};
