import TaskList from "task_module/TaskList";
import { useQuery, gql } from '@apollo/client';
import { Routes, Route } from "react-router-dom";
import './App.css'
import Layout from "./components/Layout/Layout.tsx";
import CreatePage from "./pages/Create/CreatePage.tsx";
import {AuthContext} from "../context/AuthContext/AuthContext.tsx";
import {clearToken, getToken} from "./components/Auth/helpers.ts";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {Loader} from 'ui_components/components';
export type BadgeStatus = 'inProgress' | 'done' | 'backlog' | 'cancelled';
import { useSubscription } from '@apollo/client';

export interface ITask {
  id: number;
  name: string;
  title: string;
  status: BadgeStatus;
  description?: string;
}

interface AuthState {
  id: number;
  role: string;
  iat?: number;
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
`;

const LOGIN_CHECK = gql`
  query LoginCheck ($token: String!) {
    loginCheck(token: $token)
  }
`
const TASK_ADDED_SUBSCRIPTION = gql`
  subscription OnTaskAdded {
    taskAdded {
      id
      name
      title
      status
      description
    }
  }
`;

function App() {
  const token = getToken();
  const [authData, setAuthData] = useState<AuthState>({
    id: 0,
    role: 'guest',
  })
  const { loading: loggedLoading, error: loggedError, data: loggedData } = useQuery(LOGIN_CHECK, {
    variables: { token },
  });
  const { loading, error, data } = useQuery(GET_TASKS);
  const { data: subscriptionData } = useSubscription(TASK_ADDED_SUBSCRIPTION);

  useEffect(() => {
    if (subscriptionData?.taskAdded) {
      // Обновляем локальное состояние при получении новой задачи
      console.log('New task received:', subscriptionData.taskAdded);
      // Здесь можно обновить список задач
    }
  }, [subscriptionData]);

  console.log('data', data);

  useEffect(() => {
    if (!loggedLoading){
      if (loggedError){
        clearToken();
      }
      if (loggedData && loggedData.loginCheck){
        const decoded: AuthState = jwtDecode(token);
        setAuthData(decoded);
      }
    }
  }, [loggedLoading, loggedError, loggedData, token]);

  useEffect(() => {
    if (data){

    }
  }, [data]);

  if (loggedLoading || loading) return <Loader />;

  if (error) return <p>Error : {error.message}</p>;
  return (
    <AuthContext.Provider value={authData}>
      <Layout>
        <Routes>
          <Route path="/" element={<TaskList list={data.tasks}/>}/>
          <Route path="/create" element={<CreatePage/>}/>
        </Routes>
      </Layout>
    </AuthContext.Provider>
  );
}

export default App;