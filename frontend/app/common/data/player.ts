import { Player } from "~/players/PlayerListPage";
import { firestore } from "./db.server"; 
import { addDoc, collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";

export const createPlayer = async (player: Player) => {
    await addDoc(collection(firestore, "players"), player);
}

export const getPlayers = async () => {
    const result = await getDocs(collection(firestore, "players"));

    return result.docs.map(x => x.data() as Player);
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

