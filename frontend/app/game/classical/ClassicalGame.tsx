import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { GameBoard } from "~/common/components/GameBoard";

interface Throw {
  points: number | undefined;
  segment: string | undefined;
}

interface Player {
  id: string;
  name: string;
  currentScore: number;
  rounds: Throw[][];
}

interface GameState {
  currentPlayer: Player;
  roundThrows: number;
  pointsToScore: number;
  round: number;
}

export const ClassicalGame = () => {
  const [players, setPlayers] = useState<Player[]>(iniitlaPlayersState);
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: players[0],
    roundThrows: 3,
    pointsToScore: 501,
    round: 1,
  });

  const [roundThrows, setRoundThrows] = useState<Throw[]>([]);
  const onDartBoardClick = (segment: string | undefined) => {
    if (roundThrows.length >= gameState.roundThrows) {
      return;
    }

    if (segment === undefined) {
      setRoundThrows([
        ...roundThrows,
        {
          points: 0,
          segment: "0",
        },
      ]);
    }

    setRoundThrows([
      ...roundThrows,
      { segment, points: calculatePoints(segment) },
    ]);
    roundThrows.push();
  };

  useEffect(() => {
    console.log(roundThrows);
  }, [roundThrows]);

  const onFinishRound = () => {
    gameState.currentPlayer.rounds?.push(roundThrows);

    const roundPoints = roundThrows.reduce(
      (acc, curr) => (acc += curr.points ?? 0),
      0
    );

    setRoundThrows([]);

    const playerPointsAfterLastThrow =
      roundPoints + gameState.currentPlayer.currentScore;
    if (playerPointsAfterLastThrow > gameState.pointsToScore) {
    } else if (playerPointsAfterLastThrow < gameState.pointsToScore) {
      gameState.currentPlayer.currentScore = playerPointsAfterLastThrow;
    } else {
      // check if winner
    }

    const playerIndex = players.findIndex(
      (x) => x.id == gameState.currentPlayer.id
    );

    players[playerIndex] = gameState.currentPlayer;

    if (playerIndex + 1 === players.length) {
      gameState.currentPlayer = players[0];
    } else {
      gameState.currentPlayer = players[playerIndex + 1];
    }
  };

  return (
    <div className="grid lg:grid-cols-3">
      <div className="col-span-2">
        <GameBoard onDartboardClick={onDartBoardClick} />
      </div>
      <div className="space-y-5 grid grid-cols-2 gap-5 lg:grid-cols-1">
        <CurrentRoundInfo
          player={gameState.currentPlayer}
          currentThrows={roundThrows}
          pointsToScore={gameState.pointsToScore}
          onFinishRound={onFinishRound}
        />
        <Card>
          <CardContent>
            <PlayersScoreTable
              players={players}
              pointsToWin={gameState.pointsToScore}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const iniitlaPlayersState: Player[] = [
  {
    id: "playa1",
    name: "Tomek",
    currentScore: 0,
    rounds: [],
  },
  {
    id: "playa22",
    name: "karol",
    currentScore: 0,
    rounds: [],
  },
];

const calculatePoints = (segment: string | undefined) => {
  if (segment == undefined) {
    return 0;
  }

  if (segment === "BULL") {
    return 50;
  }

  if (segment == "OUTER") {
    return 25;
  }

  const mulitplier = segment[0] === "S" ? 1 : segment[0] === "D" ? 2 : 3;

  return mulitplier * +segment.substring(1, segment.length);
};

interface PlayersScoreTableProps {
  players: Player[];
  pointsToWin: number;
}

const PlayersScoreTable = (props: PlayersScoreTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableHead key="player">Player</TableHead>
        <TableHead key="scored">Scored</TableHead>
        <TableHead key="towin">To Win</TableHead>
        <TableHead> </TableHead>
      </TableHeader>
      <TableBody>
        {props.players.map((item) => {
          console.log(item);
          return (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.currentScore}</TableCell>
              <TableCell>{props.pointsToWin - item.currentScore}</TableCell>
              <TableCell>
                <MoreInfo player={item} roundThrows={3} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

interface MoreInfoProps {
  player: Player;
  roundThrows: number;
}

const MoreInfo = (props: MoreInfoProps) => {
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
                      {item[round]?.points} ({item[round]?.segment})
                    </TableCell>
                  ))}
                  <TableCell>
                    {" "}
                    {item.reduce((acc, curr) => (acc += curr.points ?? 0), 0)}
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

interface CurrentRoundInfoProps {
  player: Player;
  currentThrows: Throw[];
  pointsToScore: number;
  onFinishRound: () => void;
}

const CurrentRoundInfo = (props: CurrentRoundInfoProps) => {
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
        Throws:{" "}
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
            {player.currentScore +
              currentThrows.reduce((acc, curr) => (acc += curr.points ?? 0), 0)}
          </span>
        </div>
        <div>
          To win:
          <span className="font-black ml-4">
            {pointsToScore -
              (player.currentScore +
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
