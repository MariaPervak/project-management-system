import LogoImage from './logo.png';
import Auth from "../Auth/Auth.tsx";
import './Header.scss';


const Header = () => {
  return (
    <header className="header">
      <div className="logo"><img src={LogoImage} alt=""/> Система управления проектом</div>
      <Auth />
    </header>
  );
};

export default Header;