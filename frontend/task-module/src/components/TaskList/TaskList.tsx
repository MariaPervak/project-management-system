import Task, {ITask} from "../Task/Task.tsx";
import './taskList.scss';

export interface TaskList {
  list: ITask[];
}

const TaskList = ({list}: TaskList) => {
  return (
    <div className="task-list-container">
      <h1 className='title'>Задачи</h1>
      <ul className="task-list">
        {list.map((item) => (
          <li className="task-list__item"><Task key={item.id} id={item.id} name={item.name} title={item.title} status={item.status}/></li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;