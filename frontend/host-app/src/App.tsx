import TaskList from "task_module/TaskList";
import { useQuery, gql } from '@apollo/client';

export type BadgeStatus = 'inProgress' | 'done' | 'backlog' | 'cancelled';

export interface ITask {
  id: number;
  name: string;
  title: string;
  status: BadgeStatus;
  description?: string;
}

const GET_TASKS = gql`
    query Tasks {
      tasks {
        id,
        name
        status
        title
        description
      }
    }
  `


function App() {
  const { loading, error, data } = useQuery(GET_TASKS);
  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;
  return (
    <TaskList list={data.tasks}/>
  );
}

export default App;