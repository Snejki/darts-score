import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { GamePlayer } from "~/game/GameModels";
import { FaTrophy } from "react-icons/fa";

interface WinnerModalProps {
  winners: GamePlayer[];
  showModal: boolean;
}

export const WinnerModal = (props: WinnerModalProps) => {
  const { winners, showModal } = props;
  return (
    <Dialog open={showModal}>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-row gap-5 items-center self-center">
            <FaTrophy className="text-yellow-400"/>
            Winners
            <FaTrophy className="text-yellow-400"/>
          </div>
        </DialogHeader>

        {winners.map((winner) => (
          <div key={winner.id}>{winner.name}</div>
        ))}
      </DialogContent>
    </Dialog>
  );
};
