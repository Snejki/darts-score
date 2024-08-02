import { Prisma, PrismaClient } from "@prisma/client";
import { GameModel } from "~/game/GameModels";

export const createGame = async (game: GameModel<unknown, unknown>) => {
    const prisma = new PrismaClient();
    prisma.$connect();

    console.log(game);

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

export const getGame = async (id: string) => {
    const prisma = new PrismaClient();
    prisma.$connect();

    return await prisma.game.findFirst({
        where: {
            id: {equals: id}
        }
    })
}