import Badge, {BadgeStatus} from "../Badge/Badge.tsx";
import './Task.scss'

export interface ITask {
  id: number;
  name: string;
  title: string;
  status: BadgeStatus;
  description?: string;
}

const Task = ({name, title, status}: ITask) => {
  return (
    <button className="task">
      <div className="task__status"><Badge status={status} format='icon'/></div>
      <div className="task__info">
        <div className="task__name">{name}</div>
        <div className="task__title">{title}</div>
      </div>
    </button>
  );
};

export default Task;