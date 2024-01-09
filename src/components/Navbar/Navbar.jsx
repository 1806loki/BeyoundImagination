import "./Navbar.css";
import { useUserContext } from "../../context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { userData, logoutUser } = useUserContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const logOutHandler = () => {
    logoutUser();
    userData(null);
    navigate("/");
  };

  return (
    <div className="Navbar">
      <div className="Container">
        <div>
          <h1>SOME LOGO</h1>
        </div>
        <div>
          <h1> {userData && userData.userName}</h1>
          <button onClick={logOutHandler}>LOGOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
