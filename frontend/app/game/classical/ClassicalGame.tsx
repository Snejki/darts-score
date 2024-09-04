import { useLayoutEffect, useRef, useState } from "react";
import { ClassicalGameModel, ClassicalGamePlayerThrow } from "./ClassicalTypes";
import { Scoreboard } from "./components/Scoreboard";
import { CurrentRound } from "./components/CurrentRound";
import { calculateCurrenRoundPoints } from "./utils/classicalGameUtils";
import { WinnerModal } from "~/common/components/WinnerModal/WinnerModal";
import { DartBoard, DartScore } from "~/common/components/DartBoard/DartBoard";
import { Gamelayout } from "~/common/components/GameLayout/Gamelayout";

interface ClassicalGameProps {
  game: ClassicalGameModel;
  updateGame: (game: ClassicalGameModel) => void;
}

export const ClassicalGame = (props: ClassicalGameProps) => {
  const {
    game: { gameData, configuration, winners },
  } = props;

  const ref = useRef(null);
  useLayoutEffect(() => {
    const width = ref.current?.offsetWidth;
    const height = ref.current?.offsetHeight;

    setDartboardSize(Math.min(width, height));
  }, [ref]);

  const [dartboardSize, setDartboardSize] = useState(500);

  const MAX_ROUND_THROWS = 3;
  const [currentRoundThrows, setCurrentRoundThrows] = useState<
    ClassicalGamePlayerThrow[]
  >([]);

  const onDartBoardClick = (segment: DartScore) => {
    if (isGameFinished() || !segment) {
      return;
    }

    if (currentRoundThrows.length >= MAX_ROUND_THROWS) {
      return;
    }

    if (segment === undefined) {
      setCurrentRoundThrows((curr) => [...curr, { points: 0, segment: "0" }]);
    }

    setCurrentRoundThrows((curr) => [
      ...curr,
      { segment: calculateSegment(segment), points: calculatePoints(segment) },
    ]);
  };

  const onFinishRound = () => {
    if (isGameFinished()) {
      return;
    }

    pushCurrentTrrows();
    updatePlayerScore();
    setCurrentRoundThrows([]);
    updateCurrentPlayerIndex();

    if (shouldFinishGame()) {
      markGameAsFinished();
    }

    props.updateGame(props.game);
  };

  const markGameAsFinished = () => {
    props.game.finishedAt = new Date();
    gameData.currentPlayerIndex = undefined;
  };

  const isGameFinished = () => {
    return props.game.finishedAt != undefined;
  };

  const shouldFinishGame = () => {
    if (props.game.winners.length > 0 && gameData.currentPlayerIndex == 0) {
      return true;
    }

    return false;
  };

  const pushCurrentTrrows = () => {
    gameData.players[gameData.currentPlayerIndex ?? 0].rounds.push({
      throws: currentRoundThrows,
    });
  };

  const updateCurrentPlayerIndex = () => {
    const playersCount = props.game.players.length;
    if (gameData.currentPlayerIndex !== undefined) {
      if (gameData.currentPlayerIndex + 1 >= playersCount) {
        gameData.currentPlayerIndex = 0;
      } else {
        gameData.currentPlayerIndex += 1;
      }
    } else {
      gameData.currentPlayerIndex = 0;
    }
  };

  const updatePlayerScore = () => {
    // todo: chweck if possible to finish
    const currentPlayer = gameData.players[gameData.currentPlayerIndex ?? 0];
    const currentRoundPoints = calculateCurrenRoundPoints(currentRoundThrows);

    // to much points
    const playerGamePoints = calculateScore(
      currentPlayer.score + currentRoundPoints,
      configuration.pointsToScore
    );
    if (playerGamePoints == "TooMuch") {
      return;
    }

    if (playerGamePoints == "TooLow") {
      currentPlayer.score += currentRoundPoints;
      return;
    }

    if (playerGamePoints == "Exact" && isWinner()) {
      currentPlayer.score += currentRoundPoints;
      props.game.winners.push({
        id: currentPlayer.playerId,
        name: currentPlayer.name,
      });
    }
  };

  const isWinner = () => {
    const lastRoundThrow = currentRoundThrows[currentRoundThrows.length - 1];
    const { checkIn } = configuration;

    if (lastRoundThrow.segment == "BULL") {
      return true;
    }

    if (checkIn == "Single" && lastRoundThrow.segment?.startsWith("S")) {
      return true;
    }

    if (checkIn == "Double" && lastRoundThrow.segment?.startsWith("D")) {
      return true;
    }

    if (checkIn == "Triple" && lastRoundThrow.segment?.startsWith("T")) {
      return true;
    }

    if (checkIn === "All") {
      return true;
    }

    return false;
  };

  const calculateScore = (playerScore: number, pointsToScore: number) => {
    if (playerScore > pointsToScore) return "TooMuch";
    if (playerScore < pointsToScore) return "TooLow";
    return "Exact";
  };

  const undoThrow = () => {
    if (currentRoundThrows.length > 0) {
      setCurrentRoundThrows(currentRoundThrows.slice(0, -1));
    }
  };

  return (
    <>
      <Gamelayout
        ScoreBoardComponent={
          <Scoreboard
            players={props.game.gameData.players}
            pointsToWin={configuration.pointsToScore}
            currentPlayerIndex={gameData.currentPlayerIndex}
          />
        }
        CurrentRoundComponent={
          <CurrentRound
            player={
              props.game.gameData.players[
                props.game.gameData.currentPlayerIndex ?? 0
              ]
            }
            undoThrow={undoThrow}
            currentThrows={currentRoundThrows}
            pointsToScore={configuration.pointsToScore}
            onFinishRound={onFinishRound}
          />
        }
        WinnerModalComponent={
          <WinnerModal winners={winners} showModal={!!props.game.finishedAt} />
        }
        DartBoardComponent={
          <DartBoard size={500} onClick={onDartBoardClick} />
        }
        ref={ref}
      />
    </>
  );
};

const calculatePoints = (segment: DartScore) => {
  if (segment == undefined) {
    return 0;
  }

  if (segment === "BULL") {
    return 50;
  }

  if (segment == "OUTER") {
    return 25;
  }

  const mutiplier =
    segment.Multiplier === "S" ? 1 : segment.Multiplier === "D" ? 2 : 3;

  return mutiplier * segment.Value;
};

const calculateSegment = (segment: DartScore) => {
  if (segment === "BULL") {
    return "BULL";
  }

  if (segment === "OUTER") {
    return "OUTER";
  }

  return `${segment.Multiplier}${segment.Value}`;
};
