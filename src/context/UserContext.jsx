import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userData, setUserData] = useState({ userName: "", password: "" });

  const loginUser = (userName, password) => {
    setUserData({ userName, password });
    setLoggedInUser(true);
  };

  const logoutUser = () => {
    setUserData({ userName: "", password: "" });
    setLoggedInUser(false);
  };

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        userData,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
