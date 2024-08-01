import { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { redirect, useParams } from "@remix-run/react";
import { createGame } from "~/common/data/game.server";
import { Paths } from "~/common/Paths";
import { GameConfigurationPage } from "~/game/GameConfigurationPage";
import { GameModel, GameTypes } from "~/game/GameModels";


const GameConfiguration = () => {
  const { type } = useParams<{type: GameTypes}>();
  return <GameConfigurationPage gameType={type!} />;
};

export default GameConfiguration;

export const action : ActionFunction  =  async (args: ActionFunctionArgs)   => {
  const { request } = args;
  const body = await request.formData();
  const game = Object.fromEntries(body) as unknown as GameModel<unknown, unknown>;

  await createGame(game);

  return redirect(Paths.game("asd", "id"))
}
