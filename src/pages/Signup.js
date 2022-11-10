import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = ({ urlBase, setToken }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordCf, setPasswordCf] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  //const [displayRegister, setDisplayRegister] = useState(true);

  const navigate = useNavigate(); // rappel

  const registerRequest = async () => {
    try {
      const data = {
        email: email,
        username: name,
        password: password,
        newsletter: true,
      };
      const response = await axios.post(`${urlBase}/user/signup`, data);
      console.log(response.data.token);
      Cookies.set("token", response.data.token, { expires: 7 });
      setToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log("Erreur : ", error.response.data);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire
    // alert("Submit!");
    if (password !== passwordCf) {
      setErrorMessage("Les mots de passe sont différents !");
    } else {
      setErrorMessage("");
      registerRequest();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Create account</h1>
        <div className="container-form">
          <div className="container-field">
            <div>Name</div>
            <input
              type="text"
              onChange={(event) => {
                setName(event.target.value);
              }}
              placeholder="John Doe"
            />
          </div>

          <div className="container-field">
            <div> Email</div>
            <input
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              placeholder="zoe@gmail.com"
            />
          </div>

          <div className="container-field">
            <div> Password </div>
            <input
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="!mdihbyè-FA3"
            />
          </div>

          <div className="container-field">
            <div> Confirm your password</div>
            <input
              type="password"
              onChange={(event) => {
                setPasswordCf(event.target.value);
              }}
              placeholder="!mdihbyè-FA3"
            />
          </div>
          <p className={`${errorMessage ? "error" : "no-error"}`}>
            {errorMessage}
          </p>
          <input className="button" type="submit" value="Register" />
        </div>
      </div>
    </form>
  );
};

export default Signup;
