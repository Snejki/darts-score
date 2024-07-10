import { Player } from "~/players/PlayerListPage";
import { firestore } from "./db.server"; 
import { addDoc, collection, getDocs } from "firebase/firestore";

export const createPlayer = async (player: Player) => {
    await addDoc(collection(firestore, "players"), player);
}

export const getPlayers = async () => {
    const result = await getDocs(collection(firestore, "players"));

    return result.docs.map(x => x.data() as Player);
}

