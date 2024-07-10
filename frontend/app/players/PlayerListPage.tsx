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
import { useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { generateGUID } from "~/common/guid";

export interface Player {
  id: string;
  name: string;
}

interface PlayerListPageProps {
  onChange: (player: Player) => void
  players: Player[]
}

export const PlayerListPage = (props: PlayerListPageProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setPlayers(props.players)
  }, [props.players])

  const onAddNewPlayerClick = () => {
    onOpen();
  };

  return (
    <main id="content">
      <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
        <PlayersTable players={players} />
        <ButtonGroup>
          <Button onClick={onAddNewPlayerClick}>Add New Player</Button>
        </ButtonGroup>
        <AddPlayerModal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          onAddPlayer={props.onChange}
        />
      </div>
    </main>
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
  useSubmit();

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


