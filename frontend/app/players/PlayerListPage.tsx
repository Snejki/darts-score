import {
  Button,
  ButtonGroup,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  useDisclosure,
  getKeyValue,
  TableRow,
} from "@nextui-org/react";
import { useState } from "react";

interface Player {
  id: string;
  name: string;
}

export const PlayerListPage = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [players] = useState<Player[]>([]);

  const onAddNewPlayerClick = () => {
    onOpen();
  };

  const onAddPlayer = (player: Player) => {
    players.push(player);
  };

  return (
    <>
      <PlayersTable players={players} />
      <ButtonGroup>
        <Button onClick={onAddNewPlayerClick}>Add New Player</Button>
      </ButtonGroup>
      <AddPlayerModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onAddPlayer={onAddPlayer}
      />
    </>
  );
};

interface AddPlayerModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  onAddPlayer: (player: Player) => void;
}

const AddPlayerModal = (props: AddPlayerModalProps) => {
  const { isOpen, onClose, onOpenChange } = props;
  const [playerName, setPlayerName] = useState("");

  const onAddPlayer = () => {
    props.onAddPlayer({
      id: generateGUID(),
      name: playerName,
    });

    setPlayerName("");
    onClose();
  };

  const onCancel = () => onClose();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Add New Player</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            label="Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button onClick={onCancel}>Close</Button>
            <Button onClick={onAddPlayer}>Add</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface PlayersTableProps {
  players: Player[];
}

const PlayersTable = (props: PlayersTableProps) => {
  const columns = [
    {
      key: "name",
      label: "Name",
    },
  ];

  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={props.players}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

function generateGUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r =
      (crypto.getRandomValues(new Uint8Array(1))[0] & 0x0f) |
      (c === "x" ? 0 : 0x8);
    return r.toString(16);
  });
}
