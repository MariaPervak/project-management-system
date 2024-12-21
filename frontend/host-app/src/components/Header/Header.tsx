import LogoImage from './logo.png';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="logo"><img src={LogoImage} alt=""/></div>
      <input type="search" placeholder="Номер задачи"/>
      <div>profile</div>
    </header>
  );
};

export default Header;