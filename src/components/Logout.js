import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Logout = ({ setToken }) => {
  const navigate = useNavigate(); // rappel
  return (
    <div
      className="other-tag"
      onClick={() => {
        Cookies.remove("token");
        setToken("");
        navigate("/");
      }}
    >
      Se déconnecter
    </div>
  );
};

export default Logout;
