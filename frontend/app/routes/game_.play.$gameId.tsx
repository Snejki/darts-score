import { ActionFunction, ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData, useParams, useSubmit } from "@remix-run/react";
import { getGame, updateGame } from "~/common/data/game.server";
import { GameModel } from "~/game/GameModels";
import { GamePlayPage } from "~/game/GamePlayPage";

type PlayPageProps = "gameId"


const PlayPage = () => {
    const { gameId } = useParams<PlayPageProps>();
    const gameData = useLoaderData<GameModel<unknown, unknown>>();
    const submit = useSubmit();
    if(!gameData) return null;


    const updateGame = (game: GameModel<unknown, unknown>) => {
        const body = JSON.stringify(game);

        const formData = new FormData();

        formData.append("body", body);
        submit(formData, { method: "POST"});
    }

    return <GamePlayPage id={gameId!} game={gameData} updateGame={updateGame}/>
}

export const loader : LoaderFunction = async (args : LoaderFunctionArgs) => {
    const gameId = args.params["gameId"];

    const game = await getGame(gameId!);
    return game;
}

export const action : ActionFunction = async (args: ActionFunctionArgs) => {
    const { request } = args;
    const game = JSON.parse((await request.formData()).get("body")?.toString() ?? "");    
    await updateGame(game);

    return null;
}

export default PlayPage;