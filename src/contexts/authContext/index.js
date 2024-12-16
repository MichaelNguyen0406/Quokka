// Import React
import { createContext, useContext, useState, useEffect } from "react";

// Import React Router Dom
import { useNavigate } from "react-router-dom";

// Import Firebase Library
import { onAuthStateChanged } from "firebase/auth";

// Import Firebase Config
import { auth } from "../../firebase/config";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const Navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AuthContext, InitializeUser);
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const InitializeUser = (user) => {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
      Navigate("/");
    } else {
      setCurrentUser(null);
      userLoggedIn(false);
    }
    setLoading(false);
  };

  const value = {
    currentUser,
    userLoggedIn,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
