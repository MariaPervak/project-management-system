import Kanban from "kanban_module/Kanban";

interface KanbanBoard<TCard extends Card> {
  columns: Column<TCard>[];
}
interface Card {
  id: string | number;
  title?: string;
  description?: string;
  content?: JSX.Element;
}
interface Column<TCard extends Card> {
  id: string | number;
  title: string;
  cards: TCard[];
}

interface KanbanPageProps {
  board: KanbanBoard<Card> | null;
}

const KanbanPage = ({board}: KanbanPageProps) => {
  if (!board) return (
    <div className="kanban">Задач нет</div>
  );

  return (
    <Kanban board={board} />
  );
};

export default KanbanPage;