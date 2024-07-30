import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { json, useLoaderData, useSubmit } from "@remix-run/react";
import { createPlayer, getPlayers, searchPlayers } from "~/common/data/player.server";
import { Player, PlayerListPage } from "~/players/PlayerListPage";

const PlayersPage = () => {
  const loaderData = useLoaderData<Player[]>();
  const submit = useSubmit();

  const addPlayer = (player: Player) => {
    const formData = new FormData();
    formData.append("id", player.id);
    formData.append("name", player.name);

    submit(formData, { method: "POST" });
  };

  return <PlayerListPage onChange={addPlayer} players={loaderData} />;
};

export const loader : LoaderFunction = async ({ request: { url }}) => {
  const query = new URL(url).searchParams.get("query");

  if(query) {
    return json(await searchPlayers(query));
  }
  
  return json(await getPlayers());
};

export const action = async (args: ActionFunctionArgs) => {
  const { request } = args;
  const body = await request.formData();
  const player = Object.fromEntries(body) as Player;

  await createPlayer(player);

  return null;
};

export default PlayersPage;
