import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import logo from "../assets/images/logo.svg";

const Header = ({
  token,
  setToken,
  setSearchText,
  setPriceMin,
  setPriceMax,
  setOrderBy,
}) => {
  const setRadioValue = () => {
    var ele = document.getElementsByName("order");

    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        setOrderBy(ele[i].value);
        break;
      }
    }
  };
  return (
    <header>
      <div className="header-container">
        <div>
          <Link to="/">
            <div className="logo">
              <img src={logo} alt="logo"></img>
            </div>
          </Link>
        </div>
        <div className="header-elements-container">
          <div className="header-element-container">
            <div className="input-search">
              <input
                type="text"
                placeholder="Recherche des articles"
                onChange={(event) => {
                  setSearchText(event.target.value);
                  // alert("ON change " + event.target.value);
                }}
              />
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

            <div className="sell-tag">Vends tes articles</div>
          </div>
          <div className="header-element-container">
            <input
              type="text"
              placeholder="Prix minimum"
              onChange={(event) => {
                setPriceMin(event.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="Prix maximum"
              onChange={(event) => {
                setPriceMax(event.target.value);
              }}
            ></input>
            Croissant :
            <input
              type="radio"
              name="order"
              value="price-asc"
              onClick={() => {
                setRadioValue();
              }}
            />
            Décroissant :
            <input
              type="radio"
              name="order"
              value="price-desc"
              onClick={() => {
                setRadioValue();
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
