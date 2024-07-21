import { useParams } from "@remix-run/react";
import { GamePlayPage } from "~/game/GamePlayPage";

const PlayPage = () => {
    const params = useParams();
    return <GamePlayPage />
}

export default PlayPage;