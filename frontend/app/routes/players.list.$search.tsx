import { json, LoaderFunction } from "@remix-run/node";
import { searchPlayers } from "~/common/data/player";

export interface SearchPlayersParams {
  search: string
}

export const loader : LoaderFunction = async ({ params }) => {
  const players = await searchPlayers();

  return json(players);
};