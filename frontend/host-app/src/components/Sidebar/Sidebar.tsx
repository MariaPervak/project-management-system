import { Link } from "react-router-dom";
import './Sidebar.scss';
import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext/AuthContext.tsx";


const Sidebar = () => {
  const authData = useContext(AuthContext);

  return (
    <nav className='sidebar'>
      <ul>
        <li><Link to="/">Список задач</Link></li>
        <li><Link to="/kanban">Kanban</Link></li>
        {authData.role === 'admin' && (
          <li><Link to="/create">Создать</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;