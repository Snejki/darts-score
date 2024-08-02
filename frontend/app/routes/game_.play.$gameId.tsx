import { useParams } from "@remix-run/react";
import { GamePlayPage } from "~/game/GamePlayPage";

type PlayPageProps = "gameId"


const PlayPage = () => {
    const params = useParams<PlayPageProps>();
    return <GamePlayPage />
}

export default PlayPage;