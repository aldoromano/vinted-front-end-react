import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { React, useState } from "react";

/* Pages */
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./pages/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";

function App() {
  // Le token
  const [token, setToken] = useState(Cookies.get("token") || null);

  // La chaine de recherche url
  const [urlFilter, setUrlFilter] = useState("?page=1&limit=8");

  // Les URL...
  //const urlBase = "http://localhost:3000/";
  const urlBase = "https://lereacteur-vinted-api.herokuapp.com";

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        urlFilter={urlFilter}
        setUrlFilter={setUrlFilter}
      ></Header>
      <Routes>
        <Route
          path="/"
          element={
            <Home urlBase={urlBase} token={token} urlFilter={urlFilter} />
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
      </Routes>
    </Router>
  );
}

export default App;
