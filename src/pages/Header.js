import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import logo from "../assets/images/logo.svg";

const Header = ({ token, setToken }) => {
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="logo"></img>
          </div>
        </Link>
        <div className="input-search">
          <input type="text" placeholder="Recherche des articles" />
        </div>
        {token ? null : (
          <Link to="/signup">
            <div className="other-tag">s'inscrire</div>
          </Link>
        )}

        {token ? (
          <Logout setToken={setToken}></Logout>
        ) : (
          <Link to="/login">
            <div className="other-tag">Se connecter</div>
          </Link>
        )}

        <div className="other-tag">Vends tes articles</div>
      </div>
    </header>
  );
};

export default Header;
