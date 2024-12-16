import "./App.css";
import TaskList from "./components/TaskList/TaskList.tsx";
import {ITask} from "./components/Task/Task.tsx";

function App() {
  const taskList:ITask[] = [
    {
      id: 1,
      name: 'CRM-5286',
      title: "Инструментарий для формирования и отправки сегментаций. \"Сервис целевого маркетинга\"",
      status: 'backlog',
      description: '',
    },
    {
      id: 2,
      name: 'CRM-5287',
      title: "Инструментарий",
      status: 'inProgress',
      description: '',
    },
    {
      id: 3,
      name: 'CRM-5288',
      title: "Инструментарий",
      status: 'cancelled',
      description: '',
    },
    {
      id: 4,
      name: 'CRM-5289',
      title: "Инструментарий для формирования",
      status: 'done',
      description: '',
    },
  ]
  return (
    <TaskList list={taskList}/>
  );
}

export default App;