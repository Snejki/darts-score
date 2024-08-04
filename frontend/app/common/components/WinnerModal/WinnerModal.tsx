import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { GamePlayer } from "~/game/GameModels";


interface WinnerModalProps {
    winners: GamePlayer[];
    showModal: boolean
}

export const WinnerModal = (props: WinnerModalProps) => {
const {winners, showModal} = props;
  return (
    <div className="fixed">
      <Dialog open={showModal}>
        <DialogContent>
          <DialogHeader>Winners</DialogHeader>
          
          {winners.map(winner => (<div key={winner.id}>{winner.name}</div>))}
        </DialogContent>
      </Dialog>
    </div>
  );
};
