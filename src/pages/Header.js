import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import logo from "../assets/images/logo.svg";

const Header = ({
  token,
  setToken,
  searchText,
  setSearchText,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  setOrderBy,
  filter,
  setFilter,
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
            <div
              className="logo"
              onClick={() => {
                setFilter(true);
              }}
            >
              <img src={logo} alt="logo"></img>
            </div>
          </Link>
        </div>
        <div className="header-elements-container">
          <div className="header-element-container">
            {
              <div className="input-search">
                <input
                  type="text"
                  placeholder="Recherche des articles"
                  value={searchText}
                  onChange={(event) => {
                    setSearchText(event.target.value);
                    // alert("ON change " + event.target.value);
                  }}
                />
              </div>
            }

            {token ? null : (
              <Link to="/signup">
                <div
                  className="other-tag"
                  onClick={() => {
                    setFilter(false);
                  }}
                >
                  s'inscrire
                </div>
              </Link>
            )}

            {token ? (
              <Logout setToken={setToken}></Logout>
            ) : (
              <Link to="/login">
                <div
                  className="other-tag"
                  onClick={() => {
                    setFilter(false);
                  }}
                >
                  Se connecter
                </div>
              </Link>
            )}

            <Link to="/publish">
              <div
                className="sell-tag"
                onClick={() => {
                  setFilter(false);
                }}
              >
                Vends tes articles
              </div>
            </Link>
          </div>

          {filter && (
            <div className="header-element-container">
              <input
                type="text"
                placeholder="Prix minimum"
                value={priceMin}
                onChange={(event) => {
                  setPriceMin(event.target.value);
                }}
              ></input>
              <input
                type="text"
                placeholder="Prix maximum"
                value={priceMax}
                onChange={(event) => {
                  setPriceMax(event.target.value);
                }}
              ></input>
              <p>Affichage des prix : Croissant :</p>
              <input
                type="radio"
                name="order"
                value="price-asc"
                onClick={() => {
                  setRadioValue();
                }}
              />
              <p>Décroissant </p>
              <input
                type="radio"
                name="order"
                value="price-desc"
                onClick={() => {
                  setRadioValue();
                }}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
