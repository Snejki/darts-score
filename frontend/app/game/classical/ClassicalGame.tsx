import { useState } from "react";
import { GameBoard } from "~/common/components/GameBoard";
import { ClassicalGameModel, ClassicalGamePlayerThrow } from "./ClassicalTypes";
import { Scoreboard } from "./components/Scoreboard";
import { CurrentRound } from "./components/CurrentRound";

interface ClassicalGameProps {
  game: ClassicalGameModel;
  updateGame: (game: ClassicalGameModel) => void;
}

export const ClassicalGame = (props: ClassicalGameProps) => {
  const {game: { gameData }} = props;

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
    //roundThrows.push();
  };

  const calculateCurrenRoundPoints = (throws: ClassicalGamePlayerThrow[]) =>
    throws.reduce((acc, curr) => (acc += curr.points ?? 0), 0);

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
    if (
      props.game.winners.length > 0 &&
      gameData.currentPlayerIndex == 0
    ) {
      return true;
    }

    return false;
  };

  const pushCurrentTrrows = () => {
    gameData.players[
      gameData.currentPlayerIndex ?? 0
    ].rounds.push({
      throws: currentRoundThrows,
    });
  };

  const updateCurrentPlayerIndex = () => {
    const playersCount = props.game.players.length;
    if (gameData.currentPlayerIndex) {
      if (gameData.currentPlayerIndex + 1 >= playersCount) {
        gameData.currentPlayerIndex = 0;
      }

      gameData.currentPlayerIndex += 1;
    } else {
      gameData.currentPlayerIndex = 0;
    }
  };

  const updatePlayerScore = () => {
    const currentPlayer =
      gameData.players[gameData.currentPlayerIndex ?? 0];
    const currentRoundPoints = calculateCurrenRoundPoints(currentRoundThrows);

    // to much points
    if (
      currentPlayer.score + currentRoundPoints >
      props.game.configuration.pointsToScore
    ) {
      return;
    }

    if (
      currentPlayer.score + currentRoundPoints <
      props.game.configuration.pointsToScore
    ) {
      currentPlayer.score += currentRoundPoints;
    }

    const gameCheckIn = props.game.configuration.checkIn;

    if (gameCheckIn == "All") {
      currentPlayer.score += currentRoundPoints;
      props.game.winners.push({ id: currentPlayer.playerId, name: "" });
      return;
    }

    const lastRoundThrow = currentRoundThrows[currentRoundThrows.length - 1];

    if (lastRoundThrow.segment == "BULL") {
      currentPlayer.score += currentRoundPoints;
      props.game.winners.push({ id: currentPlayer.playerId, name: "" });
      return;
    }

    if (gameCheckIn == "Single" && lastRoundThrow.segment?.startsWith("S")) {
      currentPlayer.score += currentRoundPoints;
      props.game.winners.push({ id: currentPlayer.playerId, name: "" });
      return;
    }

    if (gameCheckIn == "Double" && lastRoundThrow.segment?.startsWith("D")) {
      currentPlayer.score += currentRoundPoints;
      props.game.winners.push({ id: currentPlayer.playerId, name: "" });
      return;
    }

    if (gameCheckIn == "Triple" && lastRoundThrow.segment?.startsWith("T")) {
      currentPlayer.score += currentRoundPoints;
      props.game.winners.push({ id: currentPlayer.playerId, name: "" });
      return;
    }
  };

  return (
    <div className="grid grid-cols-[250px_auto] h-full">
      <div className="bg-backgroundSecondary">
        <Scoreboard
          players={props.game.gameData.players}
          pointsToWin={props.game.configuration.pointsToScore}
        />
      </div>
      <div className="h-[70vh] flex flex-col items-center">
        <CurrentRound
          player={
            props.game.gameData.players[
              props.game.gameData.currentPlayerIndex ?? 0
            ]
          }
          currentThrows={currentRoundThrows}
          pointsToScore={props.game.configuration.pointsToScore}
          onFinishRound={onFinishRound}
        />
        <GameBoard onDartboardClick={onDartBoardClick} />
      </div>
    </div>
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
