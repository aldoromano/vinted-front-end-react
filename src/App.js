import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { React, useState } from "react";
import Cookies from "js-cookie";

/* Pages */
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./pages/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  // Le token
  const [token, setToken] = useState(Cookies.get("token") || null);

  // Le champ de recherche
  const [searchText, setSearchText] = useState("");

  // Le tri
  const [orderBy, setOrderBy] = useState("price-asc");

  // Le numéro de page
  const [pageNumber, setPageNumber] = useState(1);

  // le nombre maximum d'offres par page
  const [limit, setLimit] = useState(8);

  // Le prix minimum
  const [priceMin, setPriceMin] = useState(0);

  // Le prix maximum
  const [priceMax, setPriceMax] = useState(0);

  // La présence du filtre
  const [filter, setFilter] = useState(true);

  // Les URL...
  // URL pour test en local
  //const urlBase = "http://localhost:3000/";
  // URL pour test vers backend REACTEUR
  const urlBase = "https://lereacteur-vinted-api.herokuapp.com";

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        searchText={searchText}
        setSearchText={setSearchText}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        setOrderBy={setOrderBy}
        filter={filter}
        setFilter={setFilter}
      ></Header>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              urlBase={urlBase}
              token={token}
              searchText={searchText}
              priceMin={priceMin}
              priceMax={priceMax}
              orderBy={orderBy}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              limit={limit}
              setLimit={setLimit}
              filter={filter}
              setFilter={setFilter}
            />
          }
        />
        <Route
          path="/signup"
          element={<Signup urlBase={urlBase} setToken={setToken} />}
        />

        <Route
          path="/login"
          element={<Login urlBase={urlBase} setToken={setToken} />}
        />

        <Route
          path="/offer/:id"
          element={<Offer urlBase={urlBase} token={token} />}
        />

        <Route
          path="/publish"
          element={<Publish urlBase={urlBase} token={token} />}
        />

        <Route
          path="/Payment"
          element={<Payment urlBase={urlBase} token={token} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
