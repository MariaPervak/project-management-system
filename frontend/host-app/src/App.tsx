import TaskList from "task_module/TaskList";
import { useQuery } from '@apollo/client';
import { Routes, Route } from "react-router-dom";
import './App.css'
import Layout from "./components/Layout/Layout";
import CreatePage from "./pages/Create/CreatePage";
import {AuthContext} from "../context/AuthContext/AuthContext";
import {clearToken, getToken} from "./components/Auth/helpers";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {Loader} from 'ui_components/components';
export type BadgeStatus = 'inProgress' | 'done' | 'backlog' | 'cancelled';
import { useSubscription } from '@apollo/client';
import {GET_TASKS, LOGIN_CHECK, TASK_ADDED_SUBSCRIPTION} from "./utils/gql";
import Toast from "./components/common/Toast/Toast";

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
  const [newMessage, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (subscriptionData?.taskAdded) {
      setMessage(`Задача ${subscriptionData?.taskAdded.name}-${subscriptionData.taskAdded.title} добавлена`);
    }
  }, [subscriptionData]);

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

  if (loggedLoading || loading) return <Loader data-testid="loader"/>;

  if (error) return <p>Error : {error.message}</p>;
  return (
    <AuthContext.Provider value={authData}>
      <Layout>
        <Routes>
          <Route path="/" element={<TaskList list={data.tasks}/>}/>
          <Route path="/create" element={<CreatePage/>}/>
        </Routes>
        {newMessage && <Toast message={newMessage} key={newMessage} onClose={() => setMessage(null)}/>}
      </Layout>
    </AuthContext.Provider>
  );
}

export default App;