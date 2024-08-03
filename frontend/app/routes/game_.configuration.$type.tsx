import { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { redirect, useParams } from "@remix-run/react";
import { createGame } from "~/common/data/game.server";
import { Paths } from "~/common/Paths";
import { GameConfigurationPage } from "~/game/GameConfigurationPage";
import { GameTypes } from "~/game/GameModels";


const GameConfiguration = () => {
  const { type } = useParams<{type: GameTypes}>();
  return <GameConfigurationPage gameType={type!} />;
};

export default GameConfiguration;

export const action : ActionFunction  =  async (args: ActionFunctionArgs)   => {
  const { request } = args;
  const game = JSON.parse((await request.formData()).get("body")?.toString() ?? "");

  await createGame(game);
  return redirect(Paths.game(game.id));
}
