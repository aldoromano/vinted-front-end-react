import { Link } from "react-router-dom";
import { useState } from "react";
import Logout from "../components/Logout";
import logo from "../assets/images/logo.svg";

const Header = ({ token, setToken, urlFilter, setUrlFilter }) => {
  // Le champ de recherche
  const [searchText, setSearchText] = useState(null);

  // Le tri
  const [orderBy, setOrderBy] = useState("price-asc");

  // Le numéro de page
  const [pageNumber, setPageNumber] = useState(1);

  // le nombre maximum d'offres par page
  const [limit, setLimit] = useState(8);

  // Le prix minimum
  const [priceMin, setPriceMin] = useState(0);

  // Le prix maximum
  const [priceMax, setPriceMx] = useState(0);

  const handleFilter = () => {
    // Initialisation du filtre : par défaut on a toujour un No de page et une limite
    urlFilter = "?";
    urlFilter += "page=" + (pageNumber ? pageNumber : 1);
    urlFilter += "&limit=" + (limit ? limit : 8);

    // Le texte de recherche
    urlFilter += searchText ? "&title=" + searchText : "";

    // Les prix min/max
    urlFilter += priceMin ? "&priceMin=" + priceMin : "";
    urlFilter += priceMax ? "&priceMax=" + priceMax : "";

    // Le tri
    urlFilter += orderBy ? "&sort=" + orderBy : "";
    console.log("UrlFilter générée -> ", urlFilter);
    setUrlFilter(urlFilter);
  };

  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="logo"></img>
          </div>
        </Link>
        <div className="input-search">
          <input
            type="text"
            placeholder="Recherche des articles"
            onChange={(event) => {
              setSearchText(event.target.value);
              alert("ON change " + event.target.value);
              handleFilter();
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

        <div className="other-tag">Vends tes articles</div>
      </div>
    </header>
  );
};

export default Header;
