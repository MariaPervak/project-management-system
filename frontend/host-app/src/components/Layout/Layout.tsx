import './Layout.scss';
import Header from "../Header/Header.tsx";
import Sidebar from "../Sidebar/Sidebar.tsx";


const Layout = ({children}) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout__content">
        <Sidebar />
        {children}
      </div>

    </div>
  );
};

export default Layout;