import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// Token : fM8pDtlr6xxcSl2GeJaWm3nq_bOKj7SWlJt1nCd0uLf1OLst_I6Tg2ijK2S4JC8q
const Login = ({ urlBase, setToken }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate(); // rappel

  const loginRequest = async () => {
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(`${urlBase}/user/login`, data);
      console.log(response.data.token);
      Cookies.set("token", response.data.token, { expires: 7 });
      setToken(response.data.token);
      navigate("/offer");
    } catch (error) {
      console.log("Erreur : ", error.response.data);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire
    loginRequest();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Login</h1>
        <div className="container-form">
          <div className="container-field">
            <input
              type="text"
              placeholder="Adresse mail"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div className="container-field">
            <input
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Mot de passe"
            />
          </div>

          <input className="button" type="submit" value="Se connecter" />
        </div>
      </div>
    </form>
  );
};

export default Login;
