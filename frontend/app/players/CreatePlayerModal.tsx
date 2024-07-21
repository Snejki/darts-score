import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { generateGUID } from "~/common/guid";
import { Player } from "./PlayerListPage";

interface CreatePlayerModalProps {
  onAddPlayer: (player: Player) => void;
}

export const CreatePlayerModal = (props: CreatePlayerModalProps) => {
  const [playerName, setPlayerName] = useState("");

  const onAddPlayer = () => {
    props.onAddPlayer({
      id: generateGUID(),
      name: playerName,
    });

    setPlayerName("");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create Player</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Create Player</DialogHeader>

        <Input
          type="text"
          placeholder="Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />

        <DialogFooter>
          <DialogClose>
            <Button color="secondary">Close</Button>
          </DialogClose>
          <DialogClose>
            <Button onClick={onAddPlayer}>Add</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
