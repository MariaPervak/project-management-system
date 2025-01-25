import {Card, UncontrolledBoard, KanbanBoard} from '@caldwell619/react-kanban'
import './Kanban.scss';

interface KanbanProps {
  board: KanbanBoard<Card>
}

const Kanban = ({board}: KanbanProps) => {
  return (
    <div className="kanban">
      <UncontrolledBoard initialBoard={board} />
    </div>
  );
};

export default Kanban;