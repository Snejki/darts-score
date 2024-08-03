import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { getGame } from "~/common/data/game.server";
import { GameModel } from "~/game/GameModels";
import { GamePlayPage } from "~/game/GamePlayPage";

type PlayPageProps = "gameId"


const PlayPage = () => {
    const { gameId } = useParams<PlayPageProps>();
    const gameData = useLoaderData<GameModel<unknown, unknown>>();
    if(!gameData) return null;

    return <GamePlayPage id={gameId!} game={gameData}/>
}

export const loader : LoaderFunction = async (args : LoaderFunctionArgs) => {
    const gameId = args.params["gameId"];

    const game = await getGame(gameId!);
    return game;
}

export default PlayPage;