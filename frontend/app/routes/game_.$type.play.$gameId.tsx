import { useParams } from "@remix-run/react";
import { GamePlayPage } from "~/game/GamePlayPage";

const PlayPage = () => {
    const params = useParams();
    console.log(params);
    return <GamePlayPage />
}

export default PlayPage;