import { PrismaClient } from '@prisma/client';
import { Player } from '~/players/PlayerListPage';

export const createPlayer = async (player: Player) => {
    try {
        const prisma = new PrismaClient();
        prisma.$connect();
    
        await prisma.player.create({
            data: {
                id: player.id,
                name: player.name
            }
        });
    } catch(e) {
        console.log(e);
    }

}

export const getPlayers = async () => {

    try {
        const prisma = new PrismaClient();
        prisma.$connect();
    
        return await prisma.player.findMany();
    } catch (e) {
        console.log(e);
    }

    return [];
}

export const searchPlayers = async (query: string) => {
    const prisma = new PrismaClient();
    prisma.$connect();

    return prisma.player.findMany({ where: {name: { contains: query }}});
}

