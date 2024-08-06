import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "@remix-run/react";
import { Paths } from "~/common/Paths";
import { Game } from "./Game";

export const GameSelectPage = () => {
  const navigate = useNavigate();
  const list = Game.getGameTypes();

  return (
    <div className="flex flex-col justify-center items-center gap-y-10">
      <h1 className="text-2xl font-bold">Select game</h1>
      <div className="grid gap-2 grid-cols-3">
        {list.map((item, index) => (
          <Card
            key={index}
            onClick={() => {const path = Paths.gameConfiguration(item.type); navigate(path)}}
            className="h-40 w-40 cursor-pointer primary hover:bg-primary hover:text-primary-foreground transition duration-500 flex justify-center items-center"
          >
            <h1 className="text-3xl font-bold">{item.name}</h1>
            <CardContent className="overflow-visible p-0"></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
