import { Link } from "react-router-dom";
import './Sidebar.scss';


const Sidebar = () => {
  return (
    <div>
      <nav className='sidebar'>
        <ul>
          <li><Link to="/">Список задач</Link></li>
          <li><Link to="/kanban">Kanban</Link></li>
          <li><Link to="/create">Создать</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;