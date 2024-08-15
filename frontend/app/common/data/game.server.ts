import { Prisma } from "@prisma/client";
import { GameModel } from "~/game/GameModels";
import { getPrismaClient } from "./db.server";

export const createGame = async (game: GameModel<unknown, unknown>) => {
    const prisma = getPrismaClient();

    await prisma.game.create({data: {
        id: game.id,
        configuration: game.configuration as Prisma.JsonArray,
        createdAt: new Date(game.createdAt)?.toISOString(),
        finishedAt: undefined,
        gameData: game.gameData  as Prisma.JsonObject,
        players: game.players as Prisma.JsonArray,
        state: game.state,
        type: game.type,
        winners: game.winners
    }})
}

export const updateGame = async (game: GameModel<unknown, unknown>) => {
    const prisma = getPrismaClient();


    await prisma.game.update({
        where: { id: game.id },
        data: {
            finishedAt: game.finishedAt ? new Date(game.finishedAt) : undefined,
            gameData: game.gameData  as Prisma.JsonObject,
            state: game.state,
            winners: game.winners
        }
    });
}

export const getGame = async (id: string) => {
    const prisma = getPrismaClient();


    return await prisma.game.findFirst({
        where: {
            id: {equals: id}
        }
    })
}