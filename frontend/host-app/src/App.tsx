import TaskList from "task_module/TaskList";
import { useQuery, gql } from '@apollo/client';
import { Router, Routes, Route } from "react-router-dom";
import './App.css'
import Layout from "./components/Layout/Layout.tsx";
import CreatePage from "./pages/Create/CreatePage.tsx";

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
      <Layout>
        <Routes>
          <Route exact path="/" element={<TaskList list={data.tasks}/>}/>
          <Route exact path="/create" element={<CreatePage/>}/>
        </Routes>

      </Layout>

  );
}

export default App;