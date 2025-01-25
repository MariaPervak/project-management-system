import './Layout.scss';
import Header from "../Header/Header.tsx";
import Sidebar from "../Sidebar/Sidebar.tsx";
import type {PropsWithChildren} from "react";


const Layout = ({children}: PropsWithChildren) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout__content">
        <Sidebar />
        <main className="layout__body">{children}</main>
      </div>

    </div>
  );
};

export default Layout;