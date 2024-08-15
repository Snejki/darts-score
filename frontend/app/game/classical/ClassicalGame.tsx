import { useState } from "react";
import { GameBoard } from "~/common/components/GameBoard";
import { ClassicalGameModel, ClassicalGamePlayerThrow } from "./ClassicalTypes";
import { Scoreboard } from "./components/Scoreboard";
import { CurrentRound } from "./components/CurrentRound";
import { calculateCurrenRoundPoints } from "./utils/classicalGameUtils";
import { WinnerModal } from "~/common/components/WinnerModal/WinnerModal";

interface ClassicalGameProps {
  game: ClassicalGameModel;
  updateGame: (game: ClassicalGameModel) => void;
}

export const ClassicalGame = (props: ClassicalGameProps) => {
  const {
    game: { gameData, configuration, winners },
  } = props;

  const MAX_ROUND_THROWS = 3;
  const [currentRoundThrows, setCurrentRoundThrows] = useState<
    ClassicalGamePlayerThrow[]
  >([]);

  const onDartBoardClick = (segment: string | undefined) => {
    if (isGameFinished() || !segment) {
      return;
    }

    if (currentRoundThrows.length >= MAX_ROUND_THROWS) {
      return;
    }

    if (segment === undefined) {
      setCurrentRoundThrows([
        ...currentRoundThrows,
        { points: 0, segment: "0" },
      ]);
    }

    setCurrentRoundThrows([
      ...currentRoundThrows,
      { segment, points: calculatePoints(segment) },
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
      props.game.winners.push({ id: currentPlayer.playerId, name: currentPlayer.name });
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

    if(checkIn === "All") {
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
      <div className="grid grid-cols-[250px_auto] h-full">
        <div className="bg-backgroundSecondary">
          <Scoreboard
            players={props.game.gameData.players}
            pointsToWin={configuration.pointsToScore}
            currentPlayerIndex={gameData.currentPlayerIndex}
          />
        </div>
        <div className="h-[70vh] flex flex-col items-center">
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
          <GameBoard onDartboardClick={onDartBoardClick} />
        </div>
      </div>
      <WinnerModal winners={winners} showModal={!!props.game.finishedAt} />
    </>
  );
};

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
