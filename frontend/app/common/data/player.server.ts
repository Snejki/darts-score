import { Player } from '~/players/PlayerListPage';
import { getPrismaClient } from './db.server';

export const createPlayer = async (player: Player) => {
    try {
        const prisma = getPrismaClient();

    
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
        const prisma = getPrismaClient();

    
        return await prisma.player.findMany();
    } catch (e) {
        console.log(e);
    }

    return [];
}

export const searchPlayers = async (query: string) => {
    const prisma = getPrismaClient();
    return prisma.player.findMany({ where: {name: { contains: query }}});
}

