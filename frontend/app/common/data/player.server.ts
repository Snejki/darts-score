import { PrismaClient } from '@prisma/client';
import { Player } from '~/players/PlayerListPage';

export const createPlayer = async (player: Player) => {
    console.log("EEEEEEEE");
    console.log(player)
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

// export const searchPlayers = async () => {
//     const playersRef = collection(firestore, "players");
//     const playersQuery = query(playersRef, where("name", "array-contains-any", "Tomek"), orderBy("name"), limit(10))
    
//     return (await getDocs(playersQuery)).docs.map(x => x.data() as Player);
// }

export const searchPlayers = async (query: string) => {
    const players = await getPlayers();
    return players;
    return players.filter(x => x.name.includes(query));
}

