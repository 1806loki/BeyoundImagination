import "./Login.css";
import { useUserContext } from "../../context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useUserContext();

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(name, password);
    navigate("/Dashboard");
  };

  return (
    <div className="Login">
      <div className="Container">
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
